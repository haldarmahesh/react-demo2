import { ThemeProvider } from "@material-ui/core";
import "./App.css";
import theme from "./common/theme";
import DashboardPage from "./pages/dashboard";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DashboardPage />
    </ThemeProvider>
  );
}

export default App;
