import React from 'react'
import './css/cart.css';
import { fs, auth } from './Config/Config';

const FavoriteItemIndividual = ({item}) => {
    
    const handleRemove = () => {
        auth.onAuthStateChanged(user => {
            if(user){
                fs.collection('Favorite' + user.uid).doc(item.ID).delete()
                    .then(() => {
                        console.log('Deleted Succeessfull!');
                    })
            }
        })
    }

    return (
        <div className="border border-gray-200 lg:max-w-4xl md:max-w-lg shadow-lg sm:ml-6 md:ml-32 sm:pl-2 lg:pl-5 lg:ml-48">
            <div className="cart-items">
                <div>
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
                            <button className="bg-transparent mr-5 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                type="submit"
                                onClick={handleRemove}
                            >
                                Remove
                            </button>
                            </div>
                        </div>
                </div>
        </div>
    </div>
    )
}

export default FavoriteItemIndividual;
