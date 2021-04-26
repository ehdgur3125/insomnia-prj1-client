import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";
import { useRecoilState } from "recoil";
import { myInfoState } from "../js/atoms";
import DaumPostcode from "react-daum-postcode"

const PatchMyInfo = ({ setModify }) => {
  const [, setInfo] = useRecoilState(myInfoState);
  const [err, setErr] = useState(false);
  const [daumOpened, setDaumOpened] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [address, setAddress] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const getMypage = createAsyncPromise("GET", "/myinfo");
  const handleClick = async () => {
    if (!address && newAddress) {
      setErr("주소 버튼을 클릭 후 주소를 선택해주세요");
      return;
    }
    if (!address && !newPhone) {
      setErr("주소나 전화번호 중 한 가지를 입력해주세요");
      return;
    }
    if (newPhone && !/^\d{3}-\d{3,4}-\d{4}$/.test(newPhone)) {
      setErr("전화번호의 양식을 확인해 주세요");
      return;
    }
    setErr("");
    await createAsyncPromise('PATCH', "/myinfo")({ phone: newPhone, address: address ? `${address} ${newAddress}` : undefined });
    setNewAddress("");
    setNewPhone("");
    setAddress("");
    const newInfo = await getMypage();
    setInfo(newInfo);
    setDaumOpened(false);
    setModify(false);
  }
  return (<>
    <div className='text-xl mx-5 w-full border-b'><b>내 정보</b></div>
    <div className="px-7">
      <Row className='text-sm flex justify-between border-b'>
        <Col width='80'>
          <div>주소</div>
          <div className='text-lg' style={{
            wordBreak: "keep-all"
          }}>{address || "주소를 선택해 주세요"}</div>
        </Col>
        <Col width='20'>
          <button
            className="button text-sm button-fill w-full"
            type='button'
            onClick={() => {
              setDaumOpened(x => !x);
            }}
          >
            주소
                </button>
        </Col>
      </Row>
      {daumOpened
        ? <div><DaumPostcode autoResize slot='after-title' onComplete={(data) => {
          setAddress(data.address + (data.buildingName ? " " + data.buildingName : ""));
          setDaumOpened(false);
        }} /></div>
        : undefined}
      <div className='text-sm'>상세주소</div>
      <div className='text-lg border-b w-full'>
        <input type='text' className='w-full' onChange={(e) => setNewAddress(e.target.value)} /></div>
      <div className='text-sm'>전화번호</div>
      <div className='text-lg border-b w-full'>
        <input type='text' className='w-full' onChange={(e) => setNewPhone(e.target.value)} />
      </div>
      {err ? <div className='mx-5 text-red-500 text-sm'>{err}</div> : null}
    </div>
    <div className='flex justify-end'>
      <Button fill className='w-1/5 mr-3' onClick={() => {
        setModify(x => !x);
      }}>수정취소</Button>
      <Button fill className='w-1/5 mr-3'
        onClick={handleClick}>수정완료</Button>
    </div>
  </>
  );
};

export default PatchMyInfo;
