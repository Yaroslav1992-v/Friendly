import React, { useEffect, useState } from "react";
import { ContentProps } from "./Publication.props";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../utils/helpers";

export const PublicationContent = ({
  likes,
  postId,
  comments,
  text,
  date,
}: ContentProps) => {
  const [data, setData] = useState<{
    text: string | undefined;
    check: boolean;
  }>({ text, check: false });
  useEffect(() => {
    if (text) {
      if (text.length > 100) {
        setData({ text: text.slice(0, 100), check: false });
      }
    }
  }, []);
  const handleData = () => {
    setData({ text: text, check: true });
  };
  return (
    <div className="publication__content">
      <div className="publication__content-likes">Likes: {likes}</div>
      {text && (
        <div className="publication__content-content">
          <p className="publication__content-text">
            {data.text}
            {text.length > 100 && !data.check && "..."}
          </p>
          {text.length > 100 && !data.check && (
            <button
              onClick={handleData}
              className="publication__content-text-more"
            >
              show more
            </button>
          )}
        </div>
      )}
      {comments > 0 && (
        <Link
          className="publication__content-link"
          to={`/p/${postId}/comments`}
        >
          View {comments} comments
        </Link>
      )}
      <p className="publication__content-date">{formatDate(date)}</p>
    </div>
  );
};
