import React, { useState, useEffect, useRef } from "react";
import { addPhoto } from '../redux/photos.js';
import { useDispatch } from '../redux/store';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const MyButton = styled(Button)({
  color: '#ffffff',
  backgroundColor: "#0CC5F9", 
  padding: 8,
  borderRadius: 4,
  margin: 32, 
});



const UploadPhotos = () => {

  const dispatch = useDispatch();
  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const [file, setFile] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  }

  useEffect(() => {
    let fileReader, isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          dispatch(addPhoto(result))
        }
      }
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }
  }, [file, dispatch]);

  return (
    <>
      <form>
          <MyButton onClick={handleClick}> Upload a photo</MyButton>
          <input
            type="file"
            id='image'
            accept='.png, .jpg, .jpeg'
            onChange={changeHandler}
            ref={hiddenFileInput}
            style={{ display: 'none' }}
          />
      </form>
    </>
  );
};

export default UploadPhotos;