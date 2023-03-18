import React, { useEffect, useState } from "react";
import {
  ArrowButton,
  Button,
  Container,
  DotsBtn,
  Navigation,
  TopNavigation,
} from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AccountHead } from "./components/Head/AccountHead";
import { Nav } from "./Account.props";
import { AcountPhotos } from "./components/Content/AcountPhotos";
import { AccountPosts } from "./components/Content/AccountPosts";
import { useAppDispatch } from "../../store/createStore";
import { getUserData, loadUserData } from "./../../store/user";
import { getPostsCount } from "../../store/post";

export const Account = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/");
  };
  const [nav, setNav] = useState<Nav>("photos");
  const handleNav = () => {
    setNav((prevState) => (prevState === "photos" ? "posts" : "photos"));
  };
  const { userId } = useParams();
  const user = useSelector(getUserData(userId as string));
  console.log(user);
  const postsCount = useSelector(getPostsCount());
  return (
    <section className="account">
      <Container background="grey" name="container">
        <TopNavigation
          firstElement={<ArrowButton click={goBack} side="left" />}
          title="Account"
          secondElement={<DotsBtn />}
        />

        {user && <AccountHead user={user} post={postsCount} />}
      </Container>
      {user && (
        <Container background="white" name="container">
          <div className="account__nav">
            <Button
              onClick={handleNav}
              text="Photos"
              color={nav === "photos" ? "primary" : "white"}
            />
            <Button
              onClick={handleNav}
              text="Posts"
              color={nav === "posts" ? "primary" : "white"}
            />
          </div>
          <div className="account__content">
            {nav === "photos" ? (
              <AcountPhotos />
            ) : (
              <AccountPosts userId={user._id} />
            )}
          </div>

          <Navigation />
        </Container>
      )}
    </section>
  );
};
