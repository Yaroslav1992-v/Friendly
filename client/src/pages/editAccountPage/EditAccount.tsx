import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import localStorageService from "./../../services/localStorageService";
import { useNavigate } from "react-router-dom";
import {
  ArrowButton,
  Container,
  DotsBtn,
  EditForm,
  TopNavigation,
} from "../../components";

import { getUserData } from "../../store/user";
import { useSelector } from "react-redux";

export const EditAccount = () => {
  const { userId } = useParams();
  const currentUserId = localStorageService.getUserId();

  const navigate = useNavigate();
  useEffect(() => {
    if (currentUserId !== userId) {
      navigate(`/account/${currentUserId}/edit`);
    }
  }, []);

  const user = useSelector(getUserData(currentUserId as string));
  console.log(user);
  return (
    <section className="edit-page">
      <Container name="container" background="white">
        <TopNavigation
          firstElement={
            <ArrowButton
              click={() => navigate(`/account/${currentUserId}`)}
              side="left"
            />
          }
          title={"Edit Account"}
          secondElement={<DotsBtn />}
        />
        {user && <EditForm user={user} />}
      </Container>
    </section>
  );
};
