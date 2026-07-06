import fs from "fs/promises";
import path from "path";
import { PortfolioData, mockPortfolioData } from "./mockData";

const DATA_FILE = path.join(process.cwd(), "src", "lib", "data.json");

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data) as PortfolioData;
  } catch (error) {
    // If the file doesn't exist or is invalid, initialize with mock data
    await savePortfolioData(mockPortfolioData);
    return mockPortfolioData;
  }
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}
