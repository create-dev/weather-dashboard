import {useReducer} from "react";
import {
  City,
  SaveCityAction,
  SaveCityActionType,
  SavedCity
} from "../types/City";
import {MAX_SAVED_LOCATIONS} from "../constants";

/**
 * Reducer to update saved cities
 *
 * @param state {SavedCity[]} - Current saved cities
 * @param action {SaveCityAction} - Save city action
 * @returns - List of latest saved cities
 */
function savedLocationsReducer(
  state: SavedCity[],
  action: SaveCityAction
): SavedCity[] {
  const {type, data} = action;

  switch (type) {
    case SaveCityActionType.ADD: {
      const locationToAdd: SavedCity = {
        location: data,
        timestamp: new Date()
      };
      return [locationToAdd, ...state];
    }
    case SaveCityActionType.REMOVE: {
      const filteredSavedLocations = state.filter(
        (s) => s.location.name !== data.name
      );
      return filteredSavedLocations;
    }
    default:
      return state;
  }
}

//most recent searched 5 locations
export function useSavedLocationsReducer(initialState: SavedCity[]): {
  savedLocations: SavedCity[];
  refreshSavedLocations: (location: City) => void;
} {
  //most recent searched 5 locations
  const [savedLocations, dispatchSavedLocation] = useReducer(
    savedLocationsReducer,
    initialState
  );

  /**
   * Refreshes saved locations with new searched city
   *
   * @param location {City} - Searched City
   */
  const refreshSavedLocations = (location: City) => {
    console.log("Udating Saved Locations");

    //check if the location exists
    const existingLocation = savedLocations.find(
      (s) =>
        s.location.name.toLowerCase() === location.name.toLowerCase() &&
        s.location.region.toLowerCase() === location.region.toLowerCase()
    );

    if (savedLocations.length === MAX_SAVED_LOCATIONS && !existingLocation) {
      dispatchSavedLocation({
        type: SaveCityActionType.REMOVE,
        data: savedLocations[savedLocations.length - 1].location
      });
    }

    if (existingLocation) {
      //remove the location
      dispatchSavedLocation({
        type: SaveCityActionType.REMOVE,
        data: existingLocation.location
      });
      //add it again at start with new timestamp
      dispatchSavedLocation({
        type: SaveCityActionType.ADD,
        data: existingLocation.location
      });
    } else {
      dispatchSavedLocation({
        type: SaveCityActionType.ADD,
        data: location
      });
    }
  };

  return {savedLocations, refreshSavedLocations};
}
