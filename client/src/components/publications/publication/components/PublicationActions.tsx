import React from "react";
import { ActionBtn, Dots } from "../../..";
import { CommentIcon, LikeIcon, ShareIcon } from "../../../Icons";
import { slider } from "./Publication.props";

export const PublicationActions = ({ slider }: slider) => {
  const action = () => {};
  return (
    <div className="publication__nav">
      <div className="publication__actions">
        <ActionBtn action={action} Icon={<LikeIcon />} />
        <ActionBtn action={action} Icon={<CommentIcon />} />
        <ActionBtn action={action} Icon={<ShareIcon />} />
      </div>
      {slider && (
        <Dots
          slider={slider.slider}
          current={slider.data.from}
          total={slider.data.to}
        />
      )}
    </div>
  );
};
