import React from 'react';
import classes from './SearchResults.module.css';
import Result from './Result';
import img from '../../img/paper.jpg';
import img1 from '../../img/cock.jpg';
import img2 from '../../img/cock2.jpg';
import img3 from '../../img/cock3.jpg';
import img4 from '../../img/cock4.jpg';

const SearchResults = ({ className, children, results, onClick }) => {
  // const [isActive, setIsActive] = useState(false);
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classes.backdrop} onClick={onClick}>
      <div className={classesList}>
        <div className={classes.options}>
          <h6>71 matching results for 'paper plane'</h6>
          <div className={classes.dropdown}>
            <h6>Sort by:</h6>
            <select name="" id="">
              <option value="">rating</option>
              <option value="">newest</option>
              <option value="">relevant</option>
            </select>
          </div>
        </div>
        <div className={classes.results}>
          <Result
            img={img}
            name="Paper Plane"
            tags={['Citrusy', 'Bourbon', 'Coupe']}
            rating={4.9}
            reviews={104}
            isAuthor={true}
            fave={true}
          />
          <Result
            img={img1}
            name="Dark & Stormy"
            tags={['Citrusy', 'Rum', 'Rocks']}
            rating={4.7}
            reviews={98}
            isAuthor={false}
          />
          <Result
            img={img4}
            name="Pink Lady"
            tags={['Citrusy', 'Gin', 'Flute']}
            rating={4.8}
            reviews={117}
            isAuthor={false}
            fave={true}
          />
          <Result
            img={img2}
            name="Blackberry Shrub"
            tags={['Citrusy', 'Vodka', 'Coupe']}
            rating={5.0}
            reviews={109}
            isAuthor={true}
          />
          <Result
            img={img3}
            name="Last Word"
            tags={['Citrusy', 'Mezcal', 'Neat']}
            rating={4.9}
            reviews={166}
            isAuthor={false}
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default SearchResults;
