import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Cookies from "js-cookie";
import Lee from "../../../../lib/Lee";
import dynamic from "next/dynamic";

import "./MyPageViewConsultingComment.scss";

const MyPageViewConsultingCommentBox = dynamic(
  import("./MyPageViewConsultingCommentBox/MyPageViewConsultingCommentBox"),
  {
    ssr: false,
  }
);

const COMMENT_MUTATION = gql`
  mutation($description: String!, $userID: ID!, $consultingID: ID!) {
    createConsultingComment(
      input: {
        data: {
          description: $description
          user: $userID
          consulting: $consultingID
        }
      }
    ) {
      consultingComment {
        description
      }
    }
  }
`;

export type commentInput = {
  description: string;
};

function MyPageViewConsultingComment(props) {
  const initialValue: commentInput = {
    description: "",
  };

  const [input, setInput] = useState(initialValue);
  let [login, setLogin] = useState(false);

  useEffect(() => {
    if (Cookies.get("username") && Cookies.get("jwt")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  });

  const [createComment] = useMutation(COMMENT_MUTATION);

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    e.persist();
    setInput({
      description: e.target.value,
    });
  };

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    const submitBtn = Lee.get("submitBtn") as HTMLButtonElement;

    submitBtn.disabled = true;
    e.preventDefault();

    const addComment = async () => {
      try {
        const description = input.description;

        createComment({
          variables: {
            description: description,
            userID: jwtDecode(Cookies.get("jwt")).id,
            consultingID: props.id,
          },
        });

        location.reload();
      } catch {
        alert(`요청이 잘못 되었습니다.`);
        submitBtn.disabled = false;
      }
    };

    if (
      input.description === "" ||
      input.description === undefined ||
      input.description === null
    ) {
      alert("댓글의 내용을 입력해주세요.");
      submitBtn.disabled = false;
    } else {
      addComment();
    }
  };

  return (
    <div id="MyPageViewConsultingComment">
      <div className="my-page-view-consulting-comment__area">
        <div className="my-page-view-consulting-comment__area__contents parents">
          <div className="my-page-view-consulting-comment__area__contents__top parents">
            <div className="my-page-view-consulting-comment__area__contents__top__title parents">
              상담에 대한 답변
            </div>
          </div>
          <div className="my-page-view-consulting-comment__area__contents__input parents">
            <textarea
              placeholder="추가적인 질문이 있으시면 적어주세요."
              onChange={handleInputChange}
              value={input.description}
            ></textarea>
            {login ? (
              <form onSubmit={handleSubmit}>
                <button
                  type="submit"
                  id="submitBtn"
                  className="my-page-view-consulting-comment__area__contents__input__button"
                >
                  등록하기
                </button>
              </form>
            ) : (
              <div className="my-page-view-consulting-comment__area__contents__input__login">
                댓글을 작성하시려면 로그인이 필요합니다.
                <div
                  className="my-page-view-consulting-comment__area__contents__input__login__button"
                  onClick={Lee.openLogin}
                >
                  로그인
                </div>
              </div>
            )}
          </div>
          <div className="my-page-view-consulting-comment__area__contents__list parents">
            {props.comments.length > 0 ? (
              <ul className="my-page-view-consulting-comment__area__contents__lists parents">
                {props.comments.map((comment, index) => {
                  return (
                    <MyPageViewConsultingCommentBox
                      key={`comment-${index}`}
                      user={comment.user}
                      description={comment.description}
                      date={comment.createdAt}
                      login={login}
                    />
                  );
                })}
              </ul>
            ) : (
              <div className="my-page-view-consulting-comment__area__contents__list__none parents">
                등록된 답변이 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPageViewConsultingComment;
