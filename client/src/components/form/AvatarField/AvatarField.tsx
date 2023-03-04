import React from "react";
import { Avatar } from "../..";
import { AvatarFieldProps } from "./AvatarField.props";
import { PlusIcon } from "./PlusIcon";

export const AvatarField = ({
  onChange,
  id,
  url,
  inputRef,
  error,
}: AvatarFieldProps) => {
  return (
    <div className="avatar__field">
      <div className="avatar__avatar">
        <Avatar size={"XL"} url={url} />
        <label htmlFor={id} className="avatar__label">
          <PlusIcon />
        </label>
      </div>
      <input
        onChange={onChange}
        ref={inputRef}
        className="visually-hidden"
        type="file"
        id={id}
      />
      {error && <p className="input__error">{error}</p>}
    </div>
  );
};
