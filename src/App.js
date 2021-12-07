import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import SignUp from './component/Signup';
import AddMovie from './component/AddMovie';
import ViewMovie from './component/ViewMovie';
import MovieDetail from './component/MovieDetail';
import Favorite from './component/Favorite';
import NotFound from './component/NotFound';

const App = () => {
  return(
    <>
        <div className="max-w-7xl mx-auto rounded-sm mt-1 ml-92">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-movie" element={<AddMovie />} />
            <Route path="/view" element={<ViewMovie />} />
            <Route path="/view-details/:ID" element={<MovieDetail />} />
            <Route path="/add-to-favorite" element={<Favorite />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
    </>
  )
}

export default App;
