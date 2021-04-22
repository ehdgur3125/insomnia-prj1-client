import React, { useEffect, useState } from "react";
import { f7, Sheet, Page, Navbar, List, ListInput, Button, ListItem, Row, Col } from "framework7-react";
import { toast, sleep } from "../js/utils.js";
import { Formik } from "formik";
import { createAsyncPromise } from "../common/api/api.config";
import * as Yup from "yup";
import { useRecoilState, useRecoilValue } from "recoil";
import { myInfoState } from "../js/atoms";
import DaumPostcode from "react-daum-postcode";

import { cartState } from "../js/atoms";

const PurchaseSchema = Yup.object().shape({
  address: Yup.string(),
  phone: Yup.string().matches(/^\d{3}-\d{3,4}-\d{4}$/, '전화번호의 양식을 확인해주세요')
});

const PurchasePage = () => {
  const cart = useRecoilValue(cartState);
  const [useDef, setUseDef] = useState(true);
  const [info, setInfo] = useRecoilState(myInfoState);
  const [sheetOpened, setSheetOpened] = useState(false);
  const [howToPay, setHowToPay] = useState('결제 방법을 선택하세요');
  const [address, setAddress] = useState(null);
  const [daumOpened, setDaumOpened] = useState(false);
  useEffect(async () => {
    const newInfo = await createAsyncPromise("GET", "/myinfo")();
    setInfo(newInfo);
    const script = document.createElement('script');
    script.src = "https://js.tosspayments.com/v1";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <Page className="bg-white" noToolbar>
      <Navbar title="결제" backLink={true} sliding={false} />
      <div className="md:flex md:justify-center">
        <div className="md:w-1/3">
          <Row noGap className='text-center text-base border-b'>
            <Col width='30'> 결제 물품 </Col>
            <Col width='70' className='border-l'>{`${cart.listItems[0].itemName} ${cart.listItems[0].optionText}${cart.listItems.length > 1
              ? ` 외 ${cart.listItems.length - 1} 건`
              : ""}`}</Col>
          </Row>
          <Row noGap className='text-center text-base border-b'>
            <Col width='30'> 결제 금액 </Col>
            <Col width='70' className='border-l'>{cart.total}원</Col>
          </Row>
          <div className='flex justify-end mt-10 mx-5'>
            <Button onClick={() => setUseDef(x => !x)} color='black' className='border w-1/2 mb-10'>{useDef ? "새 주소 입력" : "내 정보의 주소 사용"}</Button>
          </div>
          <Formik
            initialValues={{ address: "", phone: "", account: "" }}
            validationSchema={PurchaseSchema}
            onSubmit={async (values, { setSubmitting }) => {
              if (howToPay === '결제 방법을 선택하세요') {
                f7.dialog.alert("결제 방법을 선택하세요", "결제");
                return;
              }
              f7.dialog.preloader("정보를 확인중입니다");
              setSubmitting(false);
              await sleep(100);
              try {
                const tossPayments = TossPayments("test_ck_O6BYq7GWPVvN5LOyqzLVNE5vbo1d");
                await createAsyncPromise("POST", "/purchase")({
                  address: useDef ? info.address : address ? `${address} ${values.address}` : info.address,
                  phone: useDef ? info.phone : values.phone || info.phone,
                });
                tossPayments.requestPayment(howToPay, {
                  amount: cart.total,
                  orderId: `insomenia_${new Date().getTime()}_${cart.orderId}`,
                  orderName: `${cart.listItems[0].itemName} ${cart.listItems[0].optionText}${cart.listItems.length > 1
                    ? ` 외 ${cart.listItems.length - 1} 건`
                    : ""}`,
                  customerName: info.username,
                  successUrl: 'http://localhost:8080/success',
                  failUrl: 'http://localhost:8080/fail',
                });
                f7.dialog.close();
              } catch (error) {
                f7.dialog.close();
                f7.dialog.alert(error?.response?.data || error?.message, "결제 오류")
                //toast.get().setToastText(error?.response?.data || error?.message).openToast()
              }
            }}
            validateOnMount={true}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              isValid,
            }) => (
              <form onSubmit={handleSubmit}>
                {useDef
                  ? <div className="text-base text-center -mt-9 mb-8 pb-0.5">
                    <Row className='items-stretch border-b h-28 border-t' noGap>
                      <Col width="30" className='flex flex-col justify-center'>
                        주소
                      </Col>
                      <Col width="70" className="border-l px-4 break-nomals flex flex-col justify-center" style={{
                        wordBreak: 'keep-all'
                      }}>{info ? info.address : null}</Col>
                    </Row>
                    <Row noGap className='border-b h-10 items-stretch'>
                      <Col width="30 " className="flex flex-col justify-center">
                        전화번호
                      </Col>
                      <Col width="70" className="border-l flex flex-col justify-center">{info ? info.phone : null}</Col>
                    </Row>
                  </div>
                  :
                  <List className='-mt-9'>
                    <ListItem header='주소' title={address || '주소를 선택하세요'}
                      after={<Button
                        className="w-1/6 border"
                        color='black'
                        onClick={() => {
                          setDaumOpened(x => !x);
                        }}
                      >
                        주소
                      </Button>}
                    >
                    </ListItem>
                    {daumOpened
                      ? <ListItem><DaumPostcode autoResize slot='after-title' onComplete={(data) => {
                        setAddress(data.address + (data.buildingName ? " " + data.buildingName : ""));
                        setDaumOpened(false);
                      }} /></ListItem>
                      : undefined}
                    <ListInput
                      label={i18next.t("login.address2")}
                      type="address"
                      name="address"
                      placeholder="상세주소를 입력해주세요"
                      clearButton
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                      errorMessageForce={true}
                      errorMessage={touched.address && errors.address}
                      size="40"
                    ></ListInput>
                    <ListInput
                      label="전화번호"
                      name="phone"
                      type="phone"
                      placeholder="전화번호를 입력해주세요."
                      clearButton
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone}
                      errorMessageForce={true}
                      errorMessage={touched.phone && errors.phone}
                      size="40"
                    />
                  </List>}
                <div className='flex flex-col items-center'>
                  <Button className='border-gray-200 border-2 hover:border-gray-700 text-black rounded-xl bg-gray-100 hover:bg-gray-700 hover:text-white text-base text-center w-2/3'
                    sheetOpen=".option-sheet">{howToPay}</Button>
                </div>
                <div className="m-10 p-1">
                  <button
                    type="submit"
                    className="button button-fill button-large disabled:opacity-50"
                    disabled={howToPay === '결제 방법을 선택하세요' || isSubmitting || !isValid}
                  >
                    결제
                  </button>
                </div>
              </form>
            )}
          </Formik>
          <Sheet
            className="option-sheet h-auto min-h-1/10 border-yellow-500 rounded-t-xl border-r-8 border-l-8 border-t-8 pt-5"
            closeByOutsideClick
            opened={sheetOpened}
            onSheetClosed={() => setSheetOpened(false)}>
            <div className='flex flex-col items-center'>
              {
                ['카드', '가상계좌', '휴대폰', '문화상품권'].map(how =>
                  <div key={how} className='my-3 border rounded-xl bg-gray-100 hover:bg-gray-700 hover:text-white text-base text-center w-2/3'
                    onClick={() => setHowToPay(how)}>{how}</div>)
              }
            </div>
          </Sheet>
        </div>
      </div>
    </Page >
  );
};

export default PurchasePage;
