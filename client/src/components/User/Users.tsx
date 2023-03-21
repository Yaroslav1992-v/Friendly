import React from "react";
import { Spinner } from "..";
import { User } from "./User";
import { UsersProps } from "./Users.props";

export const Users = ({
  users,
  isLoading,
  following,
  currentUser,
}: UsersProps) => {
  return (
    <div className="users">
      {isLoading ? (
        <Spinner />
      ) : (
        <ul className="users__list">
          {users.map((u) => (
            <li key={u.image} className="users__item">
              <User
                currentUser={currentUser}
                isFollowing={following.includes(u._id)}
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
