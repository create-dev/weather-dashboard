import {render, screen} from "@testing-library/react";
import {City} from "../../../../../types/City";
import {WeatherDetails} from "../../../../../types/WeatherDetails";
import {WeatherApiError} from "../../../../../types/WeatherApiError";
import {useWeather} from "../../../useWeather";
import SearchedCityWeather from "..";

jest.mock("../../../useWeather");

const mockUseWeather = useWeather as jest.MockedFunction<typeof useWeather>;

/**
 * {@link SearchedCityWeather}
 */
describe("SearchedCityWeather", () => {
  const city: City = {
    name: "London",
    region: "City of London, Greater London",
    desc: `London, United Kingdom`
  };

  const mockWeatherDetails: WeatherDetails = {
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

  it("should show the loading weather", () => {
    //given
    const city: City = {
      name: "London",
      region: "City of London, Greater London",
      desc: `London, United Kingdom`
    };

    mockUseWeather.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null
    });

    //when
    render(<SearchedCityWeather location={city} />);

    //then
    expect(screen.getByText("Loading Weather...")).toBeInTheDocument();
  });

  it("should show the current weather of the city", () => {
    //given
    mockUseWeather.mockReturnValue({
      data: mockWeatherDetails,
      isLoading: false,
      isError: false,
      error: null
    });

    //when
    render(<SearchedCityWeather location={city} />);

    //then
    expect(
      screen.getByText("London - London, United Kingdom")
    ).toBeInTheDocument();
    expect(screen.getByText("Sunny")).toBeInTheDocument();
    expect(screen.getByText("7 °C")).toBeInTheDocument();
    expect(screen.getByText("2.2 m/h")).toBeInTheDocument();
    expect(screen.getByText("1009 hPa")).toBeInTheDocument();
    expect(screen.getByText("93 %")).toBeInTheDocument();
  });

  it("should show error message from weather api", async () => {
    //given
    mockUseWeather.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new WeatherApiError("Weather api error", "API_ERROR", 400, {
        error: {code: "400", message: "Api url is wrong"}
      })
    });

    //when
    render(<SearchedCityWeather location={city} />);

    //then
    expect(
      screen.getByText("Weather api error [400 : Api url is wrong]")
    ).toBeInTheDocument();
  });

  it("should show network error", async () => {
    //given
    mockUseWeather.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new WeatherApiError("Weather api error", "API_ERROR", 502)
    });

    //when
    render(<SearchedCityWeather location={city} />);

    //then
    expect(screen.getByText("Weather api error")).toBeInTheDocument();
  });
});
