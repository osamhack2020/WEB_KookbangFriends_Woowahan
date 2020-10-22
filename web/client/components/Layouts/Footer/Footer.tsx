import React from "react";
import Lee from "../../../lib/Lee";

import "./Footer.scss";

const Footer = () => {
  function go() {
    const site: HTMLInputElement = Lee.get("siteUrl") as HTMLInputElement;
    const siteURL = site.value;

    if (siteURL && siteURL !== "#") {
      window.open(siteURL);
    }
  }

  function ready() {
    alert("서비스 시행 시 적용 예정입니다.");
  }

  return (
    <div id="Footer">
      <div className="footer__area parents">
        <div className="footer__area__contents parents">
          <ul className="footer__area__contents__menus parents">
            <li onClick={ready}>이용약관</li>
            <li onClick={ready}>개인정보처리방침</li>
            <li onClick={ready}>운영정책</li>
            <li onClick={ready}>권리침해신고안내</li>
          </ul>
          <img
            src="/static/icons/thankyou.png"
            className="footer__area__contents__thank"
            alt="thankyou"
          />
          <div className="footer__area__contents__select">
            <select id="siteUrl" name="siteUrl">
              <option value="#">군 관련 기관</option>
              <option value="https://www.mnd.go.kr">대한민국 국방부</option>
              <option value="http://www.jcs.mil.kr">합동참모본부</option>
              <option value="http://www.army.mil.kr">대한민국 육군</option>
              <option value="http://www.navy.mil.kr">대한민국 해군</option>
              <option value="http://www.airforce.mil.kr">대한민국 공군</option>
              <option value="http://www.rokmc.mil.kr">대한민국 해병대</option>
              <option value="http://www.snmb.mil.kr">국립서울현충원</option>
              <option value="http://www.dema.mil.kr">국방홍보원</option>
              <option value="http://www.dapa.go.kr">방위사업청</option>
              <option value="http://www.mma.go.kr">병무청</option>
              <option value="http://www.warmemo.or.kr">전쟁기념사업회</option>
              <option value="http://www.moti.or.kr">국방전직교육원</option>
            </select>
            <input
              type="button"
              value="▷"
              title="새창 열기"
              className="footer__area__contents__select__go"
              onClick={go}
            />
          </div>
          <div className="footer__area__contents__copyright">
            Copyright © 국방프렌즈. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
