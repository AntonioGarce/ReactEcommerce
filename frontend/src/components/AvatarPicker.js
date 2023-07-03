import React, { useEffect, useRef } from "react";
import t from "prop-types";
import { Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider, createTheme } from "@mui/material/styles"


const theme = createTheme();

const AvatarPicker = (props) => {
  return(
    <ThemeProvider theme={theme}>
      <AvatarPickerContent {...props} />
    </ThemeProvider>
  )
}

const AvatarPickerContent = ({ handleChangeImage, avatarImage }) => {

  const [file, setFile] = React.useState("");

  const imageRef = useRef();

  useEffect(() => {
    if (!file && avatarImage) {
      setFile(URL.createObjectURL(avatarImage));
    }

    return () => {
      if (file) URL.revokeObjectURL(file);
    };
  }, [file, avatarImage]);

  const renderImage = (fileObject) => {
    const img = new Image()
    img.src = URL.createObjectURL(fileObject)
    console.log('render Change')
    console.log(img)
    img.onload = () => {
      
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const maxWidth = 256;
      const maxHeight = 256;

      const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
      const width = (img.width * ratio + 0.5) | 0;
      const height = (img.height * ratio + 0.5) | 0;

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        const resizedFile = new File([blob], file.name, fileObject);
        setFile(URL.createObjectURL(resizedFile));
        handleChangeImage(resizedFile);
      });
    };
  };

  const showOpenFileDialog = () => {
    imageRef.current.click();
  };

  const handleChange = (event) => {
    const fileObject = event.target.files[0];
    if (!fileObject) return;
    renderImage(fileObject);
  };

  return (
    <>
      <IconButton
        onClick={showOpenFileDialog}
        size="medium"
      >
        <Avatar alt={"avatar"} src={file}  
          sx={{
            width: '100px',
            height: '100px'
          }} 
        />
      </IconButton>
      <input
        ref={imageRef}
        type="file"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleChange}
      />
    </>

  );
};

AvatarPicker.propTypes = {
  handleChangeImage: t.func.isRequired,
  avatarImage: t.object
};

export default AvatarPicker