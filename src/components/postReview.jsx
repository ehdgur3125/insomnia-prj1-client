import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { f7, Row, Col, Button } from 'framework7-react';
import { createAsyncPromise } from "../common/api/api.config";
import { itemState, reloadTriggerState } from "../js/atoms";

const PostReview = (props) => {
  let communicating = false; // 연타했을 때 두개 입력되는거 방지용
  const [text, setText] = useState("");
  const [grade, setGrade] = useState(0);
  const [item, setItem] = useRecoilState(itemState);
  const [, setReloadTrigger] = useRecoilState(reloadTriggerState);
  const [patch, setPatch] = useState(false);

  const handleChange = (e) => {
    if (e.target.value.length > 255) {
      f7.dialog.alert("글자수 제한 255자를 초과하였습니다.", "글자수 제한");
    }
    setText(e.target.value.slice(0, 255));
  };

  const handleClick = async () => {
    if (communicating) return;
    if (text === "") {
      f7.dialog.alert("리뷰를 입력해주세요", "");
      return;
    }
    if (grade === 0) {
      f7.dialog.alert("평점을 선택해주세요", "");
      return;
    }
    communicating = true;
    if (!item.reviewed) {
      await createAsyncPromise('POST', "/review")({
        itemId: item.itemId,
        grade,
        text
      });
    }
    else {
      await createAsyncPromise('PATCH', "/review")({
        reviewId: item.reviewed.reviewId,
        grade,
        text
      });
      setPatch(false);
    }
    const data = await createAsyncPromise("GET", `/item/${item.itemId}`)();
    setReloadTrigger(x => x + 1);
    communicating = false;
  }

  useEffect(() => {
    if (item.reviewed) {
      setText(item.reviewed.text);
      setGrade(item.reviewed.grade);
    }
    else {
      setText("");
      setGrade(0);
    }
  }, [item]);

  return (
    (!item.reviewed || patch)
      ?
      <div>
        <Row className='text-center'><Col><div>평점을 선택해주세요.</div></Col></Row>
        <Row noGap className='justify-center mx-5 my-5 '>
          {Array(5).fill(0).map((x, index) =>
            <Col width='10' medium='5' key={`star${index}`}>
              <Button iconF7={grade > index ? 'star_fill' : 'star'}
                onClick={() => setGrade(index + 1)}
                color='yellow' />
            </Col>
          )}
        </Row>
        <div className='flex mx-5 h-20 items-stretch'>
          <div className='border p-2 w-5/6 h-full'><textarea className='w-full h-full' onChange={handleChange} value={text} /></div>
          <Button fill className='w-1/6 h-full' onClick={handleClick}>리뷰</Button>
        </div>
      </div>
      :
      <div className='flex justify-center'><Button fill className='w-1/3' onClick={() => setPatch(true)}>리뷰 수정하기</Button></div>
  );
};

export default PostReview;