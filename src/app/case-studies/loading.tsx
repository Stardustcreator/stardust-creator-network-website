import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

export default function CaseStudiesLoading() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="min-h-screen bg-black"
      >
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
            <p className="text-white/60">Loading case studies...</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
