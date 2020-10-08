import React, { useEffect } from "react";
import Head from "next/head";
import Lee from "../lib/Lee";

import "../styles/pages/about.scss";

function About() {
  useEffect(() => {
    Lee.loadingFinish();
  });

  return (
    <div id="About">
      <Head>
        <title>국방프렌즈 - 소개</title>
      </Head>
      <div className="about__area parents">
        <div className="about__area__video parents">
          <video autoPlay loop muted playsInline>
            <source src="/static/videos/about-video.webm" type="video/webm" />
            <source src="/static/videos/about-video.mp4" type="video/mp4" />
          </video>
          <div className="about__area__video__fade"></div>
          <div className="about__area__video__contents">
            <div className="about__area__video__contents__title">
              <span>플랫폼 소개</span>
              <br />
              우리 모두는 친구이자 가족입니다.
              <br />
              우리는 하나입니다.
            </div>
            <img
              src="/static/icons/chat-bot.png"
              alt="bi"
              className="about__area__video__contents__bi"
            />
          </div>
        </div>
        <div className="about__area__contents parents">
          <div className="about__area__contents__title">
            모두가 소통할 수 있는 곳
          </div>
          <div className="about__area__contents__slogan">
            국방프렌즈에서는 누구나 친구가 될 수 있고 가족이 될 수 있습니다.
            관등성명이 아닌 닉네임을 사용하여 서로 고민을 상담하고 정보를 공유할
            수 있습니다. 병영생활을 하는 누구나 의견을 나누고 공유할 수 있는
            소통 플랫폼입니다.
          </div>

          <div className="about__area__contents__consult parents">
            <div className="about__area__contents__consult__title">
              고민이 있으신가요?
            </div>
            <div className="about__area__contents__consult__thumbnail">
              <img
                src="https://images.unsplash.com/photo-1475137979732-b349acb6b7e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1440&q=80"
                alt="background"
              />
            </div>
            <div className="about__area__contents__consult__box parents">
              <div className="about__area__contents__consult__box__left">
                <div className="about__area__contents__consult__box__left__title">
                  쉿! 걱정마세요.
                  <br />
                  우리의 비밀이야기니까
                </div>
                <div className="about__area__contents__consult__box__left__subject">
                  비대면 상담 서비스
                </div>
                <div className="about__area__contents__consult__box__left__paragraph">
                  꼭 말해주세요, 당신의 말 못할 고민들을.
                  <br />
                  철저한 보안과 익명성 추구로 절대 당신이 누구인지 밝혀지지
                  않아요.
                  <br />
                  당신은 스스로 아주 귀한 존재라는 것을 잊지 말아야 합니다.
                  <br />
                  여러분에게는 국방의 의무만이 있는 것이 아닙니다.
                  <br />
                  몸도 마음도 더 건강해지고 성장해서 가족의 품,
                  <br />
                  그리고 사회로 돌아가야 할 임무가 있습니다.
                </div>
                <div className="about__area__contents__consult__box__left__button">
                  바로가기
                </div>
              </div>
              <div className="about__area__contents__consult__box__right">
                <div className="wrapper">
                  <div className="base">
                    <div className="base-bottom"></div>
                    <div className="lock-inside-top"></div>
                    <div className="lock-inside-bottom"></div>
                  </div>
                  <div className="lock-cirlce">
                    <div className="lock-circle-inside"></div>
                  </div>
                  <div className="lock-box"></div>
                </div>
                <div className="about__area__contents__consult__box__right__title">
                  국방프렌즈는 상담자의 <span>이름</span>, <span>이메일</span>,
                  <span>아이피</span>, <span>비밀번호</span> 등을 수집하지
                  않습니다.
                </div>
                <div className="about__area__contents__consult__box__right__paragraph">
                  기존 국방헬프콜의 공개 게시판 형태의 문제인 제목, 닉네임,
                  작성날짜 그리고 누구나 무차별 비밀번호를 대입하여 글의 내용을
                  훔쳐보는 문제를 보완하여 철저한 보안을 갖췄습니다.
                  <br />
                  <br />
                  <span>더 이상 나의 신분이 노출될까 두려워하지 마세요!</span>
                </div>
              </div>
            </div>
          </div>

          <div className="about__area__contents__community parents">
            <div className="about__area__contents__community__title">
              우리 함께 지내요!
            </div>
            <div className="about__area__contents__community__slogan">
              다른 군 장병 및 군무원분들과 병영생활 중 얻는 다양한 팁과 정보들을
              공유합니다. 그리고 취미가 같은 군 장병 및 군무원과 동아리를 만들고
              비대면 동아리 활동을 즐겨보세요!
            </div>
            <div className="about__area__contents__community__box parents">
              <div className="about__area__contents__community__box__left">
                <div className="about__area__contents__community__box__left__title">
                  우와~ 김일병님?
                  <br />
                  이거 진짜 맛있습니다!
                </div>
                <div className="about__area__contents__community__box__left__subject">
                  커뮤니티
                </div>
                <div className="about__area__contents__community__box__left__paragraph">
                  당신이 모르는, 당신이 몰랐던 병영생활 꿀팁?
                  <br />
                  다른 군 장병 모두와 다양한 취미생활을 공유할 수 있고
                  <br />
                  온라인으로 비대면 동아리 활동을 할 수 있습니다.
                  <br />
                  다른 부대원들과 병영 친구가 되어 고민을 나누며 이야기 할 수
                  있고
                  <br />
                  다양한 정보를 나누며 새로운 병영생활의 즐거움을 얻을 수
                  있습니다.
                </div>
                <div className="about__area__contents__community__box__left__button">
                  바로가기
                </div>
              </div>
              <div className="about__area__contents__community__box__right">
                <img src="/static/images/about-community.jpg" alt="community" />
              </div>
            </div>
          </div>

          <div className="about__area__contents__goal parents">
            <div className="about__area__contents__goal__title">
              모두가 동등한 관계
            </div>
            <div className="about__area__contents__goal__slogan">
              국방프렌즈는 닉네임을 사용하여 모두가 동등한 관계에서 정보를
              공유하고 이야기할 수 있습니다. 모두가 친구 또는 가족이 되어 서로의
              고민을 나누고 정보를 습득할 수 있는 커뮤니티를 추구합니다.
            </div>
            <div className="about__area__contents__goal__hands">
              <img src="/static/icons/hands.png" alt="hands" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
