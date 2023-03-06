import React from "react";
import { ActionBtnProps } from "../buttons/Button.props";

export const ActionBtn = ({ Icon, action }: ActionBtnProps) => {
  return (
    <button onClick={action} className="action-btn">
      {Icon}
    </button>
  );
};
