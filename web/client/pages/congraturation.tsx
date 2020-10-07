import React, { useEffect, useState } from "react";
import Head from "next/head";
import Cookies from "js-cookie";
import Router from "next/router";
import "../styles/pages/congraturation.scss";
import Lee from "../lib/Lee";

function Congraturation() {
  let [login, setLogin] = useState(false);

  useEffect(() => {
    if (Cookies.get("username") && Cookies.get("jwt")) {
      Router.push("/");
      Lee.loadingStart();
    } else {
      Lee.loadingFinish();
      setLogin(true);
    }
  });

  return (
    <div id="Congraturation">
      <Head>
        <title>가입완료</title>
      </Head>
      {login && (
        <div className="congraturation__area parents">
          <div className="congraturation__area__contents parents">
            <div className="congraturation__area__contents__title">
              가입이 완료되었어요!
            </div>
            <div className="congraturation__area__contents__mission">
              이제 다양한 친구들을 만나보세요!
            </div>
            <div
              className="congraturation__area__contents__login"
              onClick={Lee.openLogin}
            >
              로그인
            </div>
            <div className="congraturation__area__contents__cannon">
              <div className="cannon first">
                <div className="cannon__path cannon__path--sm cannon__path--angle-2">
                  <div className="cannon__confetti cannon__confetti--flake cannon__confetti--color-3"></div>
                  <div className="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-1"></div>
                  <div className="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-2"></div>
                  <div className="cannon__confetti cannon__confetti--flake cannon__confetti--color-1"></div>
                  <div className="cannon__confetti-spacer"></div>
                </div>
                <div className="cannon__path cannon__path--md cannon__path--angle-1">
                  <div className="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-2"></div>
                  <div className="cannon__confetti cannon__confetti--flake cannon__confetti--color-2"></div>
                  <div className="cannon__confetti cannon__confetti--flake cannon__confetti--color-3"></div>
                  <div className="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-1"></div>
                  <div className="cannon__confetti cannon__confetti--flake cannon__confetti--color-4"></div>
                  <div className="cannon__confetti-spacer"></div>
                </div>
                <div className="cannon__path cannon__path--lg cannon__path--angle0">
                  <div className="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-1"></div>
                  <div className="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-4"></div>
                  <div className="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-2"></div>
                  <div className="cannon__confetti cannon__confetti--flake cannon__confetti--color-3"></div>
                  <div className="cannon__confetti-spacer"></div>
                </div>
                <div className="cannon__path cannon__path--md cannon__path--angle1">
                  <div className="cannon__confetti cannon__confetti--flake cannon__confetti--color-3"></div>
                  <div className="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-1"></div>
                  <div className="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-4"></div>
                  <div className="cannon__confetti cannon__confetti--flake cannon__confetti--color-3"></div>
                  <div className="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-2"></div>
                  <div className="cannon__confetti-spacer"></div>
                </div>
                <div className="cannon__path cannon__path--sm cannon__path--angle2">
                  <div className="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-2"></div>
                  <div className="cannon__confetti cannon__confetti--flake cannon__confetti--color-3"></div>
                  <div className="cannon__confetti cannon__confetti--flake cannon__confetti--color-4"></div>
                  <div className="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-1"></div>
                  <div className="cannon__confetti-spacer"></div>
                </div>
              </div>
              <div className="cannon second">
                <div className="cannon__path cannon__path--sm cannon__path--angle-2">
                  <div className="cannon__confetti cannon__confetti--flake cannon__confetti--color-3"></div>
                  <div className="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-1"></div>
                  <div className="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-2"></div>
                  <div className="cannon__confetti cannon__confetti--flake cannon__confetti--color-1"></div>
                  <div className="cannon__confetti-spacer"></div>
                </div>
                <div className="cannon__path cannon__path--md cannon__path--angle-1">
                  <div className="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-2"></div>
                  <div className="cannon__confetti cannon__confetti--flake cannon__confetti--color-2"></div>
                  <div className="cannon__confetti cannon__confetti--flake cannon__confetti--color-3"></div>
                  <div className="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-1"></div>
                  <div className="cannon__confetti cannon__confetti--flake cannon__confetti--color-4"></div>
                  <div className="cannon__confetti-spacer"></div>
                </div>
                <div className="cannon__path cannon__path--lg cannon__path--angle0">
                  <div className="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-1"></div>
                  <div className="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-4"></div>
                  <div className="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-2"></div>
                  <div className="cannon__confetti cannon__confetti--flake cannon__confetti--color-3"></div>
                  <div className="cannon__confetti-spacer"></div>
                </div>
                <div className="cannon__path cannon__path--md cannon__path--angle1">
                  <div className="cannon__confetti cannon__confetti--flake cannon__confetti--color-3"></div>
                  <div className="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-1"></div>
                  <div className="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-4"></div>
                  <div className="cannon__confetti cannon__confetti--flake cannon__confetti--color-3"></div>
                  <div className="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-2"></div>
                  <div className="cannon__confetti-spacer"></div>
                </div>
                <div className="cannon__path cannon__path--sm cannon__path--angle2">
                  <div className="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-2"></div>
                  <div className="cannon__confetti cannon__confetti--flake cannon__confetti--color-3"></div>
                  <div className="cannon__confetti cannon__confetti--flake cannon__confetti--color-4"></div>
                  <div className="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-1"></div>
                  <div className="cannon__confetti-spacer"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Congraturation;
