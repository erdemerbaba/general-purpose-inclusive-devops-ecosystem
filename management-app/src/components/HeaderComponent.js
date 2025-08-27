// HeaderComponent.js
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class HeaderComponent extends Component {
  render() {
    return (
      <div className="app-shell">
        {/* LEFT SIDEBAR (icons only) */}
<aside
  className="d-none d-md-flex flex-column align-items-center pt-3 px-2"
  style={{
    width: 110,
    borderRight: "1px solid #eef0f3",
    position: "fixed",
    insetInlineStart: 0,
    insetBlockStart: 0,
    insetBlockEnd: 0,
    background: "#fff",
    zIndex: 1020,
  }}
>
  {/* Logo */}
  <a href="/" className="mb-4">
    <img
      src="/eratechnologylogo.png"
      alt="eratechnology Logo"
      style={{ width: 60, height: 40 }}
    />
  </a>

  {/* Settings (Main) */}
  <a
    href="/about"
    className="rounded-3 d-flex align-items-center justify-content-center mb-3 shadow-sm"
    style={{ width: 80, height: 40, background: "#f0f4f8", color: "#475569", fontSize: "14px", fontWeight: "500" }}
    title="Settings"
  >
    <span style={{ fontSize: "12px", fontWeight: "600" }}>About</span>
  </a>

  {/* Users */}
  
  <a
    href="/documents"
    className="rounded-3 d-flex align-items-center justify-content-center mb-3 shadow-sm"
    style={{ width: 80, height: 40, background: "#f0f4f8", color: "#475569", fontSize: "14px", fontWeight: "500" }}
    title="Users"
  >
    <span style={{ fontSize: "12px", fontWeight: "600" }}>Documents</span>

  </a>

  {/* Groups */}
  <a
    href="/links"
    className="rounded-3 d-flex align-items-center justify-content-center mb-3 shadow-sm"
    style={{ width: 80, height: 40, background: "#f0f4f8", color: "#475569", fontSize: "14px", fontWeight: "500" }}
    title="Groups"
  >
    <span style={{ fontSize: "12px", fontWeight: "600" }}>Links</span>

  </a>

  {/* Information */}
  <a
    href="/information"
    className="rounded-3 d-flex align-items-center justify-content-center mt-auto mb-3"
    style={{ width: 36, height: 36}}
    title="Information"
  >
    <img src="/infologo.png" alt="Information" style={{ width: 18, height: 18 }} />
  </a>
</aside>


        {/* TOP BAR */}
        <header className="d-flex align-items-center justify-content-between px-3 px-md-4"
                style={{height:64, borderBottom:'1px solid #eef0f3', position:'fixed', insetInlineStart:56, insetInlineEnd:0, insetBlockStart:0, background:'#fff', zIndex:1010, marginLeft: '70px'}}>
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
      className={`text-decoration-none ${window.location.pathname === item.href ? "fw-semibold position-relative" : ""}`}
      style={{
        color: window.location.pathname === item.href ? "#0f172a" : "#475569",
        marginRight: "40px",
      }}
    >
      {item.label}
      {window.location.pathname === item.href && (
        <span
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -20,
            height: 2,
            background: "#3b82f6",
          }}
        />
      )}
    </a>
  ))}
</nav>

          {/* Search + actions */}
          <div className="d-flex align-items-center gap-4">
            <a href="/profile" className="d-inline-flex align-items-center justify-content-center rounded-circle shadow-sm"
               style={{width:40, height:40, background:'#e2e8f0', color:'#475569', fontSize:'14px', fontWeight:'500', marginRight: '20px'}} title="Profile">
                <img src="/profilelogo.png" alt="Logout" style={{ width: 18, height: 18 }} />

              </a>

              <a href="/settings" className="d-inline-flex align-items-center justify-content-center rounded-circle shadow-sm"
                 style={{width:40, height:40, background:'#e2e8f0', color:'#475569', fontSize:'14px', fontWeight:'500', marginRight: '20px'}} title="Settings">
    <img src="/settingslogo.png" alt="Settings" style={{ width: 18, height: 18 }} />

              </a>

              <a href="/logout" className="d-inline-flex align-items-center justify-content-center rounded-circle shadow-sm"
                 style={{width:40, height:40, background:'#e2e8f0', color:'#dc2626', fontSize:'14px', fontWeight:'500', padding:'5px', marginRight: '20px'}} title="Logout">
                <img src="/logoutlogo.png" alt="Logout" style={{ width: 18, height: 18 }} />
              </a>
          </div>
        </header>

        {/* spacer so page content sits below header */}
        <div style={{height:64}} />
      </div>
    );
  }
}

export default HeaderComponent;
