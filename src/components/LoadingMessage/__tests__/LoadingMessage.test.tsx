import {render, screen} from "@testing-library/react";
import LoadingMessage from "..";

/**
 * {@link LoadingMessage} tests
 */
describe("LoadingMessage", () => {
  it("should render LoadingMessage with given message", () => {
    //when
    render(
      <LoadingMessage>
        <span>{"Loading weather"}</span>
      </LoadingMessage>
    );

    //then
    expect(screen.getByText("Loading weather")).toBeInTheDocument();
  });
});
