import React, { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AddPostPage } from "../../../pages";
import {
  Images,
  LookClose,
  ObjectFit,
  PostContextValue,
} from "./usePost.types";

const PostContext = React.createContext<PostContextValue>({
  images: [],
  imagePreviews: [],
  handleImages: () => {},
  lookClose: null,
  handleLook: () => {},
  handleImageSize: () => {},
  removePreviews: () => {},
});

export const usePosts = (): PostContextValue => {
  return useContext(PostContext);
};

export const PostsProvider: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<{ images: string }>();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [images, setImages] = useState<Images[]>([]);
  const [lookClose, setLookClose] = useState<LookClose | null>(null);
  const handleLook = (objectFit: ObjectFit, img: string) => {
    setLookClose((prevState) =>
      prevState ? null : { objectFit: objectFit, img: img }
    );
  };
  const handleImages = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(e.target.files!);
    const newImages: Images[] = [];
    const newImagePreviews: string[] = [];
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    for (const file of files) {
      if (file.size >= 3125576) {
        setImageErrors({ images: "Max File Size is 3mb" });
        return;
      }
      if (!allowedExtensions.exec(file.name)) {
        setImageErrors({
          images:
            "Invalid file type. Only JPG, JPEG, and PNG files are allowed.",
        });
        return;
      }

      newImages.push(file as Images);
      newImages[newImages.length - 1].objectFit = "contain";
      newImagePreviews.push(URL.createObjectURL(file));
    }
    setImages([...images, ...newImages].slice(0, 6));
    setImagePreviews([...imagePreviews, ...newImagePreviews].slice(0, 6));
  };
  const handleImageSize = (name: string) => {
    const newData = [...images];
    newData?.forEach((img) => {
      if (img.name === name) {
        switch (img.objectFit) {
          case "contain":
            img.objectFit = "cover";
            return;
          case "cover":
            img.objectFit = "fill";
            return;
          case "fill":
            img.objectFit = "contain";
            return;
        }
      }
    });
    setImages(newData);
  };
  const removePreviews = (preview: string, num: number) => {
    setImages((prevState) => [
      ...prevState.slice(0, num),
      ...prevState.slice(num + 1),
    ]);
    const filteredPreviews = imagePreviews.filter((i) => i !== preview);
    setImagePreviews(filteredPreviews);
  };
  const contextValue: PostContextValue = {
    images,
    handleImages,
    imagePreviews,
    lookClose,
    handleLook,
    handleImageSize,
    removePreviews,
  };

  return (
    <PostContext.Provider value={contextValue}>
      <Routes>
        <Route path="/addPost" element={<AddPostPage />} />
      </Routes>
    </PostContext.Provider>
  );
};
