import React from "react";
import Lee from "../../../../lib/Lee";

import "./ConsultingPersonBox.scss";

function ConsultingPersonBox(props) {
  function selectPro(name, id) {
    const pro = Lee.get(name);
    const pros = Lee.gets("consulting-person-box__area");

    for (let i = 0; i < pros.length; i++) {
      Lee.removeClass(pros[i], "selected");
    }

    Lee.addClass(pro, "selected");
    props.setProID(id);
  }

  return (
    <div
      className="consulting-person-box__area"
      id={props.username}
      onClick={function () {
        selectPro(props.username, props.id);
      }}
    >
      {/* <DelayLink
        to={`viewCard?id=${props.id}`}
        delay={200}
        onDelayStart={function () {
          Lee.loadingStart();
        }}
      > */}
      <div className="consulting-person-box__area__contents">
        <div className="consulting-person-box__area__check">
          <img src="/static/icons/check.png" alt="check" />
        </div>
        <div className="consulting-person-box__area__contents__thumbnail">
          <img
            src={`https://osam2.kookbang.kr${props.thumbnail.url}`}
            alt="thumbnail"
          />
        </div>
        <div className="consulting-person-box__area__contents__info parents">
          <div className="consulting-person-box__area__contents__info__name">
            <span>상담전문가</span>
            <br />
            {props.username}
          </div>
        </div>
      </div>
      {/* </DelayLink> */}
    </div>
  );
}

export default ConsultingPersonBox;
