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

import { getUserData, loadUserData } from "../../store/user";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/createStore";

export const EditAccount = () => {
  const { userId } = useParams();
  const currentUserId = localStorageService.getUserId();
  const navigate = useNavigate();
  const user = useSelector(getUserData());
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (currentUserId !== userId || user?._id !== userId) {
      dispatch(loadUserData(userId as string));
      navigate(`/account/${currentUserId}/edit`);
    }
  }, [user]);

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
