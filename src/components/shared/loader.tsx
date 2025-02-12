import { LoaderIcon } from "lucide-react";

function Loader() {
  return (
    <div className="w-full min-h-[80vh] flex justify-center items-center">
      <LoaderIcon className="animate-spin text-current" />
    </div>
  );
}

export default Loader;
