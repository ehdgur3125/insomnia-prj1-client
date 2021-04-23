import React from "react";
import { Button } from "framework7-react";
import { useRecoilValue } from "recoil";
import { myInfoState } from "../js/atoms";

const MyInfo = ({ setModify }) => {
  const info = useRecoilValue(myInfoState);
  return (<>
    <div className='text-xl mx-5 border-b'><b>내 정보</b></div>
    <div className="px-7">
      <div className='text-sm'>
        주소
      </div>
      <div className='text-lg border-b pb-md' style={{ wordBreak: "keep-all" }}>{info.address}</div>
      <div className='text-sm'>전화번호</div>
      <div className='text-lg border-b' style={{ wordBreak: "keep-all" }}>{info.phone}</div>
    </div>
    <div className='flex justify-end'>
      <Button fill className='w-1/5 mr-3' onClick={() => {
        setModify(x => !x);
      }}>수정하기</Button>
    </div>
  </>);
};

export default MyInfo;
