import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../CitySearch";
import * as SearchCities from "../useSearchCities";
import {WeatherApiError} from "../../../types/WeatherApiError";

jest.mock("../useSearchCities");

const mockOnSearchCallback = jest.fn();
const mockUseSearchCities = SearchCities.useSearchCities as jest.Mock;

describe("CitySearch", () => {
  const mockCities = [
    {
      id: 313868,
      name: "Test1",
      region: "TestRegion1",
      country: "TestCountry1",
      lat: 42.85,
      lon: -80.5,
      url: "test1-testRegion1-testCountry1"
    },
    {
      id: 313869,
      name: "Test2",
      region: "TestRegion2",
      country: "TestCountry2",
      lat: 42.85,
      lon: -80.5,
      url: "test2-testRegion2-testCountry2"
    }
  ];

  it("should render the input text component to search cities", async () => {
    //given
    mockUseSearchCities.mockReturnValue({
      data: mockCities,
      isLoading: true,
      isError: false,
      error: undefined
    });

    //when
    const {rerender} = render(
      <CitySearch onLocationChange={mockOnSearchCallback} />
    );

    //then
    const inputSearch = screen.getByRole("combobox");
    expect(inputSearch).toBeInTheDocument();

    //given
    mockUseSearchCities.mockReturnValue({
      data: mockCities,
      isLoading: false,
      isError: false,
      error: undefined
    });

    //when
    rerender(<CitySearch onLocationChange={mockOnSearchCallback} />);
    userEvent.type(inputSearch, "test");

    //then
    expect(screen.getByText("No options")).toBeInTheDocument();
  });

  it("should show error message from weather api", async () => {
    //given
    mockUseSearchCities.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new WeatherApiError("Weather api error", "API_ERROR", 400, {
        error: {code: "400", message: "Api url is wrong"}
      })
    });

    //when
    render(<CitySearch onLocationChange={mockOnSearchCallback} />);

    //then
    expect(
      screen.getByText("Weather api error [400 : Api url is wrong]")
    ).toBeInTheDocument();
  });

  it("should show network error", async () => {
    //given
    mockUseSearchCities.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new WeatherApiError("Weather api error", "API_ERROR", 502)
    });

    //when
    render(<CitySearch onLocationChange={mockOnSearchCallback} />);

    //then
    expect(screen.getByText("Weather api error")).toBeInTheDocument();
  });
});
