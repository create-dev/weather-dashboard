import {Grid} from "@mui/material";
import WeatherConditionItem from "./WeatherConditionItem";
import SectionHeader from "../../../../components/SectionHeader";
import {WeatherCurrent} from "../../../../types/WeatherDetails";

/**
 * CurrentCondition props
 */
export type CurrentConditionType = {
  currentWeatherDetails: WeatherCurrent;
};

/**
 * CurrentCondition component shows current weather condition of a city
 *
 * @param props {CityCurrentConditionType} - CurrentCondition props
 * @returns
 */
export default function CurrentCondition(
  props: Readonly<CurrentConditionType>
) {
  const {currentWeatherDetails: weatherDetails} = props;
  return (
    <Grid container sx={{marginTop: "2.9rem"}}>
      <Grid item xs={12}>
        <SectionHeader title={"Current Condition"} />
      </Grid>
      <>
        <WeatherConditionItem
          title="Feels Like"
          value={`${weatherDetails.feelslike_c} °C`}
          type="temperature"
        />
        <WeatherConditionItem
          title="Wind Speed"
          value={`${weatherDetails.wind_mph} m/h`}
          type="wind"
        />
        <WeatherConditionItem
          title="Pressure"
          value={`${Math.round(weatherDetails.pressure_mb)} hPa`}
          type="pressure"
        />
        <WeatherConditionItem
          title="Precipitation"
          value={`${Math.round(weatherDetails.precip_mm)} %`}
          type="precipitation"
        />
        <WeatherConditionItem
          title="Humidity"
          value={`${Math.round(weatherDetails.humidity)} %`}
          type="humidity"
        />
        <WeatherConditionItem
          title="UV Index"
          value={`${weatherDetails.uv}`}
          type="uvIndex"
        />
      </>
    </Grid>
  );
}
