import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  TopNavigation,
  ArrowButton,
  DotsBtn,
  TextForm,
} from "../../components";
import { createComment, getComments, loadComments } from "../../store/comment";
import { useAppDispatch } from "../../store/createStore";
import { useSelector } from "react-redux";
import { createCommentData, Reply } from "./components/Comments.props";
import { CommentsList } from "./components/CommentsList";
import { getCurrentUserId } from "./../../store/auth";
import { loadCommentsLikes } from "../../store/likes";
import { createNotificationData, NotificationType } from "../../props/props";
import { getPostByUserId, loadCurrentPost } from "../../store/post";
import { createNotification } from "../../store/notificaton";
import { UseApp } from "../../hoc/AppLoader";

export const CommentsPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const goBack = () => {
    const to = location.state?.from ? location.state.from : "/";
    navigate(to);
  };

  const [reply, setReply] = useState<Reply | null>();
  const handleReply = (name: string, to: string, parentId: string) => {
    findParent(parentId);
    setReply(() => ({
      name,
      to,
      parentId: parent._id,
    }));
  };
  const { socket } = UseApp();
  let post = useSelector(getPostByUserId(postId as string));
  const comments = useSelector(getComments());

  let parent: any;
  const findParent = (commentId: string) => {
    parent = comments.find((c) => c._id === commentId);
    if (parent && parent.reply?.parentId) {
      findParent(parent.reply.parentId);
    }
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!post) {
      dispatch(loadCurrentPost(postId as string));
    }
    dispatch(loadComments(postId as string));
    dispatch(loadCommentsLikes(postId as string));
  }, []);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [comment, setComment] = useState<string>();
  const userId = useSelector(getCurrentUserId());

  const handleText = () => {
    if (
      reply &&
      !textRef.current?.value.toLowerCase().includes(reply.name!.toLowerCase())
    ) {
      setReply(null);
    }
    setComment(textRef.current?.value);
    const height = textRef.current!.scrollHeight;
    if (textRef.current!.scrollHeight < 150) {
      textRef.current!.style.height = height + "px";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newComment = {
      content: reply?.name ? comment?.replace(`@${reply.name}`, "") : comment,
      user: userId,
      postId: postId,
      reply: reply,
    };

    setComment("");
    setReply(null);
    const createdComment = await dispatch(
      createComment(newComment as createCommentData)
    );

    if (
      post &&
      createdComment &&
      userId &&
      postId &&
      userId !== post.userId._id
    ) {
      const notif: createNotificationData = {
        author: userId,
        content: createdComment.content,
        type: reply ? NotificationType.CommentReply : NotificationType.Comment,
        reciever: post.userId._id,
        typeId: createdComment._id,
        post: {
          id: postId,
          url: !reply ? post.images[0].url : undefined,
        },
      };
      const notification = await dispatch(createNotification(notif));
      socket.emit("notify", notification);
    }
  };
  return (
    <section className="comments-page">
      <div className="container">
        <TopNavigation
          firstElement={<ArrowButton side="left" click={goBack} />}
          title="Comments"
          secondElement={<DotsBtn />}
        />
        <CommentsList
          userId={userId as string}
          reply={{ ...reply, onReply: handleReply }}
          comments={comments}
        />
        <TextForm
          reply={reply?.name && reply.name}
          value={comment || ""}
          textRef={textRef}
          handleSubmit={handleSubmit}
          handleText={handleText}
          disabled={!comment}
          placeholder="Write Your Comment"
        />
      </div>
    </section>
  );
};
