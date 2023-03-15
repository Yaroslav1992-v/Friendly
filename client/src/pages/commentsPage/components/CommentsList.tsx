import React from "react";
import { CommentData, ReplyData } from "./Comments.props";
import { Comment } from "./Comment";
export const CommentsList = ({
  reply,
  comments,
}: {
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
  const allComments = nestComments();
  return (
    <ul className="comments">
      {allComments.map((c) => (
        <li key={c._id} className="comments__item">
          <Comment
            _id={c._id}
            reply={reply}
            user={c.user}
            content={c.content}
            createdAt={c.createdAt}
          />
          {c.replies && c.replies?.length > 0 && (
            <ul className="comments comments__children">
              {c.replies.map((r) => (
                <li key={r._id} className="comments__item">
                  <Comment
                    _id={r._id}
                    reply={reply}
                    user={r.user}
                    content={r.content}
                    createdAt={r.createdAt}
                  />
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};
