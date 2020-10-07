import React from "react";
import Lee from "../../../../lib/Lee";

import "./RegistrationCharacter.scss";

const RegistrationCharacter = (props) => {
  function closeRegistrationCharacter() {
    let registrationCharacterArea = Lee.get("RegistrationCharacter");
    Lee.removeClass(registrationCharacterArea, "active");
  }

  function chooseThumbnail(target: String) {
    const path = `/static/characters/basic/${target}.png`;
    const userThumbnail: HTMLImageElement = Lee.get(
      "userThumbnail"
    ) as HTMLImageElement;
    userThumbnail.src = path;
    props.setThumbnail(path);
    closeRegistrationCharacter();
  }

  const handleThumbnailChange = (e: React.ChangeEvent<any>) => {
    const userThumbnail: HTMLImageElement = Lee.get(
      "userThumbnail"
    ) as HTMLImageElement;
    if (e.target.files[0]) {
      if (e.target.files[0].size > 1 * 1024 * 1024) {
        alert("이미지 파일 용량이 너무 큽니다. (1mb 아래만 허용됩니다.)");
        e.target.value = "";
      } else {
        let file = URL.createObjectURL(e.target.files[0]);
        userThumbnail.src = file;
        props.setThumbnail(e.target.files[0]);
        closeRegistrationCharacter();
      }
    }
  };

  return (
    <div id="RegistrationCharacter">
      <div className="registration-character__area">
        <div
          className="registration-character__area__fade"
          onClick={closeRegistrationCharacter}
        />

        <div className="registration-character__area__contents parents">
          <div className="registration-character__area__contents__logo">
            썸네일 선택
            <img src="/static/icons/friends-logo.png" alt="logo" />
          </div>
          <img
            src="/static/icons/close-white.png"
            className="registration-character__area__contents__close"
            alt="x"
            onClick={closeRegistrationCharacter}
          />
          <div className="registration-character__area__contents__title">
            원하시는 썸네일을 선택해주세요
          </div>
          <div className="registration-character__area__contents__thumbnails parents">
            <div className="registration-character__area__contents__thumbnails__edit">
              <input
                type="file"
                id="imageUpload"
                accept=".png, .jpg, .jpeg"
                onChange={handleThumbnailChange}
              />
              <label htmlFor="imageUpload"></label>
              <img src="/static/icons/upload.png" alt="upload" />
            </div>
            <img
              src="/static/characters/basic/g20.png"
              alt="thumbnail-1"
              onClick={function () {
                chooseThumbnail("g20");
              }}
            />
            <img
              src="/static/characters/basic/e20.png"
              alt="thumbnail-2"
              onClick={function () {
                chooseThumbnail("e20");
              }}
            />
            <img
              src="/static/characters/basic/h20.png"
              alt="thumbnail-3"
              onClick={function () {
                chooseThumbnail("h20");
              }}
            />
            <img
              src="/static/characters/basic/i20.png"
              alt="thumbnail-4"
              onClick={function () {
                chooseThumbnail("i20");
              }}
            />
            <img
              src="/static/characters/basic/c30.png"
              alt="thumbnail-5"
              onClick={function () {
                chooseThumbnail("c30");
              }}
            />
            <img
              src="/static/characters/basic/d30.png"
              alt="thumbnail-6"
              onClick={function () {
                chooseThumbnail("d30");
              }}
            />
            <img
              src="/static/characters/basic/a40.png"
              alt="thumbnail-7"
              onClick={function () {
                chooseThumbnail("a40");
              }}
            />
            <img
              src="/static/characters/basic/b40.png"
              alt="thumbnail-8"
              onClick={function () {
                chooseThumbnail("b40");
              }}
            />
            <img
              src="/static/characters/basic/dc20.png"
              alt="thumbnail-9"
              onClick={function () {
                chooseThumbnail("dc20");
              }}
            />
            <img
              src="/static/characters/basic/m1.png"
              alt="thumbnail-10"
              onClick={function () {
                chooseThumbnail("m1");
              }}
            />
            <img
              src="/static/characters/basic/m2.png"
              alt="thumbnail-11"
              onClick={function () {
                chooseThumbnail("m2");
              }}
            />
            <img
              src="/static/characters/basic/m3.png"
              alt="thumbnail-12"
              onClick={function () {
                chooseThumbnail("m3");
              }}
            />
            <img
              src="/static/characters/basic/f1.png"
              alt="thumbnail-13"
              onClick={function () {
                chooseThumbnail("f1");
              }}
            />
            <img
              src="/static/characters/basic/f2.png"
              alt="thumbnail-14"
              onClick={function () {
                chooseThumbnail("f2");
              }}
            />
            <img
              src="/static/characters/basic/f4.png"
              alt="thumbnail-15"
              onClick={function () {
                chooseThumbnail("f4");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationCharacter;
