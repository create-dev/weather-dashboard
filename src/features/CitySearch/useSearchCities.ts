import {useQuery} from "react-query";
import axios, {AxiosError} from "axios";
import {WEATHER_API_KEY, WEATHER_API_URL} from "../../constants";
import {WeatherApiError} from "../../types/WeatherApiError";
import {CityLocation} from "../../types/City";

/**
 * Returns cities starting with the searchTerm
 *
 * @param searchTerm {string} - city search term
 * @returns - List of cities
 */
async function searchCity(searchTerm: string) {
  try {
    console.log("Searching cities for: ", searchTerm);
    const {data} = await axios(
      `${WEATHER_API_URL}/search.json?q=${searchTerm}&key=${WEATHER_API_KEY}`
    );
    return data;
  } catch (error) {
    console.error(error);
    throw WeatherApiError.createApiError(error as AxiosError);
  }
}

/**
 * Triggers city search using the searchTerm
 *
 * @param searchTerm {string} - city search term
 * @returns - List of cities, loading and error details
 */
export function useSearchCities(searchTerm: string): {
  data?: CityLocation[];
  isLoading: boolean;
  isError: boolean;
  error: WeatherApiError | null;
} {
  const {data, isLoading, isError, error} = useQuery<
    CityLocation[],
    WeatherApiError
  >({
    queryKey: ["apiSearchCity", searchTerm],
    queryFn: () => searchCity(searchTerm),
    enabled: !!searchTerm
  });

  return {data, isLoading, isError, error};
}
