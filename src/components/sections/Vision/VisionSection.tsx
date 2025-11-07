import NumberedSection from '../NumberedSection/NumberedSection';

export default function VisionSection() {
  return (
    <NumberedSection
      number="04"
      title="Our Vision"
      subtitle="Backed by Experience, Building the Future"
      layout="centered"
      className="bg-gradient-to-br from-neutral-50 to-white"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-lg text-neutral-600 leading-relaxed mb-8">
            Backed by a team that has powered top brands, creators, and media campaigns across the
            globe, SCN is on a mission to build the infrastructure that turns creativity into
            sustainable business.
          </p>
        </div>

        {/* Experience Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-8 bg-white rounded-2xl border border-neutral-200 shadow-sm">
            <div className="text-3xl font-bold text-brand-purple mb-2">10+</div>
            <div className="text-neutral-600 font-medium mb-2">Years Experience</div>
            <div className="text-sm text-neutral-500">Building creator ecosystems</div>
          </div>

          <div className="text-center p-8 bg-white rounded-2xl border border-neutral-200 shadow-sm">
            <div className="text-3xl font-bold text-brand-bright mb-2">500+</div>
            <div className="text-neutral-600 font-medium mb-2">Brands Served</div>
            <div className="text-sm text-neutral-500">Across multiple industries</div>
          </div>

          <div className="text-center p-8 bg-white rounded-2xl border border-neutral-200 shadow-sm">
            <div className="text-3xl font-bold text-brand-violet mb-2">2</div>
            <div className="text-neutral-600 font-medium mb-2">Key Markets</div>
            <div className="text-sm text-neutral-500">Nigeria & UK, expanding globally</div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-brand-purple to-brand-bright rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
          <p className="text-lg opacity-95 leading-relaxed max-w-3xl mx-auto">
            To democratize the creator economy by building the infrastructure that enables every
            creator to turn their passion into sustainable, profitable businesses that scale
            globally.
          </p>
        </div>
      </div>
    </NumberedSection>
  );
}
