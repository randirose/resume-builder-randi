import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import Download from './pages/Download';
import Auth from './utils/auth';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
      
// routes set up so user only sees Home component if logged out, sees everything else if logged in
  return (
    <ApolloProvider client={client}>
      <Router>
      {Auth.loggedIn() ? (
        <div className="flex-column justify-flex-start min-100-vh">
          <div className="container">

            <Header />
            <Routes>
            <Route 
                path="/" 
                element={<Profile />}
              />
              <Route 
                path="/me" 
                element={<Profile />}
              />
              <Route 
                path="/users/:userId" 
                element={<Profile />}
              />
              <Route 
                path="/download" 
                element={<Download />}
              />
              </Routes>
            </div>
            </div>
              ) : (
              <Routes>
              <Route 
                path="/" 
                element={<Home />}
              />
              <Route 
                path="/login"
                element={<Login />}
              />
              <Route 
                path="/signup"
                element={<Signup />}
              />
              <Route 
                path="/download" 
                element={<Home />}
              />
              <Route 
                path="/me" 
                element={<Home />}
              />
              </Routes>
      )}
          <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
