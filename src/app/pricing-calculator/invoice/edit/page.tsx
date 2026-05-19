'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

function InvoiceEditContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get data from URL params
  const [invoiceData, setInvoiceData] = useState({
    ugcRate: searchParams?.get('ugcRate') || '',
    igReelQty: searchParams?.get('ugcShortVideo') === 'true' ? 5 : 0,
    tiktokQty: searchParams?.get('ugcLongVideo') === 'true' ? 2 : 0,
    photosQty: searchParams?.get('ugcPhotos') === 'true' ? 3 : 0,
    exclusivityMonths: searchParams?.get('exclusivityMonths') || '',
    exclusivityRate: searchParams?.get('exclusivityRate') || '',
    usageDuration: searchParams?.get('usageDuration') || '',
    adsOnPaidSocial: searchParams?.get('adsOnPaidSocial') === 'true',
    emailWebsite: searchParams?.get('emailWebsite') === 'true',
    inStoreBillboards: searchParams?.get('inStoreBillboards') === 'true',
    discountRate: searchParams?.get('discountRate') || '',
    emailAddress: searchParams?.get('emailAddress') || '',
  });

  // Calculate totals
  const calculateContentUsage = () => {
    const baseRate = parseFloat(invoiceData.ugcRate) || 0;
    const igTotal = invoiceData.igReelQty * (baseRate * 0.7);
    const tiktokTotal = invoiceData.tiktokQty * (baseRate * 0.6);
    const photosTotal = invoiceData.photosQty * (baseRate * 0.5);
    return igTotal + tiktokTotal + photosTotal;
  };

  const calculateRightsUsage = () => {
    let total = 0;
    const exclusivity = parseFloat(invoiceData.exclusivityRate) || 0;
    total += exclusivity;

    if (invoiceData.adsOnPaidSocial) total += 20000;
    if (invoiceData.emailWebsite) total += 20000;
    if (invoiceData.inStoreBillboards) total += 40000;

    return total;
  };

  const contentUsageTotal = calculateContentUsage();
  const rightsUsageTotal = calculateRightsUsage();
  const discount = parseFloat(invoiceData.discountRate) || 0;
  const grandTotal = contentUsageTotal + rightsUsageTotal - discount;

  const handleSendToEmail = () => {
    // In production, call API to send email here
    console.log('Sending invoice to:', invoiceData.emailAddress);

    // Redirect to success page
    router.push('/pricing-calculator/success');
  };

  return (
    <>
      <Header variant="light" />

      <main className="min-h-screen bg-white pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Top Label */}
          <div className="mb-8">
            <span className="inline-block px-4 py-1.5 bg-gray-800 text-white text-xs font-medium rounded-full">
              Rate card Invoice - Edit Mode
            </span>
          </div>

          {/* Header */}
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Edit Your Invoice</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Adjust quantities, rates, and other details below. Changes will update the totals in
              real-time.
            </p>
          </div>

          {/* Editable Invoice Panel */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
              {/* Invoice Header */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-8 text-white">
                <div className="flex items-center justify-between mb-4">
                  <Image
                    src="/logos/scn logo white.png"
                    alt="Stardust"
                    width={120}
                    height={40}
                    className="h-8 w-auto"
                  />
                </div>
                <h1 className="text-2xl font-bold mb-1">Brand Deal Rate Card</h1>
                <p className="text-purple-100 text-sm">
                  Date:{' '}
                  {new Date().toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>

              {/* Invoice Content */}
              <div className="p-8">
                {/* Content Deliverables */}
                <div className="mb-8">
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                    Content Deliverables
                  </h2>
                  <div className="space-y-3">
                    <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 pb-2 border-b">
                      <div className="col-span-6">Deliverable/Item</div>
                      <div className="col-span-3 text-center">Qty</div>
                      <div className="col-span-3 text-right">Line Total</div>
                    </div>

                    {invoiceData.igReelQty > 0 && (
                      <div className="grid grid-cols-12 gap-4 items-center text-sm">
                        <div className="col-span-6 text-gray-900">IG Reel</div>
                        <div className="col-span-3 text-center">
                          <input
                            type="number"
                            value={invoiceData.igReelQty}
                            onChange={e =>
                              setInvoiceData({
                                ...invoiceData,
                                igReelQty: parseInt(e.target.value) || 0,
                              })
                            }
                            className="w-16 px-2 py-1 text-center text-gray-900 font-medium border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div className="col-span-3 text-right font-medium">
                          ₦
                          {(
                            invoiceData.igReelQty *
                            (parseFloat(invoiceData.ugcRate) || 0) *
                            0.7
                          ).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    )}

                    {invoiceData.tiktokQty > 0 && (
                      <div className="grid grid-cols-12 gap-4 items-center text-sm">
                        <div className="col-span-6 text-gray-900">TikTok Video</div>
                        <div className="col-span-3 text-center">
                          <input
                            type="number"
                            value={invoiceData.tiktokQty}
                            onChange={e =>
                              setInvoiceData({
                                ...invoiceData,
                                tiktokQty: parseInt(e.target.value) || 0,
                              })
                            }
                            className="w-16 px-2 py-1 text-center text-gray-900 font-medium border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div className="col-span-3 text-right font-medium">
                          ₦
                          {(
                            invoiceData.tiktokQty *
                            (parseFloat(invoiceData.ugcRate) || 0) *
                            0.6
                          ).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    )}

                    {invoiceData.photosQty > 0 && (
                      <div className="grid grid-cols-12 gap-4 items-center text-sm">
                        <div className="col-span-6 text-gray-900">Photos</div>
                        <div className="col-span-3 text-center">
                          <input
                            type="number"
                            value={invoiceData.photosQty}
                            onChange={e =>
                              setInvoiceData({
                                ...invoiceData,
                                photosQty: parseInt(e.target.value) || 0,
                              })
                            }
                            className="w-16 px-2 py-1 text-center text-gray-900 font-medium border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div className="col-span-3 text-right font-medium">
                          ₦
                          {(
                            invoiceData.photosQty *
                            (parseFloat(invoiceData.ugcRate) || 0) *
                            0.5
                          ).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Rights & Usage */}
                <div className="mb-8">
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                    Rights & Usage
                  </h2>
                  <div className="space-y-2">
                    {invoiceData.exclusivityMonths && (
                      <div className="bg-amber-50 px-4 py-3 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm">
                        <span className="text-gray-900">
                          Exclusivity - {invoiceData.exclusivityMonths} months, no competitor
                          content @ 20%
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">₦</span>
                          <input
                            type="text"
                            value={invoiceData.exclusivityRate}
                            onChange={e =>
                              setInvoiceData({
                                ...invoiceData,
                                exclusivityRate: e.target.value.replace(/[^0-9]/g, ''),
                              })
                            }
                            className="w-32 px-3 py-1 text-right text-gray-900 font-medium border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                    )}

                    {invoiceData.adsOnPaidSocial && (
                      <div className="bg-amber-50 px-4 py-3 rounded flex justify-between items-center text-sm">
                        <span className="text-gray-900">
                          Instagram Ad Usage - 3-month licensing @ 25%
                        </span>
                        <span className="font-medium">₦20,000.00</span>
                      </div>
                    )}

                    {invoiceData.emailWebsite && (
                      <div className="bg-amber-50 px-4 py-3 rounded flex justify-between items-center text-sm">
                        <span className="text-gray-900">Email/Website Usage</span>
                        <span className="font-medium">₦20,000.00</span>
                      </div>
                    )}

                    {invoiceData.inStoreBillboards && (
                      <div className="bg-amber-50 px-4 py-3 rounded flex justify-between items-center text-sm">
                        <span className="text-gray-900">In-Store/Billboards Usage</span>
                        <span className="font-medium">₦40,000.00</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Discount (if applicable) */}
                {discount > 0 && (
                  <div className="mb-8">
                    <div className="bg-green-50 px-4 py-3 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm">
                      <span className="text-gray-900 font-medium">Discount Applied</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">₦</span>
                        <input
                          type="text"
                          value={invoiceData.discountRate}
                          onChange={e =>
                            setInvoiceData({
                              ...invoiceData,
                              discountRate: e.target.value.replace(/[^0-9]/g, ''),
                            })
                          }
                          className="w-32 px-3 py-1 text-right text-gray-900 font-medium border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Investment Summary */}
                <div className="border-t pt-6">
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                    Investment Summary
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Content Usage</span>
                      <span className="font-medium text-gray-900">
                        ₦{contentUsageTotal.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rights & Usage Add-ons</span>
                      <span className="font-medium text-gray-900">
                        ₦{rightsUsageTotal.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Discount</span>
                        <span className="font-medium text-red-600">
                          -₦{discount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    )}
                    <div className="bg-purple-600 text-white px-4 py-4 rounded-lg mt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total Investment</span>
                        <span className="text-xl font-bold">
                          ₦{grandTotal.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Address */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Send invoice to:
                  </label>
                  <input
                    type="email"
                    value={invoiceData.emailAddress}
                    onChange={e => setInvoiceData({ ...invoiceData, emailAddress: e.target.value })}
                    className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => router.back()}
                    className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    ← Back to Preview
                  </button>
                  <button
                    onClick={handleSendToEmail}
                    className="flex-1 px-6 py-3 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Send to Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function InvoiceEditPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-gray-900 text-lg">Loading invoice editor...</div>
        </div>
      }
    >
      <InvoiceEditContent />
    </Suspense>
  );
}
