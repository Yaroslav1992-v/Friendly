import React, { useState } from "react";
import { CancelBtn } from "../..";

import { SearchIcon, XIcon } from "../../Icons";
import { SearchFiledProps } from "./SearchField.props";

export const SearchField = ({
  searchQuery,
  resetQuery,
  cancel,
  value,
}: SearchFiledProps) => {
  return (
    <div className="search__field">
      <div className="search__field-box">
        <SearchIcon />
        <input
          value={value}
          placeholder="Search"
          onChange={searchQuery}
          type="search"
          className="search__query"
        />
        <div className="search__reset">
          <button onClick={resetQuery} className="search__reset-btn">
            <XIcon />
          </button>
        </div>
      </div>
      {cancel && <CancelBtn props={cancel} />}
    </div>
  );
};
