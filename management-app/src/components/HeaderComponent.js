// HeaderComponent.js
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const styles = {
  aside: {
    width: 110,
    borderRight: "1px solid #eef0f3",
    position: "fixed",
    insetInlineStart: 0,
    insetBlockStart: 0,
    insetBlockEnd: 0,
    background: "#fff",
    zIndex: 1020,
  },
  logo: {
    width: 60,
    height: 40,
  },
  link: {
    width: 80,
    height: 40,
    background: "#f0f4f8",
    color: "#475569",
    fontSize: "14px",
    fontWeight: "500",
  },
  linkText: {
    fontSize: "12px",
    fontWeight: "600",
  },
  infoIcon: {
    width: 36,
    height: 36,
  },
  infoImage: {
    width: 18,
    height: 18,
  },
  header: {
    height: 64,
    borderBottom: "1px solid #eef0f3",
    position: "fixed",
    insetInlineStart: 56,
    insetInlineEnd: 0,
    insetBlockStart: 0,
    background: "#fff",
    zIndex: 1010,
    marginLeft: "70px",
  },
  tabLink: {
    marginRight: "40px",
  },
  activeTab: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -20,
    height: 2,
    background: "#3b82f6",
  },
  actionIcon: {
    width: 40,
    height: 40,
    background: "#e2e8f0",
    color: "#475569",
    fontSize: "14px",
    fontWeight: "500",
    marginRight: "20px",
  },
  logoutIcon: {
    background: "#dc2626a7",
    padding: "5px",
  },
  spacer: {
    height: 64,
  },
};

class HeaderComponent extends Component {
  render() {
    return (
      <div className="app-shell">
        {/* LEFT SIDEBAR */}
        <aside
          className="d-none d-md-flex flex-column align-items-center pt-3 px-2"
          style={styles.aside}
        >
          {/* Logo */}
          <a href="/" className="mb-4">
            <img
              src="/eratechnologylogo.png"
              alt="eratechnology Logo"
              style={styles.logo}
            />
          </a>

          {/* About */}
          <a
            href="/about"
            className="rounded-3 d-flex align-items-center justify-content-center mb-3 shadow-sm"
            style={styles.link}
            title="Settings"
          >
            <span style={styles.linkText}>About</span>
          </a>

          {/* Documents */}
          <a
            href="/documents"
            className="rounded-3 d-flex align-items-center justify-content-center mb-3 shadow-sm"
            style={styles.link}
            title="Users"
          >
            <span style={styles.linkText}>Documents</span>
          </a>

          {/* Links */}
          <a
            href="/links"
            className="rounded-3 d-flex align-items-center justify-content-center mb-3 shadow-sm"
            style={styles.link}
            title="Groups"
          >
            <span style={styles.linkText}>Links</span>
          </a>

          {/* Information */}
          <a
            href="/information"
            className="rounded-3 d-flex align-items-center justify-content-center mt-auto mb-3"
            style={styles.infoIcon}
            title="Information"
          >
            <img src="/infologo.png" alt="Information" style={styles.infoImage} />
          </a>
        </aside>

        {/* TOP BAR */}
        <header
          className="d-flex align-items-center justify-content-between px-3 px-md-4"
          style={styles.header}
        >
          {/* Tabs */}
          <nav className="d-none d-md-flex gap-4">
            {[
              { href: "/dashboard", label: "Dashboard" },
              { href: "/products", label: "Product Management" },
              { href: "/users", label: "User Management" },
              { href: "/assets", label: "Asset Management" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-decoration-none ${
                  window.location.pathname === item.href
                    ? "fw-semibold position-relative"
                    : ""
                }`}
                style={{
                  ...styles.tabLink,
                  color:
                    window.location.pathname === item.href
                      ? "#0f172a"
                      : "#475569",
                }}
              >
                {item.label}
                {window.location.pathname === item.href && (
                  <span style={styles.activeTab} />
                )}
              </a>
            ))}
          </nav>

          {/* actions */}
          <div className="d-flex align-items-center gap-4">
            <a
              href="/profile"
              className="d-inline-flex align-items-center justify-content-center rounded-circle shadow-sm"
              style={styles.actionIcon}
              title="Profile"
            >
              <img
                src="/profilelogo.png"
                alt="Logout"
                style={styles.infoImage}
              />
            </a>

            <a
              href="/settings"
              className="d-inline-flex align-items-center justify-content-center rounded-circle shadow-sm"
              style={styles.actionIcon}
              title="Settings"
            >
              <img
                src="/settingslogo.png"
                alt="Settings"
                style={styles.infoImage}
              />
            </a>

            <a
              href="/logout"
              className="d-inline-flex align-items-center justify-content-center rounded-circle shadow-sm"
              style={{ ...styles.actionIcon, ...styles.logoutIcon }}
              title="Logout"
            >
              <img
                src="/logoutlogo.png"
                alt="Logout"
                style={styles.infoImage}
              />
            </a>
          </div>
        </header>

        {/* spacer */}
        <div style={styles.spacer} />
      </div>
    );
  }
}

export default HeaderComponent;
