import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "../../../components";
import { NotificationsGroup } from "../../../props/props";
import { NotInfo } from "./Notifications.prop";
import { NotUserImage } from "./NotUserImage";
import { formatDate } from "./../../../utils/helpers";
import { XIcon } from "../../../components/Icons";
import { useAppDispatch } from "../../../store/createStore";
import { removeNotifications } from "../../../store/notificaton";

export const Not = ({ not }: { not: NotificationsGroup }) => {
  const {
    author,
    reciever,
    typeId,
    type,
    authors,
    createdAt,
    isRead,
    notificationsId,
  } = not;
  const [notInfo, setNotInfo] = useState<NotInfo>({
    link: "",
    content: "",
  });
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    renderNotInfo();
  }, []);
  const renderNotInfo = () => {
    switch (type) {
      case "postLike":
        setNotInfo({
          link: `/account/${reciever}/publications/${typeId}`,
          content: "liked your post",
          data: (
            <div className="notifications__img">
              <img src={not.content} alt={"not-post-img"} />
            </div>
          ),
        });
        break;
      case "message":
        setNotInfo({
          link: `/chats/${typeId}/`,
          content: `sent you ${not.messages.count} messages`,
          data: <p>{not.content}</p>,
        });
        break;
      case "comment":
        setNotInfo({
          link: `/p/${not.post?.id}/comments/${typeId}`,
          content: `commented your post`,
          data: <p>{not.content}</p>,
        });
        break;
      case "commentReply":
        setNotInfo({
          link: `/p/${not.post?.id}/comments/${typeId}`,
          content: `replied to your comment`,
          data: <p>{not.content}</p>,
        });
        break;
      case "commentLike":
        setNotInfo({
          link: `/p/${not.post?.id}/comments/${typeId}`,
          content: `liked your comment`,
          data: <p>{not.content}</p>,
        });
        break;

      case "follow":
        setNotInfo({
          link: `/account/${typeId}`,
          content: `started following you`,
        });
        break;

      default:
        break;
    }
  };
  const removeNots = () => {
    dispatch(removeNotifications(not.notificationsId));
  };
  return (
    <div className={"notifications__not " + (!isRead ? "unread" : "")}>
      <Link
        to={notInfo.link}
        state={{ from: pathname }}
        className="notifications__link"
      >
        <NotUserImage
          firstUser={author.image || ""}
          secondUser={not.authors[0]?.image || ""}
        />
        <div className="notifications__box">
          <div className="notifications__info">
            <h3 className="notifications__title">
              {author.name}{" "}
              {authors.length > 0 ? `and ${not.authors[0]?.name}` : ""}
              {notificationsId.length > 2 &&
                ` and ${notificationsId.length - 2} ${
                  notificationsId.length - 2 === 1 ? "more" : "others"
                } `}
            </h3>
            <p>{notInfo.content}</p>
          </div>
          {notInfo.data && (
            <div className="notifications__data">{notInfo.data}</div>
          )}
          <div className="notifications__date">{formatDate(createdAt)}</div>
        </div>
      </Link>
      <button onClick={removeNots} className="notifications__remove">
        <XIcon />
      </button>
    </div>
  );
};
