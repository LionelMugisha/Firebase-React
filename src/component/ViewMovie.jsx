import React, { useContext } from 'react'
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import './css/cart.css';
import { UserContext } from './context/UserContext'
import { MovieContext } from './context/MovieContext';

const DisplayMovie = () => {

  const { user } = useContext(UserContext);
  const { movies } = useContext(MovieContext);

  // console.log(movies);

    return (
      <>
        <Navbar user={user} />
        {movies.map((item) => (
          <div key={item.ID} className="border mb-2 border-gray-200 lg:max-w-4xl md:max-w-lg shadow-lg sm:ml-6 md:ml-32 sm:pl-2 lg:pl-5 lg:ml-48">
            <div className="cart-items">
              <div >
                      <div className="cart-items-list">
                          <img 
                              className="cart-items-image"
                              src={item.url}
                              alt={item.title}
                          />
                          <div className="">
                          <div className="font-bold">{item.title}</div>
                            <div className="font-light text-md">{item.description}</div>
                            <div className="font-semibold">{item.category}</div>
                          </div>
                          <div className="cart-items-function">
                            <Link to={`/view-details/${item.ID}`} >
                              <button className="bg-transparent mr-5 mb-2 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-5 border border-blue-500 hover:border-transparent rounded"
                                type="submit"
                              >
                                View
                              </button>
                            </Link>
                          </div>
                      </div>
              </div>
            </div>
          </div>
        ))}

      </>
    )
}

export default DisplayMovie;