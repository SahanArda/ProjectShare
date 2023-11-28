import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setMode } from "../../state"; // setMode and setLogOut are the actions/reducers created in the state.js file
import Form from "./Form";
import FlexBetween from "../../components/FlexBetween";

const LoginPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
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
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to ProjectShare, Continue to Start Now!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
