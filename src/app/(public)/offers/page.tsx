import React from "react";
import special from "@/assets/images/special-offer.png";
import Image from "next/image";
function Offers() {
  return (
    <div className="px-5 w-full flex gap-4 flex-col mt-20">
      {Array.from({ length: 3 }).map((e, index) => (
        <Image
          width={100}
          height={100}
          alt="offers"
          src={special}
          key={index}
          data-index={index}
          className="rounded-lg cursor-pointer lg:max-w-96 w-auto h-auto"
        />
      ))}
    </div>
  );
}

export default Offers;
