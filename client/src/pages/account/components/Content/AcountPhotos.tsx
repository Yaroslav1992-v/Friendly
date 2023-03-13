import React, { useRef, useState } from "react";
import { numberToString, splitArray } from "../../../../utils/helpers";
import { useSelector } from "react-redux";
import { getPostsImages } from "../../../../store/post";
import { ImagePreview } from "../../../../components";
import { ImgObject } from "../../../../props/props";

export const AcountPhotos = () => {
  const images = useSelector(getPostsImages());
  const newPhotos = splitArray<ImgObject>(images, 6);
  const [image, setImage] = useState<ImgObject | null>(null);
  const [slide, setSlide] = useState<{ num: number; loc: number }>({
    num: 0,
    loc: 0,
  });
  const liRef = useRef<HTMLLIElement>(null);
  const openPreview = (num: number) => {
    setImage(images[num]);

    const liElement = liRef.current;
    if (liElement) {
      const rect = liElement.getBoundingClientRect();
      setSlide({ num: num, loc: rect.top });
    }
  };

  const closePreview = () => {
    setImage(null);
  };
  return (
    <>
      {image && (
        <ImagePreview
          position="absolute"
          slide={{
            slide: openPreview,
            data: slide,
            arrayLength: images.length,
          }}
          objectFit={image.objectFit}
          url={image.url}
          goBack={closePreview}
        />
      )}
      {newPhotos.map((p, index) => (
        <ul
          key={index}
          className={
            "account__photos" + ` account__photos-${numberToString(p.length)}`
          }
        >
          {p.map((i, idx) => (
            <li
              ref={liRef}
              onClick={() => openPreview(idx)}
              key={idx}
              className={
                "account__photos-item" +
                ` account__photos-item-${numberToString(idx + 1)}`
              }
            >
              <img
                src={`${i.url}`}
                alt="pic"
                className={`account__photos-photo ${i.objectFit}`}
              />
            </li>
          ))}
        </ul>
      ))}
    </>
  );
};
