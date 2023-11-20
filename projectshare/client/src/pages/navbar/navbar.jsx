import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogOut } from "state";
import { useNavigate } from "react-router-dom";
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
  return (
    <div>
      <h1>Navbar</h1>
    </div>
  );
};

export default Navbar;
