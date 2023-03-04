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

export const RegisterForm = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>();
  const handleCheck = () => {
    setChecked((prevState) => !prevState);
  };
  const [terms, setTerms] = useState<boolean>(false);
  const handleTerms = () => {
    setTerms((prevState) => !prevState);
  };
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files![0];
    if (file.size >= 3125576) {
      setErrors({ ...errors, image: "Max File Size is 3mb" });
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      email: emailRef.current!.value,
      name: nameRef.current!.value,
      password: passwordRef.current!.value,
      terms: checked ? "check" : "",
    };

    const errors = validator(userData, registerValidator);
    setErrors(errors);
    console.log(errors);
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
            error={errors?.image}
          />
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
