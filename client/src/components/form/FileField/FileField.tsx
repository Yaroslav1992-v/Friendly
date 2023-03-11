import React from "react";
import { FileFieldProps } from "./fileField.props";

export const FileField = ({
  id,
  Icon,
  multiple,
  accept,
  onChange,
}: FileFieldProps) => {
  return (
    <div className="fileField">
      <label htmlFor={id} className="fileField__label">
        {Icon}
      </label>
      <input
        id={id}
        onChange={onChange}
        type="file"
        multiple={multiple}
        accept={`${accept}/*`}
        className="visually-hidden "
      />
    </div>
  );
};
