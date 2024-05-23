import {fireEvent, render, screen} from "@testing-library/react";
import {useWeather} from "../../useWeather";
import {City, SavedCity} from "../../../../types/City";
import {WeatherDetails} from "../../../../types/WeatherDetails";
import SearchedCities from "..";

jest.mock("../../useWeather");

const mockUseWeather = useWeather as jest.MockedFunction<typeof useWeather>;
const mockOnLocationSelect = jest.fn();

/**
 * {@link SearchedCities}
 */
describe("SearchedCities", () => {
  const cityLondon: City = {
    name: "London",
    region: "City of London, Greater London",
    desc: `London, United Kingdom`
  };

  const cityMubai: City = {
    name: "Mumbai",
    region: "Maharashtra",
    desc: `Mumbai, Maharashtra`
  };

  const mockLondonWeatherDetails: WeatherDetails = {
    location: {
      name: "London",
      region: "City of London, Greater London",
      country: "United Kingdom",
      lat: 51.52,
      lon: -0.11,
      tz_id: "Europe/London",
      localtime_epoch: 1714883307,
      localtime: "2024-05-05 5:28"
    },
    current: {
      last_updated_epoch: 1714882500,
      last_updated: "2024-05-05 05:15",
      temp_c: 7.0,
      temp_f: 44.6,
      is_day: 1,
      condition: {
        text: "Sunny",
        icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
        code: 1000
      },
      wind_mph: 2.2,
      wind_kph: 3.6,
      wind_degree: 161,
      wind_dir: "SSE",
      pressure_mb: 1009.0,
      pressure_in: 29.8,
      precip_mm: 0.0,
      precip_in: 0.0,
      humidity: 93,
      cloud: 0,
      feelslike_c: 6.8,
      feelslike_f: 44.2,
      vis_km: 10.0,
      vis_miles: 6.0,
      uv: 1.0,
      gust_mph: 4.7,
      gust_kph: 7.6
    }
  };

  const mockMumbaiWeatherDetails: WeatherDetails = {
    location: {
      name: "Mumbai",
      region: "Maharashtra",
      country: "India",
      lat: 18.98,
      lon: 72.83,
      tz_id: "Asia/Kolkata",
      localtime_epoch: 1714886826,
      localtime: "2024-05-05 10:57"
    },
    current: {
      last_updated_epoch: 1714886100,
      last_updated: "2024-05-05 10:45",
      temp_c: 32.0,
      temp_f: 89.6,
      is_day: 1,
      condition: {
        text: "Mist",
        icon: "//cdn.weatherapi.com/weather/64x64/day/143.png",
        code: 1030
      },
      wind_mph: 6.9,
      wind_kph: 11.2,
      wind_degree: 290,
      wind_dir: "WNW",
      pressure_mb: 1008.0,
      pressure_in: 29.77,
      precip_mm: 0.0,
      precip_in: 0.0,
      humidity: 71,
      cloud: 25,
      feelslike_c: 40.2,
      feelslike_f: 104.3,
      vis_km: 3.0,
      vis_miles: 1.0,
      uv: 7.0,
      gust_mph: 11.4,
      gust_kph: 18.4
    }
  };

  const savedLocations: SavedCity[] = [
    {location: cityLondon, timestamp: new Date()},
    {location: cityMubai, timestamp: new Date()}
  ];

  it("should show the loading weather", () => {
    //given
    mockUseWeather.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null
    });

    //when
    render(
      <SearchedCities
        recentLocations={savedLocations}
        onLocationSelect={mockOnLocationSelect}
      />
    );

    //then
    expect(screen.getAllByText("Loading Weather...").length).toBe(2);
  });

  it("should show the current weather of the city", () => {
    //given
    mockUseWeather.mockReturnValue({
      data: mockLondonWeatherDetails,
      isLoading: false,
      isError: false,
      error: null
    });

    //when
    render(
      <SearchedCities
        recentLocations={savedLocations}
        onLocationSelect={mockOnLocationSelect}
      />
    );

    //then
    expect(
      screen.getByText("London - London, United Kingdom")
    ).toBeInTheDocument();

    //when
    const searchedCity = screen.getByTestId(
      "searched-city-London-City of London, Greater London"
    );
    fireEvent.click(searchedCity);

    //then
    expect(mockOnLocationSelect).toHaveBeenLastCalledWith({
      desc: "London, United Kingdom",
      name: "London",
      region: "City of London, Greater London"
    });
  });
});
