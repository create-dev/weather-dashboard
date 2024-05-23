import {Box, Grid, Typography} from "@mui/material";
import WeatherIcon from "./WeatherIcon";
import CityDetails from "./CityDetails";
import {
  WeatherCurrent,
  WeatherLocation
} from "../../../../types/WeatherDetails";

/**
 * CurrentWeather props
 */
export type CurrentWeatherType = {
  location: WeatherLocation;
  weather: WeatherCurrent;
};

/**
 * CurrentWeather component shows a brief view of the city's current weather
 *
 * @param props {CurrentWeatherType} - CurrentWeather props
 * @returns
 */
export default function CurrentWeather(props: CurrentWeatherType) {
  const {location, weather} = props;

  return (
    <>
      <Grid
        item
        xs={4}
        sx={{
          height: "80px"
        }}
      >
        <CityDetails location={location} />
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          height: "80px"
        }}
      >
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
              fontWeight: "600",
              fontSize: {xs: "12px", sm: "14px", md: "16px"},
              color: "white",
              textTransform: "uppercase",
              lineHeight: 1,
              marginBottom: "8px",
              fontFamily: "Poppins"
            }}
          >
            {weather.temp_c} °C
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
            {weather.condition.text}
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80px"
        }}
      >
        <WeatherIcon src={weather.condition.icon} />
      </Grid>
    </>
  );
}
