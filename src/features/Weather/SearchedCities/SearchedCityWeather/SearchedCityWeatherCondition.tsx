import {Box, SvgIcon, Typography} from "@mui/material";
import AirIcon from "@mui/icons-material/Air";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import {
  TireRepairRounded,
  WaterDropRounded,
  WaterRounded,
  WbSunnyRounded
} from "@mui/icons-material";

/**
 * SearchedCityWeatherCondition props
 */
export type SearchedCityWeatherConditionType = {
  value: string;
  type: string;
};

/**
 * SearchedCityWeatherCondition shows indiviadual weather condition of a searched city
 *
 * @param props {SearchedCityWeatherConditionType} - SearchedCityWeatherCondition props
 * @returns
 */
const SearchedCityWeatherCondition = (
  props: SearchedCityWeatherConditionType
) => {
  let iconContent;

  if (props.type === "temperature")
    iconContent = (
      <ThermostatIcon sx={{fontSize: {xs: "15px", sm: "16px", md: "18px"}}} />
    );
  else if (props.type === "wind")
    iconContent = (
      <AirIcon sx={{fontSize: {xs: "15px", sm: "16px", md: "18px"}}} />
    );
  else if (props.type === "clouds")
    iconContent = (
      <FilterDramaIcon sx={{fontSize: {xs: "15px", sm: "16px", md: "18px"}}} />
    );
  else if (props.type === "pressure")
    iconContent = (
      <SvgIcon
        component={TireRepairRounded}
        sx={{fontSize: {xs: "15px", sm: "16px", md: "18px"}}}
      />
    );
  else if (props.type === "humidity")
    iconContent = (
      <SvgIcon
        component={WaterRounded}
        sx={{fontSize: {xs: "15px", sm: "16px", md: "18px"}}}
      />
    );
  else if (props.type === "precipitation")
    iconContent = (
      <SvgIcon
        component={WaterDropRounded}
        sx={{fontSize: {xs: "15px", sm: "16px", md: "18px"}}}
      />
    );
  else if (props.type === "uvIndex")
    iconContent = (
      <SvgIcon
        component={WbSunnyRounded}
        sx={{fontSize: {xs: "15px", sm: "16px", md: "18px"}}}
      />
    );
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "31px",
        color: "rgba(255, 255, 255, .7)",
        gap: {xs: "3px", sm: "4px", md: "6px"},
        width: "100%"
      }}
    >
      {iconContent}
      <Typography
        variant="h4"
        component="p"
        sx={{
          fontSize: {xs: "12px", sm: "13px"},
          fontWeight: {xs: "400", sm: "600"},
          color: "white",
          fontFamily: "Poppins",
          lineHeight: 1
        }}
      >
        {props.value}
      </Typography>
    </Box>
  );
};

export default SearchedCityWeatherCondition;
