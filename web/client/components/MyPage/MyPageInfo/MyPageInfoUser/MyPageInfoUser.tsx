import React from "react";

import "./MyPageInfoUser.scss";

const MyPageInfoUser = (props) => {
  return (
    <div id="MyPageInfoUser">
      <div className="my-page-info-user__area parents">
        <div className="my-page-info-user__area__contents parents">
          <div className="my-page-info-user__area__contents__thumbnail">
            {props.thumbnail ? (
              <img
                src={`https://api.kookbang.kr${props.thumbnail.url}`}
                alt="thumbnail"
              />
            ) : (
              <img src={`${props.avatar}`} alt="thumbnail" />
            )}
          </div>
          <div className="my-page-info-user__area__contents__username">
            {props.username}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageInfoUser;
