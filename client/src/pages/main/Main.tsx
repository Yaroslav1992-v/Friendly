import React, { useState } from "react";
import {
  ActionBtn,
  Container,
  Navigation,
  SearchField,
  TopNavigation,
} from "../../components";

import { AddPostIcon, SearchIcon } from "../../components/Icons";

export const Main = () => {
  const [openSeach, setOpenSeach] = useState<boolean>(false);
  const handleOpenSearch = () => {
    setOpenSeach((prevState) => !prevState);
  };
  const someAction = () => {};
  return (
    <section className="main">
      <Container name="container" background="white">
        <TopNavigation
          firstElement={
            <ActionBtn Icon={<AddPostIcon />} action={someAction} />
          }
          title="News"
          secondElement={
            openSeach ? (
              <SearchField
                searchQuery={someAction}
                resetQuery={someAction}
                cancel={handleOpenSearch}
              />
            ) : (
              <ActionBtn Icon={<SearchIcon />} action={handleOpenSearch} />
            )
          }
        />
        <Navigation />
      </Container>
    </section>
  );
};
