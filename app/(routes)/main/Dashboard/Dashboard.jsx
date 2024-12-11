import DashboardBoxes from "@/components/DashboardBoxes/DashboardBoxes";
import SalesStats from "@/components/SalesStats/SalesStats";
import TopSellingProducts from "@/components/TopSellingProducts/TopSellingProducts";
import WelcomeRow from "@/components/WelcomeRow/WelcomeRow";

export default function Dashboard() {
  return (
    <>
      <WelcomeRow />
      <div className="md:flex gap-10">
        <div className="md:w-8/12 grow">
          <DashboardBoxes />
          <SalesStats />
        </div>
        <div className="md:w-4/12 grow">
          <TopSellingProducts />
        </div>
      </div>
    </>
  );
}