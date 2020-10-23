import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Lee from "../../../lib/Lee";
import { useMutation } from "@apollo/react-hooks";
import dynamic from "next/dynamic";
import Router from "next/router";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

import "./CommunityAddFeed.scss";

const USER_QUERY = gql`
  query {
    me {
      user {
        role {
          name
        }
        username
        thumbnail {
          url
        }
        avatar
      }
    }
  }
`;

const FEED_MUTATION = gql`
  mutation(
    $userID: ID!
    $title: String!
    $description: String!
    $type: String!
    $date: String!
  ) {
    createFeed(
      input: {
        data: {
          user: $userID
          title: $title
          description: $description
          type: $type
          date: $date
        }
      }
    ) {
      feed {
        id
      }
    }
  }
`;

const UPLOAD_MUTATION = gql`
  mutation($image: Upload!, $id: ID!) {
    upload(file: $image, refId: $id, ref: "feed", field: "thumbnail") {
      id
    }
  }
`;

const CommunityAddFeed = (props) => {
  const [file, setFile] = useState();

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    let feedTitle: HTMLInputElement = Lee.get("feedTitle") as HTMLInputElement;
    let feedDescripition = Lee.gets("sun-editor-editable")[0].innerHTML;

    const fetchFeed = async () => {
      try {
        addFeed({
          variables: {
            title: feedTitle.value,
            date: date,
            userID: jwtDecode(Cookies.get("jwt")).id,
            description: feedDescripition,
            type: props.category,
          },
        });
      } catch {
        alert(`요청이 잘못 되었습니다.`);
      }
    };

    if (
      feedTitle.value === "" ||
      feedTitle.value === undefined ||
      feedTitle.value === null ||
      feedDescripition === "" ||
      feedDescripition === undefined ||
      feedDescripition === null
    ) {
      alert("필수 입력 요소를 모두 입력해주세요.");
    } else {
      fetchFeed();
    }
  };

  const [addFeed] = useMutation(FEED_MUTATION, {
    onCompleted({
      createFeed: {
        feed: { id },
      },
    }) {
      uploadImageData(id);
    },
  });
  const [uploadImage] = useMutation(UPLOAD_MUTATION);

  function uploadImageData(id) {
    if (file) {
      uploadImage({
        variables: {
          image: file,
          id: id,
        },
      });
    }
    Lee.loadingStart();
    setTimeout(() => {
      location.href = `/community?type=list&category=${props.category}`;
    }, 200);
  }

  const handleThumbnailChange = (e: React.ChangeEvent<any>) => {
    const thumbnail: HTMLImageElement = Lee.get(
      "feedThumbnail"
    ) as HTMLImageElement;
    if (e.target.files[0]) {
      if (e.target.files[0].size > 1 * 1024 * 1024) {
        alert("이미지 파일 용량이 너무 큽니다. (1mb 아래만 허용됩니다.)");
        e.target.value = "";
      } else {
        let file = URL.createObjectURL(e.target.files[0]);
        thumbnail.src = file;
        setFile(e.target.files[0]);
      }
    }
  };

  useEffect(() => {
    if (
      props.category === "자유게시판" ||
      props.category === "병영노하우" ||
      props.category === "동아리모집" ||
      props.category === "고민나누기" ||
      props.category === "국방유튜브" ||
      props.category === "국방마켓"
    ) {
      Lee.loadingFinish();
    } else {
      Router.push(`/community?type=list&category=전체게시글`);
    }
  }, []);

  let me;

  const { data, loading, error } = useQuery(USER_QUERY, {
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
    me = data.me;
  }

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
        Router.push(`community?type=list&category=${props.category}`);
      }, 400);
    } else {
      return null;
    }
  }

  return (
    <div className="community-add-feed__area">
      <div className="community-add-feed__area__contents parents">
        <div className="community-add-feed__area__contents__user parents">
          <div className="community-add-feed__area__contents__user__thumbnail">
            {me.user.thumbnail ? (
              <img
                src={`https://osam2.kookbang.kr${me.user.thumbnail.url}`}
                alt="thumbnail"
              />
            ) : (
              <img src={me.user.avatar} alt="avatar" />
            )}
          </div>
          <div className="community-add-feed__area__contents__user__info">
            <div className="community-add-feed__area__contents__user__info__username">
              {me.user.username}
            </div>
            <div className="community-add-feed__area__contents__user__info__date">
              {`${date.getFullYear()}년 ${month}월 ${day}일`}
            </div>
          </div>
        </div>
        <div className="community-add-feed__area__contents__thumbnail">
          <div className="community-add-feed__area__contents__thumbnail__edit">
            <input
              type="file"
              id="feedThumbnailUpload"
              accept=".png, .jpg, .jpeg"
              onChange={handleThumbnailChange}
            />
            <label htmlFor="feedThumbnailUpload"></label>
          </div>
          <img
            src="/static/images/feed-preview.png"
            alt="thumbnail"
            id="feedThumbnail"
          />
        </div>
        <div className="community-add-feed__area__contents__category">
          {props.category}
        </div>
        <input
          type="text"
          id="feedTitle"
          placeholder="제목을 입력해주세요."
          className="community-add-feed__area__contents__title parents"
        />
        <div className="community-add-feed__area__contents__description parents">
          {editor}
        </div>

        <form onSubmit={handleSubmit}>
          <ul className="community-add-feed__area__contents__buttons">
            <li>
              <button
                type="submit"
                className="community-add-feed__area__contents__button"
              >
                등록하기
              </button>
            </li>
            <li>
              <button type="reset" onClick={cancel}>
                취소하기
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default CommunityAddFeed;
