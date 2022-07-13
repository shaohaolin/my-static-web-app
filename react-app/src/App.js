import React, { lazy, Suspense, useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { HeaderBar, NavBar, NotFound } from './components';
import About from './About';

const Products = withRouter(
  lazy(() => import(/* webpackChunkName: "products" */ './products/Products')),
);

const App = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    (async function () {
      const { text } = await (await fetch(`/api/message`)).json();
      setData(text);
    })();
  });

  return (
    <div>
      <HeaderBar />
      <div>{data}</div>
      <div className="section columns">
        <NavBar />
        <main className="column">
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Redirect from="/" exact to="/products" />
              <Route path="/products" component={Products} />
              <Route path="/about" component={About} />
              <Route exact path="**" component={NotFound} />
            </Switch>
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default App;
