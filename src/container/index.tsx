import React from 'react';
import { withRouter } from 'react-router-dom';
import { Loading } from '@components';

const withWrap = (loader: React.LazyExoticComponent<any>) => (props: IKeyValueMap) => {
  return <React.Suspense fallback={<Loading isLoading />}>
    {React.createElement(withRouter(loader), props)}
  </React.Suspense>;
};

export const Home = withWrap(React.lazy(() => import(
  /* webpackChunkName: 'home' */
  './home'
)));

export const HomeDetail = withWrap(React.lazy(() => import(
  /* webpackChunkName: 'homeDetail' */
  './homeDetail'
)));

export const About = withWrap(React.lazy(() => import(
  /* webpackChunkName: 'about' */
  './about'
)));