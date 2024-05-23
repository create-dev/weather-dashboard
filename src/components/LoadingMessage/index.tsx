import {ReactElement} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

/**
 * Loading Message component
 *
 * @param param0 {ReactElement} - Shows spinner with react element passed
 * @returns
 */
export default function LoadingMessage({
  children
}: Readonly<{children?: ReactElement}>) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem"
      }}
    >
      <CircularProgress sx={{color: "rgba(255,255,255, .8)"}} />
      {children}
    </Box>
  );
}
