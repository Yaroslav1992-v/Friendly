import React from "react";
import { XIcon } from "../Icons";
import { ImagePreviewProps } from "./ImagePreviewProps";

export const ImagePreview = ({ url, objectFit, goBack }: ImagePreviewProps) => {
  return (
    <div className={"image-preview" + ` image-preview-${objectFit}`}>
      <img src={url} alt="pic-preview" />
      <button
        onClick={() => goBack(objectFit, url)}
        className="image-preview__close"
      >
        {<XIcon />}
      </button>
    </div>
  );
};
