import React, { useEffect, useState } from "react";

import { editFormProps } from "./form.props";
import { AvatarField, Button, InputField } from "../..";
import { Errors, User } from "../../../props/props";
import { validator } from "../../../utils/validator";
import { editValidator } from "../../../utils/validatorConfig";
import { useAppDispatch } from "../../../store/createStore";
import { editUser, getIsLoading, getUserError } from "../../../store/user";
import { useSelector } from "react-redux";

export const EditForm = ({ user }: editFormProps) => {
  const [image, setImage] = useState<File | undefined>();
  const [errors, setErrors] = useState<Errors>();
  const [data, setData] = useState<User>({ ...user });
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevState) => ({ ...prevState, [target.id]: target.value }));
  };
  const isLoading = useSelector(getIsLoading());
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
  let userError = useSelector(getUserError());

  const dispatch = useAppDispatch();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setErrors({});
    interface Data {
      [key: string]: any; // Index signature for string keys
    }
    e.preventDefault();

    const errors = validator(data as Data, editValidator);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      await dispatch(editUser(data, image));
    }
  };
  useEffect(() => {
    if (userError instanceof Object && Object.keys(userError).length > 0) {
      setErrors(userError);
    }
  }, [userError]);

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <AvatarField
        onChange={handleImage}
        url={imagePreview || user.image}
        id="avatar"
        error={imageError?.image}
      />
      <InputField
        label="email"
        type={"text"}
        onChange={handleChange}
        placeholder={"email"}
        value={data.email}
        error={errors?.email}
      />
      <InputField
        label="name"
        type={"text"}
        onChange={handleChange}
        placeholder={"name"}
        value={data.name}
        error={errors?.name}
      />
      <InputField
        label="status"
        onChange={handleChange}
        type={"text"}
        placeholder={"Your status"}
        value={data.status || ""}
      />
      {typeof userError === "string" && (
        <p className="input__error">{userError}</p>
      )}
      <Button loading={isLoading} color="primary" text="Save" />
    </form>
  );
};
