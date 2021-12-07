import React from 'react'

const MovieItem = ({individualMovie,addToFavorite}) => {

    const handleFavorite = () => {
        addToFavorite(individualMovie);
    }

    return (
        <div className="mt-2 mb-2">
            <div className="max-w-xs rounded overflow-hidden shadow-lg ml-3">
                <img className="max-w-xs mr-1 ml-1" src={individualMovie.url} alt={individualMovie.title} />
                <div className="px-6 py-2">
                    <div className="font-bold text-xl mb-2">{individualMovie.title}</div>
                    <p className="text-gray-700 text-base">
                        {individualMovie.description}
                    </p>
                    <div className="font-bold text-xl mb-2">{individualMovie.category}</div>
                </div>
                <div className="px-6 max-w-sm pt-4 mb-3">
                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        type="submit"
                        onClick={handleFavorite}
                    >
                        Add To Favorite
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MovieItem;
