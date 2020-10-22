import React, { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Lee from "../../../../lib/Lee";

import "./MyPageViewConsultingRecipient.scss";

const STATUS_MUTATION = gql`
  mutation($status: ENUM_CONSULTING_STATUS!, $consultingID: ID!) {
    updateConsulting(
      input: { where: { id: $consultingID }, data: { status: $status } }
    ) {
      consulting {
        status
      }
    }
  }
`;

const MyPageViewConsultingRecipient = (props) => {
  useEffect(() => {
    const selectStatus: HTMLSelectElement = Lee.get(
      "selectStatus"
    ) as HTMLSelectElement;

    selectStatus.value = props.status;
  });

  const [changeStatus] = useMutation(STATUS_MUTATION);

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    e.persist();
    try {
      changeStatus({
        variables: {
          status: e.target.value,
          consultingID: props.id,
        },
      });
      location.reload();
    } catch {
      alert(`요청이 잘못 되었습니다.`);
    }
  };

  return (
    <div id="MyPageViewConsultingRecipient">
      <div className="my-page-view-consulting-recipient__area parents">
        <div className="my-page-view-consulting-recipient__area__contents parents">
          <form>
            <div className="my-page-view-consulting-recipient__area__contents__status">
              <select
                id="selectStatus"
                name="status"
                onChange={handleInputChange}
              >
                <option value="accepting">접수완료</option>
                <option value="confirmed">확인완료</option>
                <option value="progressing">해결중</option>
                <option value="solved">상담완료</option>
              </select>
            </div>
          </form>
          <div className="my-page-view-consulting-recipient__area__contents__thumbnail">
            {props.recipient.thumbnail ? (
              <img
                src={`https://osam2.kookbang.kr${props.recipient.thumbnail.url}`}
                alt="thumbnail"
              />
            ) : (
              <img src={`${props.recipient.avatar}`} alt="avatar" />
            )}
          </div>
          <div className="my-page-view-consulting-recipient__area__contents__info">
            <div className="my-page-view-consulting-recipient__area__contents__info__subject">
              상담 받는 분
            </div>
            <div className="my-page-view-consulting-recipient__area__contents__info__username">
              {props.recipient.username} <span>님</span>
            </div>
            <div className="my-page-view-consulting-recipient__area__contents__info__paragraph">
              국방의 의무를 충실히 하고 있는 우리 대한민국 국군 장병 또는
              군무원입니다. 상담관님께서는 최선을 다해 고민을 해결해주세요!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageViewConsultingRecipient;
