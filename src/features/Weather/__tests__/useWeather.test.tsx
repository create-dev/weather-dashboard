import {ReactNode} from "react";
import {renderHook, waitFor} from "@testing-library/react";
import {QueryClient, QueryClientProvider} from "react-query";
import nock from "nock";

import {WEATHER_API_KEY, WEATHER_API_URL} from "../../../constants";
import {useWeather} from "../useWeather";
import {WeatherApiError} from "../../../types/WeatherApiError";

/**
 * {@link useWeather} tests
 */
describe("useWeather", () => {
  //query client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });

  //wrapper with QueryClientProvider for the hook
  const wrapper = ({children}: {children?: ReactNode}) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  afterEach(() => {
    nock.cleanAll();
  });

  it("should return weather for a city", async () => {
    //given
    const searchTerm = "london";
    const apiResult = {
      location: {
        name: "London",
        region: "City of London, Greater London",
        country: "United Kingdom",
        lat: 51.52,
        lon: -0.11,
        tz_id: "Europe/London",
        localtime_epoch: 1714879173,
        localtime: "2024-05-05 4:19"
      },
      current: {
        last_updated_epoch: 1714878900,
        last_updated: "2024-05-05 04:15",
        temp_c: 7.0,
        temp_f: 44.6,
        is_day: 0,
        condition: {
          text: "Clear",
          icon: "//cdn.weatherapi.com/weather/64x64/night/113.png",
          code: 1000
        },
        wind_mph: 2.2,
        wind_kph: 3.6,
        wind_degree: 183,
        wind_dir: "S",
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
        gust_mph: 4.8,
        gust_kph: 7.7
      }
    };

    nock(WEATHER_API_URL)
      .defaultReplyHeaders({
        "access-control-allow-origin": "*"
      })
      .get(`/current.json?q=${searchTerm}&key=${WEATHER_API_KEY}`)
      .reply(200, apiResult);

    //when
    const {result} = renderHook(() => useWeather(searchTerm), {wrapper});

    //then, isLoading must be true
    expect(result.current.isLoading).toBe(true);

    //wait and expect isLoading is false
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    //then, expect result
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toMatchObject(apiResult);
  });

  it("should throw error from weather api", async () => {
    //given
    const searchTerm = "unknown";
    nock(WEATHER_API_URL)
      .defaultReplyHeaders({
        "access-control-allow-origin": "*"
      })
      .get(`/current.json?q=${searchTerm}&key=${WEATHER_API_KEY}`)
      .reply(401, {error: {code: 401, message: "API key not provided."}});

    //when
    const {result} = renderHook(() => useWeather(searchTerm), {wrapper});

    //then, isLoading must be true
    expect(result.current.isLoading).toBe(true);

    //wait and expect isLoading is false
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    //then, expect error as specified in https://www.weatherapi.com/docs/
    const apiError = result.current.error as WeatherApiError;
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(true);
    expect(apiError.message).toBe("Request failed with status code 401");
    expect(apiError.response).toMatchObject({
      error: {code: 401, message: "API key not provided."}
    });
  });

  it("should throw network error when weather api is unreachable", async () => {
    //given
    const searchTerm = "unknown";
    nock(WEATHER_API_URL)
      .defaultReplyHeaders({
        "access-control-allow-origin": "*"
      })
      .get(`/current.json?q=${searchTerm}&key=${WEATHER_API_KEY}`)
      .replyWithError("Network error");

    //when
    const {result} = renderHook(() => useWeather(searchTerm), {wrapper});

    //then, isLoading must be true
    expect(result.current.isLoading).toBe(true);

    //wait and expect isLoading is false
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    //then, expect error as specified in https://www.weatherapi.com/docs/
    const apiError = result.current.error as WeatherApiError;
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(true);
    expect(apiError.message).toBe("Network Error");
  });
});
