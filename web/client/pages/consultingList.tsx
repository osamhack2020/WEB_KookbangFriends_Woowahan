import React, { useEffect, useState } from "react";
import Head from "next/head";
import Lee from "../lib/Lee";
import Cookies from "js-cookie";
import Router from "next/router";

import "../styles/pages/consultingList.scss";

function ConsultingList() {
  let [login, setLogin] = useState(false);

  useEffect(() => {
    if (Cookies.get("username") && Cookies.get("jwt")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
    Lee.loadingFinish();
  });

  function auth(target) {
    if (login) {
      Lee.loadingStart();
      setTimeout(() => {
        Router.push(`consulting?type=${target}`);
      }, 400);
    } else {
      Lee.openLogin();
    }
  }

  return (
    <div id="ConsultingList">
      <Head>
        <title>국방프렌즈 - 상담 서비스</title>
      </Head>
      <div className="consulting-list__area parents">
        <div className="consulting-list__area__video parents">
          <video autoPlay loop muted playsInline className="pc">
            <source
              src="/static/videos/consulting-background.webm"
              type="video/webm"
            />
            <source
              src="/static/videos/consulting-background.mp4"
              type="video/mp4"
            />
          </video>
          <video autoPlay loop muted playsInline className="mobile">
            <source
              src="/static/videos/consulting-background-mobile.webm"
              type="video/webm"
            />
            <source
              src="/static/videos/consulting-background-mobile.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="consulting-list__area__contents parents">
          <div className="consulting-list__area__contents__title">
            고마운 당신, 고민이 있으신가요?
          </div>
          <div className="consulting-list__area__contents__slogan">
            꼭 말해주세요, 당신의 말 못할 고민들을. 철저한 보안과 익명성 추구로
            절대로 당신이 누구인지 밝혀지지 않아요. 부담 없이 당신의 고민을
            이야기 해주세요!
          </div>

          <div className="consulting-list__area__contents__lists parents">
            <div className="consulting-list__area__contents__lists__title">
              어떤 고민이신가요?
            </div>
            <ul className="consulting-list__area__contents__lists__categories">
              <li>
                <div className="consulting-list__area__contents__lists__categories__thumbnail">
                  <img src="/static/icons/sad.png" alt="thumbnail" />
                </div>
                <div className="consulting-list__area__contents__lists__categories__title">
                  병영생활 고충상담
                  <div className="consulting-list__area__contents__lists__categories__title__paragraph">
                    복무부적응, 인권침해, 자살예방을 위한 위기상담 등 병영생활
                    내 모든 고민을 상담합니다.
                  </div>
                </div>
                <div
                  className="consulting-list__area__contents__lists__categories__button"
                  onClick={function () {
                    auth("병영생활 고충상담");
                  }}
                >
                  상담하기
                </div>
              </li>
              <li>
                <div className="consulting-list__area__contents__lists__categories__thumbnail">
                  <img src="/static/icons/corruption.png" alt="thumbnail" />
                </div>
                <div className="consulting-list__area__contents__lists__categories__title">
                  방위사업비리 신고상담
                  <div className="consulting-list__area__contents__lists__categories__title__paragraph">
                    방위사업, 군납, 부정군수품 거래 및 유통관련 범죄에 대해
                    상담합니다.
                  </div>
                </div>
                <div
                  className="consulting-list__area__contents__lists__categories__button"
                  onClick={function () {
                    auth("방위사업비리 신고상담");
                  }}
                >
                  상담하기
                </div>
              </li>
              <li>
                <div className="consulting-list__area__contents__lists__categories__thumbnail">
                  <img src="/static/icons/military-crime.png" alt="thumbnail" />
                </div>
                <div className="consulting-list__area__contents__lists__categories__title">
                  군범죄 · 테러 신고상담
                  <div className="consulting-list__area__contents__lists__categories__title__paragraph">
                    군과 관련된 각종 범죄 · 테러 등 기타 군과 관련된 부정부패 및
                    사건/사고를 상담합니다.
                  </div>
                </div>
                <div
                  className="consulting-list__area__contents__lists__categories__button"
                  onClick={function () {
                    auth("군범죄 테러 신고상담");
                  }}
                >
                  상담하기
                </div>
              </li>
              <li>
                <div className="consulting-list__area__contents__lists__categories__thumbnail">
                  <img src="/static/icons/crime.png" alt="thumbnail" />
                </div>
                <div className="consulting-list__area__contents__lists__categories__title">
                  성폭력 신고상담
                  <div className="consulting-list__area__contents__lists__categories__title__paragraph">
                    군 내 성 관련 인권침해 신고 및 피해자 상담 등을 진행합니다.
                  </div>
                </div>
                <div
                  className="consulting-list__area__contents__lists__categories__button"
                  onClick={function () {
                    auth("성폭력 신고상담");
                  }}
                >
                  상담하기
                </div>
              </li>
              <li>
                <div className="consulting-list__area__contents__lists__categories__thumbnail">
                  <img
                    src="/static/icons/gender-equality.png"
                    alt="thumbnail"
                  />
                </div>
                <div className="consulting-list__area__contents__lists__categories__title">
                  양성평등 신고상담
                  <div className="consulting-list__area__contents__lists__categories__title__paragraph">
                    군 내 성별에 따른 차별 폐지 등 양성평등 이념을 실현하기 위한
                    성고충전문상담을 진행합니다.
                  </div>
                </div>
                <div
                  className="consulting-list__area__contents__lists__categories__button"
                  onClick={function () {
                    auth("양성평등 신고상담");
                  }}
                >
                  상담하기
                </div>
              </li>
              <li>
                <div className="consulting-list__area__contents__lists__categories__thumbnail">
                  <img src="/static/icons/faq.png" alt="thumbnail" />
                </div>
                <div className="consulting-list__area__contents__lists__categories__title">
                  기타 문의
                  <div className="consulting-list__area__contents__lists__categories__title__paragraph">
                    상담 관련 문의사항이 있으시면 언제든지 말씀해주세요.
                  </div>
                </div>
                <div
                  className="consulting-list__area__contents__lists__categories__button"
                  onClick={function () {
                    auth("기타 문의");
                  }}
                >
                  상담하기
                </div>
              </li>
            </ul>
          </div>

          <div className="consulting-list__area__contents__help parents">
            <div className="consulting-list__area__contents__help__title">
              인터넷으로 상담 받기 어려우신가요?
            </div>
            <img src="/static/images/helpcall.jpg" alt="helpcall" />
            <div className="consulting-list__area__contents__help__slogan">
              병영 내 언제나 당신 곁에 있는 국방헬프콜이 있습니다. 인터넷망은
              물론 국방망, 군전화, 휴대전화로 상담이 가능하니 고민이 있으시면 꼭
              연락해주세요!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsultingList;
