import React from "react";
import { ImageProps } from "./Publication.props";

export const PublicationImage = ({
  url,
  fromToWhere,
  objectFit,
}: ImageProps) => {
  return (
    <div className={"publication__image " + `publication__image-${objectFit}`}>
      <img src={url} alt="publication pic" />
      {fromToWhere && (
        <div className="publication__numbers">
          <span className="publication__number">
            {fromToWhere.from}/{fromToWhere.to}
          </span>
        </div>
      )}
    </div>
  );
};
