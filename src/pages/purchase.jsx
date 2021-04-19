import React, { useEffect, useState } from "react";
import { f7, Sheet, Page, Navbar, List, ListInput, Button, ListItem } from "framework7-react";
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
  phone: Yup.string()
});

const PurchasePage = () => {
  const cart = useRecoilValue(cartState);
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
          <Formik
            initialValues={{ address: "", phone: "", account: "" }}
            validationSchema={PurchaseSchema}
            onSubmit={async (values, { setSubmitting }) => {
              if (address && !values.address) {
                f7.dialog.alert("상세 주소를 입력하세요", "주소");
                return;
              }
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
                  address: `${address} ${values.address}`,
                  phone: values.phone,
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
                f7.dialog.alert("결제 오류")
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
                <List>
                  <ListItem header='주소' title={address || '주소를 선택하세요'}
                    after={<button
                      className="button button-fill w-1/6"
                      type='button'
                      onClick={() => {
                        setDaumOpened(x => !x);
                      }}
                    >
                      주소
                      </button>}
                  >
                  </ListItem>
                  <div className='text-sm'>
                    {daumOpened
                      ? <DaumPostcode autoResize onComplete={(data) => {
                        setAddress(data.address + (data.buildingName ? " " + data.buildingName : ""));
                        setDaumOpened(false);
                      }}
                        style={{
                          position: "absolute",
                          top: '50%',
                          left: "0%",
                          zIndex: "100",
                          overflow: "hidden"
                        }} />
                      : undefined}
                  </div>
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
                </List>
                <div className='flex justify-center'>
                  <Button className='border-gray-200 border-2 hover:border-gray-700 text-black rounded-xl bg-gray-100 hover:bg-gray-700 hover:text-white text-base text-center w-2/3'
                    sheetOpen=".option-sheet">{howToPay}</Button>
                </div>
                <div className="m-10 p-1">
                  <button
                    type="submit"
                    className="button button-fill button-large disabled:opacity-50"
                    disabled={howToPay === '결제 방법을 선택하세요' || isSubmitting}
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
