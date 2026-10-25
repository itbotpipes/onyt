'use client';

import React, { useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { leadsService } from '@/services/leads.service';

const AVAILABLE_SERVICES = [
  'Website Development',
  'Content Creation / Marketing',
  'SEO / GEO',
  'Performance Marketing',
  'Web / App Development',
  'Brand & Creative Direction',
  'Other',
];

export default function ContactPage() {
  const [desktopVideo, setDesktopVideo] = useState('/Digitory.mp4');
  const [mobileVideo, setMobileVideo] = useState('/mobile.mp4');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { settingsService } = await import('@/services/settings.service');
        const s = await settingsService.getSettings();
        if (s.contactDesktopVideoUrl || s.desktopVideoUrl) setDesktopVideo(s.contactDesktopVideoUrl || s.desktopVideoUrl!);
        if (s.contactMobileVideoUrl || s.mobileVideoUrl) setMobileVideo(s.contactMobileVideoUrl || s.mobileVideoUrl!);
      } catch (err) {
        console.error('Failed to load dynamic videos:', err);
      }
    };
    fetchSettings();
  }, []);

  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    selectedServices: [] as string[],
    otherServiceText: '',
    message: '',
  });

  const [serviceError, setServiceError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleService = (service: string) => {
    setServiceError(false);
    setFormState(prev => {
      const exists = prev.selectedServices.includes(service);
      const updated = exists
        ? prev.selectedServices.filter(s => s !== service)
        : [...prev.selectedServices, service];
      return { ...prev, selectedServices: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formState.selectedServices.length === 0) {
      setServiceError(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const finalServices = formState.selectedServices.map(s => {
      if (s === 'Other' && formState.otherServiceText.trim()) {
        return `Other: ${formState.otherServiceText.trim()}`;
      }
      return s;
    });

    try {
      await leadsService.submitContactMessage({
        name: formState.name,
        phone: formState.phone,
        email: formState.email,
        services: finalServices,
        message: formState.message,
      });
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormState({
        name: '',
        phone: '',
        email: '',
        selectedServices: [],
        otherServiceText: '',
        message: '',
      });
      setServiceError(false);
    } catch (error) {
      console.error('Failed to submit contact message:', error);
      setIsSubmitting(false);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] transition-colors duration-300 flex flex-col font-sans relative selection:bg-[var(--ac)] selection:text-white">
      {/* Navigation */}
      <Nav />

      <main className="flex-1 w-full bg-[var(--bg)] text-[var(--fg)] transition-colors duration-300">

        {/* Cinematic Hero Section */}
        <section className="relative w-full h-[45vh] md:h-[65vh] md:min-h-[440px] flex items-center justify-center overflow-hidden bg-black">
          {/* Background Video */}
          <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none opacity-70">
            {/* Desktop Version */}
            {desktopVideo && (
              <video
                key={desktopVideo}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="hidden md:block w-full h-full object-cover scale-[1.01]"
              >
                <source src={desktopVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            {/* Mobile Version */}
            {mobileVideo && (
              <video
                key={mobileVideo}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="block md:hidden w-full h-full object-cover scale-[1.01]"
              >
                <source src={mobileVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-black/60 z-10 pointer-events-none" />
          <div className="relative z-20 text-center px-4 max-w-2xl">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--ac)]/20 backdrop-blur-md text-[var(--ac)] border border-[var(--ac)]/30 mb-3">
              Get in Touch
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-sm font-display">
              Let&apos;s Build Something Extraordinary
            </h1>
          </div>
        </section>

        {/* Form and Info Section */}
        <section id="contact-content" className="pt-6 pb-20 md:pt-10 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 -mt-12 md:-mt-16">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

            {/* Left Column (Cards and Map) */}
            <div className="lg:col-span-5 flex flex-col gap-6">

              {/* Phone and Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {/* Phone Card */}
                <a 
                  href="tel:+917022511122" 
                  className="flex flex-col items-center justify-center p-7 rounded-2xl bg-[var(--cd)] border border-[var(--ln)] shadow-sm hover:border-[var(--ac)]/60 hover:shadow-[0_8px_30px_rgba(255,77,0,0.15)] transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--ac)]/15 flex items-center justify-center text-[var(--ac)] mb-3 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-[13px] font-bold text-[var(--ac)] uppercase tracking-wider mb-1">Phone</span>
                  <span className="text-[var(--fg)] font-semibold text-center text-sm break-all">+91 70225 11122</span>
                </a>

                {/* Email Card */}
                <a 
                  href="mailto:hello@onyt.com" 
                  className="flex flex-col items-center justify-center p-7 rounded-2xl bg-[var(--cd)] border border-[var(--ln)] shadow-sm hover:border-[var(--ac)]/60 hover:shadow-[0_8px_30px_rgba(255,77,0,0.15)] transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--ac)]/15 flex items-center justify-center text-[var(--ac)] mb-3 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-[13px] font-bold text-[var(--ac)] uppercase tracking-wider mb-1">Email</span>
                  <span className="text-[var(--fg)] font-semibold text-center text-sm break-all">hello@onyt.com</span>
                </a>

              </div>

              {/* Address Card */}
              <div className="flex flex-col items-center justify-center p-7 rounded-2xl bg-[var(--cd)] border border-[var(--ln)] shadow-sm hover:border-[var(--ac)]/60 hover:shadow-[0_8px_30px_rgba(255,77,0,0.15)] transition-all duration-300 transform hover:-translate-y-1 group text-center">
                <div className="w-12 h-12 rounded-xl bg-[var(--ac)]/15 flex items-center justify-center text-[var(--ac)] mb-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-[13px] font-bold text-[var(--ac)] uppercase tracking-wider mb-1">Studio</span>
                <span className="text-[var(--fg)] font-semibold text-center text-sm leading-relaxed max-w-sm">
                  ONYT DIGITAL STUDIO
                  <br />
                  #85, Vaibhav Bldg, Gandhi Bazaar, Basavangudi, Bangalore — 560004
                </span>
              </div>

              {/* Map Card */}
              <div className="relative rounded-2xl overflow-hidden border border-[var(--ln)] shadow-sm min-h-[280px] flex-1 w-full group">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Vaibhav+Bldg+Gandhi+Bazaar+Main+Road+Basavangudi+Bangalore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 left-4 z-10 bg-[var(--cd)] text-[var(--fg)] px-3.5 py-2 rounded-lg shadow-md border border-[var(--ln)] text-xs font-bold flex items-center gap-1.5 hover:border-[var(--ac)] transition-all active:scale-[0.97]"
                >
                  Open in Maps
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <iframe
                  src="https://maps.google.com/maps?q=Vaibhav%20Bldg%20Gandhi%20Bazaar%20Main%20Road,%20Basavangudi,%20Bangalore&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 min-h-[280px]"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

            </div>

            {/* Right Column (Form) */}
            <div className="lg:col-span-7 rounded-3xl bg-[var(--cd)] border border-[var(--ln)] p-8 sm:p-10 shadow-lg flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--fg)] font-display">
                    Send Us a Message
                  </h2>
                  <p className="text-sm opacity-70 mt-1">
                    Fill in the details below and our team will get back to you promptly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name* */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-sm font-semibold text-[var(--fg)] flex items-center gap-1">
                      Name <span className="text-[var(--ac)] font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-[var(--ln)] bg-[var(--bg)] px-4 py-3.5 text-sm text-[var(--fg)] placeholder:opacity-40 focus:border-[var(--ac)] focus:ring-2 focus:ring-[var(--ac)]/20 outline-none transition-all duration-200"
                    />
                  </div>

                  {/* Phone* */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-sm font-semibold text-[var(--fg)] flex items-center gap-1">
                      Phone <span className="text-[var(--ac)] font-bold">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formState.phone}
                      onChange={handleChange}
                      placeholder="+91 00000 00000"
                      className="w-full rounded-xl border border-[var(--ln)] bg-[var(--bg)] px-4 py-3.5 text-sm text-[var(--fg)] placeholder:opacity-40 focus:border-[var(--ac)] focus:ring-2 focus:ring-[var(--ac)]/20 outline-none transition-all duration-200"
                    />
                  </div>

                  {/* Email* */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-semibold text-[var(--fg)] flex items-center gap-1">
                      Email <span className="text-[var(--ac)] font-bold">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-[var(--ln)] bg-[var(--bg)] px-4 py-3.5 text-sm text-[var(--fg)] placeholder:opacity-40 focus:border-[var(--ac)] focus:ring-2 focus:ring-[var(--ac)]/20 outline-none transition-all duration-200"
                    />
                  </div>

                  {/* Services that you are looking for:* */}
                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold text-[var(--fg)] flex items-center gap-1">
                        Services that you are looking for <span className="text-[var(--ac)] font-bold">*</span>
                      </label>
                      <span className="text-xs opacity-60 font-medium">Select all that apply</span>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {AVAILABLE_SERVICES.map((service) => {
                        const isSelected = formState.selectedServices.includes(service);
                        return (
                          <button
                            type="button"
                            key={service}
                            onClick={() => toggleService(service)}
                            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer select-none border ${
                              isSelected
                                ? 'bg-[var(--ac)] text-white border-[var(--ac)] shadow-sm scale-[1.02]'
                                : 'bg-[var(--bg)] text-[var(--fg)] border-[var(--ln)] hover:border-[var(--ac)]/40 hover:bg-[var(--cd)]'
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] transition-colors ${
                                isSelected
                                  ? 'bg-white text-[var(--ac)]'
                                  : 'border border-[var(--ln)] bg-[var(--cd)]'
                              }`}
                            >
                              {isSelected && (
                                <svg className="w-2.5 h-2.5 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </span>
                            {service}
                          </button>
                        );
                      })}
                    </div>

                    {/* If "Other" is selected, give a text input for extra clarity */}
                    {formState.selectedServices.includes('Other') && (
                      <div className="pt-2 animate-fadeIn">
                        <input
                          type="text"
                          name="otherServiceText"
                          value={formState.otherServiceText}
                          onChange={handleChange}
                          placeholder="Please specify other service..."
                          className="w-full rounded-xl border border-[var(--ln)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--fg)] placeholder:opacity-40 focus:border-[var(--ac)] focus:ring-2 focus:ring-[var(--ac)]/20 outline-none transition-all duration-200"
                        />
                      </div>
                    )}

                    {/* Validation error if no service is selected */}
                    {serviceError && (
                      <p className="text-xs text-[var(--ac)] font-semibold flex items-center gap-1.5 pt-1">
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Please select at least one service.
                      </p>
                    )}
                  </div>

                  {/* Message* */}
                  <div className="space-y-1.5 pt-1">
                    <label htmlFor="message" className="text-sm font-semibold text-[var(--fg)] flex items-center gap-1">
                      Message <span className="text-[var(--ac)] font-bold">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project, timeline, and goals..."
                      className="w-full rounded-xl border border-[var(--ln)] bg-[var(--bg)] px-4 py-3.5 text-sm text-[var(--fg)] placeholder:opacity-40 focus:border-[var(--ac)] focus:ring-2 focus:ring-[var(--ac)]/20 outline-none transition-all duration-200 resize-none"
                    />
                  </div>

                  <div className="mt-8 space-y-4">
                    {/* Status Indicator */}
                    {submitStatus === 'success' && (
                      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex gap-3 text-emerald-400 text-sm">
                        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <span className="font-bold">Message sent successfully!</span> Thank you for reaching out. We will get back to you shortly.
                        </div>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 flex gap-3 text-rose-400 text-sm">
                        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <span className="font-bold">Submission failed.</span> Please check your connection or try again.
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex justify-center items-center text-center rounded-xl bg-[var(--ac)] hover:bg-[var(--a2)] text-white px-6 py-4 text-[15px] font-bold transition-all duration-200 shadow-[0_4px_20px_rgba(255,77,0,0.25)] hover:shadow-[0_6px_25px_rgba(255,77,0,0.4)] active:scale-[0.99] cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-2 text-current" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <span>Send Message ↗</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
