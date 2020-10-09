import React from "react";
import Lee from "../../../lib/Lee";
import jwtDecode from "jwt-decode";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import Router from "next/router";

import "./PostSupportBoard.scss";
import "suneditor/dist/css/suneditor.min.css";

const SUPPORT_MUTATION = gql`
  mutation(
    $title: String!
    $type: String!
    $date: String!
    $description: String!
    $userID: ID!
  ) {
    createSupport(
      input: {
        data: {
          title: $title
          type: $type
          date: $date
          user: $userID
          description: $description
        }
      }
    ) {
      support {
        id
      }
    }
  }
`;

function PostSupportBoard(props) {
  const date = new Date();
  let month;
  let day;

  if (date.getMonth() + 1 < 10) {
    month = "0" + (date.getMonth() + 1);
  } else {
    month = date.getMonth() + 1;
  }

  if (date.getDate() < 10) {
    day = "0" + date.getDate();
  } else {
    day = date.getDate();
  }

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    const submitBtn = Lee.get("submitBtn") as HTMLButtonElement;

    submitBtn.disabled = true;
    e.preventDefault();

    const title = Lee.get("supportTitle").innerHTML;
    const description = Lee.gets("sun-editor-editable")[0].innerHTML;

    const postSupport = async () => {
      try {
        Lee.loadingStart();
        setTimeout(() => {
          addSupport({
            variables: {
              title: title,
              date: date,
              type: props.type,
              userID: jwtDecode(Cookies.get("jwt")).id,
              description: description,
            },
          });
        }, 400);
        setTimeout(() => {
          location.href = `support?type=${props.type}`;
        }, 600);
      } catch {
        alert(`요청이 잘못 되었습니다.`);
        submitBtn.disabled = false;
      }
    };

    if (
      title === "" ||
      title === undefined ||
      title === null ||
      description === "" ||
      description === undefined ||
      description === null
    ) {
      alert("필수 입력 요소를 모두 입력해주세요.");
      submitBtn.disabled = false;
    } else {
      postSupport();
    }
  };

  const [addSupport] = useMutation(SUPPORT_MUTATION);

  let editor = null;

  if (typeof window !== "undefined") {
    let SunEditor: any = dynamic(() => import("suneditor-react"), {
      ssr: false,
      loading: () => <p>Loading...</p>,
    });

    editor = (
      <SunEditor
        lang="ko"
        autoFocus={false}
        setOptions={{
          height: "auto",
          minHeight: "300px",
          buttonList: [
            [
              "undo",
              "redo",
              "fontSize",
              "formatBlock",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript",
              "removeFormat",
              "table",
              "link",
              "image",
              "video",
              "showBlocks",
              "codeView",
            ],
          ],
        }}
        setContents="내용을 입력해주세요."
      />
    );
  }

  function cancel() {
    if (confirm("등록을 취소하시겠습니까?")) {
      Lee.loadingStart();

      setTimeout(() => {
        Router.push(`support?type=${props.type}`);
      }, 400);
    } else {
      return null;
    }
  }

  return (
    <div id="PostSupportBoard">
      <div className="post-support-board__area">
        <div className="post-support-board__area__contents parents">
          <div className="post-support-board__area__contents__post parents">
            <div
              id="supportTitle"
              className="post-support-board__area__contents__post__title parents"
              placeholder="제목을 입력해주세요."
              contentEditable
            />
            <div className="post-support-board__area__contents__post__date parents">
              <span className="post-support-board__area__contents__post__date__author">
                <span>{props.user}</span>
              </span>
              <span className="post-support-board__area__contents__post__date__day">
                <span>{`${date.getFullYear()}년 ${month}월 ${day}일`}</span>
              </span>
            </div>
            <div className="post-support-board__area__contents__post__description parents">
              {editor}
            </div>
            <ul className="post-support-board__area__contents__post__buttons">
              <li>
                <form onSubmit={handleSubmit}>
                  <button
                    type="submit"
                    id="submitBtn"
                    className="post-support-board__area__contents__post__description__button"
                  >
                    등록하기
                  </button>
                </form>
              </li>
              <li>
                <button onClick={cancel}>취소하기</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostSupportBoard;
