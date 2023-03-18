import { useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { Account, EditAccount, PublicationsPage } from "../pages";
import { useAppDispatch } from "../store/createStore";
import { getPostsByUserId } from "../store/post";
import { loadUserData } from "../store/user";

const UserDataLoader = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  useEffect(() => {
    if (userId) {
      dispatch(getPostsByUserId(userId));
      dispatch(loadUserData(userId));
    }
  }, [userId]);

  return (
    <>
      <Routes>
        <Route index element={<Account />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="edit" element={<EditAccount />} />
      </Routes>
    </>
  );
};
export default UserDataLoader;
