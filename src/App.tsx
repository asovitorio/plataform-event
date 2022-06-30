import { ApolloProvider, gql, useQuery } from "@apollo/client";
import { Router } from "./Router";
import { client } from "./lib/apllo";
import { Event } from "./pages/Event";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
