import React from "react";
import { f7, Row, Col, Icon, Button } from "framework7-react";
import { createAsyncPromise } from "../common/api/api.config";
import { getToken } from "../common/auth";
import { useRecoilState } from "recoil";
import { reloadTriggerState } from "../js/atoms";

const Bookmark = ({ item, setItem }) => {
  const [, setReloadTriggerState] = useRecoilState(reloadTriggerState);
  const handleClick = async () => {
    if (getToken().token) {
      if (!item.liked) {
        await createAsyncPromise("POST", "/like")({ itemId: item.itemId });
        setItem({
          ...item,
          likes: item.likes + 1,
          liked: true,
        });
      } else {
        await createAsyncPromise("DELETE", `/like/${item.itemId}`)();
        setItem({
          ...item,
          likes: item.likes - 1,
          liked: false,
        });
      }
      setReloadTriggerState(x => x + 1);
    } else {
      f7.dialog.alert("로그인이 필요합니다.", "회원 전용");
    }
  }
  return <Button iconF7={!item.liked ? "bookmark" : "bookmark_fill"} iconColor='default' onClick={handleClick} />;
};

export default Bookmark;
