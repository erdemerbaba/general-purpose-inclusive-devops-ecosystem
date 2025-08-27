import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import './SettingsComponent.css';

const SettingsComponent = () => {
  return (
    <Router>
      <div className="settings-container" style={{ paddingInlineStart: 72, paddingInlineEnd: 76 }}>
        <h1 className="settings-title">Settings</h1>
            <p className="settings-text">
              Manage your application settings here.
            </p>
        <div className="row my-4">
          {/* Sidebar */}
          <div className="col-12 col-md-3 mb-3">
            <div className="card border-0 shadow-sm" style={{ borderRadius: 16 }}>
              <div className="card-body p-3">
                <h6 className="text-uppercase small text-secondary px-2 mb-3">Settings</h6>
                <nav className="nav flex-column">
                  {[
                    { to: "/settings/issuereport", label: "Issue Report", icon: "bi-bug" },
                    { to: "/settings/supportus", label: "Support Us", icon: "bi-heart" },
                    { to: "/settings/donate", label: "Donate", icon: "bi-cash-coin" }
                  ].map(({ to, label, icon }) => (
                    <NavLink
                      key={to}
                      to={to}
                      className="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded"
                      activeClassName="active"
                      style={{ color: "#475569" }}
                    >
                      <i className={`bi ${icon}`}></i>
                      {label}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="col-12 col-md-9">
            <div className="card border-0 shadow-sm" style={{ borderRadius: 16 }}>
              <div className="card-body p-4">
                <Switch>
                  <Route path="/settings/issuereport" render={() => (
                    <>
                      <h5>Issue Report</h5>
                      <h8>If you encounter any issues, please report them here.</h8>
                      <br />
                        <a href="mailto:info@eratechnology.org" target="_blank" rel="noopener noreferrer">info@eratechnology.org</a>
                    </>
                  )} />
                  <Route path="/settings/supportus" render={() => (
                    <>
                      <h5>Support Us</h5>
                      <h8>Your support helps us improve and maintain this platform. Thank you!</h8>
                       <br />
                        <a href="mailto:info@eratechnology.org" target="_blank" rel="noopener noreferrer">info@eratechnology.org</a>
                    </>
                  )} />
                  <Route path="/settings/donate" render={() => (
                    <div>
                      <h5>Donate</h5>
                      <h8>Your donations help us keep this platform running and support our mission.</h8>
                      <br />
                        <a href="https://www.buymeacoffee.com/erdemerbaba" target="_blank" rel="noopener noreferrer">https://www.buymeacoffee.com/erdemerbaba</a>
                    </div>
                  )} />
                  <Redirect from="/settings" to="/settings/issuereport" />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default SettingsComponent;
