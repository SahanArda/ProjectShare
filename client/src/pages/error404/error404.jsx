import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // useNavigate allows user to navigate to different pages
import { useDispatch } from "react-redux";
import { setMode, setLogOut } from "../../state"; // setMode and setLogOut are the actions/reducers created in the state.js file
import FlexBetween from "../../components/FlexBetween";

const Error = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const hover = theme.palette.primary.mediumMain;

  const handleLogOut = () => {
    dispatch(setLogOut());
    navigate("/");
  };

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="flex-center"
      >
        <FlexBetween>
          <Typography fontWeight="bold" fontSize="32px" color="primary">
            ProjectShare
          </Typography>
          <Typography>
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode
                  sx={{ color: "theme.palette.neutral.dark", fontSize: "25px" }}
                />
              )}
            </IconButton>
          </Typography>
        </FlexBetween>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="10rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight="500"
          variant="h1"
          sx={{ mb: "0.5rem" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          ERROR404
          <ErrorOutlineIcon fontSize="35px" />
        </Typography>

        <Typography variant="h3" textAlign="center" sx={{ mb: "1.5rem" }}>
          Sorry this page doesn&apos;t exist
        </Typography>

        <Typography textAlign="center">
          You may have typed an incorrect address in your browser&apos;s address
          bar or the page may have moved. Not to worry click the button below to
          go back to the home page or log out!
          <Typography mt="2rem">
            <Button
              variant="contained"
              onClick={() => navigate("/Home")}
              sx={{
                color: theme.palette.background.alt,
                backgroundColor: theme.palette.primary.main,
                transition: "0.3s",
                mr: '2rem',
                "&:hover": {
                  transition: "0.3s",
                  cursor: "pointer",
                  backgroundColor: hover,
                },
              }}
            >
              Home
            </Button>
            <Button
              variant="contained"
              onClick={handleLogOut}
              sx={{
                color: theme.palette.background.alt,
                backgroundColor: theme.palette.primary.main,
                transition: "0.3s",
                "&:hover": {
                  transition: "0.3s",
                  cursor: "pointer",
                  backgroundColor: hover,
                },
              }}
            >
              Log Out
            </Button>
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default Error;
