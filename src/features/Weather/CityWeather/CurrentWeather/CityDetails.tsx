import {Box, Typography} from "@mui/material";
import {WeatherLocation} from "../../../../types/WeatherDetails";

/**
 * CityDetails type
 */
export type CityDetailsType = {
  location: WeatherLocation;
};

/**
 * CityDetails component to show name and description of a city
 *
 * @param props {CityDetailsType} - CityDetails prop
 * @returns
 */
export default function CityDetails(props: CityDetailsType) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "100%"
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontFamily: "Poppins",
          fontWeight: "600",
          fontSize: {xs: "12px", sm: "14px", md: "16px"},
          color: "white",
          textTransform: "uppercase",
          lineHeight: 1,
          marginBottom: "8px"
        }}
      >
        {props.location.name}
      </Typography>
      <Typography
        variant="h4"
        component="h4"
        sx={{
          fontSize: {xs: "10px", sm: "12px", md: "14px"},
          color: "rgba(255,255,255, .7)",
          lineHeight: 1,
          letterSpacing: {xs: "1px", sm: "0"},
          fontFamily: "Roboto Condensed"
        }}
      >
        {`${props.location.region} - ${props.location.country}`}
      </Typography>
    </Box>
  );
}
