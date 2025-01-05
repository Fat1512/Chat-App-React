import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import Authentication from "./pages/Authentication";
import LoginSection from "./features/Authentication/LoginSection";
import RegisterSection from "./features/Authentication/RegisterSection";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Test from "./ui/Test";
import { SocketProvider } from "./hooks/useSocket";
import MainContent from "./ui/MainContent";

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
      <SocketProvider>
        <ReactQueryDevtools />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
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
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </QueryClientProvider>
  );
}

export default App;
