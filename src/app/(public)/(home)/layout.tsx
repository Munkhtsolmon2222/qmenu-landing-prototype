import Navigationlayout from "@/components/layouts/nav";
import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = async ({ children }) => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Navigationlayout>{children}</Navigationlayout>
    </Suspense>
  );
};

export default Layout;
