import {Box} from "@mui/material";

/**
 * WeatherIcon component to show weather condition
 *
 * @param param0 {string} - Weather condition image src
 * @returns
 */
const WeatherIcon = ({src}: {src: string | undefined}) => {
  return (
    <Box
      component="img"
      sx={{
        width: {xs: "50px", sm: "60px"},
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        margin: "0 auto",
        padding: "0"
      }}
      alt="weather"
      src={src}
    />
  );
};

export default WeatherIcon;
