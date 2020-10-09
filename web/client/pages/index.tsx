import React from "react";
import Head from "next/head";

import "../styles/pages/index.scss";

import HomeIntro from "../components/Home/HomeIntro/HomeIntro";
import HomeNotice from "../components/Home/HomeNotice/HomeNotice";
import HomeCard from "../components/Home/HomeCard/HomeCard";

const Index = () => {
  return (
    <div id="Home">
      <Head>
        <title>국방프렌즈</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="home__area parents">
        <div className="home__area__contents parents">
          <div className="home__area__contents__top parents">
            <div className="home__area__contents__top__text">
              본 사이트는 2020 군장병 공개SW 역량강화교육 해커톤 프로젝트의
              산출물이며 서비스를 정식 시행하고 있지 않음을 밝힙니다.
            </div>
          </div>
          <HomeIntro />
          <HomeNotice />
          <HomeCard />
        </div>
      </div>
    </div>
  );
};

export default Index;
