import PortfolioLayout from "@/components/portfolio/PortfolioLayout";
import { getPortfolioData } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getPortfolioData();
  return (
    <div className="bg-zinc-950 min-h-screen">
      <PortfolioLayout data={data} />
    </div>
  );
}
