import { Box } from "@mui/material";
import { styled } from "@mui/system";

// Since FlexBetween will be used multiple times in the project, it is convenient to create a component for it
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
