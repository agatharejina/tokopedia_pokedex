import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Layout from './containers/Layout/Layout';
import HomePage from './containers/HomePage/HomePage';
import PokemonDetailPage from './containers/PokemonDetailPage/PokemonDetailPage';
import MyPokemonListPage from './containers/MyPokemonListPage/MyPokemonListPage';

import './App.css';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route exact path = "/" component = {HomePage}/>
          <Route exact path = "/pokemon/:name" component = {PokemonDetailPage}/>
          <Route path = "/pokedex" component = {MyPokemonListPage}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
