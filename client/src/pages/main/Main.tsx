import React, { useEffect, useState } from "react";
import {
  ActionBtn,
  Container,
  Navigation,
  Publications,
  SearchField,
  TopNavigation,
  Users,
} from "../../components";

import { AddPostIcon, SearchIcon } from "../../components/Icons";

import { useAppDispatch } from "../../store/createStore";
import { useSelector } from "react-redux";
import { loadPosts } from "../../store/post";
import { getPosts } from "./../../store/post";
import { getCurrentUser, getCurrentUserFollows } from "./../../store/auth";
import { Follow, User } from "../../props/props";
import { useSearch } from "./../../hoc/hooks/useSearch/useSearch";
import { followUser, unfollowUser } from "../../store/user";

export const Main = () => {
  const [openSearch, setOpenSeach] = useState<boolean>(false);
  const { resetSearch, searchQuery, handleSearchQuery, isDataLoaded, users } =
    useSearch();
  const handleOpenSearch = () => {
    setOpenSeach((prevState) => !prevState);
  };
  const dispatch = useAppDispatch();

  const currentUser = useSelector(getCurrentUser());
  const follows: string[] | undefined = useSelector(getCurrentUserFollows());
  const posts = useSelector(getPosts("feed"));
  const handleFollow = (id: string, isFollowing: boolean) => {
    console.log(isFollowing);
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
    if (follows) {
      dispatch(loadPosts(follows));
    }
  }, []);

  return (
    <section className="main">
      <Container name="container" background="white">
        <TopNavigation
          firstElement={
            <ActionBtn
              Icon={<AddPostIcon />}
              action={{ from: "/", to: "p/addPost" }}
            />
          }
          title="News"
          secondElement={
            openSearch ? (
              <SearchField
                value={searchQuery}
                searchQuery={handleSearchQuery}
                resetQuery={resetSearch}
                cancel={handleOpenSearch}
              />
            ) : (
              <ActionBtn Icon={<SearchIcon />} action={handleOpenSearch} />
            )
          }
        />

        {openSearch ? (
          <Users
            currentUser={currentUser?._id as string}
            data={{ follows: follows || [], action: handleFollow }}
            isLoading={isDataLoaded}
            users={users}
          />
        ) : (
          posts.length > 0 && <Publications posts={posts} />
        )}
        <Navigation />
      </Container>
    </section>
  );
};
