import {Typography} from "@mui/material";

/**
 * Section Header component
 *
 * @param param0 - Title for the header
 * @returns
 */
function SectionHeader({title}: Readonly<{title: string}>) {
  return (
    <Typography
      variant="h5"
      component="h5"
      sx={{
        fontSize: {xs: "12px", sm: "16px", md: "18px"},
        color: "rgba(255,255,255,.7)",
        fontWeight: "600",
        lineHeight: 1,
        textAlign: "center",
        textTransform: "uppercase",
        fontFamily: "Roboto Condensed",
        marginBottom: "1rem"
      }}
    >
      {title}
    </Typography>
  );
}

export default SectionHeader;
