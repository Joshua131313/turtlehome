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
import { Beforeunload } from 'react-beforeunload';
import { handleUnload } from "./app/services/DBFunctions";

export default function App() {

  return (
    <Router>
      <InstantSearch 
        indexName="users_index"
        searchClient={usersSearchClient}
        >
        <ContextAppProvider>
          <Notifisystem />
          <Beforeunload onBeforeunload={(e)=> handleUnload()}>
             <AppContainer />
          </Beforeunload>
        </ContextAppProvider>
      </InstantSearch>
    </Router>
  );
}
