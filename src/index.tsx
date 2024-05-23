import React from "react";
import ReactDOM from "react-dom/client";
import {QueryClient, QueryClientProvider} from "react-query";
import {App} from "./app";

import "@fontsource/roboto-condensed";
import "@fontsource/poppins";

import "./index.css";

//React query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 60000,
      staleTime: 60000
    }
  }
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
