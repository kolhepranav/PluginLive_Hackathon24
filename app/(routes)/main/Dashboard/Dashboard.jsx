import DashboardBoxes from "@/components/DashboardBoxes/DashboardBoxes";
import SalesStats from "@/components/SalesStats/SalesStats";
import TopSellingProducts from "@/components/TopSellingProducts/TopSellingProducts";
import WelcomeRow from "@/components/WelcomeRow/WelcomeRow";
import Image from "next/image";

import Home_page from "../../../../public/assets/imgs/Home_page.png";
const Home_main = Home_page.src;

export default function Dashboard() {


  return (
    <>
       <div className="flex justify-center mt-4">
               <Image
                 src={Home_main}
                 alt="Modi Image"
                 width={1000}
                 height={800}
                 className="object-contain rounded-lg"
               />
             </div>
    </>
  );
}