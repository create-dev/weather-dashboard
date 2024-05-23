import {ReactNode} from "react";
import {renderHook, waitFor} from "@testing-library/react";
import {QueryClient, QueryClientProvider} from "react-query";
import nock from "nock";

import {WEATHER_API_KEY, WEATHER_API_URL} from "../../../constants";
import {useSearchCities} from "../useSearchCities";
import {WeatherApiError} from "../../../types/WeatherApiError";

/**
 * {@link useSearchCities} tests
 */
describe("useSearchCities", () => {
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

  it("should return cities for a search term", async () => {
    //given
    const searchTerm = "test";
    const apiResult = [
      {
        id: 313868,
        name: "Test",
        region: "TestRegion",
        country: "TestCountry",
        lat: 42.85,
        lon: -80.5,
        url: "test-testRegion-testCountry"
      }
    ];
    nock(WEATHER_API_URL)
      .defaultReplyHeaders({
        "access-control-allow-origin": "*"
      })
      .get(`/search.json?q=${searchTerm}&key=${WEATHER_API_KEY}`)
      .reply(200, apiResult);

    //when
    const {result} = renderHook(() => useSearchCities(searchTerm), {wrapper});

    //then, isLoading must be true
    expect(result.current.isLoading).toBe(true);

    //wait and expect isLoading is false
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    //then, expect result
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data?.length).toBe(1);
    expect(result.current.data).toMatchObject([
      {
        id: 313868,
        name: "Test",
        region: "TestRegion",
        country: "TestCountry",
        lat: 42.85,
        lon: -80.5,
        url: "test-testRegion-testCountry"
      }
    ]);
  });

  it("should throw error from weather api", async () => {
    //given
    const searchTerm = "unknown";
    nock(WEATHER_API_URL)
      .defaultReplyHeaders({
        "access-control-allow-origin": "*"
      })
      .get(`/search.json?q=${searchTerm}&key=${WEATHER_API_KEY}`)
      .reply(401, {error: {code: 401, message: "API key not provided."}});

    //when
    const {result} = renderHook(() => useSearchCities(searchTerm), {wrapper});

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
      .get(`/search.json?q=${searchTerm}&key=${WEATHER_API_KEY}`)
      .replyWithError("Network error");

    //when
    const {result} = renderHook(() => useSearchCities(searchTerm), {wrapper});

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
