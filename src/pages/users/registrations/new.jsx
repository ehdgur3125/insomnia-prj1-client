import React, { useState, useEffect } from "react";
import {
  f7,
  Navbar,
  Page,
  List,
  ListInput,
  ListItem,
  Row,
  Col,
} from "framework7-react";
import { signup } from "@/common/api";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast, sleep } from "../../../js/utils.js";
import DaumPostcode from "react-daum-postcode";

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("필수 입력사항 입니다"),
  email: Yup.string().email('이메일의 양식을 확인해주세요').matches(/^[A-Za-z]\w*@\w+.\w+$/, '이메일의 양식을 확인해주세요').required("필수 입력사항 입니다"),
  phone: Yup.string().matches(/^\d{3}-\d{3,4}-\d{4}$/, '전화번호의 양식을 확인해주세요').required("필수 입력사항 입니다"),
  address: Yup.string().required("필수 입력사항 입니다"),
  password: Yup.string()
    .min(4, "길이가 너무 짧습니다")
    .max(50, "길이가 너무 깁니다")
    .required("필수 입력사항 입니다"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
    .required("필수 입력사항 입니다"),
});

const SignUpPage = () => {
  const [address, setAddress] = useState(null);
  const [daumOpened, setDaumOpened] = useState(false);
  return (
    <Page noToolbar>
      <Navbar title="회원가입" backLink={true} sliding={false}></Navbar>
      <div className="md:flex md:justify-center">
        <div className="md:w-1/3">
          <p className="font-semibole text-4xl text-center mt-5">insomenia</p>
          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              address: "",
              password: "",
              password_confirmation: "",
            }}
            validationSchema={SignUpSchema}
            onSubmit={async (values, { setSubmitting }) => {
              f7.dialog.preloader("잠시만 기다려주세요...");
              setSubmitting(false);
              await sleep(400);
              try {
                if (address === null) throw '주소를 선택해주세요';
                (await signup({ user: { ...values, address: `${address} ${values.address}` } })).data;
                f7.toast.show({
                  position: "top",
                  text: '로그인 되었습니다.',
                  closeTimeout: 2000
                });
                location.replace("/");
              } catch (error) {
                f7.dialog.close();
                f7.toast.show({
                  position: "top",
                  text: error?.response?.data || error?.message,
                  closeTimeout: 2000
                });
              }
            }}
            validateOnMount={true}
          >
            {({
              handleChange,
              handleBlur,
              values,
              errors,
              touched,
              isSubmitting,
              isValid,
            }) => (
              <Form>
                <List noHairlinesMd>
                  <div className="p-3 font-semibold bg-white">기본 정보</div>
                  <ListInput
                    label={i18next.t("login.name")}
                    type="text"
                    name="name"
                    placeholder="이름을 입력해주세요"
                    clearButton
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    errorMessageForce={true}
                    errorMessage={touched.name && errors.name}
                    size="40"
                  />
                  <ListInput
                    label={i18next.t("login.email")}
                    type="email"
                    name="email"
                    placeholder="이메일을 입력해주세요"
                    clearButton
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    errorMessageForce={true}
                    errorMessage={touched.email && errors.email}
                    size="40"
                  />
                  <ListInput
                    label={i18next.t("login.phone")}
                    type="phone"
                    name="phone"
                    placeholder="전화번호를 입력해주세요"
                    clearButton
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                    errorMessageForce={true}
                    errorMessage={touched.phone && errors.phone}
                    size="40"
                  />
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
                    label={i18next.t("login.password")}
                    type="password"
                    name="password"
                    placeholder="비밀번호를 입력해주세요"
                    clearButton
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    errorMessageForce={true}
                    errorMessage={touched.password && errors.password}
                    size="40"
                  />
                  <ListInput
                    label={i18next.t("login.password_confirmation")}
                    type="password"
                    name="password_confirmation"
                    placeholder="비밀번호를 확인해주세요"
                    clearButton
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password_confirmation}
                    errorMessageForce={true}
                    errorMessage={
                      touched.password_confirmation &&
                      errors.password_confirmation
                    }
                    size="40"
                  />
                </List>
                <div className="p-4">
                  <button
                    type="submit"
                    className="button button-fill button-large disabled:opacity-50"
                    disabled={isSubmitting || !isValid || !address}
                  >
                    회원가입
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Page>
  );
};

export default SignUpPage;
