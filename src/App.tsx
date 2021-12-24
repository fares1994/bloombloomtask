import Women from "./Pages/Women";
import Men from "./Pages/Men";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./Theme/colors";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <Router>
          <Routes>
            <Route path="/" element={<Women />} />
            <Route path="/men" element={<Men />} />
          </Routes>
        </Router>
      </MainContainer>
    </ThemeProvider>
  );
};

const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.primary};
  height: auto;
`;

export default App;
