interface Props extends React.PropsWithChildren {}

const Layout: React.FC<Props> = async ({ children }) => {
  return (
    <div className="flex flex-col h-max w-full justify-between z-0 gap-3 bg-whitesmoke">
      {children}
    </div>
  );
};

export default Layout;
