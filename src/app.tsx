import {useState} from "react";
import {Container, Grid, Typography} from "@mui/material";
import {APP_NAME} from "./constants";
import CitySearch from "./features/CitySearch";
import CityWeather from "./features/Weather/CityWeather";
import SearchedCities from "./features/Weather/SearchedCities";
import {City} from "./types/City";
import {useSavedLocationsReducer} from "./reducers/savedLocationsReducer";

/**
 * This app allows users to search city, show weather and manage recent searches
 *
 * @returns {@link App}
 */
function App() {
  console.log("Weather App Started");

  //default location is set to LONDON
  const DEFAULT_CITY = "London";
  const DEFAULT_LOCATION: City = {
    name: DEFAULT_CITY,
    region: "City of London, Greater London",
    desc: `${DEFAULT_CITY}, United Kingdom`
  };

  //selected location
  const [selectedLocation, setSelectedLocation] =
    useState<City>(DEFAULT_LOCATION);

  //most recent searched 5 locations
  const {savedLocations, refreshSavedLocations} = useSavedLocationsReducer([
    {location: DEFAULT_LOCATION, timestamp: new Date()}
  ]);

  /**
   * Handles when selected/current city changes
   *
   * @param selectedLocation {City} - City selected using search
   */
  const handleLocationChange = (selectedLocation: City): void => {
    if (selectedLocation?.name) {
      setSelectedLocation(selectedLocation);
      refreshSavedLocations(selectedLocation);
    }
  };

  return (
    <Container
      sx={{
        maxWidth: {xs: "90%", sm: "80%", md: "1100px", lg: "1400px"},
        width: "100%",
        height: "100%",
        margin: "0 auto",
        padding: "1rem 0 3rem",
        marginTop: "2rem",
        marginBottom: "1rem",
        backgroundColor: "#005592",
        borderRadius: {
          xs: "none",
          sm: "1rem"
        },
        boxShadow: {
          xs: "none",
          sm: "rgba(0,0,0, 0.5) 0px 10px 15px -3px, rgba(0,0,0, 0.5) 0px 4px 6px -2px"
        }
      }}
    >
      <Grid container columnSpacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: {xs: "16px", sm: "20px", md: "24px"},
              fontFamily: "Poppins",
              color: "rgba(255,255,255,.7)",
              fontWeight: "600",
              lineHeight: 1,
              textAlign: "center",
              marginBottom: "1rem"
            }}
          >
            {APP_NAME}
          </Typography>
          <CitySearch
            onLocationChange={(location) => handleLocationChange(location)}
          />
        </Grid>
        <Grid container sx={{padding: "3rem 1rem 0rem"}}>
          <CityWeather location={selectedLocation} />
        </Grid>
        <Grid container sx={{padding: "3rem 1rem 0rem"}}>
          <SearchedCities
            recentLocations={savedLocations}
            onLocationSelect={(location: City) =>
              handleLocationChange(location)
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export {App};
