import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Row, Col, Button } from 'framework7-react';
import { createAsyncPromise } from "../common/api/api.config";
import { itemState } from "../js/atoms";

const PostReview = (props) => {
  const [text, setText] = useState("");
  const [grade, setGrade] = useState(0);
  const [item, setItem] = useRecoilState(itemState);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleGrade = (grade) => {
    setGrade(grade);
  }
  const handleClick = async () => {
    if (text === "") return;
    if (grade === 0) return;
    await createAsyncPromise('POST', "/review")({
      itemId: item.itemId,
      grade,
      text
    });
    setText("");
    const data = await createAsyncPromise("GET", `/item/${item.itemId}`)();
    setItem(data.item);
  }

  useEffect(() => {
    setText("");
  }, []);

  return (
    <div>
      <Row className='text-center'><Col><div>평점을 선택해주세요.</div></Col></Row>
      <Row noGap className='justify-center mx-5 my-5 '>
        {Array(5).fill(0).map((x, index) =>
          <Col width='10' medium='5' key={`star${index}`}>
            <Button iconF7={grade > index ? 'star_fill' : 'star'}
              onClick={() => handleGrade(index + 1)}
              color='yellow' />
          </Col>
        )}
      </Row>
      <div className='flex mx-5 h-20 items-stretch'>
        <div className='border p-2 w-5/6 h-full'><textarea className='w-full h-full' onChange={handleChange} value={text} /></div>
        <Button fill className='w-1/6 h-full' onClick={handleClick}>리뷰</Button>
      </div>
    </div>
  );
};

export default PostReview;