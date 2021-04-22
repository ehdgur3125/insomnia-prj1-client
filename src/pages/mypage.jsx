import React, { useEffect, useState } from "react";
import { f7, Page, Navbar, Row, Col, Button } from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";
import { useRecoilState } from "recoil";
import { myInfoState } from "../js/atoms";
import MyOrders from "../components/myOrders"
import DaumPostcode from "react-daum-postcode"

const MyPage = () => {
  const [info, setInfo] = useRecoilState(myInfoState);
  const [err, setErr] = useState(false);
  const [daumOpened, setDaumOpened] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [address, setAddress] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [modify, setModify] = useState(false);
  const getMypage = createAsyncPromise("GET", "/myinfo");
  useEffect(async () => {
    const newInfo = await getMypage();
    setInfo(newInfo);
  }, []);
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
    setModify(false);
  }
  return (
    <Page noToolbar className="md:flex md:justify-center">
      <Navbar title="Mypage" backLink="Back" />
      <div className="md:w-2/3">
        {!info ? null : (<>
          <div className="flex flex-col m-5">
            <b className='text-xl border-b'>내 정보</b>
            <div className='text-sm flex justify-between'>
              <div>주소</div>
              {modify
                ?
                <div>
                  <button
                    className="button text-sm button-fill w-full"
                    type='button'
                    onClick={() => {
                      setDaumOpened(x => !x);
                    }}
                  >
                    주소
                </button>
                </div>
                : null
              }
            </div>
            {modify
              ?
              <div className='text-lg' style={{
                wordBreak: "keep-all"
              }}>{address}</div>
              : null
            }
            {daumOpened
              ? <div><DaumPostcode autoResize slot='after-title' onComplete={(data) => {
                setAddress(data.address + (data.buildingName ? " " + data.buildingName : ""));
                setDaumOpened(false);
              }} /></div>
              : undefined}
            {
              modify
                ? <>

                  <div className='text-sm border-t'>상세주소</div>
                  <div className='text-lg border-b w-full'>
                    <input type='text' className='w-full' onChange={(e) => setNewAddress(e.target.value)} /></div>
                </>
                : <div className='text-lg border-b' style={{ wordBreak: "keep-all" }}>{info.address}</div>
            }
            <div className='text-sm'>전화번호</div>
            {
              modify
                ? <div className='text-lg border-b w-full'>
                  <input type='text' className='w-full' onChange={(e) => setNewPhone(e.target.value)} />
                </div>
                : <div className='text-lg border-b' style={{ wordBreak: "keep-all" }}>{info.phone}</div>
            }
          </div>
          {modify && err ? <div className='mx-5 text-red-500 text-sm'>{err}</div> : null}
          <div className='flex justify-end'>
            <Button fill className='w-1/5 mr-3' onClick={() => {
              setModify(x => !x);
              setErr("");
            }}>{modify ? "수정취소" : "수정하기"}</Button>
            {modify ?
              <Button fill className='w-1/5 mr-5'
                onClick={handleClick}>수정완료</Button>
              : null}
          </div>
        </>
        )}
        <MyOrders></MyOrders>
      </div>
    </Page>
  );
};

export default MyPage;
