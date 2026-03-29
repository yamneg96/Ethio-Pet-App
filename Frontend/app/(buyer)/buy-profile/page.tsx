import { getProfile } from "@/lib/actions/user";
import ProfileForm from "./ProfileForm";
import { redirect } from "next/navigation";

export default async function BuyerProfilePage() {
  const profile = await getProfile();
  if (!profile) redirect("/login");

  return <ProfileForm profile={profile} role="buyer" />;
}
