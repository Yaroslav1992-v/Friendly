import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Main } from "../../../pages";
import { useAppDispatch } from "../../../store/createStore";
import {
  getIsDataLoaded,
  getSearchedUsers,
  searchUser,
} from "../../../store/user";
import { checkString } from "../../../utils/helpers";
import ChatLoader from "../../ChatLoader";
import { SearchContextValue } from "./useSearch.types";

const SearchContext = React.createContext<SearchContextValue>({
  searchQuery: "",
  searchQueries: [],
  resetSearch: function (): void {
    throw new Error("Function not implemented.");
  },
  handleSearchQuery: function (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    throw new Error("Function not implemented.");
  },
  users: [],
  isDataLoaded: false,
});

export const useSearch = (): SearchContextValue => {
  return useContext(SearchContext);
};

export const SearchProvider: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQueries, setSearchQueries] = useState<string[]>([]);
  const searchedUsers = useSelector(getSearchedUsers());
  const filteredUsers = searchedUsers.filter((u) =>
    checkString(searchQuery, u.name)
  );
  const isDataLoaded = useSelector(getIsDataLoaded());
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
  const contextValue: SearchContextValue = {
    searchQuery,
    searchQueries,
    resetSearch: handleReset,
    handleSearchQuery,
    users: filteredUsers,
    isDataLoaded,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      <Routes>
        <Route index element={<Main />} />
        <Route path="/chats/*" element={<ChatLoader />} />
      </Routes>
    </SearchContext.Provider>
  );
};
