import { redirect } from 'next/navigation';

export default function CreatorCommunityJoinRedirect() {
  // Legacy route; redirect to the current creators join page
  redirect('/creators/join');
}
