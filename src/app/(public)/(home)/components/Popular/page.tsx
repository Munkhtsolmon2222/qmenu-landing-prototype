import React from "react";
import Link from "next/link";
function Popular() {
  const cousines = [
    { name: "Mongolian", pic: "mongolia.jpg" },
    { name: "Italian", pic: "italian.jpg" },
    { name: "Mexican", pic: "mexican.jpg" },
    { name: "Chinese", pic: "mongolia.jpg" },
    { name: "Japanese", pic: "mongolia.jpg" },
  ];
  return (
    <div className=" ">
      <div className="flex w-full flex-row justify-between items-center">
        <h1 className="font-medium text-lg xl:text-xl">Cuisines</h1>
        <Link href="/cuisines">
          <p className="text-current text-sm text-end">Бүгд</p>
        </Link>
        ;
      </div>
      <div className="gap-4 overflow-y-auto overflow-x-visible no-scrollbar w-full py-2  flex flex-row">
        {cousines.map((e, index) => (
          <div key={index}></div>
        ))}
      </div>
    </div>
  );
}

export default Popular;
