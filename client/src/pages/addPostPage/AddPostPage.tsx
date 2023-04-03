import React, { useRef, useState } from "react";
import {
  CancelBtn,
  Container,
  FileField,
  Image,
  ImagePreview,
  PostTextArea,
  Spinner,
  TopNavigation,
} from "../../components";
import { useLocation, Location, useNavigate } from "react-router-dom";
import { AddImageIcon } from "../../components/Icons";
import { numberToString } from "./../../utils/helpers";
import {
  getPostLoading,
  uploadPost,
  getPostError,
  setErorr,
} from "../../store/post";
import { usePosts } from "../../hoc/hooks/usePosts/usePost";
import { getCurrentUserId } from "./../../store/auth";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/createStore";

export const AddPostPage = () => {
  interface CurrentLocation extends Location {
    from?: string;
  }
  const isLoading = useSelector(getPostLoading());
  const error = useSelector(getPostError());
  const userId = useSelector(getCurrentUserId());
  const { from }: CurrentLocation = useLocation();
  const {
    images,
    lookClose,
    handleLook,
    handleImageSize,
    imagePreviews,
    handleImages,
    removePreviews,
  } = usePosts();
  const getObjectFit = (num: number) => {
    if (images.length > 0) {
      return images[num].objectFit;
    } else return "contain";
  };
  const navigate = useNavigate();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const handleText = () => {
    const height = textRef.current!.scrollHeight;
    textRef.current!.style.height = height + "px";
  };
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    if (images.length === 0) {
      dispatch(setErorr("Post Must Contain at least one Image"));
      return;
    }
    const text = textRef.current?.value || "";
    const post = {
      text,
      userId,
    };
    dispatch(
      uploadPost(post as { text: string; userId: string }, images, navigate)
    );
  };
  return (
    <section className="add-post">
      <Container background="white" name="container">
        <TopNavigation
          firstElement={<CancelBtn props={{ to: from ? from : "/" }} />}
          title="New Post"
          secondElement={
            isLoading ? (
              <Spinner />
            ) : (
              <button onClick={handleSubmit} className="add-post-btn">
                Post
              </button>
            )
          }
        />
        <div className="add-post__container">
          {lookClose ? (
            <ImagePreview
              goBack={handleLook}
              objectFit={lookClose.objectFit}
              url={lookClose.img}
            />
          ) : (
            <>
              <PostTextArea onChange={handleText} textRef={textRef} />
              {imagePreviews.length > 0 && (
                <div
                  className={
                    "add-post__images" +
                    ` add-post__images-${numberToString(
                      imagePreviews.length
                    )}` +
                    ` add-post__images-${
                      imagePreviews.length > 1 ? "grid" : ""
                    }`
                  }
                >
                  {imagePreviews.map((img, i) => (
                    <Image
                      lookClose={handleLook}
                      objectFit={getObjectFit(i)}
                      removePreview={removePreviews}
                      key={i}
                      place={i}
                      url={img}
                      name={images[i].name}
                      changeFit={handleImageSize}
                    />
                  ))}
                </div>
              )}
              {error && <p className="input__error">{error}</p>}
              <div className="add-post__actions">
                <FileField
                  id="file"
                  Icon={<AddImageIcon />}
                  multiple={true}
                  accept="image"
                  onChange={handleImages}
                />
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
};
