import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
interface Props {
  branch;
}

export const MerchantProfile = (props: Props) => {
  const {
    branch: { name, logo, description, banner },
  } = props;
  return (
    <Card className="mb-6 overflow-hidden">
      <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
        <Image
          width={100}
          height={100}
          src={banner}
          alt="Restaurant banner"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
          <h2 className="text-2xl font-bold text-white">{name}</h2>
        </div>
      </div>
      <CardContent className="pt-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <Image
                width={100}
                height={100}
                src={logo}
                alt="Restaurant logo"
                className="w-full h-full object-cover border shadow-xl overflow-hidden"
              />
            </div>
          </div>
          <div className="flex-grow">
            <p className="text-base text-gray-600 mb-2">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
