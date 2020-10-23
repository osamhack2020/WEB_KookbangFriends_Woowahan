import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Cookies from "js-cookie";
import Lee from "../../../../lib/Lee";
import dynamic from "next/dynamic";

import "./ViewSupportContentComment.scss";

const ViewSupportContentCommentBox = dynamic(
  import("./ViewSupportContentCommentBox/ViewSupportContentCommentBox"),
  {
    ssr: false,
  }
);

const COMMENT_MUTATION = gql`
  mutation($description: String!, $userID: ID!, $supportID: ID!) {
    createSupportComment(
      input: {
        data: { description: $description, user: $userID, support: $supportID }
      }
    ) {
      supportComment {
        id
        user {
          id
          username
          thumbnail {
            url
          }
          avatar
        }
        description
        createdAt
      }
    }
  }
`;

export type commentInput = {
  description: string;
};

function ViewSupportContentComment(props) {
  const initialValue: commentInput = {
    description: "",
  };

  const [input, setInput] = useState(initialValue);
  let [login, setLogin] = useState(false);
  let [comments, setComments] = useState(props.comments);

  useEffect(() => {
    if (Cookies.get("username") && Cookies.get("jwt")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
    setComments(props.comments);
  }, [props]);

  const [createComment] = useMutation(COMMENT_MUTATION, {
    onCompleted({ createSupportComment: { supportComment } }) {
      setComments([...comments, supportComment]);
      setInput(initialValue);
      setTimeout(() => {
        const submitBtn = Lee.get("submitBtn") as HTMLButtonElement;
        submitBtn.disabled = false;
      }, 400);
    },
  });

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
            supportID: props.id,
          },
        });
      } catch {
        alert(`요청이 잘못 되었습니다.`);
        setTimeout(() => {
          submitBtn.disabled = false;
        }, 400);
      }
    };

    if (
      input.description === "" ||
      input.description === undefined ||
      input.description === null
    ) {
      alert("댓글의 내용을 입력해주세요.");

      setTimeout(() => {
        submitBtn.disabled = false;
      }, 400);
    } else {
      addComment();
    }
  };

  return (
    <div id="ViewSupportContentComment">
      <div className="view-support-content-comment__area">
        <div className="view-support-content-comment__area__contents parents">
          <div className="view-support-content-comment__area__contents__top parents">
            <div className="view-support-content-comment__area__contents__top__title parents">
              댓글 ({comments.length})
            </div>
          </div>
          <div className="view-support-content-comment__area__contents__input parents">
            <textarea
              placeholder="댓글을 입력해주세요."
              onChange={handleInputChange}
              value={input.description}
            ></textarea>
            {login ? (
              <form onSubmit={handleSubmit}>
                <button
                  type="submit"
                  id="submitBtn"
                  className="view-support-content-comment__area__contents__input__button"
                >
                  등록하기
                </button>
              </form>
            ) : (
              <div className="view-support-content-comment__area__contents__input__login">
                댓글을 작성하시려면 로그인이 필요합니다.
                <div
                  className="view-support-content-comment__area__contents__input__login__button"
                  onClick={Lee.openLogin}
                >
                  로그인
                </div>
              </div>
            )}
          </div>
          <div className="view-support-content-comment__area__contents__list parents">
            {comments.length > 0 ? (
              <ul className="view-support-content-comment__area__contents__lists parents">
                {comments.map((comment, index) => {
                  return (
                    <ViewSupportContentCommentBox
                      key={`comment-${index}`}
                      id={comment.id}
                      user={comment.user}
                      description={comment.description}
                      date={comment.createdAt}
                      login={login}
                      comments={comments}
                      setComments={setComments}
                    />
                  );
                })}
              </ul>
            ) : (
              <div className="view-support-content-comment__area__contents__list__none parents">
                등록된 댓글이 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSupportContentComment;
