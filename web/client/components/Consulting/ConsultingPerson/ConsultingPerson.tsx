import React, { useState } from "react";
import Router from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import Lee from "../../../lib/Lee";

import "./ConsultingPerson.scss";

const PERSON_QUERY = gql`
  query {
    users(where: { role: { name: "Professional" } }) {
      id
      username
      role {
        name
      }
      thumbnail {
        url
      }
    }
  }
`;

const CONSULTING_MUTATION = gql`
  mutation(
    $title: String!
    $type: String!
    $description: String!
    $userID: ID!
    $proID: ID!
  ) {
    createConsulting(
      input: {
        data: {
          title: $title
          type: $type
          recipient: $userID
          professional: $proID
          description: $description
        }
      }
    ) {
      consulting {
        id
      }
    }
  }
`;

import ConsultingPersonBox from "./ConsultingPersonBox/ConsultingPersonBox";

function ConsultingPerson(props) {
  let people;
  const [proID, setProID] = useState();

  const [addConsulting] = useMutation(CONSULTING_MUTATION);

  const { data, loading, error } = useQuery(PERSON_QUERY, {
    ssr: false,
  });

  if (loading) {
    return null;
  }

  if (error) {
    if (JSON.stringify(error.graphQLErrors[0].message) === '"Forbidden"') {
      return <p>권한이 없습니다.</p>;
    } else {
      return <p>Error: {JSON.stringify(error)}</p>;
    }
  }

  if (data) {
    people = data.users;
  }

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    const submitBtn = Lee.get("submitBtn") as HTMLButtonElement;

    submitBtn.disabled = true;
    e.preventDefault();

    const title = Lee.get("consultingTitle").innerHTML;
    const descriptionElement = Lee.get(
      "consultingDescription"
    ) as HTMLTextAreaElement;
    const description = descriptionElement.value;

    const postSupport = async () => {
      try {
        Lee.loadingStart();
        setTimeout(() => {
          addConsulting({
            variables: {
              title: title,
              type: props.type,
              description: description,
              userID: jwtDecode(Cookies.get("jwt")).id,
              proID: proID,
            },
          });
        }, 400);
        setTimeout(() => {
          location.href = `mypage?type=consulting`;
        }, 600);
      } catch {
        alert(`요청이 잘못 되었습니다.`);
        submitBtn.disabled = false;
      }
    };

    if (
      proID === "" ||
      proID === undefined ||
      proID === null ||
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

  function cancel() {
    if (confirm("등록을 취소하시겠습니까?")) {
      Lee.loadingStart();

      setTimeout(() => {
        Router.push(`consultingList`);
      }, 400);
    } else {
      return null;
    }
  }

  return (
    <div id="ConsultingPerson">
      <div className="consulting-person__area">
        <div className="consulting-person__area__contents">
          <div className="consulting-person__area__contents__title">
            1. 상담 받기를 원하시는 전문상담관을 선택해주세요.
          </div>
          <ul className="consulting-person__area__contents__lists parents">
            {people.map((person, index) => {
              return (
                <li key={`person-${index}`}>
                  <ConsultingPersonBox
                    id={person.id}
                    username={person.username}
                    thumbnail={person.thumbnail}
                    setProID={setProID}
                  />
                </li>
              );
            })}
          </ul>
          <div className="consulting-person__area__contents__title">
            2. 상담 받으실 내용을 적어주세요.
          </div>
          <div className="consulting-person__area__contents__context parents">
            <form
              onSubmit={handleSubmit}
              className="consulting-person__area__contents__context__form"
            >
              <div
                className="consulting-person__area__contents__context__form__title"
                id="consultingTitle"
                placeholder="제목을 입력해주세요."
                contentEditable
              />
              <textarea
                className="consulting-person__area__contents__context__form__description parents"
                id="consultingDescription"
                placeholder="내용을 입력해주세요."
              />
              <ul className="consulting-person__area__contents__context__form__buttons">
                <li>
                  <button type="submit" id="submitBtn">
                    제출하기
                  </button>
                </li>
                <li>
                  <button type="reset" onClick={cancel}>
                    취소하기
                  </button>
                </li>
              </ul>
            </form>
            <div className="consulting-person__area__contents__context__caution">
              국방프렌즈의 비대면 상담 서비스는 전문 상담사님이 확인하시며
              수집되는 내용은 상담 받는 계정의 닉네임과 날짜 및 내용 뿐입니다.
              따라서{" "}
              <span>
                누구도 상담 받는 분의 개인정보를 열람할 수 없으며 열람할 수 있는
                방법도 존재하지 않습니다.
              </span>{" "}
              어쩔 수 없이 신분을 말할 수 없는 상황에도 상담자가 원치 않으면
              철저한 익명을 보장하니 고민이 있으시면 언제든지 상담 서비스를 통해
              고민을 해결해보세요!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsultingPerson;
