import {useEffect, useState} from "react";
import {Grid, Typography} from "@mui/material";
import {useWeather} from "../../useWeather";
import SearchedCityWeatherDetails from "./SearchedCityWeatherDetails";
import SearchedCityWeatherCondition from "./SearchedCityWeatherCondition";
import LoadingMessage from "../../../../components/LoadingMessage";
import ErrorInfo from "../../../../components/ErrorInfo";
import {City} from "../../../../types/City";

/**
 * SearchedCityWeather component to show searched city details and weather
 *
 * @param param0 - City object
 * @returns
 */
export default function SearchedCityWeather({
  location
}: Readonly<{
  location: City;
}>) {
  const [errorResponse, setErrorResponse] = useState<string>("");

  const {
    data: weatherDetails,
    isLoading,
    isError,
    error
  } = useWeather(location.name);

  useEffect(() => {
    if (isError && error?.message) {
      let message = error.message;
      if (error?.response?.error) {
        message += ` [${error?.response?.error?.code} : ${error?.response?.error?.message}]`;
      }
      setErrorResponse(message);
    }
  }, [isError, error]);

  if (isError) {
    return <ErrorInfo errorMessage={errorResponse} />;
  }

  if (isLoading || weatherDetails === undefined) {
    return (
      <LoadingMessage>
        <Typography
          variant="h4"
          component="h4"
          sx={{
            fontWeight: "600",
            fontSize: {xs: "12px", sm: "14px", md: "16px"},
            color: "white",
            lineHeight: 1,
            fontFamily: "Poppins"
          }}
        >
          {"Loading Weather..."}
        </Typography>
      </LoadingMessage>
    );
  }

  return (
    !isLoading &&
    weatherDetails && (
      <>
        <SearchedCityWeatherDetails
          city={`${location.name} - ${location.desc}`}
          conditionImg={weatherDetails.current.condition.icon}
          conditionDesc={weatherDetails.current.condition.text}
        />
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <SearchedCityWeatherCondition
            type="temperature"
            value={Math.round(weatherDetails.current.temp_c) + " °C"}
          />
          <SearchedCityWeatherCondition
            type="humidity"
            value={weatherDetails.current.humidity + " %"}
          />
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <SearchedCityWeatherCondition
            type="wind"
            value={weatherDetails.current.wind_mph + " m/h"}
          />
          <SearchedCityWeatherCondition
            type="pressure"
            value={`${weatherDetails.current.pressure_mb} hPa`}
          />
        </Grid>
      </>
    )
  );
}
