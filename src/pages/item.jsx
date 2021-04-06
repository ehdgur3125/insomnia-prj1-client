import React, {useState, useEffect} from 'react';
import { Page, Navbar, Block, NavLeft, Link } from 'framework7-react';
import {createAsyncPromise} from '../common/api/api.config';
import { getToken} from '../common/auth'

const Item = (props) => {
  const [itemId,setItemId]=useState(0);
  const [item,setItem]=useState(null);
  useEffect(async()=>{
    const data=await createAsyncPromise('GET',`/item/${props.itemId}`)();
    console.log(data.item);
    setItem(data.item);
    setItemId(props.itemId);
  },[itemId]);
  return (
    <Page>
      <Navbar title={(itemId>0)?item.name:''} sliding={false} backLink='Back'>
      </Navbar>
        {itemId>0
        ? <>
          <p>{item.text}</p>
          <p>찜한 사람들 : {item.likes}</p>
          <button onClick={()=>{
            if(getToken().token){
              if(!item.liked){
                createAsyncPromise('POST','/like')({itemId});
                setItem({...item,liked:true});
              }
              else{
                createAsyncPromise('DELETE',`/like/${itemId}`)();
                setItem({...item,liked:false});
              }
            }
          }}>{item.liked?"이미 좋아요됨":"좋아요"}</button>
          <ul>{item.options.map(option=><li key={option.optionId}>{option.text} : {option.price} : {option.inCart?"이미 카트에 있음":""}</li>)}</ul>
        </>
        :null}
    </Page>
  );
};

export default Item;
