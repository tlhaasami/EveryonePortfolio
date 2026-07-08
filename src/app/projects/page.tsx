import { getPortfolioData } from "@/lib/db";
import ProjectsListClient from "./ProjectsListClient";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const data = await getPortfolioData();
  return (
    <div className="bg-[#fafafa] min-h-screen text-zinc-900 font-sans">
      <ProjectsListClient data={data} />
    </div>
  );
}
