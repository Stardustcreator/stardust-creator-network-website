import { redirect } from 'next/navigation';

export default function CreatorCommunityIndexRedirect() {
  // Ensure /creator-community routes to the active creator join page
  redirect('/creators/join');
}
