import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  Divider,
} from "@mui/material";
import Dropzone from "react-dropzone";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const theme = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = theme.palette.neutral.mediumMain;
  const medium = theme.palette.neutral.medium;
  const hover = theme.palette.primary.mediumMain;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="Upload Project"
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: theme.palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          borderRadius="5px"
          border={`1px solid ${medium}`}
          mt="1rem"
          padding="1rem"
        >
          <Dropzone // This is the dropzone component which allows us to upload images
            acceptedFiles=".jpg,.jpeg,.png" // Only accepts these file types
            multiple={false} // Only allows the user to upload one image
            onDrop={
              (acceptedFiles) => setImage(acceptedFiles[0]) // This allows us to set the value of picture to the image that the user has uploaded
            }
          >
            {(
              { getRootProps, getInputProps } // These are the props that allow us to access the dropzone functions
            ) => (
              <FlexBetween>
                <Box // This is the box that will display the dropzone with dashed border
                  {...getRootProps()} // This allows us to access the root props
                  border={`2px dashed ${theme.palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? ( // If there the user does not upload a picture then display the text otherwise display the picture file name
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{
                      width: "15%",
                    }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{
              "&:hover": {
                color: medium,
                cursor: "pointer",
              },
            }}
          >
            Image
          </Typography>
        </FlexBetween>
        {/* {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography
                color={mediumMain}
                sx={{
                  "&:hover": {
                    color: medium,
                    cursor: "pointer",
                  },
                }}
              >
                Clip
              </Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography
                color={mediumMain}
                sx={{
                  "&:hover": {
                    color: medium,
                    cursor: "pointer",
                  },
                }}
              >
                Attachment
              </Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )} */}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: theme.palette.background.alt,
            backgroundColor: theme.palette.primary.main,
            borderRadius: "3rem",
            transition: "0.3s",
            "&:hover": {
              transition: "0.3s",
              cursor: "pointer",
              backgroundColor: hover,
            },
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
