import React from "react";
import { numberToString } from "../../utils/helpers";
import { LoupeIcon, XIcon } from "../Icons";
import { ImageProps } from "./Image.props";
import { BsArrowsAngleContract } from "react-icons/bs";
export const Image = ({
  removePreview,
  url,
  place,
  changeFit,
  name,
  objectFit = "contain",
  lookClose,
}: ImageProps) => {
  return (
    <div
      className={`image image-${numberToString(place + 1)} image-${objectFit}`}
    >
      <img src={url} alt="img" />
      <button
        className="image__remove"
        onClick={() => removePreview(url, place)}
      >
        <XIcon />
      </button>
      <button className="image__fit" onClick={() => changeFit(name)}>
        <BsArrowsAngleContract />
      </button>
      <button className="image__look" onClick={() => lookClose(objectFit, url)}>
        <LoupeIcon />
      </button>
    </div>
  );
};
