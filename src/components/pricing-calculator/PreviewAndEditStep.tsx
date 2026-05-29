import CampaignTypeSection from './preview/CampaignTypeSection';
import ReachSection from './preview/ReachSection';
import DeliverablesSection from './preview/DeliverablesSection';
import RightsAndUsageSection from './preview/RightsAndUsageSection';
import CustomUsageSection from './preview/CustomUsageSection';

export default function PreviewAndEditStep() {
  return (
    <div className="space-y-10">
      <div className="">
        <h2 className="text-3xl font-semibold text-text-primary mb-1">Preview & Edit</h2>
        <p className="text-lg text-text-secondary">
          Review your quote. Use Edit in any section to update details.
        </p>
      </div>

      {/* Campaign Type */}
      <CampaignTypeSection />

      {/* Your Reach */}
      <ReachSection />

      {/* Deliverables */}
      <DeliverablesSection />

      {/* Rights & Usage */}
      <RightsAndUsageSection />

      {/* Custom Usage Channels */}
      <CustomUsageSection />
    </div>
  );
}
