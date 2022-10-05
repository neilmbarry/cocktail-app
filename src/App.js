import { Route, useLocation, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import store from './store/store';

import NavigationBar from './components/Navigation/NavigationBar';
import AddCocktail from './pages/AddCocktail/AddCocktail';
import Login from './pages/Authentication/Login/Login';
import SignUp from './pages/Authentication/SignUp/SignUp';
import CocktailGrid from './pages/CocktailPage/CocktailGrid';
import SearchResults from './components/Navigation/SearchResults/SearchResults';
import Result from './components/Navigation/SearchResults/Result';
import Footer from './components/Navigation/Footer';
import Favoutites from './components/Navigation/Favourites/Favourites';
import Home from './pages/Home/Home';

import { AnimatePresence } from 'framer-motion';
import { addCocktail, updateCocktail, deleteCocktail } from './store/cocktails';

import classes from './App.module.css';
import background from './assets/img/bar.jpg';

function App() {
  console.log('App rendered');
  const location = useLocation();
  const [showResults, setShowResults] = useState(false);
  const [showFavourites, setShowFavourites] = useState(false);
  const [results, setResults] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const toggleResults = (e) => {
    // console.log(e.target);
    setShowResults((prevState) => !prevState);
  };

  const toggleFavourties = () => {
    setFavourites(getFavList());
    closeResults();
    setShowFavourites((prev) => !prev);
  };

  const closeResults = () => {
    setShowResults(false);
  };

  const closeFaves = () => {
    setShowFavourites(false);
  };

  const closeAll = () => {
    setShowFavourites(false);
    setShowResults(false);
  };

  const fetchResults = () => {
    fetch('http://127.0.0.1:8000/api/v1/cocktails')
      .then((res) => res.json())
      .then((data) => setResults(data.cocktails))
      .catch((err) => console.error(err));

    // setResults(store.getState().cocktails.value.cocktails);
    closeFaves();
    setShowResults(true);
  };

  const getFavList = () => {
    return store.getState().cocktails.value.faves;
  };

  // const cocktailsList = cocktailsDatabase.map((item) => {
  //   return <CocktailItem cocktailInfo={item} key={item.name} />;
  // });

  // const fetchCocktails = () => {
  //   console.log('here');
  //   fetch('http://127.0.0.1:8000/api/v1/cocktails', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(1);
  //       setCocktailDatabase(data.cocktails);
  //       console.log(2);
  //       setIsLoading(false);
  //       console.log(3);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // useEffect(fetchCocktails, []);

  // fetchInfo();

  const searchResults = (
    <SearchResults results={[]} onClick={closeAll}>
      {results.map((res, i) => {
        const faveSlugs = getFavList();
        return (
          <Result
            name={res.name}
            tags={[res.recipe[0].ingredient, res.flavour, res.glass]}
            rating={4.9}
            reviews={23}
            key={i}
            image={res.image}
            slug={res.slug}
            isAuthor={true}
            fave={faveSlugs.includes(res.slug)}
            onClick={closeAll}
          />
        );
      })}
    </SearchResults>
  );

  const favouriteResults = (
    <Favoutites onClose={toggleFavourties} results={favourites} />
  );

  const addCocktailHandler = (cocktail) => {
    store.dispatch(addCocktail(cocktail));
  };

  const updateCocktailHandler = (id, info) => {
    store.dispatch(updateCocktail(id, info));
  };

  const deleteCocktailHandler = (id) => {
    store.dispatch(deleteCocktail(id));
  };

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/v1/cocktails')
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={classes.app}>
      <NavigationBar
        onSearchClick={fetchResults}
        // onClick={closeAll}
        onChange={fetchResults}
        onSearch={fetchResults}
        toggleFav={toggleFavourties}
      />
      <div className={classes.pageContainer}>
        <img src={background} alt="background" className={classes.background} />
        <AnimatePresence>{showResults && searchResults}</AnimatePresence>
        <AnimatePresence>{showFavourites && favouriteResults}</AnimatePresence>
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.key}>
            <Route path="/add-cocktail">
              <AddCocktail
                title="Create a cocktail"
                subtitle="Fill in required fields to add a cocktail."
                action={addCocktailHandler}
                button="Submit"
              />
            </Route>
            <Route path="/modify-cocktail/:slug">
              <AddCocktail
                title="Modify your cocktail"
                subtitle="Update your chosen fields."
                action={updateCocktailHandler}
                button="Update"
                remove={deleteCocktailHandler}
              />
            </Route>
            <Route path="/cocktails/:slug">
              <CocktailGrid />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signUp">
              <SignUp />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}

export default App;
