import {Box, Grid, Typography} from "@mui/material";

/**
 * SearchedCityWeatherDetails props
 */
export type SearchedCityWeatherDetailsType = {
  city: string;
  conditionImg: string;
  conditionDesc: string;
};

/**
 * SearchedCityWeatherDetails component to show city details and brief informaiton on weather of a searched city
 *
 * @param props {SearchedCityWeatherDetailsType} - SearchedCityWeatherDetails props
 * @returns
 */
const SearchedCityWeatherDetails = (props: SearchedCityWeatherDetailsType) => {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingLeft: {xs: "12px", sm: "20px", md: "32px"},
        paddingTop: "10px"
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
          lineHeight: 1,
          marginBottom: "8px"
        }}
      >
        {props.city}
      </Typography>
      <Box
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "31px"
        }}
      >
        <Box
          component="img"
          sx={{
            width: {xs: "24px", sm: "28px", md: "31px"},
            height: "auto",
            marginRight: "4px"
          }}
          alt="weather"
          src={props.conditionImg}
        />
        <Typography
          variant="h4"
          component="h4"
          sx={{
            fontSize: {xs: "12px", md: "14px"},
            color: "rgba(255,255,255, .8)",
            lineHeight: 1,
            fontFamily: "Roboto Condensed"
          }}
        >
          {props.conditionDesc}
        </Typography>
      </Box>
    </Grid>
  );
};

export default SearchedCityWeatherDetails;
