import React, { useState } from "react";
import {
  ArrowButton,
  Button,
  Container,
  DotsBtn,
  Navigation,
  TopNavigation,
} from "../../components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/auth";
import { AccountHead } from "./components/Head/AccountHead";
import { Nav } from "./Account.props";
import { AcountPhotos } from "./components/Content/AcountPhotos";
import { AccountPosts } from "./components/Content/AccountPosts";

export const Account = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/");
  };
  const [nav, setNav] = useState<Nav>("photos");
  const handleNav = () => {
    setNav((prevState) => (prevState === "photos" ? "posts" : "photos"));
  };
  const user = useSelector(getCurrentUser());

  return (
    <section className="account">
      <Container background="grey" name="container">
        <TopNavigation
          firstElement={<ArrowButton click={goBack} side="left" />}
          title="Account"
          secondElement={<DotsBtn />}
        />

        {user && <AccountHead {...user} />}
      </Container>
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
          {nav === "photos" ? <AcountPhotos /> : <AccountPosts />}
        </div>

        <Navigation />
      </Container>
    </section>
  );
};
