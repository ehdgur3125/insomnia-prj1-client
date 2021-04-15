import React, { useEffect, useState } from "react";
import { f7, Sheet, Page, Navbar, List, ListInput, Button } from "framework7-react";
import { toast, sleep } from "../js/utils.js";
import { Formik } from "formik";
import { createAsyncPromise } from "../common/api/api.config";
import * as Yup from "yup";
import { useRecoilState, useRecoilValue } from "recoil";
import { myInfoState } from "../js/atoms";

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
    <Page className="bg-white">
      <Navbar title="결제" backLink={true} sliding={false} />
      <div className="md:flex md:justify-center">
        <div className="md:w-1/3">
          <Formik
            initialValues={{ address: "", phone: "", account: "" }}
            validationSchema={PurchaseSchema}
            onSubmit={async (values, { setSubmitting }) => {
              if (howToPay === '결제 방법을 선택하세요') {
                f7.dialog.alert("결제 방법을 선택하세요");
                return;
              }
              f7.dialog.preloader("정보를 확인중입니다");
              setSubmitting(false);
              await sleep(400);
              try {
                const tossPayments = TossPayments("test_ck_O6BYq7GWPVvN5LOyqzLVNE5vbo1d");
                tossPayments.requestPayment('가상계좌', {
                  amount: cart.total,
                  orderId: `cdh_insomenia_${cart.orderId}`,
                  orderName: `${cart.listItems[0].itemName} ${cart.listItems[0].optionText}${cart.listItems.length > 1
                    ? ` 외 ${cart.listItems.length - 1} 건`
                    : ""}`,
                  customerName: info.username,
                  successUrl: 'http://localhost:8080/success',
                  failUrl: 'http://localhost:8080',
                });
                await createAsyncPromise("POST", "/purchase")({
                  address: values.address || info.address,
                  phone: values.phone || info.phone,
                  account: "1"
                });
                f7.dialog.close();
              } catch (error) {
                f7.dialog.close();
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
                  <ListInput
                    label="주소"
                    name="address"
                    type="address"
                    placeholder="주소를 입력해주세요."
                    clearButton
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    errorMessageForce={true}
                    errorMessage={touched.address && errors.address}
                    size="40"
                  />
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
                    disabled={isSubmitting || !isValid}
                  >
                    결제
                  </button>
                </div>
              </form>
            )}
          </Formik>
          <Sheet
            className="option-sheet h-auto min-h-1/10 border-indigo-500 rounded-t-xl border-r-8 border-l-8 border-t-8 pt-5"
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
