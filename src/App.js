import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import ShoesManagement from "./scenes/shoesManagement";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Operasional from "./scenes/operasional";
import FinanceManagement from "./scenes/financeManagement";
import Expenditure from "./scenes/financeManagement/Expenditure";
import Salary from "./scenes/financeManagement/Salary";
import Login from "./scenes/auth/Login";
import Register from "./scenes/auth/Register";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <CssBaseline />
        <Routes>
          <Route path="/dashboard" element={
            <div className="app">
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Dashboard />
              </main>
            </div>
          } />
          <Route path="/operasional" element={
            <div className="app">
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Operasional />
              </main>
            </div>
          } />
          <Route path="/shoes-transaction" element={
            <div className="app">
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <ShoesManagement />
              </main>
            </div>
          } />
          <Route path="/finance-management" element={
            <div className="app">
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <FinanceManagement />
              </main>
            </div>
          } />
          <Route path="/expenditure" element={
            <div className="app">
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Expenditure />
              </main>
            </div>
          } />
          <Route path="/salary" element={
            <div className="app">
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Salary />
              </main>
            </div>
          } />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
