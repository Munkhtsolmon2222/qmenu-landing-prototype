import React from "react";
import { Button } from "../ui/button";
import { Icons } from "./icons";

interface Props {
  onClick: () => void;
}
function ChatButton(props: Props) {
  const { onClick } = props;
  return (
    <div className="fixed bottom-20 right-8 lg:bottom-10 lg:right-8">
      <div className="absolute rounded-full bg-primary h-8 w-8 animate-ping top-1 left-1"></div>
      <Button className="rounded-full p-2 w-max h-max" onClick={onClick}>
        <Icons.message className="h-6 w-6 z-50 " />
      </Button>
    </div>
  );
}

export default ChatButton;
