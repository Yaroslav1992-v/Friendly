import React from "react";
import { ActionBtn, Dots } from "../../..";
import { CommentIcon, LikeIcon, ShareIcon } from "../../../Icons";
import { ActionsProps } from "./Publication.props";

export const PublicationActions = ({ postId, slider }: ActionsProps) => {
  const action = () => {};
  return (
    <div className="publication__nav">
      <div className="publication__actions">
        <ActionBtn action={action} Icon={<LikeIcon />} />
        <ActionBtn
          action={{ to: `p/${postId}/comments`, from: "/" }}
          Icon={<CommentIcon />}
        />
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
