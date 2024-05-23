import {render, screen} from "@testing-library/react";
import SectionHeader from "..";

/**
 * {@link SectionHeader} tests
 */
describe("SectionHeader", () => {
  it("should render SectionHeader with given title", () => {
    //when
    render(<SectionHeader title="Weather Condition" />);

    //then
    expect(screen.getByText("Weather Condition")).toBeInTheDocument();
  });
});
