import React, { useState } from "react";
import axios from "axios";
import Lee from "../../../lib/Lee";
import { strapiLogin } from "../../../lib/auth";

import "./Login.scss";

export type LoginInputs = {
  identifier: string;
  password: string;
};

const Login = () => {
  const initialValues: LoginInputs = {
    identifier: "",
    password: "",
  };

  function closeLogin() {
    const login = document.getElementById("Login");
    Lee.removeClass(login, "active");
    setInputs({
      identifier: "",
      password: "",
    });
  }

  function openRegister() {
    closeLogin();
    Lee.openRegistration();
  }

  const [inputs, setInputs] = useState(initialValues);

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    const fetchPostInfo = async () => {
      try {
        const res: any = await axios.post(
          "http://127.0.0.1/auth/local",
          inputs
        );
        if (res.error) {
          return res.error;
        }
        if (res.data && res.data.jwt) {
          let email = inputs.identifier;
          let password = inputs.password;
          strapiLogin(email, password);
          closeLogin();
          Lee.loadingStart();
          return;
        }
        return "Something unexpected happened!";
      } catch {
        alert(`아이디 또는 비밀번호가 일치하지 않습니다.`);
      }
    };

    fetchPostInfo();
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    e.persist();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div id="Login">
      <div className="login__area">
        <div className="login__area__fade" onClick={closeLogin} />
        <div className="login__area__contents parents">
          <div className="login__area__contents__logo">
            로그인
            <img src="/static/icons/friends-logo.png" alt="logo" />
          </div>
          <img
            src="/static/icons/close-white.png"
            className="login__area__contents__close"
            alt="x"
            onClick={closeLogin}
          />
          <div className="login__area__contents__title">
            국방프렌즈에 로그인하고 서비스를 이용하세요!
          </div>
          <div className="login__area__contents__form parents">
            <form onSubmit={handleSubmit}>
              <div className="login__area__contents__form__context parents">
                <input
                  type="text"
                  className="login__area__contents__form__context__input"
                  placeholder="닉네임"
                  id="identifier"
                  name="identifier"
                  onChange={handleInputChange}
                  value={inputs.identifier}
                />
              </div>
              <div className="login__area__contents__form__context parents">
                <input
                  type="password"
                  className="login__area__contents__form__context__input"
                  placeholder="비밀번호"
                  id="password"
                  name="password"
                  onChange={handleInputChange}
                  value={inputs.password}
                />
              </div>
              <ul className="login__area__contents__form__buttons parents">
                <button
                  className="login__area__contents__form__buttons__button login"
                  type="submit"
                >
                  로그인
                </button>
                <li
                  className="login__area__contents__form__buttons__button regist"
                  onClick={openRegister}
                >
                  회원가입
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
