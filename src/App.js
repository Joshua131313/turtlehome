import "./styles.css";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import ContextAppProvider from "./ContextAPI";
import Notifisystem from "./Notification/Notifisystem";
import React from "react";
import { AppContainer } from "./AppContainer";
import { InstantSearch } from "react-instantsearch-dom";
import { usersSearchClient } from "./app/algolia";

export default function App() {

  return (
    <Router>
      <InstantSearch 
        indexName="users_index"
        searchClient={usersSearchClient}
        >
        <ContextAppProvider>
          <Notifisystem />
          <AppContainer />
        </ContextAppProvider>
      </InstantSearch>
    </Router>
  );
}
