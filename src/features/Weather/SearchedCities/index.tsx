import {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import SectionHeader from "../../../components/SectionHeader";
import SearchedCityWeather from "./SearchedCityWeather";
import {City, SavedCity} from "../../../types/City";

/**
 * SearchedCities props
 */
export type SearchedCitiesType = {
  recentLocations: SavedCity[];
  onLocationSelect: (location: City) => void;
};

/**
 * SearchedCities components to show cities searched recently
 *
 * @param props {SearchedCitiesType} - SearchedCities props
 * @returns
 */
const SearchedCities = (props: SearchedCitiesType) => {
  const [searchedLocations, setSearchedLocations] = useState<SavedCity[]>(
    props.recentLocations
  );

  useEffect(() => {
    setSearchedLocations(props.recentLocations);
  }, [props.recentLocations]);

  return (
    <Grid container item xs={12}>
      <Grid item xs={12} md={12} lg={12}>
        <SectionHeader title={"Recent Searches"} />
      </Grid>
      {searchedLocations.length === 0 && <h3>No recent searches</h3>}
      {searchedLocations.map((item) => (
        <Grid
          item
          key={`${item.location.name}_${item.location.region}`}
          xs={12}
          md={12}
          lg={12}
          display="flex"
          alignItems="center"
          data-testid={`searched-city-${item.location.name}-${item.location.region}`}
          onClick={() => props.onLocationSelect(item.location)}
          sx={{
            ":hover": {
              cursor: "pointer",
              background:
                "linear-gradient(0deg, rgba(0, 0, 0, .05) 0%, rgba(0, 0, 0, .05) 100%) 0% 0%",
              boxShadow:
                "rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
            },
            margin: "10px",
            padding: "2px 0 2px",
            background:
              "linear-gradient(0deg, rgba(255, 255, 255, .05) 0%, rgba(171, 203, 222, .05) 100%) 0% 0%",
            boxShadow:
              "rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
            borderRadius: "8px"
          }}
        >
          <SearchedCityWeather location={item.location} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SearchedCities;
