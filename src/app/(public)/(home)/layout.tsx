import Navigationlayout from "@/components/layouts/nav";
import { Suspense } from "react";
import Loader from "@/components/shared/loader";
interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = async ({ children }) => {
  return (
    <Suspense fallback={<Loader />}>
      <Navigationlayout>{children}</Navigationlayout>
    </Suspense>
  );
};

export default Layout;
