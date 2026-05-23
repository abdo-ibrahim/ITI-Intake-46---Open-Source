import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { store } from "@/stores/store";
import { LanguageProvider } from "./contexts/LanguageContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
);
