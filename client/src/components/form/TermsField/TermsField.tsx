import React, { useState } from "react";
import { TermsFieldProps } from "./TermsField.props";
import { AcceptIcon } from "./AcceptIcon";

export const TermsField = ({
  checked,
  setChecked,
  setTerms,
  error,
}: TermsFieldProps) => {
  return (
    <>
      <div className="terms__field">
        <label
          onClick={setChecked}
          htmlFor="terms"
          className={"terms__label" + (checked ? " checked" : "")}
        >
          {checked && <AcceptIcon />}
        </label>
        <label onClick={setChecked} className="terms__label-action">
          I agree to the
          <button type="button" onClick={setTerms} className="terms__btn">
            Terms of Service
          </button>
        </label>
        <input type="checkbox" className="visually-hidden" />
      </div>
      {error && <p className="input__error">{error}</p>}
    </>
  );
};
