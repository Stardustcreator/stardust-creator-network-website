import { redirect } from 'next/navigation';

export default function CommunityWaitlistRedirect() {
  // Redirect waitlist requests to the creators join page for now
  redirect('/creators/join');
}
