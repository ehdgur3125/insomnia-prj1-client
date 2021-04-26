import React, { useEffect, useState } from "react";
import { f7, Page, Navbar, List, Button, Row, Col, Input, Icon } from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";
import { Formik } from "formik";
import ItemInList from "../components/itemInList";
import { useRecoilValue } from "recoil";
import { reloadTriggerState } from "../js/atoms";
import { infiniteModule } from "../js/utils";
let ishandlingInfinite = [false];

const Search = (props) => {
  const [result, setResult] = useState([]);
  const [keyword, setKeyword] = useState("");
  const reloadTrigger = useRecoilValue(reloadTriggerState);
  const [inf, setInf] = useState(false);

  const getNewResult = (word) => {
    const { getMore } = infiniteModule(`search?keyword=${word}`, result, setResult, setInf, ishandlingInfinite);
    return getMore;
  };

  useEffect(() => {
    if (keyword) {
      getNewResult(keyword)(0);
    }
  }, [reloadTrigger]);

  const handleInfinite = async () => {
    if (!inf) return;
    getNewResult(keyword)(result.length);
  };

  return (
    <Page infinite infinitePreloader={!!keyword && inf} onInfinite={handleInfinite}>
      <Navbar sliding={false} title={keyword || "검색"}></Navbar>
      <Formik initialValues={{ keyword: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          getNewResult(values.keyword)(0);
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
          ? <ItemInList items={result} setItems={setResult} />
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
