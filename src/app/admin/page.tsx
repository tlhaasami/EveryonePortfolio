import { getPortfolioData } from "@/lib/db";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const data = await getPortfolioData();
  return <AdminDashboard initialData={data} />;
}
