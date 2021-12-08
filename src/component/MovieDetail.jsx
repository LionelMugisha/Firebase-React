import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { auth, fs } from './Config/Config'
import Navbar from './Navbar';

const MovieDetail = () => {

    const { ID } = useParams();

    function GetCurrentMovie(){
        const [details, setDetails] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(movie => {
                if(movie){
                    fs.collection('Movies').doc(ID)
                        .get()
                        .then(snapshot => {
                            setDetails(snapshot.data());
                        })
                } else {
                    setDetails(null)
                }
            })
        },[])
        return details;
      }

      const detail = GetCurrentMovie();
    //   console.log(detail);

    return (
        <>
            <Navbar />
            <div className="flex justify-evenly mt-1">
                {detail ? (
                    <div className="max-w-xs w-full lg:max-w-lg lg:flex">
                        <img className="w-64" src={detail.url} alt={detail.title} />
                        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                            <div className="mb-5">
                                <p className="text-sm text-gray-600 flex items-center">
                                <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                                </svg>
                                    {detail.category}
                                </p>
                                <div className="text-gray-900 font-bold text-xl mb-2 mt-2">{detail.title}</div>
                                <p className="text-gray-700 text-base">{detail.description}</p>
                            </div>
                            <div className="flex items-center">
                                <Link to="/" className="flex justify-left font-bold">
                                    Go Back
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>No data available!</p>
                )}
            </div>
        </>
    )
}

export default MovieDetail;
