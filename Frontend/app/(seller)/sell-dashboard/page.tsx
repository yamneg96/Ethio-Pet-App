import { getOrders } from "@/lib/actions/order";
import { getPets } from "@/lib/actions/pet";
import SellerDashboardClient from "./SellerDashboardClient";
import { getSession } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

export default async function SellerDashboardPage() {
  const session = await getSession();
  if (!session || session.role !== "seller") redirect("/login");

  const [pets, orders] = await Promise.all([
    getPets({ sellerId: session.id }),
    getOrders({ sellerId: session.id })
  ]);

  return <SellerDashboardClient initialPets={pets} initialOrders={orders} />;
}
