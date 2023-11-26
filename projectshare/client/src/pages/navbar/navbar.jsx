import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogOut } from "state"; // setMode and setLogOut are the actions/reducers created in the state.js file
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween"; // FlexBetween is a component created by me which allows me to use it multiple times
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";

const Navbar = () => {
  const [isMobileMenuToggle, setIsMobileMenuToggle] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  // Theme
  const theme = useTheme(); // This allows us to access the theme object and use any colour from the theme
  const neutralLight = theme.palette.neutral.light; // This is an example of how we access the neutral light colour from the theme
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const userFullName = `${user.firstName} ${user.lastName}`;

  return (
    <FlexBetween padding='1rem 6%' backgroundColor={alt}>

    </FlexBetween>
  );
};

export default Navbar;
