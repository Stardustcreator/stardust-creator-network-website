'use client';

import { useEffect, useState } from 'react';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Lazily constructed so this never runs during `next build`'s static
// prerendering pass (Node, no browser env available) - only inside
// useEffect/handlers below, which execute in the browser. Mirrors the
// lazy-init pattern in src/lib/supabase.ts.
let cachedClient: SupabaseClient | null = null;
function getSupabase(): SupabaseClient {
  if (!cachedClient) {
    cachedClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return cachedClient;
}

type PageType =
  | 'homepage'
  | 'who-we-are'
  | 'creator-os'
  | 'find-creators'
  | 'pricing'
  | 'blog'
  | 'case-studies'
  | 'terms-conditions'
  | 'signin';

interface PageData {
  id: string;
  slug: PageType;
  title: string;
  description: string;
  content: any;
  created_at: string;
  updated_at: string;
}

export default function CmsPage() {
  const [currentPage, setCurrentPage] = useState<PageType>('homepage');
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const pages: { slug: PageType; label: string }[] = [
    { slug: 'homepage', label: 'Homepage' },
    { slug: 'who-we-are', label: 'Who We Are' },
    { slug: 'creator-os', label: 'Creator OS' },
    { slug: 'find-creators', label: 'Find Creators' },
    { slug: 'blog', label: 'Blog' },
    { slug: 'case-studies', label: 'Case Studies' },
    { slug: 'terms-conditions', label: 'Terms & Conditions' },
    { slug: 'signin', label: 'Sign In' },
  ];

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      setErrorMessage('');
      try {
        const { data, error } = await getSupabase()
          .from('pages')
          .select('*')
          .eq('slug', currentPage)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            const { data: newPage, error: insertError } = await getSupabase()
              .from('pages')
              .insert({
                slug: currentPage,
                title: currentPage.replace('-', ' ').toUpperCase(),
                description: '',
                content: {},
                page_type: currentPage,
              })
              .select()
              .single();

            if (insertError) {
              setErrorMessage('Error creating page: ' + insertError.message);
            } else {
              setPageData(newPage);
            }
          } else {
            setErrorMessage('Error: ' + error.message);
          }
        } else if (data) {
          setPageData(data);
        }
      } catch (error) {
        setErrorMessage(
          'Unexpected error: ' + (error instanceof Error ? error.message : 'Unknown')
        );
      }
      setLoading(false);
    };

    fetchPageData();
  }, [currentPage]);

  const handleUpdate = (field: string, value: any) => {
    if (pageData) {
      setPageData({ ...pageData, [field]: value });
    }
  };

  const handleContentUpdate = (field: string, value: any) => {
    if (pageData) {
      setPageData({
        ...pageData,
        content: { ...pageData.content, [field]: value },
      });
    }
  };

  const handleSave = async () => {
    if (!pageData) return;
    setSaving(true);
    setErrorMessage('');

    try {
      const { error } = await getSupabase()
        .from('pages')
        .update({
          title: pageData.title,
          description: pageData.description,
          content: pageData.content,
          updated_at: new Date().toISOString(),
        })
        .eq('slug', currentPage);

      if (error) {
        setErrorMessage('Error: ' + error.message);
      } else {
        setSuccessMessage('✓ Saved!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      setErrorMessage('Save error: ' + (error instanceof Error ? error.message : 'Unknown'));
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mb-4"></div>
          <p className="text-gray-300">Loading page...</p>
        </div>
      </div>
    );
  }

  if (errorMessage && !pageData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
        <div className="bg-gray-800 border border-red-600 rounded-lg p-6 max-w-md">
          <h2 className="text-red-500 font-bold text-lg mb-2">Error Loading Page</h2>
          <p className="text-gray-300 mb-4">{errorMessage}</p>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return <div className="p-8 bg-gray-900 text-white">No page data found</div>;
  }

  return (
    <div className="flex bg-gray-900 min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 min-h-screen p-6 overflow-y-auto">
        <h2 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wide">Pages</h2>
        <div className="space-y-2">
          {pages.map(page => (
            <button
              key={page.slug}
              onClick={() => setCurrentPage(page.slug)}
              className={`w-full text-left px-4 py-3 rounded-lg transition font-medium text-sm ${
                currentPage === page.slug
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              {page.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1">
        {/* Top Bar */}
        <div className="bg-gray-800 border-b border-gray-700 p-6 sticky top-16 z-40">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">
                {pages.find(p => p.slug === currentPage)?.label}
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {pageData.updated_at
                  ? new Date(pageData.updated_at).toLocaleDateString()
                  : 'Never updated'}
              </p>
            </div>
            {successMessage && (
              <div className="bg-green-900 text-green-200 px-4 py-2 rounded-lg">
                {successMessage}
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <div className="p-6 max-w-4xl overflow-y-auto max-h-[calc(100vh-150px)]">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 space-y-6">
            {errorMessage && (
              <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-sm">
                {errorMessage}
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Page Title</label>
              <input
                type="text"
                value={pageData.title}
                onChange={e => handleUpdate('title', e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Description (SEO)
              </label>
              <textarea
                value={pageData.description}
                onChange={e => handleUpdate('description', e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 h-24 resize-none"
              />
            </div>

            {/* HOMEPAGE */}
            {currentPage === 'homepage' && (
              <div className="space-y-6 border-t border-gray-700 pt-6">
                <h3 className="font-bold text-white text-lg">Hero Section</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Hero Title
                  </label>
                  <input
                    type="text"
                    value={pageData.content.heroTitle || ''}
                    onChange={e => handleContentUpdate('heroTitle', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Hero Subtitle
                  </label>
                  <textarea
                    value={pageData.content.heroSubtitle || ''}
                    onChange={e => handleContentUpdate('heroSubtitle', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Hero CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={pageData.content.heroButton || ''}
                    onChange={e => handleContentUpdate('heroButton', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <h3 className="font-bold text-white text-lg mt-6">Features Section</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Features Title
                  </label>
                  <input
                    type="text"
                    value={pageData.content.featuresTitle || ''}
                    onChange={e => handleContentUpdate('featuresTitle', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Features Subtitle
                  </label>
                  <textarea
                    value={pageData.content.featuresSubtitle || ''}
                    onChange={e => handleContentUpdate('featuresSubtitle', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 h-16 resize-none"
                  />
                </div>

                <h3 className="font-bold text-white text-lg mt-6">How SCN Helps</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Learn Title & Description
                  </label>
                  <textarea
                    value={pageData.content.learnContent || ''}
                    onChange={e => handleContentUpdate('learnContent', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 h-16 resize-none"
                    placeholder="Title | Description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Build Title & Description
                  </label>
                  <textarea
                    value={pageData.content.buildContent || ''}
                    onChange={e => handleContentUpdate('buildContent', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 h-16 resize-none"
                    placeholder="Title | Description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Earn Title & Description
                  </label>
                  <textarea
                    value={pageData.content.earnContent || ''}
                    onChange={e => handleContentUpdate('earnContent', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 h-16 resize-none"
                    placeholder="Title | Description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Grow Title & Description
                  </label>
                  <textarea
                    value={pageData.content.growContent || ''}
                    onChange={e => handleContentUpdate('growContent', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 h-16 resize-none"
                    placeholder="Title | Description"
                  />
                </div>

                <h3 className="font-bold text-white text-lg mt-6">Testimonials Section</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Testimonials Title
                  </label>
                  <input
                    type="text"
                    value={pageData.content.testimonialsTitle || ''}
                    onChange={e => handleContentUpdate('testimonialsTitle', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Testimonials
                  </label>
                  <div className="space-y-4">
                    {(pageData.content.testimonials || []).map((testimonial, index) => (
                      <div
                        key={index}
                        className="bg-gray-700 p-4 rounded-lg border border-gray-600"
                      >
                        <div className="mb-3">
                          <label className="block text-xs font-semibold text-gray-300 mb-2">
                            Quote {index + 1}
                          </label>
                          <textarea
                            value={testimonial.quote || ''}
                            onChange={e => {
                              const updatedTestimonials = [
                                ...(pageData.content.testimonials || []),
                              ];
                              updatedTestimonials[index].quote = e.target.value;
                              handleContentUpdate('testimonials', updatedTestimonials);
                            }}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:ring-2 focus:ring-purple-500 h-16 resize-none"
                            placeholder="Enter quote"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-2">
                            Author {index + 1}
                          </label>
                          <input
                            type="text"
                            value={testimonial.author || ''}
                            onChange={e => {
                              const updatedTestimonials = [
                                ...(pageData.content.testimonials || []),
                              ];
                              updatedTestimonials[index].author = e.target.value;
                              handleContentUpdate('testimonials', updatedTestimonials);
                            }}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter author name"
                          />
                        </div>
                        <button
                          onClick={() => {
                            const updatedTestimonials = (
                              pageData.content.testimonials || []
                            ).filter((_, i) => i !== index);
                            handleContentUpdate('testimonials', updatedTestimonials);
                          }}
                          className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                        >
                          Delete Testimonial
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const updatedTestimonials = [
                          ...(pageData.content.testimonials || []),
                          { quote: '', author: '' },
                        ];
                        handleContentUpdate('testimonials', updatedTestimonials);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                    >
                      + Add New Testimonial
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-white text-lg mt-6">What Changes Section</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    What Changes Title
                  </label>
                  <input
                    type="text"
                    value={pageData.content.changesTitle || ''}
                    onChange={e => handleContentUpdate('changesTitle', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Changes (JSON format - before/after pairs)
                  </label>
                  <textarea
                    value={JSON.stringify(pageData.content.changes || [], null, 2)}
                    onChange={e => {
                      try {
                        const changes = JSON.parse(e.target.value);
                        handleContentUpdate('changes', changes);
                      } catch {}
                    }}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 h-32 resize-none font-mono text-xs"
                  />
                </div>

                <h3 className="font-bold text-white text-lg mt-6">FAQ Section</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    FAQ Title
                  </label>
                  <input
                    type="text"
                    value={pageData.content.faqTitle || ''}
                    onChange={e => handleContentUpdate('faqTitle', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">FAQs</label>
                  <div className="space-y-4">
                    {(pageData.content.faqs || []).map((faq, index) => (
                      <div
                        key={index}
                        className="bg-gray-700 p-4 rounded-lg border border-gray-600"
                      >
                        <div className="mb-3">
                          <label className="block text-xs font-semibold text-gray-300 mb-2">
                            Question {index + 1}
                          </label>
                          <input
                            type="text"
                            value={faq.question || ''}
                            onChange={e => {
                              const updatedFaqs = [...(pageData.content.faqs || [])];
                              updatedFaqs[index].question = e.target.value;
                              handleContentUpdate('faqs', updatedFaqs);
                            }}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter question"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-2">
                            Answer {index + 1}
                          </label>
                          <textarea
                            value={faq.answer || ''}
                            onChange={e => {
                              const updatedFaqs = [...(pageData.content.faqs || [])];
                              updatedFaqs[index].answer = e.target.value;
                              handleContentUpdate('faqs', updatedFaqs);
                            }}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                            placeholder="Enter answer"
                          />
                        </div>
                        <button
                          onClick={() => {
                            const updatedFaqs = (pageData.content.faqs || []).filter(
                              (_, i) => i !== index
                            );
                            handleContentUpdate('faqs', updatedFaqs);
                          }}
                          className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                        >
                          Delete FAQ
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const updatedFaqs = [
                          ...(pageData.content.faqs || []),
                          { question: '', answer: '' },
                        ];
                        handleContentUpdate('faqs', updatedFaqs);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                    >
                      + Add New FAQ
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-white text-lg mt-6">Final CTA Section</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Final CTA Title
                  </label>
                  <input
                    type="text"
                    value={pageData.content.finalCtaTitle || ''}
                    onChange={e => handleContentUpdate('finalCtaTitle', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Final CTA Description
                  </label>
                  <textarea
                    value={pageData.content.finalCtaDescription || ''}
                    onChange={e => handleContentUpdate('finalCtaDescription', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Final CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={pageData.content.finalCtaButton || ''}
                    onChange={e => handleContentUpdate('finalCtaButton', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            )}

            {/* WHO WE ARE */}
            {currentPage === 'who-we-are' && (
              <div className="space-y-6 border-t border-gray-700 pt-6">
                <h3 className="font-bold text-white text-lg">Hero Section</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Hero Title
                  </label>
                  <input
                    type="text"
                    value={pageData.content.heroTitle || ''}
                    onChange={e => handleContentUpdate('heroTitle', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Hero Subtitle
                  </label>
                  <textarea
                    value={pageData.content.heroSubtitle || ''}
                    onChange={e => handleContentUpdate('heroSubtitle', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                  />
                </div>

                <h3 className="font-bold text-white text-lg mt-6">About Section</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    About Content
                  </label>
                  <textarea
                    value={pageData.content.aboutContent || ''}
                    onChange={e => handleContentUpdate('aboutContent', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 h-24 resize-none"
                  />
                </div>

                <h3 className="font-bold text-white text-lg mt-6">Problem Section</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Problem Content
                  </label>
                  <textarea
                    value={pageData.content.problemContent || ''}
                    onChange={e => handleContentUpdate('problemContent', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 h-32 resize-none"
                  />
                </div>

                <h3 className="font-bold text-white text-lg mt-6">Building Section</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Building Content
                  </label>
                  <textarea
                    value={pageData.content.buildingContent || ''}
                    onChange={e => handleContentUpdate('buildingContent', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 h-32 resize-none"
                  />
                </div>

                <h3 className="font-bold text-white text-lg mt-6">Final CTA</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Final CTA Title
                  </label>
                  <input
                    type="text"
                    value={pageData.content.finalCtaTitle || ''}
                    onChange={e => handleContentUpdate('finalCtaTitle', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Final CTA Description
                  </label>
                  <textarea
                    value={pageData.content.finalCtaDescription || ''}
                    onChange={e => handleContentUpdate('finalCtaDescription', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                  />
                </div>
              </div>
            )}

            {/* CREATOR OS */}
            {currentPage === 'creator-os' && (
              <div className="space-y-6 border-t border-gray-700 pt-6">
                <h3 className="font-bold text-white text-lg">Hero Section</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Hero Title
                  </label>
                  <input
                    type="text"
                    value={pageData.content.heroTitle || ''}
                    onChange={e => handleContentUpdate('heroTitle', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Hero Subtitle
                  </label>
                  <textarea
                    value={pageData.content.heroSubtitle || ''}
                    onChange={e => handleContentUpdate('heroSubtitle', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Hero CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={pageData.content.heroButton || ''}
                    onChange={e => handleContentUpdate('heroButton', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <h3 className="font-bold text-white text-lg mt-6">Features</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Features (JSON format)
                  </label>
                  <textarea
                    value={JSON.stringify(pageData.content.features || [], null, 2)}
                    onChange={e => {
                      try {
                        const features = JSON.parse(e.target.value);
                        handleContentUpdate('features', features);
                      } catch {}
                    }}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 h-40 resize-none font-mono text-xs"
                  />
                </div>

                <h3 className="font-bold text-white text-lg mt-6">Final CTA</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Final CTA Title
                  </label>
                  <input
                    type="text"
                    value={pageData.content.finalCtaTitle || ''}
                    onChange={e => handleContentUpdate('finalCtaTitle', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            )}

            {/* FIND CREATORS */}
            {currentPage === 'find-creators' && (
              <div className="space-y-6 border-t border-gray-700 pt-6">
                <h3 className="font-bold text-white text-lg">Hero Section</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Hero Title
                  </label>
                  <input
                    type="text"
                    value={pageData.content.heroTitle || ''}
                    onChange={e => handleContentUpdate('heroTitle', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Hero Subtitle
                  </label>
                  <textarea
                    value={pageData.content.heroSubtitle || ''}
                    onChange={e => handleContentUpdate('heroSubtitle', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                  />
                </div>

                <h3 className="font-bold text-white text-lg mt-6">Process Steps</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Process Steps (JSON format)
                  </label>
                  <textarea
                    value={JSON.stringify(pageData.content.processSteps || [], null, 2)}
                    onChange={e => {
                      try {
                        const processSteps = JSON.parse(e.target.value);
                        handleContentUpdate('processSteps', processSteps);
                      } catch {}
                    }}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 h-40 resize-none font-mono text-xs"
                  />
                </div>

                <h3 className="font-bold text-white text-lg mt-6">Case Studies</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Case Studies (JSON format)
                  </label>
                  <textarea
                    value={JSON.stringify(pageData.content.caseStudies || [], null, 2)}
                    onChange={e => {
                      try {
                        const caseStudies = JSON.parse(e.target.value);
                        handleContentUpdate('caseStudies', caseStudies);
                      } catch {}
                    }}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 h-40 resize-none font-mono text-xs"
                  />
                </div>

                <h3 className="font-bold text-white text-lg mt-6">Final CTA</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Final CTA Title
                  </label>
                  <input
                    type="text"
                    value={pageData.content.finalCtaTitle || ''}
                    onChange={e => handleContentUpdate('finalCtaTitle', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            )}

            {/* BLOG */}
            {currentPage === 'blog' && (
              <div className="space-y-6 border-t border-gray-700 pt-6">
                <h3 className="font-bold text-white text-lg">Hero Section</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Hero Title
                  </label>
                  <input
                    type="text"
                    value={pageData.content.heroTitle || ''}
                    onChange={e => handleContentUpdate('heroTitle', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Hero Subtitle
                  </label>
                  <textarea
                    value={pageData.content.heroSubtitle || ''}
                    onChange={e => handleContentUpdate('heroSubtitle', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                  />
                </div>
              </div>
            )}

            {/* CASE STUDIES */}
            {currentPage === 'case-studies' && (
              <div className="space-y-6 border-t border-gray-700 pt-6">
                <h3 className="font-bold text-white text-lg">Hero Section</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Hero Title
                  </label>
                  <input
                    type="text"
                    value={pageData.content.heroTitle || ''}
                    onChange={e => handleContentUpdate('heroTitle', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Hero Description
                  </label>
                  <textarea
                    value={pageData.content.heroDescription || ''}
                    onChange={e => handleContentUpdate('heroDescription', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                  />
                </div>

                <h3 className="font-bold text-white text-lg mt-6">Stats</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Stats (JSON format)
                  </label>
                  <textarea
                    value={JSON.stringify(pageData.content.stats || [], null, 2)}
                    onChange={e => {
                      try {
                        const stats = JSON.parse(e.target.value);
                        handleContentUpdate('stats', stats);
                      } catch {}
                    }}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 h-24 resize-none font-mono text-xs"
                  />
                </div>

                <h3 className="font-bold text-white text-lg mt-6">Case Studies</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Case Studies (JSON format)
                  </label>
                  <textarea
                    value={JSON.stringify(pageData.content.caseStudies || [], null, 2)}
                    onChange={e => {
                      try {
                        const caseStudies = JSON.parse(e.target.value);
                        handleContentUpdate('caseStudies', caseStudies);
                      } catch {}
                    }}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 h-40 resize-none font-mono text-xs"
                  />
                </div>

                <h3 className="font-bold text-white text-lg mt-6">Final CTA</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Final CTA Title
                  </label>
                  <input
                    type="text"
                    value={pageData.content.finalCtaTitle || ''}
                    onChange={e => handleContentUpdate('finalCtaTitle', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            )}

            {/* TERMS & CONDITIONS */}
            {currentPage === 'terms-conditions' && (
              <div className="space-y-6 border-t border-gray-700 pt-6">
                <h3 className="font-bold text-white text-lg">Terms Content</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Full Terms & Conditions
                  </label>
                  <textarea
                    value={pageData.content.fullContent || ''}
                    onChange={e => handleContentUpdate('fullContent', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 h-64 resize-none"
                  />
                </div>
              </div>
            )}

            {/* SIGN IN */}
            {currentPage === 'signin' && (
              <div className="space-y-6 border-t border-gray-700 pt-6">
                <h3 className="font-bold text-white text-lg">Promo Banner</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Promo Text
                  </label>
                  <input
                    type="text"
                    value={pageData.content.promoText || ''}
                    onChange={e => handleContentUpdate('promoText', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <h3 className="font-bold text-white text-lg mt-6">Pricing Plans</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Pricing Plans
                  </label>
                  <div className="space-y-6">
                    {(pageData.content.pricingPlans || []).map((plan, planIndex) => (
                      <div
                        key={planIndex}
                        className="bg-gray-700 p-6 rounded-lg border border-gray-600"
                      >
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-xs font-semibold text-gray-300 mb-2">
                              Plan Name
                            </label>
                            <input
                              type="text"
                              value={plan.name || ''}
                              onChange={e => {
                                const updatedPlans = [...(pageData.content.pricingPlans || [])];
                                updatedPlans[planIndex].name = e.target.value;
                                handleContentUpdate('pricingPlans', updatedPlans);
                              }}
                              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:ring-2 focus:ring-purple-500"
                              placeholder="e.g., Starter"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-300 mb-2">
                              Price
                            </label>
                            <input
                              type="text"
                              value={plan.price || ''}
                              onChange={e => {
                                const updatedPlans = [...(pageData.content.pricingPlans || [])];
                                updatedPlans[planIndex].price = e.target.value;
                                handleContentUpdate('pricingPlans', updatedPlans);
                              }}
                              className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:ring-2 focus:ring-purple-500"
                              placeholder="e.g., ₦0"
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="block text-xs font-semibold text-gray-300 mb-2">
                            Billing Period
                          </label>
                          <input
                            type="text"
                            value={plan.billing || ''}
                            onChange={e => {
                              const updatedPlans = [...(pageData.content.pricingPlans || [])];
                              updatedPlans[planIndex].billing = e.target.value;
                              handleContentUpdate('pricingPlans', updatedPlans);
                            }}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:ring-2 focus:ring-purple-500"
                            placeholder="e.g., /month - Free Forever"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-xs font-semibold text-gray-300 mb-2">
                            CTA Button Text
                          </label>
                          <input
                            type="text"
                            value={plan.cta || ''}
                            onChange={e => {
                              const updatedPlans = [...(pageData.content.pricingPlans || [])];
                              updatedPlans[planIndex].cta = e.target.value;
                              handleContentUpdate('pricingPlans', updatedPlans);
                            }}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:ring-2 focus:ring-purple-500"
                            placeholder="e.g., Get Started"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-xs font-semibold text-gray-300 mb-2">
                            <input
                              type="checkbox"
                              checked={plan.recommended || false}
                              onChange={e => {
                                const updatedPlans = [...(pageData.content.pricingPlans || [])];
                                updatedPlans[planIndex].recommended = e.target.checked;
                                handleContentUpdate('pricingPlans', updatedPlans);
                              }}
                              className="mr-2"
                            />
                            Recommended Plan?
                          </label>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-2">
                            Features (one per line)
                          </label>
                          <textarea
                            value={(plan.features || []).join('\n')}
                            onChange={e => {
                              const updatedPlans = [...(pageData.content.pricingPlans || [])];
                              updatedPlans[planIndex].features = e.target.value
                                .split('\n')
                                .filter(f => f.trim());
                              handleContentUpdate('pricingPlans', updatedPlans);
                            }}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:ring-2 focus:ring-purple-500 h-20 resize-none"
                            placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                          />
                        </div>
                        <button
                          onClick={() => {
                            const updatedPlans = (pageData.content.pricingPlans || []).filter(
                              (_, i) => i !== planIndex
                            );
                            handleContentUpdate('pricingPlans', updatedPlans);
                          }}
                          className="mt-3 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                        >
                          Delete Plan
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const updatedPlans = [
                          ...(pageData.content.pricingPlans || []),
                          {
                            name: '',
                            price: '',
                            billing: '',
                            cta: '',
                            recommended: false,
                            features: [],
                          },
                        ];
                        handleContentUpdate('pricingPlans', updatedPlans);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                    >
                      + Add New Pricing Plan
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="pt-6 border-t border-gray-700">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-600 transition"
              >
                {saving ? 'Saving...' : '💾 Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
