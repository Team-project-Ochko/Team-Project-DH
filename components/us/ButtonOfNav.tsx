import React from "react";

interface ButtonOfNavProps {
  text: string;
}

export const ButtonOfNav = ({ text }: ButtonOfNavProps) => {
  return <button>{text}</button>;
};
