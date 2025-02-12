import banner from "@/assets/banner1.jpg";

function Hero() {
  return (
    <div
      className="w-full absolute md:flex hidden  md:top-0 top-0 h-[40vh] md:h-[50vh] gap-3 rounded-b-2xl  flex-col justify-center items-center px-4 "
      style={{
        backgroundImage: `url(${banner})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
  );
}

export default Hero;
