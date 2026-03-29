import { getProfile } from "@/lib/actions/user";
import ProfileForm from "@/app/buyer/profile/ProfileForm"; 
import { redirect } from "next/navigation";

export default async function SellerProfilePage() {
  const profile = await getProfile();
  if (!profile) redirect("/login");

  return <ProfileForm profile={profile} role="seller" />;
}
