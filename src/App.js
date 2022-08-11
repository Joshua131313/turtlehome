import "./styles.css";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import ContextAppProvider from "./ContextAPI";
import Notifisystem from "./Notification/Notifisystem";
import React from "react";
import { AppContainer } from "./AppContainer";

export default function App() {

  return (
    <Router>
      <ContextAppProvider>
        <Notifisystem />
        <AppContainer />
      </ContextAppProvider>
    </Router>
  );
}
