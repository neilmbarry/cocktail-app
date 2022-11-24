import React from 'react';
import classes from './ReviewsModal.module.css';
import Review from './Review';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';
import { useState } from 'react';
import Button from '../../../components/UI/Button';
import store from '../../../store/store';
import configActions from '../../../store/configSlice';
import { useParams } from 'react-router';

const ReviewsModal = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const [sortBy, setSortBy] = useState('Recent');
  const addReviewHandler = () => {
    store.dispatch(configActions.setModal('addReview'));
  };
  const params = useParams();
  console.log(params);
  return (
    <div className={classesList}>
      <div className={classes.title}>
        <h2>Reviews (131)</h2>
        <Dropdown
          options={{ Recent: 'Recent', Rating: 'Rating' }}
          selected={sortBy}
          updateValue={(value) => setSortBy(value)}
        />
      </div>
      <div className={classes.reviews}>
        <Review className={classes.review} />
        <Review className={classes.review} />
        <Review className={classes.review} />
        <Review className={classes.review} />
        <Review className={classes.review} />
        <Review className={classes.review} />
      </div>
      <Button type="main" onClick={addReviewHandler}>
        Add review
      </Button>
    </div>
  );
};

export default ReviewsModal;
