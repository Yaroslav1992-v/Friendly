import React, { useState } from "react";
import { CancelBtn } from "../..";

import { SearchIcon, XIcon } from "../../Icons";
import { SearchFiledProps } from "./SearchField.props";

export const SearchField = ({
  searchQuery,
  resetQuery,
  cancel,
}: SearchFiledProps) => {
  return (
    <div className="search__field">
      <div className="search__field-box">
        <SearchIcon />
        <input
          placeholder="Search"
          onChange={searchQuery}
          type="search"
          className="search__query"
        />
        <div className="search__reset">
          <button onChange={resetQuery} className="search__reset-btn">
            <XIcon />
          </button>
        </div>
      </div>
      <CancelBtn cancel={cancel} />
    </div>
  );
};
