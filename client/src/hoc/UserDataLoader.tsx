import { useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { Account, PublicationsPage } from "../pages";
import { useAppDispatch } from "../store/createStore";
import { getPostsByUserId } from "../store/post";

const UserDataLoader = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  useEffect(() => {
    if (userId) {
      dispatch(getPostsByUserId(userId));
    }
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<Account />} />
        <Route path="/publications" element={<PublicationsPage />} />
      </Routes>
    </>
  );
};
export default UserDataLoader;
