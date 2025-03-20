import React from 'react';
import { isUserAuthenticated } from '@/actions';
import { Icons } from '@/components/general';
import { PAGE_HOME, PAGE_LOGIN, PAGE_MAP, PAGE_ORDERS, PAGE_PROFILE } from '@/lib/constant';
import { withSuspense } from '@/lib/helpers';
import Link from 'next/link';

const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

export const navs = (user: boolean) => {
  const navs = [
    {
      key: 'home',
      name: 'Нүүр',
      path: PAGE_HOME,
      sort: 1,
    },
    {
      key: 'search',
      name: 'Хайх',
      path: PAGE_MAP,
      sort: 2,
    },

    {
      key: 'profile',
      name: 'Хэрэглэгч',
      path: user ? PAGE_PROFILE : PAGE_LOGIN,
      sort: 4,
    },
  ];
  const order = {
    key: 'orders',
    name: 'Захиалга',
    path: PAGE_ORDERS,
    sort: 3,
  };
  return user ? [...navs, order] : navs;
};

const icons = (name: string, active: boolean) => {
  const navIcons: Record<string, React.ReactNode> = {
    home: <Icons.home className={`${active ? 'fill-current-2 ' : 'fill-[#797979]  '}`} />,
    search: <Icons.compass className={`${active ? 'fill-current-2 ml-5  ' : 'fill-[#797979] '}`} />,
    profile: <Icons.profile className={`${active ? 'fill-current-2 ' : 'fill-[#797979]'}  `} />,
    orders: (
      <Icons.notePad
        className={`${
          active ? 'fill-[#e37373] stroke-current-2 ' : 'fill-[#cbcbcb] stroke-[#797979]'
        }`}
      />
    ),
  };
  return navIcons[name];
};

const BottomNavbar: React.FC = async () => {
  const isAuthenticated = await isUserAuthenticated();

  return (
    <div className="fixed bottom-0 z-50 w-full border-t rounded-t-xl justify-center bg-background sm:hidden">
      <div className="flex items-center justify-center w-full">
        <div className="flex items-center w-full justify-around">
          {navs(isAuthenticated)
            .sort((a, b) => a.sort - b.sort)
            .map((navItem) => {
              const isActive = pathname === navItem.path;
              return (
                <NavItem
                  key={navItem.key}
                  path={navItem.path}
                  // icon={navItem.icon}
                  isActive={isActive}
                  name={navItem.name}
                  nav={navItem.key}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ path, isActive, name, nav }: any) => {
  return (
    <Link
      className="flex flex-col items-center justify-center text-sm font-medium py-2"
      href={path}
    >
      <div
        className={`rounded-full flex items-center gap-0.5 flex-col ${
          isActive ? 'bg-popover' : ''
        }`}
      >
        {isActive && <div className="absolute top-0 rounded-b-xl bg-current-2 h-2 w-4"></div>}
        {icons(nav, isActive)}
        <p className={`text-xs ${isActive ? 'text-current-2 ' : 'text-[#797979]'} `}>{name}</p>
      </div>
    </Link>
  );
};

export const BottomNav = withSuspense(BottomNavbar);
