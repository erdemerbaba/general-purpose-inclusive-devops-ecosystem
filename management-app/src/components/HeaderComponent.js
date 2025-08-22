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
    width: 56,
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
      style={{ width: 34, height: 34 }}
    />
  </a>

  {/* Settings (Main) */}
  <a
    href="/about"
    className="rounded-3 d-flex align-items-center justify-content-center mb-3"
    style={{ width: 36, height: 36, background: "#f6f7f9", color: "#64748b" }}
    title="Settings"
  >
    <i className="bi bi-gear"></i>
  </a>

  {/* Users */}
  
  <a
    href="/documents"
    className="rounded-3 d-flex align-items-center justify-content-center mb-3"
    style={{ width: 36, height: 36, background: "#eff4ff", color: "#3b82f6" }}
    title="Users"
  >
    <i className="bi bi-people"></i>
  </a>

  {/* Groups */}
  <a
    href="/links"
    className="rounded-3 d-flex align-items-center justify-content-center mb-3"
    style={{ width: 36, height: 36, background: "#eef7f1", color: "#16a34a" }}
    title="Groups"
  >
    <i className="bi bi-grid-3x3-gap"></i>
  </a>

  {/* Information */}
  <a
    href="/information"
    className="rounded-3 d-flex align-items-center justify-content-center mt-auto mb-3"
    style={{ width: 36, height: 36, background: "#e0f2fe", color: "#0284c7" }}
    title="Information"
  >
    <i className="bi bi-info-circle"></i>
  </a>
</aside>


        {/* TOP BAR */}
        <header className="d-flex align-items-center justify-content-between px-3 px-md-4"
                style={{height:64, borderBottom:'1px solid #eef0f3', position:'fixed', insetInlineStart:56, insetInlineEnd:0, insetBlockStart:0, background:'#fff', zIndex:1010}}>
          {/* Tabs */}
          <nav className="d-none d-md-flex gap-4">
            <a href="/dashboard" className="text-decoration-none" style={{color:'#475569'}}>Dashboard</a>
            <a href="/products" className="text-decoration-none" style={{color:'#475569'}}>Product Management</a>
            <a href="/users" className="text-decoration-none fw-semibold position-relative" style={{color:'#0f172a'}}>User Management
              <span style={{position:'absolute', left:0, right:0, bottom:-20, height:2, background:'#3b82f6'}} />
            </a>
          </nav>

          {/* Search + actions */}
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center px-3" style={{height:40, border:'1px solid #e5e7eb', borderRadius:12, background:'#fff'}}>
              <i className="bi bi-search me-2" style={{color:'#64748b'}} />
              <input className="border-0" style={{outline:'none', width:220}} placeholder="Search Here" />
            </div>

            <a href="/settings" className="btn btn-light border-0">
              <i className="bi bi-sliders" />
            </a>
            <a href="/logout" className="btn btn-outline-secondary btn-sm">Logout</a>

            <a href="/profile" className="d-inline-flex align-items-center justify-content-center rounded-circle"
               style={{width:36, height:36, background:'#f1f5f9'}} title="Profile">
              <i className="bi bi-person" />
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
