import { Box } from "@mui/material";
import { styled } from "@mui/system";

// This is going to wrap the widgets and give a basic style to them
const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.75rem",
}));

export default WidgetWrapper;
