import React, { useEffect } from "react";
import { f7, Page, Navbar, List, ListInput } from "framework7-react";
import { toast, sleep } from "../js/utils.js";
import { Formik } from "formik";
import { createAsyncPromise } from "../common/api/api.config";
import * as Yup from "yup";
import { useRecoilState } from "recoil";
import { myInfoState } from "../js/atoms";

const PurchaseSchema = Yup.object().shape({
  address: Yup.string(),
  phone: Yup.string(),
  account: Yup.string().required("필수 입력 사항입니다."),
});

const PurchasePage = () => {
  const [info, setInfo] = useRecoilState(myInfoState);
  useEffect(async () => {
    const newInfo = await createAsyncPromise("GET", "/myinfo")();
    setInfo(newInfo);
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
              f7.dialog.preloader("정보를 확인중입니다");
              setSubmitting(false);
              await sleep(400);
              try {
                await createAsyncPromise("POST", "/purchase")(values);
                f7.dialog.close();
                location.replace("/");
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
                  <ListInput
                    label="환불계좌번호"
                    name="account"
                    type="account"
                    placeholder="환불받을 때의 계좌번호를 입력해주세요."
                    clearButton
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.account}
                    errorMessageForce={true}
                    errorMessage={touched.account && errors.account}
                    size="40"
                  />
                </List>
                <div className="p-1">
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
        </div>
      </div>
    </Page>
  );
};

export default PurchasePage;
