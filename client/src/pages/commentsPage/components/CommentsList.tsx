import React, { useState } from "react";
import { CommentData, ReplyData } from "./Comments.props";
import { Comment } from "./Comment";
import { useSelector } from "react-redux";
import { getLikes } from "../../../store/likes";
import { likesCount, checkIfLiked } from "../../../utils/helpers";
export const CommentsList = ({
  reply,
  comments,
  userId,
}: {
  userId: string;
  reply?: ReplyData;
  comments: CommentData[];
}) => {
  const nestComments = () => {
    const notNestedComments: CommentData[] = [];
    const nestedComments: CommentData[] = [];
    comments.forEach((c) => {
      if (c.reply?.parentId) {
        nestedComments.push(c);
      } else notNestedComments.push(c);
    });

    return notNestedComments.map((c) => {
      return {
        ...c,
        replies: nestedComments.filter((n) => n.reply?.parentId === c._id),
      };
    });
  };
  const likes = useSelector(getLikes());
  const [children, setChildren] = useState<string[]>([]);
  const openChildren = (id: string) => {
    setChildren((prevState) => [...prevState, id]);
  };
  const allComments = nestComments();

  return (
    <>
      {likes && (
        <ul className="comments">
          {allComments.map((c) => (
            <li key={c._id} className="comments__item">
              <Comment
                currentUserId={userId}
                likes={likesCount(c._id, likes)}
                liked={checkIfLiked(c._id, userId, likes)}
                comment={c}
                reply={reply}
              />
              {!children.includes(c._id) &&
                c.replies &&
                c.replies?.length > 0 && (
                  <button
                    onClick={() => openChildren(c._id)}
                    className="comments__openNested"
                  >
                    Watch {c.replies.length} more reply
                  </button>
                )}
              {children.includes(c._id) && (
                <ul className="comments comments__children">
                  {c.replies.map((r) => (
                    <li key={r._id} className="comments__item">
                      <Comment
                        currentUserId={userId}
                        likes={likesCount(r._id, likes)}
                        liked={checkIfLiked(r._id, userId, likes)}
                        name={r.reply?.name}
                        nested={true}
                        comment={r}
                        reply={reply}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
