import React, { useEffect, useState } from "react";
import { f7, Page, Navbar, List, Button, Row, Col, Input, Icon } from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";
import { Formik } from "formik";
import ItemInList from "../components/itemInList";

const Search = (props) => {
  const [result, setResult] = useState(null);
  const [keyword, setKeyword] = useState("");
  const getNewResult = async (keyword) => {
    const searched = await createAsyncPromise("GET", `/search?keyword=${keyword}`)();
    setResult(searched.items);
  }
  return (
    <Page>
      <Navbar sliding={false}></Navbar>
      <Formik initialValues={{ keyword: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          getNewResult(values.keyword);
          setKeyword(values.keyword);
        }}>
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (<form
          className="flex justify-between border-b"
          onSubmit={handleSubmit}>
          <Icon f7="search" className='bg-gray-100' />
          <input type='keyword'
            name='keyword'
            className='border-l w-3/4'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.keyword} />
          <button type='submit'
            disabled={isSubmitting}
            className='w-1/4 border-l'
          >검색</button>
        </form>)}
      </Formik>
      {result
        ? result.length
          ? <ItemInList items={result} setItems={getNewResult.bind(null, keyword)} />
          : (
            <div className='h-full flex flex-col justify-center'>
              <div className='text-base text-center '>검색 결과가 없습니다.</div>
            </div>
          )

        : <div className='h-full flex flex-col justify-center'>
          <div className='text-base text-center '>검색어를 입력해 주세요.</div>
        </div>}
    </Page>
  );
};

export default Search;
