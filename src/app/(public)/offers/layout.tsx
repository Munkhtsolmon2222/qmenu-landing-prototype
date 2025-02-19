import Navigationlayout from "@/components/layouts/nav";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return <Navigationlayout>{children}</Navigationlayout>;
};

export default Layout;
