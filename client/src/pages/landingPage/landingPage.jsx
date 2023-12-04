import { useState } from "react";
import { useDispatch } from "react-redux";
import { setMode } from "../../state"; // setMode and setLogOut are the actions/reducers created in the state.js file
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween"; // FlexBetween is a component created by me which allows me to use it multiple times
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DarkMode, LightMode, Menu, Close } from "@mui/icons-material";

const LandingPage = () => {
  const [isMobileMenuToggle, setIsMobileMenuToggle] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:950px)");

  // Theme
  const theme = useTheme(); // This allows us to access the theme object and use any colour from the theme
  const neutralLight = theme.palette.neutral.light; // This is an example of how we access the neutral light colour from the theme
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const hover = theme.palette.primary.mediumMain;
  const alt = theme.palette.background.alt;

  return (
    <>
      <FlexBetween padding="1rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem">
          <Typography
            fontWeight="bold"
            fontSize="Clamp(1rem, 2rem, 2.25rem)" // Clamp function allows the font size to be adjusted to the screen size
            color="primary"
          >
            ProjectShare
          </Typography>
        </FlexBetween>

        {/* DESKTOP NAV */}
        {isNonMobileScreens ? (
          <FlexBetween gap="2rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Button
              variant="contained"
              onClick={() => navigate("/login")}
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
              Sign In
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/login")}
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
              Register
            </Button>
          </FlexBetween>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggle(!isMobileMenuToggle)}
          >
            <Menu />
          </IconButton>
        )}

        {/* MOBILE NAVBAR */}
        {!isNonMobileScreens && isMobileMenuToggle && (
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth=" 500px"
            minWidth="300px"
            backgroundColor={background}
          >
            {/* CLOSE ICON */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggle(!isMobileMenuToggle)}
              >
                <Close />
              </IconButton>
            </Box>
            {/* MENU ITEMS */}
            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
              <IconButton
                onClick={() => dispatch(setMode())}
                sx={{ fontSize: "25px" }}
              >
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
              <Button
                variant="contained"
                sx={{
                  p: "0.5rem 5rem",
                  color: theme.palette.background.alt,
                  backgroundColor: theme.palette.primary.main,
                  transition: "0.3s",
                  "&:hover": {
                    transition: "0.3s",
                    cursor: "pointer",
                    backgroundColor: hover,
                  },
                }}
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                sx={{
                  p: "0.5rem 4.6rem",
                  color: theme.palette.background.alt,
                  backgroundColor: theme.palette.primary.main,
                  transition: "0.3s",
                  "&:hover": {
                    transition: "0.3s",
                    cursor: "pointer",
                    backgroundColor: hover,
                  },
                }}
                onClick={() => navigate("/login")}
              >
                Register
              </Button>
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>

      <Box
        width={isNonMobileScreens ? "65%" : "93%"}
        p="2rem"
        m="5rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h2" sx={{ mb: "0.75rem" }}>
          Welcome to ProjectShare!
        </Typography>
        <Typography variant="h3" mb="1rem">
          A place where you can share your unique projects.
        </Typography>
        <Typography>
          The ultimate platform for innovators, creators, and visionaries to
          showcase their groundbreaking project ideas! Whether you&apos;re a
          seasoned entrepreneur, a budding inventor, or someone with a passion
          for transformative concepts, Project Share is your go-to destination.
          <Typography variant="h4" mt="1rem">
            Why choose Project Share?
            <Typography mt="1rem">
              1. Visibility: Make your project stand out in a crowd. Gain
              exposure among a diverse audience of professionals, investors, and
              enthusiasts who are actively seeking innovative ideas. <br /> 2.
              Collaboration: Find collaborators who share your passion and
              complement your skills. Whether you need a developer, designer, or
              financial expert, Project Share is the perfect place to build your
              dream team. <br /> 3. Feedback: Receive valuable insights and
              constructive feedback from a community of experts. Refine and
              improve your project based on input from individuals who
              understand the nuances of your industry. <br /> 4. Networking:
              Expand your network and connect with potential mentors, investors,
              and partners who can contribute to the success of your project.{" "}
              <br /> 5. Inspiration: Explore a myriad of projects across various
              industries. Get inspired by the creativity and ingenuity of
              others, fostering an environment where innovation knows no bounds.{" "}
              <br /> <br /> Sign in or register to continue!
            </Typography>
          </Typography>
        </Typography>
      </Box>
    </>
  );
};

export default LandingPage;
