import React from "react";
import { useNavigate } from "react-router-dom";
import { getNotifications } from "../../store/notificaton";
import { useSelector } from "react-redux";
import {
  ArrowButton,
  Container,
  DotsBtn,
  Navigation,
  TopNavigation,
} from "../../components";
import { NotList } from "./components/NotList";

export const Notifications = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/");
  };

  const notifications = useSelector(getNotifications());

  return (
    <section className="notifications">
      <Container background="white" name="container">
        <TopNavigation
          firstElement={<ArrowButton click={goBack} side="left" />}
          title="Navigation"
          secondElement={<DotsBtn />}
        />
        <Navigation />
        <div className="notifications__container">
          {notifications.length > 0 && <NotList nots={notifications} />}
        </div>
      </Container>
    </section>
  );
};
