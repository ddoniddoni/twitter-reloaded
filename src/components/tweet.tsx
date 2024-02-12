import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div`
  &:last-child {
    display: flex;
    justify-content: end;
    align-items: center;
  }
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const EditButton = styled.button`
  background-color: #1d9bf0;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
`;

const TextArea = styled.textarea`
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  margin: 10px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;
const UpdateButton = styled.button`
  background-color: #1d9bf0;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;
const CancelButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const [isUpdate, setUpdate] = useState(true);
  const [updateTweet, setUpdateTweet] = useState(tweet);

  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = confirm("tweets을 정말 삭제하시겠습니까?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user?.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
  const onUpdate = () => {
    const ok = confirm("작성된 tweets을 수정하시겠습니까?");
    if (!ok || user?.uid !== userId) return;
    setUpdate(false);
  };

  const onSubmit = async () => {
    try {
      await updateDoc(doc(db, "tweets", id), {
        tweet: updateTweet,
      });
      setUpdate(true);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateTweet(e.target.value);
  };

  const onCancel = () => {
    setUpdate(true);
  };

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        {isUpdate ? (
          <Payload>{tweet}</Payload>
        ) : (
          <TextArea
            required
            rows={5}
            maxLength={180}
            value={updateTweet}
            placeholder="무슨일이?"
            onChange={onChange}
          />
        )}
        {user?.uid === userId && isUpdate ? (
          <DeleteButton onClick={onDelete}>Delete</DeleteButton>
        ) : null}
        {user?.uid === userId && !isUpdate ? (
          <UpdateButton onClick={onSubmit}>Update</UpdateButton>
        ) : null}
        {user?.uid === userId && !isUpdate ? (
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
        ) : null}
        {user?.uid === userId && isUpdate ? (
          <EditButton onClick={onUpdate}>Edit</EditButton>
        ) : null}
      </Column>
      <Column>{photo ? <Photo src={photo} /> : null}</Column>
    </Wrapper>
  );
}
