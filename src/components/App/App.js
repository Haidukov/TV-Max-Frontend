import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router';
import BarLoader from 'react-spinners/BarLoader';
import Layout from '../Shared/Layout';

const ShowDetailsPage = lazy(() => import('../ShowDetailsPage'));
const EpisodeDetailsPage = lazy(() => import('../EpisodeDetailsPage'));

const App = () => (
  <Layout>
    <Suspense fallback={<BarLoader size={300} />}>
      <Router>
        <Switch>
          <Route exact path='/shows/:showId' component={ShowDetailsPage} />
          <Route exact path='/episodes/:episodeId' component={EpisodeDetailsPage} />
          <Redirect to='/shows/6771' />
        </Switch>
      </Router>
    </Suspense>
  </Layout>
);

export default App;
