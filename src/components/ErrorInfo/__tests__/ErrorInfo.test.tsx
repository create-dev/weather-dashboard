import {render, screen} from "@testing-library/react";
import ErrorInfo from "..";

/**
 * {@link ErrorInfo} tests
 */
describe("ErrorInfo", () => {
  it("should render ErrorInfo with defaults", () => {
    //when
    render(<ErrorInfo />);

    //then
    expect(screen.getByText("Internal server error")).toBeInTheDocument();
  });

  it("should render ErrorInfo with given message", () => {
    //when
    render(<ErrorInfo errorMessage={"Error Message"} />);

    //then
    expect(screen.getByText("Error Message")).toBeInTheDocument();
  });
});
