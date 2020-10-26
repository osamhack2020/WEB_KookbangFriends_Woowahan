import React from "react";

import "./MyPageViewConsultingProfessional.scss";

const MyPageViewConsultingProfessional = (props) => {
  return (
    <div id="MyPageViewConsultingProfessional">
      <div className="my-page-view-consulting-professional__area parents">
        <div className="my-page-view-consulting-professional__area__contents parents">
          <div className="my-page-view-consulting-professional__area__contents__thumbnail">
            <img
              src={`http://127.0.0.1${props.professional.thumbnail.url}`}
              alt="thumbnail"
            />
          </div>
          <div className="my-page-view-consulting-professional__area__contents__info">
            <div className="my-page-view-consulting-professional__area__contents__info__subject">
              담당 상담관
            </div>
            <div className="my-page-view-consulting-professional__area__contents__info__username">
              {props.professional.username} <span>상담관님</span>
            </div>
            <div className="my-page-view-consulting-professional__area__contents__info__paragraph">
              여러분의 고충 및 고민의 해결을 위해 최선을 다해 상담을 진행할 것을
              약속드립니다. 당신의 이야기를 친구에게 말하는 것처럼 편하게
              들려주세요!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageViewConsultingProfessional;
