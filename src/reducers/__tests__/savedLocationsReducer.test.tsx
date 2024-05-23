import {ReactNode, act} from "react";
import {renderHook} from "@testing-library/react";
import {City, SavedCity} from "../../types/City";
import {useSavedLocationsReducer} from "../savedLocationsReducer";
import {MAX_SAVED_LOCATIONS} from "../../constants";

describe("savedLocationsReducer", () => {
  //wrapper with QueryClientProvider for the hook
  const wrapper = ({children}: {children?: ReactNode}) => <div>{children}</div>;

  it("should initialize the saved locations", () => {
    //given
    const DEFAULT_LOCATION: City = {
      name: "London",
      region: "City of London, Greater London",
      desc: `London, United Kingdom`
    };

    //when
    const {result} = renderHook(
      () =>
        useSavedLocationsReducer([
          {location: DEFAULT_LOCATION, timestamp: new Date()}
        ]),
      {wrapper}
    );

    //then
    const resSavedLocations = result.current.savedLocations;
    expect(resSavedLocations.length).toBe(1);
    expect(resSavedLocations[0].location.name).toBe("London");
    expect(resSavedLocations[0].location.region).toBe(
      "City of London, Greater London"
    );
    expect(resSavedLocations[0].location.desc).toBe("London, United Kingdom");
  });

  it("should add a new location", () => {
    //given
    const DEFAULT_LOCATION: City = {
      name: "London",
      region: "City of London, Greater London",
      desc: `London, United Kingdom`
    };
    const cityMubai: City = {
      name: "Mumbai",
      region: "Maharashtra",
      desc: `Mumbai, Maharashtra`
    };

    //when
    const {result} = renderHook(
      () =>
        useSavedLocationsReducer([
          {location: DEFAULT_LOCATION, timestamp: new Date()}
        ]),
      {wrapper}
    );

    act(() => {
      //add a new location
      result.current.refreshSavedLocations(cityMubai);
    });

    //then
    const resSavedLocations = result.current.savedLocations;
    expect(resSavedLocations.length).toBe(2);
    expect(resSavedLocations[0].location.name).toBe(cityMubai.name);
    expect(resSavedLocations[0].location.region).toBe(cityMubai.region);
    expect(resSavedLocations[0].location.desc).toBe(cityMubai.desc);
  });

  it("should remove the last item if trying to add more than max allowed locations", () => {
    //given
    const cityLondon: City = {
      name: "London",
      region: "City of London, Greater London",
      desc: `London, United Kingdom`
    };
    const initialSavedLocations: SavedCity[] = [];
    for (let i = 0; i < MAX_SAVED_LOCATIONS; i++) {
      initialSavedLocations.push({
        location: {name: `test${i}`, region: `test${i}`, desc: `test${i}`},
        timestamp: new Date()
      });
    }

    //when
    const {result} = renderHook(
      () => useSavedLocationsReducer(initialSavedLocations),
      {wrapper}
    );

    //then current locations count should be MAX_SAVED_LOCATIONS
    expect(result.current.savedLocations.length).toBe(MAX_SAVED_LOCATIONS);

    act(() => {
      //add a new location
      result.current.refreshSavedLocations(cityLondon);
    });

    //then
    const resSavedLocations = result.current.savedLocations;
    expect(resSavedLocations.length).toBe(MAX_SAVED_LOCATIONS);
    expect(resSavedLocations[0].location.name).toBe(cityLondon.name);
    expect(resSavedLocations[0].location.region).toBe(cityLondon.region);
    expect(resSavedLocations[0].location.desc).toBe(cityLondon.desc);
  });

  it("should move the city to top if it is selected again", () => {
    //given
    const cityLondon: City = {
      name: "London",
      region: "City of London, Greater London",
      desc: `London, United Kingdom`
    };

    const initialSavedLocations: SavedCity[] = [
      {location: cityLondon, timestamp: new Date()}
    ];

    //when
    const {result} = renderHook(
      () => useSavedLocationsReducer(initialSavedLocations),
      {wrapper}
    );

    for (let i = 0; i < MAX_SAVED_LOCATIONS - 1; i++) {
      act(() => {
        //add/refresh a location
        result.current.refreshSavedLocations({
          name: `test${i}`,
          region: `test${i}`,
          desc: `test${i}`
        });
      });
    }

    //then current locations count should be MAX_SAVED_LOCATIONS and London must be last
    expect(result.current.savedLocations.length).toBe(MAX_SAVED_LOCATIONS);
    expect(result.current.savedLocations[4].location.name).toBe(
      cityLondon.name
    );

    act(() => {
      //add/refresh a location
      result.current.refreshSavedLocations(cityLondon);
    });

    //then - london must move to top
    const resSavedLocations = result.current.savedLocations;
    expect(resSavedLocations.length).toBe(MAX_SAVED_LOCATIONS);
    expect(resSavedLocations[0].location.name).toBe(cityLondon.name);
    expect(resSavedLocations[0].location.region).toBe(cityLondon.region);
    expect(resSavedLocations[0].location.desc).toBe(cityLondon.desc);
  });
});
