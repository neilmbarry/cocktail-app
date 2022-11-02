import React from 'react';
import classes from './CocktailImage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartEmpty } from '@fortawesome/free-regular-svg-icons';

const CocktailImage = ({ className, cocktail, loading }) => {
  const classesList = `${classes.main} ${className}`;

  if (loading) {
    return (
      <div className={`${classesList} ${classes.loading}`}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className={classesList}>
      <div className={classes.favIcon} onClick={() => null}>
        {true ? (
          <FontAwesomeIcon icon={faHeart} />
        ) : (
          <FontAwesomeIcon icon={faHeartEmpty} />
        )}
      </div>
      <img src={cocktail?.image} alt="" className={classes.image} />
    </div>
  );
};

export default CocktailImage;
