import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NotificationsGroup } from "../../../props/props";
import { useAppDispatch } from "../../../store/createStore";
import { getUnreadIds, changeNotsToRead } from "../../../store/notificaton";
import { Not } from "./Not";

export const NotList = ({ nots }: { nots: NotificationsGroup[] }) => {
  const dispatch = useAppDispatch();
  const ids = useSelector(getUnreadIds());
  useEffect(() => {
    setTimeout(() => {
      dispatch(changeNotsToRead(ids));
    }, 2000);
  }, [ids.length > 0]);
  return (
    <ul className="notifications__list">
      {nots.map((n) => (
        <li key={n._id} className="notifications__item">
          <Not not={n} />
        </li>
      ))}
    </ul>
  );
};
