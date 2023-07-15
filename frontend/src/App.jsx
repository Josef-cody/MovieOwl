import { Routes, BrowserRouter as Router, Route, } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { contextData } from './ContextApi'
import Index from './pages/Index/Index'
import Home from "./pages/Home/Home"
import HomeAdmin from "./pages/Admin/homeAdmin"
import Login from "./components/AuthForm/Login/login";
import "./sass/main.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieDetail from "./pages/MovieDetails/MovieDetails";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyList = lazy(() => import("./components/List/List"));
const SearchResult = lazy(() => import("./pages/SearchResult/searchResult"));
export const queryClient = new QueryClient();

function App() {
  const [userdata, setUserData] = useState({});
  return (
    <QueryClientProvider client={queryClient}>
      <contextData.Provider value={{ userdata, setUserData }}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<Index />}
            />
            <Route
              path="/secure"
              element={
                userdata && userdata._id && userdata.isAdmin ? (
                  <HomeAdmin />
                ) : userdata && userdata._id && !userdata.isAdmin ? (
                  <Home />
                ) : (
                  <Login />
                )
              }
            />
            <Route path="/mylist" element={<MyList />} />
            <Route path="/home" element={<Home />} />
            <Route path='/find/:id' element={<MovieDetail />} />
            <Route path='/search-result/:searchQuery' element={<SearchResult />} />
          </Routes>
        </Router>
        <ToastContainer
          theme="colored"
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </contextData.Provider>
    </QueryClientProvider>
  );
}

export default App;
