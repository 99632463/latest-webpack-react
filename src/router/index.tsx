import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Home, HomeDetail, About } from '@container/index';
import { PathTypeName } from '@common/enum/base';

const InitialMatch = () => {
  // 模拟  假设存在 token
  const token = true;
  if (token) {
    return <Redirect to={PathTypeName.Home} />;
  }
  // return <Redirect to={PathTypeName.Login}/>;
};

const Router = () => {
  return <HashRouter>
    <React.Suspense fallback={null}>
      <Switch>
        <Route exact path={PathTypeName.Home} component={Home} />
        <Route path={PathTypeName.HomeDetail} component={HomeDetail} />
        <Route path={PathTypeName.About} component={About} />
        <Route component={InitialMatch} />
      </Switch>
    </React.Suspense>
  </HashRouter>;
};

export default Router;