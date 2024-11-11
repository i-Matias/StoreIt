import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  avatar: string;
  fullName: string;
}

const CustomAvatar = ({ avatar, fullName }: Props) => {
  return (
    <Avatar>
      <AvatarImage src={avatar} />
      <AvatarFallback>{fullName.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;
