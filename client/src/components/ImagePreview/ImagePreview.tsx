import React from "react";
import { ArrowButton } from "../buttons/arrowButton/ArrowButton";
import { XIcon } from "../Icons";
import { ImagePreviewProps } from "./ImagePreviewProps";

export const ImagePreview = ({
  url,
  objectFit,
  goBack,
  slide,
  position,
}: ImagePreviewProps) => {
  return (
    <div
      style={{ bottom: slide?.data?.loc! - 300 + "px" }}
      className={
        "image-preview" +
        ` image-preview-${objectFit} ` +
        (position ? `image-preview-absolute` : "")
      }
    >
      <img src={url} alt="pic-preview" />
      {slide && slide.data.num > 0 && (
        <ArrowButton
          click={() => slide.slide(slide.data.num - 1)}
          side="left"
        />
      )}
      <button
        onClick={() => goBack(objectFit, url)}
        className="image-preview__close"
      >
        {<XIcon />}
      </button>
      {slide && slide.data.num < slide.arrayLength - 1 && (
        <ArrowButton
          click={() => slide.slide(slide.data.num + 1)}
          side="right"
        />
      )}
    </div>
  );
};
