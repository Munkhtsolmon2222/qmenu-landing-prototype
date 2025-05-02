export default function HeroDeviceShowcase() {
  return (
    <div className="relative w-full aspect-[6/5] max-w-4xl mx-auto">
      {/* Desktop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] z-20">
        <img
          src="./features/feature_1.0beff9d4.svg"
          alt="QMenu дэшборд компьютер дээр"
          className="rounded-t-lg shadow-xl w-[100%] h-auto"
        />
      </div>

      {/* Tablet */}
      <div className="absolute bottom-0 right-[-100px] w-[40%] h-[40%] z-10 top-[150px]">
        <img
          src="./features/feature_2.d2c77da1.svg"
          alt="QMenu таблет дээр"
          className="rounded-lg shadow-lg w-full h-full"
        />
      </div>

      {/* Mobile */}
      <div className="absolute bottom-10 left-[-100px] w-[25%] h-[50%] z-30 top-[100px]">
        <img
          src="./features/Kiosk.226b5430.svg"
          alt="QMenu гар утас дээр"
          className="rounded-lg shadow-lg w-full h-full "
        />
      </div>

      {/* Background cloud/glow effect */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-[90%] h-[70%] bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      </div>
    </div>
  );
}
