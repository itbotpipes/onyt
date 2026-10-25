import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp, 
  getDoc, 
  orderBy, 
  limit, 
  setDoc 
} from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, auth, storage } from '@/lib/firebase/config';
import { ARTICLES_DATA, ArticleData } from '@/data/blogData';

function convertStaticArticle(article: ArticleData): any {
  let htmlContent = `<div class="intro"><p>${article.introText}</p><p>${article.secondaryIntro}</p></div>`;
  if (article.mediaBlock) {
    if (article.mediaBlock.type === 'video') {
      htmlContent += `<video src="${article.mediaBlock.src}" controls class="w-full my-4 rounded-xl"></video><p><em>${article.mediaBlock.caption}</em></p>`;
    } else {
      htmlContent += `<img src="${article.mediaBlock.src}" alt="${article.mediaBlock.caption}" class="w-full my-4 rounded-xl" /><p><em>${article.mediaBlock.caption}</em></p>`;
    }
  }
  for (const s of article.sections || []) {
    htmlContent += `<h2 id="${s.id}">${s.heading}</h2>`;
    for (const p of s.paragraphs || []) {
      htmlContent += `<p>${p}</p>`;
    }
    if (s.bulletPoints && s.bulletPoints.length > 0) {
      htmlContent += `<ul>`;
      for (const b of s.bulletPoints) {
        htmlContent += `<li>${b}</li>`;
      }
      htmlContent += `</ul>`;
    }
  }

  const cleanTitle = (article.title || '').replace(/Digitory/gi, 'ONYT');
  const cleanContent = htmlContent.replace(/Digitory/gi, 'ONYT');
  const cleanIntro = (article.introText || '').replace(/Digitory/gi, 'ONYT');
  const dateObj = new Date(article.date || '2026-07-15');

  return {
    _id: article.slug,
    id: article.slug,
    slug: article.slug,
    title: cleanTitle,
    content: cleanContent,
    excerpt: cleanIntro,
    featuredImage: article.image || '/blogpage.jpg',
    status: 'Published',
    contentType: 'blog',
    isFeatured: true,
    readTime: article.readTime || '5 min read',
    createdAt: dateObj.toISOString(),
    createdAtDate: dateObj,
    category: {
      _id: (article.category || 'Strategy').toLowerCase().replace(/\s+/g, '-'),
      name: article.category || 'Strategy'
    },
    categoryName: article.category || 'Strategy',
    author: {
      _id: 'onyt-team',
      name: (article.author?.name || 'ONYT Studio').replace(/Digitory/gi, 'ONYT'),
      role: (article.author?.role || 'Digital Strategist').replace(/Digitory/gi, 'ONYT'),
      avatar: article.author?.avatar || '/demologo.jpg',
      bio: (article.author?.bio || 'Performance and digital engineering team at ONYT.').replace(/Digitory/gi, 'ONYT')
    },
    tags: [
      { tag: article.category || 'Insights' },
      { tag: 'ONYT Studio' },
      { tag: 'Performance' },
      { tag: 'Growth' }
    ],
    similarSlugs: article.similarSlugs || [],
    seo: {
      metaTitle: `${cleanTitle} | ONYT`,
      metaDescription: cleanIntro
    }
  };
}

function getStaticFallbackArticles(): any[] {
  return Object.values(ARTICLES_DATA).map(convertStaticArticle);
}

export interface PostPayload {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category?: string;
  author?: string;
  status: 'Draft' | 'Published';
  contentType?: 'blog' | 'case-study';
  tags?: string[];
  isFeatured?: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    keywords?: string[];
  };
}

export const postsService = {
  async getPosts(options?: { status?: 'Draft' | 'Published'; isFeatured?: boolean; contentType?: 'blog' | 'case-study'; limitCount?: number }) {
    try {
      const ref = collection(db, 'posts');
      let q = query(ref);

      if (options?.status) {
        q = query(q, where('status', '==', options.status));
      }
      if (options?.isFeatured !== undefined) {
        q = query(q, where('isFeatured', '==', options.isFeatured));
      }

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Firestore timeout')), 2500)
      );
      const snapshot = await Promise.race([getDocs(q), timeoutPromise]);
      let list = snapshot.docs.map(doc => {
        const data = doc.data() as any;
        const createdAtDate = data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt || Date.now());
        const contentType = data.contentType || 'blog';
        return {
          _id: doc.id,
          id: doc.id,
          ...data,
          contentType,
          createdAtDate,
          category: {
            _id: data.categoryId || '',
            name: data.categoryName || 'Uncategorized'
          },
          author: {
            _id: data.authorId || '',
            name: data.authorName || 'Admin'
          }
        };
      });

      if (options?.contentType) {
        if (options.contentType === 'case-study') {
          list = list.filter(item => item.contentType === 'case-study');
        } else {
          list = list.filter(item => !item.contentType || item.contentType === 'blog');
        }
      }

      // Sort descending by date
      list.sort((a, b) => b.createdAtDate.getTime() - a.createdAtDate.getTime());

      // If Firestore database is empty, provide curated fallback articles
      if (list.length === 0) {
        let fallbacks = getStaticFallbackArticles();
        if (options?.limitCount) {
          fallbacks = fallbacks.slice(0, options.limitCount);
        }
        return fallbacks;
      }

      // Slice to match limit
      if (options?.limitCount) {
        return list.slice(0, options.limitCount);
      }
      return list;
    } catch (e) {
      let fallbacks = getStaticFallbackArticles();
      if (options?.limitCount) {
        fallbacks = fallbacks.slice(0, options.limitCount);
      }
      return fallbacks;
    }
  },

  async getPublishedPostBySlug(slug: string): Promise<any> {
    try {
      const ref = collection(db, 'posts');
      const q = query(ref, where('slug', '==', slug), where('status', '==', 'Published'), limit(1));
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Firestore timeout')), 2500)
      );
      const snapshot = await Promise.race([getDocs(q), timeoutPromise]);
      if (snapshot.empty) {
        if (ARTICLES_DATA[slug]) {
          return convertStaticArticle(ARTICLES_DATA[slug]);
        }
        return null;
      }
      const docSnap = snapshot.docs[0];
      const data = docSnap.data() as any;
      return {
        _id: docSnap.id,
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
        category: {
          _id: data.categoryId || '',
          name: data.categoryName || 'Uncategorized'
        },
        author: {
          _id: data.authorId || '',
          name: data.authorName || 'Admin'
        }
      } as any;
    } catch (e) {
      if (ARTICLES_DATA[slug]) {
        return convertStaticArticle(ARTICLES_DATA[slug]);
      }
      return null;
    }
  },

  async getPostById(id: string): Promise<any> {
    try {
      const docRef = doc(db, 'posts', id);
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Firestore timeout')), 2500)
      );
      const docSnap = await Promise.race([getDoc(docRef), timeoutPromise]);
      if (!docSnap.exists()) return null;
      const data = docSnap.data() as any;
      return {
        _id: docSnap.id,
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
        category: {
          _id: data.categoryId || '',
          name: data.categoryName || 'Uncategorized'
        },
        author: {
          _id: data.authorId || '',
          name: data.authorName || 'Admin'
        }
      } as any;
    } catch (e) {
      return null;
    }
  },

  async createPost(payload: PostPayload) {
    // Check slug uniqueness
    const ref = collection(db, 'posts');
    const q = query(ref, where('slug', '==', payload.slug));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      throw new Error('A post with this slug already exists.');
    }

    // Resolve category name
    let categoryName = 'Uncategorized';
    if (payload.category) {
      const catDoc = await getDoc(doc(db, 'categories', payload.category));
      if (catDoc.exists()) {
        categoryName = catDoc.data().name || 'Uncategorized';
      }
    }

    // Resolve author name
    let authorName = 'Admin';
    let authorId = payload.author || '';
    if (authorId) {
      const userDoc = await getDoc(doc(db, 'users', authorId));
      if (userDoc.exists()) {
        authorName = userDoc.data().name || 'Admin';
      }
    } else if (auth.currentUser) {
      authorId = auth.currentUser.uid;
      const userDoc = await getDoc(doc(db, 'users', authorId));
      if (userDoc.exists()) {
        authorName = userDoc.data().name || 'Admin';
      }
    }

    const newDoc = {
      title: payload.title,
      slug: payload.slug,
      excerpt: payload.excerpt,
      content: payload.content,
      featuredImage: payload.featuredImage || '',
      categoryId: payload.category || '',
      categoryName,
      authorId,
      authorName,
      status: payload.status || 'Draft',
      contentType: payload.contentType || 'blog',
      tags: payload.tags || [],
      isFeatured: payload.isFeatured || false,
      seo: payload.seo || { metaTitle: '', metaDescription: '', canonicalUrl: '', keywords: [] },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(ref, newDoc);
    return {
      _id: docRef.id,
      id: docRef.id,
      ...newDoc,
      category: { _id: payload.category || '', name: categoryName },
      author: { _id: authorId, name: authorName },
      createdAt: new Date(),
      updatedAt: new Date()
    };
  },

  async updatePost(id: string, payload: PostPayload) {
    // Check duplicate slug if slug is changed
    const docRef = doc(db, 'posts', id);
    const existingSnap = await getDoc(docRef);
    if (!existingSnap.exists()) {
      throw new Error('Post not found');
    }
    const existingData = existingSnap.data();

    if (payload.slug && payload.slug !== existingData.slug) {
      const ref = collection(db, 'posts');
      const q = query(ref, where('slug', '==', payload.slug));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        throw new Error('A post with this slug already exists.');
      }
    }

    // Resolve category name
    let categoryName = 'Uncategorized';
    if (payload.category) {
      const catDoc = await getDoc(doc(db, 'categories', payload.category));
      if (catDoc.exists()) {
        categoryName = catDoc.data().name || 'Uncategorized';
      }
    }

    // Resolve author name
    let authorName = 'Admin';
    let authorId = payload.author || '';
    if (authorId) {
      const userDoc = await getDoc(doc(db, 'users', authorId));
      if (userDoc.exists()) {
        authorName = userDoc.data().name || 'Admin';
      }
    } else if (auth.currentUser) {
      authorId = auth.currentUser.uid;
      const userDoc = await getDoc(doc(db, 'users', authorId));
      if (userDoc.exists()) {
        authorName = userDoc.data().name || 'Admin';
      }
    }

    // Handle cover image replacement storage cleanup if different
    if (existingData.featuredImage && payload.featuredImage !== existingData.featuredImage) {
      try {
        if (existingData.featuredImage.includes('firebasestorage.googleapis.com')) {
          const imageRef = ref(storage, existingData.featuredImage);
          await deleteObject(imageRef);
        }
      } catch (err) {
        console.warn('Storage cover image deletion ignored:', err);
      }
    }

    const updateData = {
      title: payload.title,
      slug: payload.slug,
      excerpt: payload.excerpt,
      content: payload.content,
      featuredImage: payload.featuredImage || '',
      categoryId: payload.category || '',
      categoryName,
      authorId,
      authorName,
      status: payload.status,
      contentType: payload.contentType || 'blog',
      tags: payload.tags || [],
      isFeatured: payload.isFeatured || false,
      seo: payload.seo || { metaTitle: '', metaDescription: '', canonicalUrl: '', keywords: [] },
      updatedAt: serverTimestamp()
    };

    await updateDoc(docRef, updateData);

    const freshDoc = await getDoc(docRef);
    return {
      _id: id,
      id: id,
      ...freshDoc.data(),
      category: { _id: payload.category || '', name: categoryName },
      author: { _id: authorId, name: authorName }
    };
  },

  async deletePost(id: string) {
    const docRef = doc(db, 'posts', id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      // Delete image object in Storage if it belongs to Firebase Storage
      if (data.featuredImage && data.featuredImage.includes('firebasestorage.googleapis.com')) {
        try {
          const imageRef = ref(storage, data.featuredImage);
          await deleteObject(imageRef);
        } catch (err) {
          console.warn('Storage image deletion ignored:', err);
        }
      }
    }
    await deleteDoc(docRef);
    return { id };
  }
};
