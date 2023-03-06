import React from "react";

export const CancelBtn = ({ cancel }: { cancel: () => void }) => {
  return (
    <button onClick={cancel} className="cancel-btn">
      Cancel
    </button>
  );
};
