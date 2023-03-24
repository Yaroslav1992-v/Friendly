import React from "react";
import { Spinner } from "..";
import { User } from "./User";
import { UsersProps } from "./Users.props";

export const Users = ({ users, isLoading, data, currentUser }: UsersProps) => {
  const checkData = (id: string) => {
    if ("follows" in data) {
      return { isFollowing: data.follows.includes(id), action: data.action };
    } else {
      return data;
    }
  };

  return (
    <div className="users">
      {isLoading ? (
        <Spinner />
      ) : (
        <ul className="users__list">
          {users.map((u) => (
            <li key={u.image} className="users__item">
              <User
                data={checkData(u._id)}
                image={u.image}
                _id={u._id}
                name={u.name}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
