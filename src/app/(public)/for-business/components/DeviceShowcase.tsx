import Image from 'next/image';

export default function DeviceShowcase() {
  return (
    <div className="relative w-full aspect-[4/3] max-w-2xl mx-auto mt-32 hidden md:block">
      {/* Desktop */}
      <div className="absolute top-0 left-[55%] -translate-x-1/2 w-[80%] z-20">
        <Image
          src="./features/feature_1.0beff9d4.svg"
          alt="QMenu дэшборд компьютер дээр"
          width={460}
          height={400}
          className="rounded-t-lg shadow-xl"
        />
      </div>

      {/* Tablet */}
      <div className="absolute bottom-0 right-[-5%] w-[40%] z-10 top-[150px]">
        <Image
          src="./features/feature_2.d2c77da1.svg?height=300&width=200"
          alt="QMenu таблет дээр"
          width={200}
          height={300}
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Mobile */}
      <div className="absolute bottom-10 left-[5%] w-[35%] z-30 top-[100px]">
        <Image
          src="./features/Kiosk.226b5430.svg"
          alt="QMenu гар утас дээр"
          width={190}
          height={360}
          className="rounded-lg shadow-lg "
        />
      </div>

      {/* Background cloud/glow effect */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-[90%] h-[70%] bg-black-100 rounded-full blur-3xl opacity-50"></div>
      </div>
    </div>
  );
}
