import { InstagramLogoIcon } from "@radix-ui/react-icons";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  Loader2,
  LucideIcon,
  LucideProps,
  Moon,
  MoreVertical,
  Plus,
  Puzzle,
  Search,
  Settings,
  SunMedium,
  Trash,
  User,
  X,
  Navigation,
  List,
  MapPinned,
  Heart,
  Utensils,
  Martini,
  TentTree,
  BedDouble,
  MicVocal,
  Croissant,
  MapPin,
  Pizza,
  Beef,
  Soup,
  PhoneCall,
  Star,
  Minus,
  ShoppingCart,
  Bookmark,
  Phone,
  FacebookIcon,
  MessageCircle,
  NotepadText,
  SlidersHorizontal,
  Pencil,
  PencilLine,
  Clock,
  Package,
  Info,
  CircleCheck,
  ChevronDown,
  ChevronUp,
  Ellipsis,
  Copy,
  Camera,
  Upload,
  CornerLeftUp,
  CornerRightUp,
  LaptopMinimal,
  EyeOff,
  Eye,
  Share2,
  BadgePercent,
  Wallet,
  Store,
  FilterX,
  MessageCircleMore,
  Mail,
  Wifi,
  WifiOff,
  CircleParking,
  CircleParkingOff,
  Music2,
  BatteryCharging,
  Cigarette,
  CigaretteOff,
  Crown,
  Baby,
  Plug,
  Grid3X3,
  LayoutPanelTop,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  layoutPanelTop: LayoutPanelTop,
  grid3X3: Grid3X3,
  x: X,
  plug: Plug,
  wifi: Wifi,
  wifiOff: WifiOff,
  circleParking: CircleParking,
  circleParkingOff: CircleParkingOff,
  music2: Music2,
  batteryCharging: BatteryCharging,
  cigarette: Cigarette,
  cigaretteOff: CigaretteOff,
  crown: Crown,
  baby: Baby,
  mail: Mail,
  instagram: InstagramLogoIcon,
  messageCircleMore: MessageCircleMore,
  badgePercent: BadgePercent,
  share2: Share2,
  filterX: FilterX,
  home: ({ ...props }: LucideProps) => (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M20.04 6.82018L14.28 2.79018C12.71 1.69018 10.3 1.75018 8.78999 2.92018L3.77999 6.83018C2.77999 7.61018 1.98999 9.21018 1.98999 10.4702V17.3702C1.98999 19.9202 4.05999 22.0002 6.60999 22.0002H17.39C19.94 22.0002 22.01 19.9302 22.01 17.3802V10.6002C22.01 9.25018 21.14 7.59018 20.04 6.82018Z"
      />
      <path d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V15C11.25 14.59 11.59 14.25 12 14.25C12.41 14.25 12.75 14.59 12.75 15V18C12.75 18.41 12.41 18.75 12 18.75Z" />
    </svg>
  ),
  compass: ({ ...props }: LucideProps) => (
    <svg
      {...props}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.3"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 0.25C5.06294 0.25 0.25 5.06294 0.25 11C0.25 16.9371 5.06294 21.75 11 21.75C16.9371 21.75 21.75 16.9371 21.75 11C21.75 5.06294 16.9371 0.25 11 0.25Z"
      />
      <path d="M9.40933 9.40933L13.8287 8.17189L12.5913 12.5913L8.17189 13.8287L9.40933 9.40933Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.3135 12.7935C13.2429 13.0458 13.0458 13.2429 12.7935 13.3135L8.37412 14.551C8.11319 14.624 7.83316 14.5507 7.64156 14.3591C7.44997 14.1675 7.37661 13.8874 7.44967 13.6265L8.68711 9.20711C8.75774 8.95486 8.95486 8.75774 9.20711 8.68711L13.6265 7.44967C13.8874 7.37661 14.1675 7.44997 14.3591 7.64156C14.5507 7.83316 14.624 8.1132 14.551 8.37412L13.3135 12.7935ZM12.747 9.25362L10.0178 10.0178L9.25362 12.747L11.9828 11.9828L12.747 9.25362Z"
      />
    </svg>
  ),
  profile: ({ ...props }: LucideProps) => (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z"
      />
      <path d="M17.08 14.1499C14.29 12.2899 9.73996 12.2899 6.92996 14.1499C5.65996 14.9999 4.95996 16.1499 4.95996 17.3799C4.95996 18.6099 5.65996 19.7499 6.91996 20.5899C8.31996 21.5299 10.16 21.9999 12 21.9999C13.84 21.9999 15.68 21.5299 17.08 20.5899C18.34 19.7399 19.04 18.5999 19.04 17.3599C19.03 16.1299 18.34 14.9899 17.08 14.1499Z" />
    </svg>
  ),
  store: Store,
  eye: Eye,
  eyeOff: EyeOff,
  laptopMinimal: LaptopMinimal,
  cornerLeftUp: CornerLeftUp,
  cornerRightUp: CornerRightUp,
  upload: Upload,
  camera: Camera,
  copy: Copy,
  phoneCall: PhoneCall,
  mappin: MapPin,
  creditCard: CreditCard,
  circleCheck: CircleCheck,
  info: Info,
  pin: ({ ...props }: LucideProps) => (
    <svg
      className="fill-current text-current"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="4" className="fill-current-1" />
    </svg>
  ),
  me: ({ ...props }: LucideProps) => (
    <svg
      {...props}
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2.92638 7.78815L6.02449 13.3237C8.11583 17.043 10.283 16.6274 10.8433 12.3995L11.0895 10.533L12.7324 9.61378C16.453 7.52899 16.0361 5.35528 11.8082 4.79494L5.52456 3.95685C2.70463 3.58807 1.53392 5.306 2.92638 7.78815ZM6.40866 6.90306L9.38692 8.91136C9.50396 8.99073 9.57365 9.10634 9.59751 9.23074C9.62137 9.35514 9.5994 9.48833 9.52002 9.60538C9.36657 9.83167 9.0523 9.89194 8.82601 9.73848L5.84775 7.73018C5.62146 7.57672 5.56119 7.26245 5.71465 7.03616C5.8681 6.80988 6.18237 6.7496 6.40866 6.90306Z" />
    </svg>
  ),
  pinCard: MapPin,
  filter: SlidersHorizontal,
  package: Package,
  clock: Clock,
  pencilLine: PencilLine,
  pencil: Pencil,
  notePad: NotepadText,
  bell: ({ ...props }: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  ),
  wallet: Wallet,
  message: MessageCircle,
  facebook: FacebookIcon,
  phone: Phone,
  bookMark: Bookmark,
  star: Star,
  add: Plus,
  minus: Minus,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  billing: CreditCard,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  check: Check,
  close: X,
  ellipsisHorizontal: Ellipsis,
  ellipsis: MoreVertical,
  gitHub: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="github"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
      ></path>
    </svg>
  ),
  google: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="google"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 488 512"
      {...props}
    >
      <path
        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
        fill="currentColor"
      />
    </svg>
  ),
  beef: Beef,
  help: HelpCircle,
  laptop: Laptop,
  list: List,
  logo: Puzzle,
  navigation: Navigation,
  media: Image,
  moon: Moon,
  page: File,
  post: FileText,
  search: Search,
  settings: Settings,
  spinner: Loader2,
  sun: SunMedium,
  trash: Trash,
  pizza: Pizza,
  user: User,
  warning: AlertTriangle,
  mappinned: MapPinned,
  heart: Heart,
  utensils: Utensils,
  martini: Martini,
  tent: TentTree,
  bed: BedDouble,
  mic: MicVocal,
  croissant: Croissant,
  map: MapPin,
  soup: Soup,
  call: PhoneCall,
  starIcon: ({ ...props }: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  beerIcon: ({ ...props }: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 11h1a3 3 0 0 1 0 6h-1" />
      <path d="M9 12v6" />
      <path d="M13 12v6" />
      <path d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z" />
      <path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" />
    </svg>
  ),
  coffee: ({ ...props }: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 2v2" />
      <path d="M14 2v2" />
      <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
      <path d="M6 2v2" />
    </svg>
  ),
  shoppingCart: ShoppingCart,
  spelcial: ({ ...props }: LucideProps) => (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 15L15 9"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 6C2.75 7.67 2 9.75 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C10.57 2 9.19997 2.29998 7.96997 2.84998"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.4945 14.5H14.5035"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.49451 9.5H9.50349"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export type IconsType = typeof Icons;
