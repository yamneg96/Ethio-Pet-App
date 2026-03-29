import { getUsersAction } from "@/lib/actions/user";
import { getPets } from "@/lib/actions/pet";
import AdminDashboardClient from "./AdminDashboardClient";
import { getSession } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session || session.role !== "admin") redirect("/login");

  const [users, pets] = await Promise.all([
    getUsersAction(),
    getPets({})
  ]);

  return <AdminDashboardClient initialUsers={users} initialPets={pets} />;
}
