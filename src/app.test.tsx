import {render, screen} from "@testing-library/react";
import {QueryClient, QueryClientProvider} from "react-query";
import {App} from "./app";

/**
 * {@link App} tests
 */
describe("App", () => {
  //query client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });

  it("renders app", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
    const textElement = screen.getByText(/Weather Dashboard/i);
    expect(textElement).toBeInTheDocument();
  });
});
