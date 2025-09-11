import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import FooterComponent from './components/layout/FooterComponent';
import HeaderComponent from './components/layout/HeaderComponent';

import ListUserComponent from './components/features/user/ListUserComponent';
import CreateUserComponent from './components/features/user/CreateUserComponent';
import ViewUserComponent from './components/features/user/ViewUserComponent';


import ListProductComponent from './components/features/product/ListProductComponent';
import CreateProductComponent from './components/features/product/CreateProductComponent';
import ViewProductComponent from './components/features/product/ViewProductComponent';

import Users from './components/features/user/users';
import Products from './components/features/product/products';

import LoginComponent from './components/pages/login/LoginComponent';
import RegisterComponent from './components/pages/register/RegisterComponent';
import { AuthContext, AuthProvider } from './context/AuthContext';
import SettingsComponent from './components/pages/settings/SettingsComponent';
import ProfileComponent from './components/pages/profile/ProfileComponent';
import DashboardComponent from './components/pages/dashboard/DashboardComponent';
import AboutComponent from './components/pages/about/AboutComponent';
import DocumentsComponent from './components/pages/documents/DocumentsComponent';
import LinksComponent from './components/pages/links/LinksComponent';
import InformationComponent from './components/pages/information/InformationComponent';
import CreateAssetComponent from './components/features/asset/CreateAssetComponent';
import ListAssetComponent from './components/features/asset/ListAssetComponent';
import ViewAssetComponent from './components/features/asset/ViewAssetComponent';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const App = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <HeaderComponent />
      <div className="container">
        <Switch>
          <Route path="/login" component={LoginComponent} />
          <Route path="/register" component={RegisterComponent} />
          <PrivateRoute path="/users" component={Users} />
          <PrivateRoute path="/products" component={Products} />
          <PrivateRoute path="/" exact component={DashboardComponent} />
          <PrivateRoute path="/users" component={ListUserComponent} />
          <PrivateRoute path="/add-user/:id" component={CreateUserComponent} />
          <PrivateRoute path="/view-user/:id" component={ViewUserComponent} />
          <PrivateRoute path="/product" component={ListProductComponent} />
          <PrivateRoute path="/add-product/:id" component={CreateProductComponent} />
          <PrivateRoute path="/view-product/:id" component={ViewProductComponent} />
          <PrivateRoute path="/settings" component={SettingsComponent} />
          <PrivateRoute path="/profile" component={ProfileComponent} />
          <PrivateRoute path="/dashboard" component={DashboardComponent} />
          <PrivateRoute path="/about" component={AboutComponent} />
          <PrivateRoute path="/documents" component={DocumentsComponent} />
          <PrivateRoute path="/links" component={LinksComponent} />
          <PrivateRoute path="/information" component={InformationComponent} />
          <PrivateRoute path="/assets" component={ListAssetComponent} />
          <PrivateRoute path="/add-asset/:id" component={CreateAssetComponent} />
          <PrivateRoute path="/view-asset/:id" component={ViewAssetComponent} />
          <Redirect from="/" to="/login" />
        </Switch>
      </div>
      <FooterComponent />
    </Router>
  );
};

const AppWrapper = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWrapper;
