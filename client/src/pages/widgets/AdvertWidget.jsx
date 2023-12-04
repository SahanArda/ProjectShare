import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/apple-advert.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Apple</Typography>
        <Typography color={medium}>apple.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        MacBook Pro blasts forward with the M3, M3 Pro, and M3 Max chips. Built
        on 3-nanometer technology and featuring an all-new GPU architecture,
        they&apos;re the most advanced chips ever built for a personal computer. And
        each one brings more pro performance and capability.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
