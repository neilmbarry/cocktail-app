import React from 'react';
import FormInput from '../../UI/FormInput';
import classes from './RecipeInput.module.css';
import Button from '../../UI/Button';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RecipeInput = ({ text, index, removeStep }) => {
  return (
    <div className={classes.recipe}>
      <div className={classes.step}>
        <p>{index + 1}.</p>
      </div>
      <FormInput placeholder="Enter Step" value={text} />
      <div className={classes.close} onClick={removeStep}>
        <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default RecipeInput;
