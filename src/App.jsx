import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import Authentication from "./pages/Authentication";
import LoginSection from "./pages/Authentication/LoginSection";
import RegisterSection from "./pages/Authentication/RegisterSection";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SocketProvider } from "./hooks/useSocket";
import { Provider } from "react-redux";
import store from "./store/store";
import MainContent from "./pages/MainContent";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <SocketProvider>
                  <Provider store={store}>
                    <AppLayout />
                  </Provider>
                </SocketProvider>
              </ProtectedRoute>
            }
          >
            {/* <Route index element={<Test />} /> */}
            <Route index element={<MainContent />} />
          </Route>
          <Route path="/auth" element={<Authentication />}>
            <Route path="login" element={<LoginSection />} />
            <Route path="register" element={<RegisterSection />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#39e75f",
            color: "white",
          },
        }}
      />{" "}
    </QueryClientProvider>
  );
}

export default App;
