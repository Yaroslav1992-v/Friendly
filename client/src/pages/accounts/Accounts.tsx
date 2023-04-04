import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
  Location,
} from "react-router-dom";

import {
  ArrowButton,
  Container,
  DotsBtn,
  TopNavigation,
  Users,
} from "../../components";
import { getCurrentUser, getCurrentUserFollows } from "../../store/auth";
import { useAppDispatch } from "../../store/createStore";
import {
  findUsersByIds,
  followUser,
  getIsDataLoaded,
  getUsers,
  unfollowUser,
} from "../../store/user";
import { getUserData } from "./../../store/user";
import { Follow, User } from "../../props/props";

export const Accounts = () => {
  const navigate = useNavigate();
  interface CurrentLocation extends Location {
    from?: string;
  }
  const { state }: CurrentLocation = useLocation();
  const goBack = () => {
    const to = state?.from ? state.from : "/";
    navigate(to);
  };
  const params = useParams();
  const user = useSelector(getUserData());
  const isLoaded = useSelector(getIsDataLoaded());
  const currentUser = useSelector(getCurrentUser());
  const follows = useSelector(getCurrentUserFollows());
  const dispatch = useAppDispatch();
  const handleFollow = (id: string, isFollowing: boolean) => {
    const follow: Follow = {
      followingId: id,
      followerId: currentUser?._id as string,
    };
    if (isFollowing) {
      dispatch(unfollowUser(follow, currentUser as User));
    } else {
      dispatch(followUser(follow, currentUser as User));
    }
  };
  useEffect(() => {
    if (params["*"] === "followers" || params["*"] === "following") {
      if (user && user[params["*"]].length > 0) {
        dispatch(findUsersByIds(user[params["*"]]));
      }
    } else {
      navigate(`/account/${user?._id}/`);
    }
  }, []);

  const users = useSelector(getUsers());
  return (
    <section className="accounts">
      <Container background="white" name="container">
        <TopNavigation
          firstElement={<ArrowButton side="left" click={goBack} />}
          title={params["*"] || ""}
          secondElement={<DotsBtn />}
        />
        {users && isLoaded && (
          <Users
            data={{ follows: follows || [], action: handleFollow }}
            isLoading={isLoaded}
            users={users}
          />
        )}
      </Container>
    </section>
  );
};
