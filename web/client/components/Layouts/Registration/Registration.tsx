import React, { useState } from "react";
import "./Registration.scss";
import Lee from "../../../lib/Lee";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Router from "next/router";
import Strapi from "strapi-sdk-javascript/build/main";
import { unsetToken } from "../../../lib/auth";

import RegistrationCharacter from "./RegistrationCharacter/RegistrationCharacter";

const apiUrl = process.env.API_URL || "http://127.0.0.1";
const strapi = new Strapi(apiUrl);

const UPLOAD_MUTATION = gql`
  mutation($image: Upload!, $id: ID!) {
    upload(
      refId: $id
      source: "users-permissions"
      ref: "user"
      field: "thumbnail"
      file: $image
    ) {
      id
    }
  }
`;

const AVATAR_MUTATION = gql`
  mutation($avatar: String!, $id: ID!) {
    updateUser(input: { where: { id: $id }, data: { avatar: $avatar } }) {
      user {
        username
      }
    }
  }
`;

export type RegistrationInputs = {
  username: string;
  password: string;
};

function Registation() {
  const initialValues: RegistrationInputs = {
    username: "",
    password: "",
  };

  function closeRegistration() {
    let registrationArea = Lee.get("Registration");
    Lee.removeClass(registrationArea, "active");
    setInputs({
      username: "",
      password: "",
    });
  }

  const [uploadThumbnail] = useMutation(UPLOAD_MUTATION);
  const [updateAvatar] = useMutation(AVATAR_MUTATION);

  const [inputs, setInputs] = useState(initialValues);
  const [thumbnail, setThumbnail] = useState();

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    const addUser = async () => {
      try {
        let username = inputs.username;
        let password = inputs.password;
        const email = username + "@kookbang.kr";

        strapi.register(username, email, password).then((res: any) => {
          if (res) {
            if (typeof thumbnail === "object") {
              uploadThumbnail({
                variables: {
                  image: thumbnail,
                  id: res.user.id,
                },
              });
            } else if (typeof thumbnail === "string") {
              updateAvatar({
                variables: {
                  avatar: thumbnail,
                  id: res.user.id,
                },
              });
            }
            unsetToken();
            closeRegistration();
            Lee.loadingStart();
            Router.push(`/congraturation`);
          }
        });
      } catch {
        alert(`요청이 잘못 되었습니다.`);
      }
    };

    if (
      inputs.username === "" ||
      inputs.username === undefined ||
      inputs.username === null ||
      inputs.password === "" ||
      inputs.password === undefined ||
      inputs.password === null
    ) {
      if (inputs.username.length < 2 || inputs.username.length > 8) {
        alert("닉네임은 2자 이상 8자 이하만 가능합니다.");
      }

      if (inputs.password.length < 6 || inputs.password.length > 20)
        alert("비밀번호는 6자리 이상 20자리 이하만 가능합니다.");
    } else {
      addUser();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    e.persist();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div id="Registration">
      <div className="registration__area">
        <div className="registration__area__fade" onClick={closeRegistration} />

        <div className="registration__area__contents parents">
          <div className="registration__area__contents__logo">
            회원가입
            <img src="/static/icons/friends-logo.png" alt="logo" />
          </div>
          <img
            src="/static/icons/close-white.png"
            className="registration__area__contents__close"
            alt="x"
            onClick={closeRegistration}
          />
          <div className="registration__area__contents__title">
            국방프렌즈에 가입하고 다양한 친구를 만나세요!
          </div>
          <div className="registration__area__contents__form parents">
            <form onSubmit={handleSubmit}>
              <div className="registration__area__contents__form__thumbnail">
                <div className="registration__area__contents__form__thumbnail__img">
                  <img
                    src="/static/characters/basic/g20.png"
                    alt="thumbnail"
                    id="userThumbnail"
                    onClick={Lee.openRegistrationCharacter}
                  />
                </div>
              </div>
              <div className="registration__area__contents__form__context parents">
                <input
                  type="text"
                  className="registration__area__contents__form__context__input"
                  placeholder="닉네임"
                  id="username"
                  name="username"
                  maxLength={8}
                  minLength={2}
                  onChange={handleInputChange}
                  value={inputs.username}
                />
              </div>
              <div className="registration__area__contents__form__context parents">
                <input
                  type="password"
                  className="registration__area__contents__form__context__input"
                  placeholder="비밀번호"
                  id="Rpassword"
                  name="password"
                  maxLength={20}
                  minLength={6}
                  onChange={handleInputChange}
                  value={inputs.password}
                />
              </div>
              <ul className="registration__area__contents__form__buttons parents">
                <button
                  type="submit"
                  className="registration__area__contents__form__buttons__button"
                >
                  가입하기
                </button>
              </ul>
            </form>
          </div>
        </div>
      </div>
      <RegistrationCharacter
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
      />
    </div>
  );
}

export default Registation;
