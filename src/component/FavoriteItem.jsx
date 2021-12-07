import React from 'react'
import FavoriteItemIndividual from './FavoriteItemIndividual'

const FavoriteItem = ({favorite,totalFavorite}) => {
    return( 
        <>
          <ul>
              {favorite.map((item) => (
              <FavoriteItemIndividual key={item.ID} item={item} totalFavorite={totalFavorite} />
              ))}
          </ul>
        </>
    );
}

export default FavoriteItem;