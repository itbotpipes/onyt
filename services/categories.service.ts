import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export interface CategoryPayload {
  name: string;
  slug?: string;
  description?: string;
}

const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const DEFAULT_CATEGORIES = [
  { _id: 'all', id: 'all', name: 'All Blogs', slug: 'all-blogs' },
  { _id: 'inventory', id: 'inventory', name: 'Inventory', slug: 'inventory' },
  { _id: 'restaurant-operations', id: 'restaurant-operations', name: 'Restaurant Operations', slug: 'restaurant-operations' },
  { _id: 'kitchen', id: 'kitchen', name: 'Kitchen', slug: 'kitchen' },
  { _id: 'strategy', id: 'strategy', name: 'Strategy', slug: 'strategy' },
  { _id: 'automation', id: 'automation', name: 'Automation', slug: 'automation' },
];

export const categoriesService = {
  async getCategories(): Promise<any[]> {
    try {
      const ref = collection(db, 'categories');
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Categories timeout')), 2000)
      );
      const snapshot = await Promise.race([getDocs(ref), timeoutPromise]);
      if (snapshot.empty) return DEFAULT_CATEGORIES;
      return snapshot.docs.map(doc => ({
        _id: doc.id,
        id: doc.id,
        ...doc.data()
      } as any));
    } catch (e) {
      return DEFAULT_CATEGORIES;
    }
  },

  async createCategory(payload: CategoryPayload) {
    const slug = payload.slug || generateSlug(payload.name);

    // Validate slug uniqueness
    const ref = collection(db, 'categories');
    const q = query(ref, where('slug', '==', slug));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      throw new Error('A category with this name or slug already exists.');
    }

    const newDoc = {
      name: payload.name,
      slug,
      description: payload.description || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(ref, newDoc);
    return {
      _id: docRef.id,
      id: docRef.id,
      ...newDoc,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
};
