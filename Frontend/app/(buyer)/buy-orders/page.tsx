import { getOrders } from "@/lib/actions/order";
import OrdersClient from "./OrdersClient";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/actions/auth";

export default async function BuyerOrdersPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const orders = await getOrders({ buyerId: session.id });
  return <OrdersClient initialOrders={orders} role="buyer" />;
}
