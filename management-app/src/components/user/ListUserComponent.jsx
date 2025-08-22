// ListUserComponent.jsx
import React, { Component } from 'react';
import UserService from '../../services/UserService';
import { AuthContext } from '../../context/AuthContext';

class ListUserComponent extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      searchQuery: '',
      searchName: '',
      searchSurname: '',
      searchProfession: '',
      searchRole: '',
      searchLevel: '',
      searchTeam: '',
      searchMentor: '',
      searchJoinDate: '',
      searchLeaveDate: '',
      searchLocation: '',
      searchEmail: '',
      searchPhoneNumber: '',
      searchBirthDate: '',
      searchNationality: '',
      searchAddress: '',
      searchIdentityNumber: '',
      searchEducations: '',
      searchExperience: '',
      searchSkills: '',
      searchCertifications: '',
      searchHonors: '',
      searchMemberships: '',
      searchProjects: '',
      searchLinks: '',
      searchGovernmentPapers: '',
      searchAdditionalNotes: ''
    };

    this.addUser = this.addUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.searchUser = this.searchUser.bind(this);

    this.handleSearchNameChange = this.handleSearchNameChange.bind(this);
    this.searchNameUser = this.searchNameUser.bind(this);

    this.handleSearchSurnameChange = this.handleSearchSurnameChange.bind(this);
    this.searchSurnameUser = this.searchSurnameUser.bind(this);
  }

  handleSearchChange(e) { this.setState({ searchQuery: e.target.value }); }
  searchUser() {
    UserService.getAllUsers().then(res => this.setState({ users: res.data }));
  }
  handleSearchNameChange(e) { this.setState({ searchName: e.target.value }); }
  searchNameUser() {
    UserService.getUsersByName(this.state.searchName).then(res => this.setState({ users: res.data }));
  }
  handleSearchSurnameChange(e) { this.setState({ searchSurname: e.target.value }); }
  searchSurnameUser() {
    UserService.getUsersBySurname(this.state.searchSurname).then(res => this.setState({ users: res.data }));
  }

  deleteUser(id) {
    UserService.deleteUser(id).then(() => {
      this.setState({ users: this.state.users.filter(u => u.id !== id) });
    });
  }
  viewUser(id) { this.props.history.push(`/view-user/${id}`); }
  editUser(id) { this.props.history.push(`/add-user/${id}`); }

  componentDidMount() {
    UserService.getAllUsers().then(res => {
      if (res.data == null) {
        this.props.history.push('/add-user/_add');
      }
      this.setState({ users: res.data });
    });
  }

  addUser() { this.props.history.push('/add-user/_add'); }

  render() {
    return (
      <div className="page-wrap">
        <div className="page-card">

          {/* Header Row */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center gap-3">
              <h5 className="m-0">All Users</h5>
              <span className="muted">127</span>
            </div>

            <div className="d-flex align-items-center gap-2">
              {/* keep existing handlers, just styled */}
              <div className="search-wrap me-2 d-none d-md-flex">
                <i className="bi bi-search"></i>
                <input
                  className="search-input"
                  placeholder="Search by name or email"
                  value={this.state.searchName}
                  onChange={this.handleSearchNameChange}
                />
              </div>
              <button className="btn btn-light btn-sm" onClick={this.searchNameUser}>
                <i className="bi bi-funnel me-1"></i>Filters
              </button>
              <button className="btn btn-primary btn-sm" onClick={this.addUser}>
                + Add New User
              </button>
            </div>
          </div>

          {/* Compact quick filters (reusing your existing handlers) */}
          <div className="row g-2 mb-3">
            <div className="col-12 col-md-4 d-md-none">
              <div className="search-wrap">
                <i className="bi bi-search"></i>
                <input
                  className="search-input"
                  placeholder="Search by name or email"
                  value={this.state.searchName}
                  onChange={this.handleSearchNameChange}
                />
              </div>
            </div>
            <div className="col-12 col-md-4">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Surname"
                onChange={this.handleSearchSurnameChange}
              />
            </div>
            <div className="col-12 col-md-2">
              <button className="btn btn-outline-secondary w-100 btn-sm" onClick={this.searchSurnameUser}>
                Search
              </button>
            </div>
            <div className="col-12 col-md-2">
              <button className="btn btn-outline-secondary w-100 btn-sm" onClick={this.searchUser}>
                Clear
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="table-responsive">
            <table className="table align-middle app-table">
              <thead>
                <tr>
                  <th style={{ width: 48 }}>
                    <input type="checkbox" className="form-check-input" />
                  </th>
                  <th>NAME</th>
                  <th>ROLE</th>
                  <th>GROUPS</th>
                  <th>STATUS</th>
                  <th className="text-end">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map(user => {
                  const fullName = `${user.name || ''} ${user.surname || ''}`.trim();
                  const email = user.email || `${(user.name || 'user').toLowerCase()}@gmail.com`;
                  const role = user.role || 'Contributor';
                  const groups = user.team || '—';
                  // Fake status from level/profession for display-only UI
                  const active = (user.level || '').toString().toLowerCase().includes('senior') || (user.profession || '').length > 0;

                  return (
                    <tr key={user.id}>
                      <td>
                        <input type="checkbox" className="form-check-input" />
                      </td>

                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="avatar avatar-sm">{(user.name || 'U').charAt(0)}</div>
                          <div>
                            <div className="fw-semibold">{fullName || `ID ${user.id}`}</div>
                            <div className="small text-muted">{email}</div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className={`pill pill-${role.toLowerCase().includes('admin') ? 'admin' : role.toLowerCase().includes('super') ? 'super' : 'contrib'}`}>
                          {role}
                        </span>
                      </td>

                      <td className="text-muted">{groups}</td>

                      <td>
                        <span className={`status-dot me-1 ${active ? 'on' : 'off'}`} />
                        <span className={active ? 'text-success small' : 'text-danger small'}>
                          {active ? 'Active' : 'Inactive'}
                        </span>
                      </td>

                      <td className="text-end">
                        <button className="btn btn-link btn-sm me-2" onClick={() => this.editUser(user.id)}>
                          Reset Password
                        </button>
                        <button className="btn btn-link text-danger btn-sm" onClick={() => this.deleteUser(user.id)}>
                          Delete
                        </button>
                        <button className="btn btn-outline-secondary btn-sm ms-2" onClick={() => this.viewUser(user.id)}>
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* FOOTER / PAGINATION LOOK */}
          <div className="d-flex justify-content-between align-items-center small text-muted mt-3">
            <div className="d-flex gap-2">
              <button className="btn btn-light btn-sm">Prev</button>
              <div className="pagination-mini">
                <button className="active">1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>5</button>
                <button>Next</button>
              </div>
            </div>
            <div>Showing {this.state.users?.length || 0} of 127</div>
          </div>
        </div>

        {/* Inline page-specific styles (keeps Bootstrap; adds clean look) */}
        <style>{`
          .app-shell { position: relative; }
          .app-sidebar {
            position: fixed; left: 0; top: 0; bottom: 0; width: 64px;
            background: #fff; border-right: 1px solid #edf0f5;
          }
          .sidebar-icon {
            width: 36px; height: 36px; border-radius: 10px; margin: 8px 0;
            background: #f3f5f9;
          }
          .sidebar-icon.active { outline: 2px solid #2f80ff; }

          .app-topbar {
            position: fixed; left: 64px; right: 0; top: 0; height: 64px;
            background: #fff; border-bottom: 1px solid #edf0f5; padding: 0 20px; z-index: 5;
          }
          .app-content-spacer { height: 64px; }
          .top-tabs .top-tab {
            padding: 10px 12px; color: #8b96a8; text-decoration: none; font-weight: 500;
          }
          .top-tabs .top-tab.active, .top-tabs .top-tab:hover { color: #222; }
          .search-wrap {
            position: relative; border: 1px solid #e7ebf3; border-radius: 10px;
            padding: 6px 10px; background: #fafbfe;
          }
          .search-wrap .bi-search { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); opacity: .5; }
          .search-input {
            border: none; outline: none; padding: 6px 6px 6px 26px; background: transparent; width: 240px;
          }
          .btn-icon { border: 1px solid #e7ebf3; border-radius: 10px; padding: 6px 10px; }
          .avatar { width: 34px; height: 34px; border-radius: 50%; background: #e8eefc; display: inline-block; }
          .avatar.avatar-sm { width: 34px; height: 34px; border-radius: 50%; display:flex; align-items:center; justify-content:center; font-weight:600; color:#3b5bdb;}
          .page-wrap { padding: 24px; background: #f6f8fc; min-height: calc(100vh - 64px); margin-left: 64px; }
          .page-card { background: #fff; border: 1px solid #edf0f5; border-radius: 16px; padding: 20px; }
          .muted { color: #98a2b3; font-weight: 500; }

          .app-table thead th {
            font-size: 12px; letter-spacing: .04em; color: #9aa4b2; border-bottom: 1px solid #eef1f6; background: #fff;
          }
          .app-table tbody td { border-top: 1px solid #f1f3f8; }

          .pill {
            padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 600; display: inline-block;
            background: #eef2ff; color: #3b5bdb;
          }
          .pill-super { background:#eaf5ff; color:#1971c2; }
          .pill-admin { background:#e9f8f1; color:#2b8a3e; }
          .pill-contrib { background:#f3f4f6; color:#6b7280; }

          .status-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
          .status-dot.on { background:#2ecc71; } .status-dot.off { background:#ff6b6b; }

          .btn-link { text-decoration: none; }
          .btn-link:hover { text-decoration: underline; }

          .pagination-mini button {
            border: 1px solid #e5e9f2; background:#fff; padding: 4px 8px; border-radius: 8px; margin-left: 4px;
          }
          .pagination-mini button.active { background:#2f80ff; color:#fff; border-color:#2f80ff; }
        `}</style>
      </div>
    );
  }
}

export default ListUserComponent;
