import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const SettingsComponent = () => {
  return (
    <Router>
      <div className="container-fluid" style={{ paddingInlineStart: 72, paddingInlineEnd: 16 }}>
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
                  <Route path="/settings/about" render={() => <h5>About Page</h5>} />
                  <Route path="/settings/termofuse" render={() => <h5>Terms of Use Page</h5>} />
                  <Route path="/settings/privacypolicy" render={() => <h5>Privacy Policy Page</h5>} />
                  <Route path="/settings/issuereport" render={() => <h5>Issue Report Page</h5>} />
                  <Route path="/settings/supportus" render={() => <h5>Support Us Page</h5>} />
                  <Route path="/settings/contact" render={() => <h5>Contact Page</h5>} />
                  <Route path="/settings/donate" render={() => <h5>Donate Page</h5>} />
                  <Redirect from="/settings" to="/settings/about" />
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
