import React from 'react';
import Button from '../../../components/UI/Button';
import store from '../../../store/store';
import classes from './CocktailReviews.module.css';
import Review from './Review';
import configActions from '../../../store/configSlice';

const CocktailReviews = ({ className, cocktail, loading }) => {
  const classesList = `${classes.main} ${className}`;

  const addReviewHandler = () => {
    store.dispatch(configActions.setModal('addReview'));
  };

  const reviewsHandler = () => {
    store.dispatch(configActions.setModal('reviews'));
  };

  console.log(cocktail?.reviews, 'COCKTAIL');

  if (loading) {
    return (
      <div className={classesList}>
        <h3>Reviews</h3>
        <h4>Loading...</h4>
      </div>
    );
  }
  const reviewsJSX = cocktail?.reviews.length ? (
    cocktail?.reviews.map((review, i) => {
      return <Review review={review} key={i} />;
    })
  ) : (
    <h4>There are no reviews!</h4>
  );

  return (
    <div className={classesList}>
      <h3>Reviews</h3>
      {reviewsJSX}
      <Button type={'alt'} onClick={reviewsHandler}>
        See all
      </Button>
    </div>
  );
};

export default CocktailReviews;
