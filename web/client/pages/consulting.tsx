import React, { useEffect } from "react";
import Head from "next/head";
import Lee from "../lib/Lee";
import Cookies from "js-cookie";
import Router from "next/router";

import "../styles/pages/consulting.scss";

import CounsultingPerson from "../components/Consulting/ConsultingPerson/ConsultingPerson";

function Consulting({ query }) {
  useEffect(() => {
    if (
      query.type === "병영생활 고충상담" ||
      query.type === "기타 문의" ||
      query.type === "방위사업비리 신고상담" ||
      query.type === "군범죄 테러 신고상담" ||
      query.type === "성폭력 신고상담" ||
      query.type === "양성평등 신고상담"
    ) {
      if (Cookies.get("username") && Cookies.get("jwt")) {
        Lee.loadingFinish();
      } else {
        Router.push(`/consultingList`);
      }
    } else {
      Router.push(`/consultingList`);
    }
  });

  let paragraph: string = "";

  if (query.type === "병영생활 고충상담") {
    paragraph =
      "복무부적응, 인권침해, 자살예방을 위한 위기상담 등 병영생활 내 모든 고민을 상담합니다.";
  } else if (query.type === "기타 문의") {
    paragraph = "상담 관련 문의사항이 있으시면 언제든지 말씀해주세요.";
  } else if (query.type === "방위사업비리 신고상담") {
    paragraph =
      "방위사업, 군납, 부정군수품 거래 및 유통관련 범죄에 대해 상담합니다.";
  } else if (query.type === "군범죄 테러 신고상담") {
    paragraph =
      "군과 관련된 각종 범죄 · 테러 등 기타 군과 관련된 부정부패 및 사건/사고를 상담합니다.";
  } else if (query.type === "성폭력 신고상담") {
    paragraph = "군 내 성 관련 인권침해 신고 및 피해자 상담 등을 진행합니다.";
  } else if (query.type === "양성평등 신고상담") {
    paragraph =
      "군 내 성별에 따른 차별 폐지 등 양성평등 이념을 실현하기 위한 성고충전문상담을 진행합니다.";
  }

  return (
    <div id="Consulting">
      <Head>
        <title>국방프렌즈 - 상담 서비스</title>
      </Head>
      <div className="consulting__area parents">
        <div className="consulting__area__contents parents">
          <div className="consulting__area__contents__title">
            비대면 상담 서비스
          </div>
          <div className="consulting__area__contents__type">{query.type}</div>
          <div className="consulting__area__contents__paragraph">
            {paragraph}
          </div>
          <CounsultingPerson type={query.type} />
        </div>
      </div>
    </div>
  );
}

Consulting.getInitialProps = ({ query }) => {
  return { query };
};

export default Consulting;
