import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import AlbumFeature from './features/Album';
import ProductFeature from './features/Product';
import TodoFeature from './features/Todo';
import CounterFeature from './features/Counter';
import CartFeature from './features/Cart';

function App() {

  return (
    <div className="App">
      <Header/>
      <Switch>
        <Redirect from="/home" to='/' exact/>
        <Redirect from="/post-list/:postId" to="/posts/:postId" exact />

        <Route path="/" component={CounterFeature} exact/>
        <Route path="/todos" component={TodoFeature}/>
        <Route path="/albums" component={AlbumFeature}/>

        <Route path="/products" component={ProductFeature}/>
        <Route path="/cart" component={CartFeature}/>
      </Switch>
    </div>
  );
}

export default App;
