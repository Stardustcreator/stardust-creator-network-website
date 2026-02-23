import { redirect } from 'next/navigation';

export default function BrandsIndexRedirect() {
  // Redirect the old /brands index to the case studies listing
  redirect('/case-studies');
}
