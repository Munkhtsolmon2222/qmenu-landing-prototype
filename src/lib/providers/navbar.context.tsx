'use client';
import { createContext, useContext, useEffect, useState } from 'react';

interface NavbarContextType {
  show: boolean;
}

const NavbarContext = createContext({} as NavbarContextType);

export const NavbarProvider = ({ children }: React.PropsWithChildren) => {
  const [show, setShow] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    setShow(window.scrollY < 85 || window.scrollY < lastScrollY);
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return <NavbarContext value={{ show }}>{children}</NavbarContext>;
};

export const useNavbar = () => useContext(NavbarContext);

export default NavbarProvider;
