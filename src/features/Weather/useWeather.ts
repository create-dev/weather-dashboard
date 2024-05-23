import {useQuery} from "react-query";
import axios, {AxiosError} from "axios";
import {WEATHER_API_KEY, WEATHER_API_URL} from "../../constants";
import {WeatherApiError} from "../../types/WeatherApiError";
import {WeatherDetails} from "../../types/WeatherDetails";

/**
 * Fetches weather of a city using weather api
 *
 * @param city {string} - city name
 * @returns - Weather of the city
 */
const fetchWeather = async (city: string) => {
  try {
    console.log("Fetching weather for: ", city);
    const {data} = await axios(
      `${WEATHER_API_URL}/current.json?q=${city}&key=${WEATHER_API_KEY}`
    );
    return data;
  } catch (error) {
    console.error(error);
    throw WeatherApiError.createApiError(error as AxiosError);
  }
};

/**
 * Triggers weather search
 *
 * @param cityName {string} - city name
 * @returns - City weather, loading and error information
 */
export function useWeather(cityName: string): {
  data: WeatherDetails | undefined;
  isLoading: boolean;
  isError: boolean;
  error: WeatherApiError | null;
} {
  const {data, isLoading, isError, error} = useQuery<
    WeatherDetails,
    WeatherApiError
  >({
    queryKey: ["apiWeather", cityName],
    queryFn: () => fetchWeather(cityName),
    enabled: !!cityName
  });

  return {data, isLoading, isError, error};
}
