import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MapPin } from "lucide-react";
import type { Regions } from "@/app/admin/manage-regions/_components/regions-table";

function ServiceHighlights({regions}:{regions:Regions[]}) {
  //const regions=["Changanasheryy","Alappuzha","Ernakulam"]
  return (
    <div className="flex justify-center px-2">
      <div>
    <div className="mt-12 md:mt-10 px-4 text-center">
      <h1 className="py-2 md:py-4 text-2xl md:text-4xl font-serif font-extralight italic text-gray-700" id="regions">
        From dream homes to repairs, we’ve got you covered!
      </h1>
      <h1 className="py-5 md:py-8 text-lg md:text-xl font-light italic text-gray-700 tracking-wide drop-shadow-md" >
        Check our service areas—we're expanding for you!
      </h1>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 ">
        {
          regions.map((data,index)=>(
            <LocationCard key={index}>{data.region}</LocationCard>
          ))
        }
      </div>
    </div>
    </div>
  );
}

const LocationCard = ({children}:{children:React.ReactNode}) => {

  return (
    <Card className="w-auto h-auto flex flex-col items-center p-4" >
      <MapPin className="py-2"/>
      <h1 className="text-sm md:text-base italic font-serif">{children}</h1>
    </Card>
  )
}
export default ServiceHighlights;
