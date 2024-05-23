import {useEffect, useState} from "react";
import {Grid, Typography} from "@mui/material";
import CurrentWeather from "./CurrentWeather";
import CurrentCondition from "./CurrentCondition";
import LoadingMessage from "../../../components/LoadingMessage";
import ErrorInfo from "../../../components/ErrorInfo";
import {useWeather} from "../useWeather";
import {City} from "../../../types/City";

/**
 * Weather component to show city details and current weather
 *
 * @param param0 - City details
 * @returns
 */
export default function CityWeather({location}: {location: City}) {
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
    return (
      <Grid item xs={12}>
        <ErrorInfo errorMessage={errorResponse} />
      </Grid>
    );
  }

  if (isLoading || weatherDetails === undefined) {
    return (
      <LoadingMessage>
        <Typography
          variant="h3"
          component="h3"
          sx={{
            fontWeight: "600",
            fontSize: {xs: "12px", sm: "14px", md: "16px"},
            color: "white",
            lineHeight: 1,
            marginBottom: "8px",
            padding: "25px",
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
        <CurrentWeather
          location={weatherDetails.location}
          weather={weatherDetails.current}
        />
        <CurrentCondition currentWeatherDetails={weatherDetails.current} />
      </>
    )
  );
}
