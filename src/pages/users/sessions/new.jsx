import React from "react";
import { f7, Page, Navbar, List, ListInput } from "framework7-react";
import { login } from "@/common/api";
import { toast, sleep } from "../../../js/utils.js";
import { Formik } from "formik";
import * as Yup from "yup";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email().required("필수 입력사항 입니다"),
  password: Yup.string()
    .min(4, "길이가 너무 짧습니다")
    .max(50, "길이가 너무 깁니다")
    .required("필수 입력사항 입니다"),
});

const SessionNewPage = () => {
  return (
    <Page className="bg-white" noToolbar>
      <Navbar
        title={i18next.t("login.title")}
        backLink={true}
        sliding={false}
      />
      <div className="md:flex md:justify-center">
        <div className="md:w-1/3">
          <p className="font-semibole text-4xl text-center mt-5">insomenia</p>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={SignInSchema}
            onSubmit={async (values, { setSubmitting }) => {
              f7.dialog.preloader("정보를 확인중입니다");
              setSubmitting(false);
              await sleep(100);
              try {
                await login({ user: values });
                f7.dialog.close();
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
                    label={i18next.t("login.email")}
                    name="email"
                    type="email"
                    placeholder="이메일을 입력해주세요."
                    clearButton
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    errorMessageForce={true}
                    errorMessage={touched.email && errors.email}
                    size="40"
                  />
                  <ListInput
                    label={i18next.t("login.password")}
                    name="password"
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    clearButton
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    errorMessageForce={true}
                    errorMessage={touched.password && errors.password}
                    size="40"
                  />
                </List>
                <div className="p-1">
                  <button
                    type="submit"
                    className="button button-fill button-large disabled:opacity-50 mb-5"
                    disabled={isSubmitting || !isValid}
                  >
                    로그인
                  </button>
                  <a
                    type="button"
                    href="/users/sign_up"
                    className="button button-fill button-large disabled:opacity-50"
                  >
                    회원가입
                  </a>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Page>
  );
};

export default SessionNewPage;
