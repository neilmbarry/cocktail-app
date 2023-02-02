import React, { useEffect } from 'react';
import classes from './CocktailGrid.module.css';
import CocktailMethod from './CocktailMethod/CocktailMethod';
import CocktailReviews from './CocktailReviews/CocktailReviews';
import CocktailIngredients from './CocktailIngredients/CocktailIngredients';
import CocktailTitle from './CocktailTitle/CocktailTitle';
import CocktailImage from './CocktailImage/CocktailImage';
import PageBreak from '../../components/UI/PageBreak';
import { useNavigate, useParams } from 'react-router';

import useFetch from '../../hooks/useFetch';
import { motion } from 'framer-motion';
import { cocktailGridVariants } from '../../config/animationVariants';
import store from '../../store/store';
import configActions from '../../store/configSlice';

const CocktailGrid = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { loading, data, error, fetchRequest } = useFetch(`cocktails/${slug}`);
  console.log(data, error, loading);

  const cocktail = data?.cocktail;

  useEffect(() => {
    fetchRequest({});
  }, []);

  useEffect(() => {
    if (data?.status === 'success') {
      store.dispatch(configActions.setCurrentCocktailId(data.cocktail.id));
      console.log(data.cocktail.slug);
      store.dispatch(configActions.setCurrentCocktailSlug(data.cocktail.slug));
    }
    if (error) {
      console.log('setting notification', error);
      store.dispatch(
        configActions.setNotification({
          type: 'fail',
          message: error,
        })
      );
      navigate('/');
    }
  }, [data, error, navigate]);

  return (
    <>
      <motion.div
        variants={cocktailGridVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={classes.cocktailPage}
      >
        <div className={classes.cocktailGrid}>
          <CocktailTitle
            className={classes.title}
            cocktail={cocktail}
            loading={loading}
          />
          <CocktailImage cocktail={cocktail} loading={loading} />
          <CocktailIngredients
            className={classes.ing}
            cocktail={cocktail}
            loading={loading}
          />
          <CocktailMethod
            className={classes.method}
            cocktail={cocktail}
            loading={loading}
          />
          <CocktailReviews
            className={classes.rev}
            loading={loading}
            cocktail={cocktail}
          />
          <PageBreak />
        </div>
      </motion.div>
    </>
  );
};

export default CocktailGrid;
