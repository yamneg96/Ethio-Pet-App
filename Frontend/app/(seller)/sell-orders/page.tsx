import { getOrders } from "@/lib/actions/order";
import OrdersClient from "@/components/orders/OrdersClient";
 
import { redirect } from "next/navigation";
import { getSession } from "@/lib/actions/auth";

export default async function SellerOrdersPage() {
  const session = await getSession();
  if (!session || session.role !== "seller") redirect("/login");

  const orders = await getOrders({ sellerId: session.id });
  return <OrdersClient initialOrders={orders} role="seller" />;
}
