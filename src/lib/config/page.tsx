// ---------- Private ----------
export const PAGE_HOME = "/";
export const PAGE_MAP = "/map";
export const PAGE_OFFERS = "/offers";
export const PAGE_CUISINES = "/cuisines";
export const PAGE_PLACES = "/places";
export const PAGE_LIST = "/list";
export const PAGE_EVENT = "/event";
export const PAGE_ORDERS = "/orders";
export const PAGE_FAVOURITE = "/favourite";
export const PAGE_CHAT = "/chat";
export const PAGE_SHOP = "/shop";
export const PAGE_RESTAURANT = "/restaurant";
export const PAGE_PROFILE = "/profile";
export const PAGE_QR = "/qr";
export const PAGE_TOPUP = "/topup";
export const PAGE_LOGIN = "/login";
export const PAGE_FORGOT = "/forgot-password";
export const PAGE_FUND = "/fund";

export const PAGE_ORDER_BASKET = "basket";
export const PAGE_ORDER_TYPE = "type";
export const PAGE_TABLE_ORDER = "table-order";
export const PAGE_TABLE_ORDER_TABLE = "table";
export const PAGE_TAKE_AWAY = "takeaway";
export const PAGE_ORDER_SUCCESS = "success";
export const PAGE_ORDER_USER = "user";
export const PAGE_ORDER_OTP = "otp";
export const PAGE_ORDER = "order";
export const PAGE_ORDER_EVENT = "event";
export const PAGE_PAYMENT = "payment";

export const PAGE_NOT_FOUND = "/404";

export const MAP_NAV_PAGES = [PAGE_MAP];

export const ORDER_NAV_PAGES = [PAGE_ORDERS];

export const RESTAURANT_NAV_PAGES = [PAGE_RESTAURANT];

export const RESTAURANT_TOKEN_PAGES = [PAGE_RESTAURANT, PAGE_LOGIN];

export const MAIN_PAGES = [
  PAGE_MAP,
  PAGE_FAVOURITE,
  PAGE_SHOP,
  PAGE_RESTAURANT,
  PAGE_PROFILE,
];

export const PATH_NAMES = new Map<string, string>([
  [PAGE_ORDERS, "Захиалга"],
  [PAGE_MAP, "Байршил"],
  [PAGE_OFFERS, "Special Offers"],
  [PAGE_CUISINES, "Cuisines"],
  [PAGE_EVENT, "Хүлээн авалт"],
]);

export const testBranch = {
  branchLists: [
    {
      type: "NEAR",
      order: 1,
      branches: [
        {
          name: "Branch 1",
          image: "branch1.jpg",
          tags: ["tag1", "tag2"],
          star: "4.5",
          distance: 2.5,
          open: true,
          description: "Description for Branch 1",
        },
        {
          name: "Branch 2",
          image: "branch2.jpg",
          tags: ["tag3", "tag4"],
          star: "4.2",
          distance: 3.1,
          open: false,
          description: "Description for Branch 2",
        },
      ],
    },
    {
      type: "NEAR",
      order: 2,
      branches: [
        {
          name: "Branch 3",
          image: "branch3.jpg",
          tags: ["tag5", "tag6"],
          star: "4.7",
          distance: 1.2,
          open: true,
          description: "Description for Branch 3",
        },
      ],
    },
    {
      type: "FEATURED",
      order: 3,
      branches: [
        {
          name: "Branch 4",
          image: "branch4.jpg",
          tags: ["tag7", "tag8"],
          star: "4.8",
          distance: 4.0,
          open: true,
          description: "Description for Branch 4",
        },
      ],
    },
    {
      type: "REVIEW",
      order: 4,
      branches: [
        {
          name: "Branch 5",
          image: "branch5.jpg",
          tags: ["tag9", "tag10"],
          star: "4.3",
          distance: 2.8,
          open: false,
          description: "Description for Branch 5",
        },
      ],
    },
  ],
};
