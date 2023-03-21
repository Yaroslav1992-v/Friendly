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
import { getSearchedUsers, searchUser } from "../../store/user";
import { useSelector } from "react-redux";
import { loadPosts } from "../../store/post";
import { getPosts } from "./../../store/post";
import { getCurrentUser, getCurrentUserFollows } from "./../../store/auth";
import { User } from "../../props/props";
import { checkString } from "../../utils/helpers";
import { getIsDataLoaded } from "./../../store/user";

export const Main = () => {
  const [openSearch, setOpenSeach] = useState<boolean>(false);
  const handleOpenSearch = () => {
    setOpenSeach((prevState) => !prevState);
  };
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQueries, setSearchQueries] = useState<string[]>([]);
  const handleReset = () => {
    setSearchQuery((prevState) => "");
  };
  const handleSearchQuery = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    await setSearchQuery(target.value);
  };
  useEffect(() => {
    if (searchQuery && !searchQueries.includes(searchQuery)) {
      setSearchQueries((prevState) => [...prevState, searchQuery]);
      dispatch(searchUser(searchQuery));
    }
  }, [searchQuery]);
  const currentUser = useSelector(getCurrentUser());
  const follows: string[] | undefined = useSelector(getCurrentUserFollows());
  const posts = useSelector(getPosts("feed"));
  const searchedUsers = useSelector(getSearchedUsers());
  useEffect(() => {
    if (follows) {
      dispatch(loadPosts(follows));
    }
  }, []);
  const filteredUsers = searchedUsers.filter((u) =>
    checkString(searchQuery, u.name)
  );
  const isDataLoaded = useSelector(getIsDataLoaded());
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
                resetQuery={handleReset}
                cancel={handleOpenSearch}
              />
            ) : (
              <ActionBtn Icon={<SearchIcon />} action={handleOpenSearch} />
            )
          }
        />

        {openSearch ? (
          <Users
            currentUser={currentUser as User}
            following={follows || []}
            isLoading={isDataLoaded}
            users={filteredUsers}
          />
        ) : (
          posts.length > 0 && <Publications posts={posts} />
        )}
        <Navigation />
      </Container>
    </section>
  );
};
