export const PAGE_HOME = '/';
export const PAGE_MAP = '/map';
export const PAGE_OFFERS = '/offers';
export const PAGE_CUISINES = '/cuisines';
export const PAGE_PLACES = '/places';
export const PAGE_LIST = '/list';
export const PAGE_EVENT = '/event';
export const PAGE_CHAT = '/chat';
export const PAGE_SHOP = '/shop';
export const PAGE_RESTAURANT = '/restaurant';
export const PAGE_QR = '/qr';
export const PAGE_TOPUP = '/topup';
export const PAGE_LOGIN = '/login';
export const PAGE_FORGOT = '/forgot-password';
export const PAGE_FUND = '/fund';
export const PAGE_ORDER_BASKET = 'basket';
export const PAGE_ORDER_TYPE = 'type';
export const PAGE_TABLE_ORDER = 'table-order';
export const PAGE_TABLE_ORDER_TABLE = 'table';
export const PAGE_TAKE_AWAY = 'takeaway';
export const PAGE_ORDER_SUCCESS = 'success';
export const PAGE_ORDER_USER = 'user';
export const PAGE_ORDER_OTP = 'otp';
export const PAGE_ORDER_EVENT = 'event';
export const PAGE_PAYMENT = 'payment';
export const PAGE_ORDER = 'order';
export const PAGE_DISCOUNT = '/discounts';
export const PAGE_PRODUCTS = '/products';

// ---------- Private ----------
export const PAGE_ORDERS = '/orders';
export const PAGE_FAVOURITE = '/favourite';
export const PAGE_PROFILE = '/profile';

export const PAGE_NOT_FOUND = '/404';

export const PAGE_ERROR = '/error';

export const MAP_NAV_PAGES = [PAGE_MAP];

export const ORDER_NAV_PAGES = [PAGE_ORDERS];

export const RESTAURANT_NAV_PAGES = [PAGE_RESTAURANT];

export const RESTAURANT_TOKEN_PAGES = [PAGE_RESTAURANT, PAGE_LOGIN];

export const MAIN_PAGES = [PAGE_MAP, PAGE_FAVOURITE, PAGE_SHOP, PAGE_RESTAURANT, PAGE_PROFILE];

export const PATH_NAMES = new Map<string, string>([
  [PAGE_ORDERS, 'Захиалга'],
  [PAGE_MAP, 'Байршил'],
  [PAGE_OFFERS, 'Special Offers'],
  [PAGE_CUISINES, 'Cuisines'],
  [PAGE_EVENT, 'Хүлээн авалт'],
]);

export const PRIVATE_PAGES = [PAGE_ORDERS, PAGE_FAVOURITE, PAGE_PROFILE];
export const GUESTS_PAGES = [PAGE_LOGIN, PAGE_FORGOT];
