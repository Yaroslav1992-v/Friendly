import React, { useRef, useState } from "react";
import { Errors } from "./../../../props/props";
import {
  AvatarField,
  InputField,
  Button,
  TermsField,
  Terms,
} from "../../index";
import { validator } from "../../../utils/validator";
import { registerValidator } from "../../../utils/validatorConfig";
import { useAppDispatch } from "../../../store/createStore";
import { signUp } from "../../../store/auth";
import { useSelector } from "react-redux";
import { getAuthError } from "./../../../store/auth";
import fileService from "../../../services/fileService";

export const RegisterForm = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const authError = useSelector(getAuthError());
  const [errors, setErrors] = useState<Errors>();
  const handleCheck = () => {
    setChecked((prevState) => !prevState);
  };
  const [terms, setTerms] = useState<boolean>(false);
  const handleTerms = () => {
    setTerms((prevState) => !prevState);
  };
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageError, setImageError] = useState<Pick<Errors, "image">>();
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files![0];
    if (file.size >= 3125576) {
      setImageError({ image: "Max File Size is 3mb" });
      return;
    }

    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(file.name)) {
      setErrors({
        ...errors,
        image: "Invalid file type. Only JPG, JPEG, and PNG files are allowed.",
      });
      return;
    }
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      email: emailRef.current!.value,
      name: nameRef.current!.value,
      password: passwordRef.current!.value,
      terms: checked ? "check" : "",
    };
    const errors = validator(userData, registerValidator);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      dispatch(signUp({ ...userData, image: image! }));
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="form__container">
          <AvatarField
            onChange={handleImage}
            url={imagePreview}
            id="avatar"
            inputRef={avatarRef}
            error={imageError?.image}
          />
          {authError && <p className="input__error">{authError}</p>}
          <InputField
            error={errors?.name}
            placeholder="Name"
            type="text"
            inputRef={nameRef}
          />
          <InputField
            error={errors?.email}
            placeholder="Email"
            type="text"
            inputRef={emailRef}
          />
          <InputField
            error={errors?.password}
            placeholder="Password"
            type="password"
            inputRef={passwordRef}
          />
          <TermsField
            error={errors?.terms}
            setTerms={handleTerms}
            checked={checked}
            setChecked={handleCheck}
          />
        </div>

        <Button color="black" text="Sign Up" />
      </form>

      <Terms show={terms} setTerms={handleTerms} />
    </>
  );
};
