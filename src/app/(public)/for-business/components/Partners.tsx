import React from 'react';
import Image from 'next/image';

export default function Partners() {
  return (
    <div className="bg-black text-white py-16 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start">
        <div className="mb-10 md:mb-0 md:w-1/3">
          <div className="relative">
            <div className="w-8 h-1 bg-[#9c021f] mb-4"></div>
            <h2 className="text-4xl font-bold leading-tight mb-4">
              ХАМТРAH
              <br />
              АЖИЛЛАДАГ
              <br />
              БАЙГУУЛЛАГУУД
            </h2>
            <p className="text-sm mt-6">
              БЗД, 26-р хороо, Royal Plaza
              <br />
              оффис центр 2 давхар 206
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-10">
          {/* First column */}
          <div className="flex flex-col gap-10">
            <div className="h-24">
              <Image
                src="./partners/partner1.svg"
                alt="partner1"
                width={200}
                height={60}
                className="object-contain h-full w-full"
              />
            </div>
            <div className="h-24">
              <Image
                src="./partners/partner2.svg"
                alt="partner2"
                width={200}
                height={60}
                className="object-contain h-full w-full"
              />
            </div>
          </div>

          {/* Second column */}
          <div className="flex flex-col gap-10">
            <div className="h-24">
              <Image
                src="./partners/partner3.svg"
                alt="partner3"
                width={200}
                height={60}
                className="object-contain h-full"
              />
            </div>
            <div className="h-24">
              <Image
                src="./partners/partner4.svg"
                alt="partner4"
                width={200}
                height={60}
                className="object-contain h-full"
              />
            </div>
          </div>

          {/* Third column */}
          <div className="flex sm:flex-col gap-10 col-span-2 md:col-span-1 flex-row">
            <div className="h-24">
              <Image
                src="./partners/partner5.svg"
                alt="partner5"
                width={200}
                height={60}
                className="object-contain h-full"
              />
            </div>
            <div className="h-24">
              <Image
                src="./partners/partner6.svg"
                alt="partner6"
                width={200}
                height={60}
                className="object-contain h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
