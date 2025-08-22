import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';

import ListUserComponent from './components/user/ListUserComponent';
import CreateUserComponent from './components/user/CreateUserComponent';
import ViewUserComponent from './components/user/ViewUserComponent';


import ListProductComponent from './components/product/ListProductComponent';
import CreateProductComponent from './components/product/CreateProductComponent';
import ViewProductComponent from './components/product/ViewProductComponent';

import Users from './components/users/users';
import Landing from './components/landing/landing';
import Products from './components/products/products';

import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import { AuthContext, AuthProvider } from './context/AuthContext';
import SettingsComponent from './components/SettingsComponent';
import ProfileComponent from './components/ProfileComponent';
import DashboardComponent from './components/DashboardComponent';
import AboutComponent from './components/AboutComponent';
import DocumentsComponent from './components/DocumentsComponent';
import LinksComponent from './components/LinksComponent';
import InformationComponent from './components/InformationComponent';

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
          <PrivateRoute path="/register" component={RegisterComponent} />
          <PrivateRoute path="/landing" component={Landing} />
          <PrivateRoute path="/users" component={Users} />
          <PrivateRoute path="/products" component={Products} />
          <PrivateRoute path="/" exact component={ListUserComponent} />
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
