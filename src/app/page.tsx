import PortfolioLayout from "@/components/portfolio/PortfolioLayout";
import { mockPortfolioData } from "@/lib/mockData";

export default function Home() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <PortfolioLayout data={mockPortfolioData} />
    </div>
  );
}
