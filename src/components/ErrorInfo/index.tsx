import {ReactNode} from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";

/** Error Info Type */
export type ErrorInfoType = {
  errorMessage?: string | ReactNode;
};

/**
 * ErrorInfo component
 * @param props {ErrorInfoType} - ErrorInfo props
 * @returns
 */
export default function ErrorInfo(props: Readonly<ErrorInfoType>) {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      margin={"1rem auto"}
      gap={"8px"}
      flex={"auto"}
      width={"auto"}
      sx={{
        padding: "1rem",
        flexDirection: {xs: "column", sm: "row"},
        color: "#DC2941",
        border: "1px solid #DC2941",
        borderRadius: "8px",
        background: "rgba(220, 41, 65, .25)"
      }}
    >
      <ErrorOutlineIcon sx={{fontSize: "24px"}} />
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontSize: {xs: "14px", sm: "16px"},
          fontFamily: "Poppins",
          textAlign: "center"
        }}
      >
        {props.errorMessage || "Internal server error"}
      </Typography>
    </Box>
  );
}
