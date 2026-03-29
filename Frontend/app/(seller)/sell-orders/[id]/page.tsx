import { getOrderById } from "@/lib/actions/order";
import OrderDetailsClient from "@/components/orders/OrderDetailsClient";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/actions/auth";

export default async function SellerOrderDetailsPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session || session.role !== "seller") redirect("/login");

  const order = await getOrderById(params.id);
  if (!order) return notFound();

  return <OrderDetailsClient order={order} role="seller" />;
}
