import { getOrders } from "@/lib/actions/order";
import { getProfile } from "@/lib/actions/user";
import BuyerDashboardClient from "./BuyerDashboardClient";
import { redirect } from "next/navigation";

export default async function BuyerDashboardPage() {
  const [profile, orders] = await Promise.all([
    getProfile(),
    getOrders()
  ]);

  if (!profile) redirect("/login");

  return <BuyerDashboardClient profile={profile} initialOrders={orders} />;
}
