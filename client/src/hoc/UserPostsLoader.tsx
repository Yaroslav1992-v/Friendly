import { useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { Account } from "../pages";
import { useAppDispatch } from "../store/createStore";
import { getPostsByUserId } from "./../store/post";

const UserPostsLoader = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  console.log(userId);
  useEffect(() => {
    if (userId) {
      dispatch(getPostsByUserId(userId));
    }
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<Account />} />
      </Routes>
    </>
  );
};
export default UserPostsLoader;
