import cat1 from "@/assets/images/categories/cat1.svg";
import cat2 from "@/assets/images/categories/cat2.svg";
import cat3 from "@/assets/images/categories/cat3.svg";
import cat4 from "@/assets/images/categories/cat4.svg";
import cat5 from "@/assets/images/categories/cat5.svg";
import cat6 from "@/assets/images/categories/cat6.svg";
import cat7 from "@/assets/images/categories/cat7.svg";
import cat8 from "@/assets/images/categories/cat8.svg";
import cat9 from "@/assets/images/categories/cat9.svg";
import cat10 from "@/assets/images/categories/cat10.svg";
import cat11 from "@/assets/images/categories/cat11.svg";
import cat12 from "@/assets/images/categories/cat12.svg";

import Branch1 from "@/assets/images/branches/branch1";
import Branch2 from "@/assets/images/branches/branch2";
import Branch3 from "@/assets/images/branches/branch3";
import Branch4 from "@/assets/images/branches/branch4";
import Branch5 from "@/assets/images/branches/branch5";
import Branch6 from "@/assets/images/branches/branch6";
import Branch7 from "@/assets/images/branches/branch7";
import Branch8 from "@/assets/images/branches/branch8";
import Branch9 from "@/assets/images/branches/branch9";

import { BranchRate, BranchType } from "../types";

import Image from "next/image";

export const foods = [
  {
    name: "Өглөөний цай",
    icons: (
      <Image
        width={8}
        height={8}
        className="w-8 h-8 md:w-12 md:h-12"
        src={cat3}
        alt="Өглөөний цай"
      />
    ),
  },
  {
    name: "Өдрийн хоол",
    icons: (
      <Image
        width={8}
        height={8}
        className="w-8 h-8 md:w-12 md:h-12"
        src={cat11}
        alt="Өдрийн хоол"
      />
    ),
  },
  {
    name: "Түргэн хоол",
    icons: (
      <Image
        width={8}
        height={8}
        className="w-8 h-8 md:w-12 md:h-12"
        src={cat6}
        alt="Түргэн хоол"
      />
    ),
  },
  {
    name: "Пицца",
    icons: (
      <Image
        width={8}
        height={8}
        className="w-8 h-8 md:w-12 md:h-12"
        src={cat8}
        alt="Пицца"
      />
    ),
  },
  {
    name: "Кофе",
    icons: (
      <Image
        width={8}
        height={8}
        className="w-8 h-8 md:w-12 md:h-12"
        src={cat5}
        alt="Кофе"
      />
    ),
  },
  {
    name: "Шөл",
    icons: (
      <Image
        width={8}
        height={8}
        className="w-8 h-8 md:w-12 md:h-12"
        src={cat10}
        alt="Шөл"
      />
    ),
  },
  {
    name: "Тахиа",
    icons: (
      <Image
        width={8}
        height={8}
        className="w-8 h-8 md:w-12 md:h-12"
        src={cat12}
        alt="Тахиа"
      />
    ),
  },
  {
    name: "Бургер",
    icons: (
      <Image
        width={8}
        height={8}
        className="w-8 h-8 md:w-12 md:h-12"
        src={cat4}
        alt="Бургер"
      />
    ),
  },
  {
    name: "Амттан",
    icons: (
      <Image
        width={8}
        height={8}
        className="w-8 h-8 md:w-12 md:h-12"
        src={cat2}
        alt="Амттан"
      />
    ),
  },
  {
    name: "Эрүүл хоол",
    icons: (
      <Image
        width={8}
        height={8}
        className="w-8 h-8 md:w-12 md:h-12"
        src={cat7}
        alt="Эрүүл хоол"
      />
    ),
  },
  {
    name: "Веган",
    icons: (
      <Image
        width={8}
        height={8}
        className="w-8 h-8 md:w-12 md:h-12"
        src={cat9}
        alt="Веган"
      />
    ),
  },
  {
    name: "Монгол",
    icons: (
      <Image
        width={8}
        height={8}
        className="w-8 h-8 md:w-12 md:h-12"
        src={cat1}
        alt="Монгол"
      />
    ),
  },
];

export const branches = [
  {
    key: BranchType.Restaurant,
    text: "branchType.Restaurant",
    name: "Ресторан",
    icons: <Branch6 />,
  },
  {
    key: BranchType.Pub,
    text: "branchType.Pub",
    name: "Лоунж, Паб",
    icons: <Branch1 />,
  },
  {
    key: BranchType.Karaoke,
    text: "branchType.Karaoke",
    name: "Караоке",
    icons: <Branch9 />,
  },
  {
    key: BranchType.Club,
    text: "branchType.Club",
    name: "Шөнийн клуб",
    icons: <Branch3 />,
  },
  {
    key: BranchType.FastFood,
    text: "branchType.FastFood",
    name: "Түргэн хоол, пицца",
    icons: <Branch4 />,
  },
  {
    key: BranchType.Caffee,
    text: "branchType.Cafe",
    name: "Цайны газар",
    icons: <Branch7 />,
  },
  {
    key: BranchType.CoffeeShop,
    text: "branchType.CoffeeShop",
    name: "Кофе шоп",
    icons: <Branch2 />,
  },
  {
    key: BranchType.Delivery,
    text: "branchType.Delivery",
    name: "Хүргэлтийн хоол",
    icons: <Branch5 />,
  },
];

export const branchRates = [
  BranchRate.Cheap,
  BranchRate.Moderate,
  BranchRate.Expensive,
  BranchRate.VeryExpensive,
];

export const reviews = [
  { star: 5.0, text: "4.5 <" },
  { star: 4.0, text: "4.0 - 4.5" },
  { star: 3.0, text: "3.0 - 4.0" },
  { star: 2.0, text: "2.0 - 3.0" },
];

export const BRANCH_ICONS = new Map<BranchType, React.ReactNode>([
  [BranchType.Restaurant, <Branch6 key="branch6" />],
  [BranchType.Canteen, <Branch7 key="branch7" />],
  [BranchType.Pub, <Branch1 key="branch1" />],
  [BranchType.Club, <Branch3 key="branch3" />],
  [BranchType.CoffeeShop, <Branch2 key="branch2" />],
  [BranchType.Karaoke, <Branch9 key="branch9" />],
  [BranchType.Hotel, <Branch8 key="branch8" />],
  [BranchType.Resort, <Branch8 key="branch8" />],
  [BranchType.Caffee, <Branch4 key="branch4" />],
]);
