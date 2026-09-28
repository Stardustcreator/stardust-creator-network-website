Briefs — Public

POST
/briefs/find-a-creator
Create a brief from the public website's Find a Creator form - structurally identical to an admin-created brief

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
"brandName": "Acme Nigeria Ltd",
"contactEmail": "partnerships@acmenigeria.com",
"contactName": "Ngozi Adeyemi",
"budget": 500000000,
"timeline": "Q3 2026",
"campaignBrief": "Looking for micro-influencers in the beauty space to promote our new skincare line ahead of the holiday season.",
"companyWebsite": "https://acmenigeria.com",
"country": "Nigeria",
"industry": "Beauty & Personal Care",
"typeOfBusiness": "SME",
"contactPhone": "+2348012345678",
"marketingOptIn": true,
"campaignName": "Holiday Glow Campaign",
"campaignGoals": [
"Brand Awareness",
"Sales/Conversion"
],
"campaignType": "Sponsored Content",
"targetAudiences": [
"Gen Z (18-24)",
"Millennials (25-35)"
],
"targetMarkets": [
"Nigeria"
],
"preferredCreatorTier": "Micro",
"preferredTiers": [
{
"platform": "Instagram",
"tiers": [
"Micro",
"Mid-Tier"
]
},
{
"platform": "TikTok",
"tiers": [
"Nano"
]
}
],
"creatorCountNeeded": 5,
"intendedPath": "multi-creator",
"creatorGender": "Both",
"creatorAgeRange": "25-34",
"contentCategories": [
"Fashion/Beauty"
],
"platforms": [
"Instagram",
"TikTok"
],
"brandCreatorFit": "We're looking for creators who are authentic, engaging, and align with our brand's playful and inclusive tone.",
"budgetRange": "₦5M – ₦10M",
"paymentModel": "Flat campaign fee",
"ongoingCollaboration": "Yes if ROI is clear",
"campaignStartDate": "2026-08-01",
"campaignDuration": "1 – 3 months",
"deliverables": [
"Social Media Content (Reels, TikToks, Shorts)"
],
"howHeard": "Referral from another brand",
"collaborationType": "One-off Campaign",
"communityInterest": "Maybe",
"additionalNotes": "We'd prefer creators who have previously worked with beauty brands in Nigeria.",
"authorizationConfirmed": true,
"termsAgreed": true,
"locationDetected": "Lagos, Nigeria",
"utmSource": "google",
"utmMedium": "cpc",
"utmCampaign": "q3-2026-find-a-creator",
"referrerUrl": "https://scn.africa/pricing"
}
Responses
Code Description Links
200
Brief saved. Returns the guest token for device-side storage plus routing/pricing signals for the frontend to act on.

Media type

application/json
Controls Accept header.
Example Value
Schema
{
"message": "Brief submitted",
"briefId": "d290f1ee-6c54-4b01-90e6-d701748f0851",
"reference": "SCN-2026-0001",
"guestToken": "9f2c1a7e4b8d3f0a6c5e2b1d8a7f4c3e0b9d6a5c2f1e8b7d4a3c0f9e6d5b2a1c",
"pathTag": "multi-creator",
"nextRoute": "sourcing-tail",
"pricing": {
"requestedCreators": 12,
"sourcingFeeKobo": 1500000,
"engagementFeeKobo": 7500000,
"totalDueNowKobo": 9000000
},
"budget": 500000000,
"budgetMinKobo": 500000000,
"budgetMaxKobo": 1000000000
}
No links
400
Missing/invalid required field (e.g. authorizationConfirmed or termsAgreed not true, country outside the allowed set, or an intendedPath inconsistent with creatorCountNeeded). The brief is not saved.

No links
500
The brief could not be saved (e.g. a database failure) - safe to retry, nothing partial is stored.

No links

POST
/briefs/resume
Resume a website-submitted brief using its guest token - no account required

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
"token": "string"
}
Responses
Code Description Links
200
The brief's current state - status/tag and a live pricing breakdown. No payment link here - see POST /briefs/find-a-creator/pay.

Media type

application/json
Controls Accept header.
Example Value
Schema
{
"id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
"reference": "SCN-2026-0001",
"brandName": "Acme Nigeria Ltd",
"contactName": "Ngozi Adeyemi",
"contactEmail": "partnerships@acmenigeria.com",
"tag": "Awaiting Payment",
"pathTag": "multi-creator",
"nextRoute": "sourcing-tail",
"status": "New",
"source": "Website",
"commitmentFee": {
"status": "InvoiceSent",
"amount": 10500000,
"paidAt": null
},
"pricing": {
"requestedCreators": 12,
"sourcingFeeKobo": 1500000,
"engagementFeeKobo": 7500000,
"totalDueNowKobo": 9000000
},
"budget": 500000000,
"budgetIncomplete": false,
"budgetMinKobo": 500000000,
"budgetMaxKobo": 1000000000,
"budgetRange": "₦5M–₦10M",
"paymentModel": "Flat campaign fee",
"ongoingCollaboration": "Yes if ROI is clear",
"timeline": "Starts 2026-08-01 · 1 – 3 months",
"campaignBrief": "Looking for micro-influencers in the beauty space to promote our new skincare line.",
"campaignName": "Holiday Glow Campaign",
"campaignGoals": [
"Brand Awareness"
],
"campaignType": "Sponsored Content",
"targetAudiences": [
"Gen Z (18-24)"
],
"targetMarkets": [
"Nigeria"
],
"campaignStartDate": "2026-08-01",
"campaignDuration": "1 – 3 months",
"deliverables": [
"Social Media Content (Reels, TikToks, Shorts)"
],
"creatorCountNeeded": 5,
"platforms": [
"Instagram",
"TikTok"
],
"preferredCreatorTier": "Micro",
"preferredTiers": {},
"creatorGender": "Both",
"creatorAgeRange": "25-34",
"contentCategories": [
"Fashion/Beauty"
],
"brandCreatorFit": "We're looking for authentic, engaging creators.",
"companyWebsite": "https://acmenigeria.com",
"country": "Nigeria",
"industry": "Beauty & Personal Care",
"typeOfBusiness": "SME",
"contactPhone": "+2348012345678",
"marketingOptIn": true,
"howHeard": "Referral from another brand",
"collaborationType": "One-off Campaign",
"communityInterest": "Maybe",
"additionalNotes": "Prefer creators who've worked with beauty brands before.",
"authorizationConfirmed": true,
"termsAgreed": true,
"locationDetected": "Lagos, Nigeria",
"utmSource": "google",
"utmMedium": "cpc",
"utmCampaign": "q3-2026-find-a-creator",
"referrerUrl": "https://scn.africa/pricing",
"assignedSourcer": null,
"shortlistCount": 0,
"submittedDate": "2026-08-01T10:00:00.000Z"
}
No links
400
Invalid or expired brief token.

No links

POST
/briefs/find-a-creator/discount-preview
Preview a discount code against a brief's current pricing, before committing to payment

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
"token": "string",
"discountCode": "LAUNCH15"
}
Responses
Code Description Links
200
The discount code is valid - here's the discounted total.

Media type

application/json
Controls Accept header.
Example Value
Schema
{
"discountCodeId": "d290f1ee-6c54-4b01-90e6-d701748f0851",
"code": "LAUNCH15",
"discountType": "Percentage",
"discountValue": 15,
"originalAmount": 9000000,
"discountAmount": 1350000,
"finalAmount": 7650000
}
No links
400
Invalid/expired guest token, invalid or inapplicable discount code (wrong scope, disabled, expired, usage limit reached), or the brief's creator count is outside the configured pricing range.

No links

POST
/briefs/find-a-creator/pay
Collect payer details (and an optional discount code) and initialize the Paystack checkout for a brief's commitment fee

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
"token": "string",
"payerFirstName": "Ngozi",
"payerLastName": "Adeyemi",
"payerEmail": "ngozi@acmenigeria.com",
"discountCode": "LAUNCH15"
}
Responses
Code Description Links
200
Checkout initialized - redirect the brand to paymentUrl.

Media type

application/json
Controls Accept header.
Example Value
Schema
{
"paymentUrl": "https://checkout.paystack.com/abc123"
}
No links
400
Invalid/expired guest token, the brief is already paid, its creator count is outside the configured pricing range, or an invalid/inapplicable discount code.
