import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri:"https://countries.trevorblades.com"
  })
  
  return (
    <ApolloProvider client={client}>
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/search" element={<SearchPage />} />
        </Routes>
      </Router>
    </div>
  </ApolloProvider>
  );
}

export default App;
