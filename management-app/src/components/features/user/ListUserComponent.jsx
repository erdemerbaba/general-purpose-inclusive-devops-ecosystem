// ListUserComponent.jsx
import React, { Component } from 'react';
import UserService from '../../../services/UserService';
import { AuthContext } from '../../../context/AuthContext';

class ListUserComponent extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      users: [],
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
      searchAdditionalNotes: '',
      currentPage: 0,
      totalPages: 0,
    };

    this.addUser = this.addUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.searchUser = this.searchUser.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handleSearchChange(e) { this.setState({ searchName: e.target.value }); }
  searchUser() {
    this.setState({ currentPage: 0 }, () => {
      this.fetchUsers();
    });
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
    this.fetchUsers();
  }

  handlePageChange(newPage) {
    this.setState({ currentPage: newPage }, () => {
      this.fetchUsers();
    });
  }

  fetchUsers() {
    const { searchName, currentPage } = this.state;
    UserService.getUsersByName(searchName, currentPage).then(res => {
      console.log('API Response:', res.data);
      this.setState({
        users: res.data?.content || [],
        totalPages: res.data?.totalPages || 0,
      });
    }).catch(error => {
      console.error('Error fetching users:', error);
      this.setState({ users: [] });
    });
  }

  addUser() { this.props.history.push('/add-user/_add'); }

  clearSearch() {
    this.setState({ searchName: '', currentPage: 0 }, () => {
      this.fetchUsers();
    });
  }

  render() {
    const { users, currentPage, totalPages } = this.state;
    return (
      <div className="dashboard-container">
        <h1 className="about-title">Users</h1>
        <p className="about-text">
          User Details listed below.
        </p>

        <div className="page-wrap">
          <div className="page-card">

            {/* Header Row */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-3">
                <h5 className="m-0">All Users</h5>
              </div>

              <div className="d-flex align-items-center gap-2">
                <div className="search-wrap mb-3" style={{ marginTop: '15px' }}>
                  <input
                    className="search-input"
                    placeholder="Search by name"
                    value={this.state.searchName}
                    onChange={this.handleSearchChange}
                  />
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={this.searchUser} style={{ marginLeft: '10px', padding: '5px 10px' }}>
                    Search
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={this.clearSearch}style={{ marginLeft: '10px' , padding: '5px 10px', backgroundColor: '#656565ad'}}>
                    Clear
                  </button>
                
                <button className="btn btn-primary btn-sm" onClick={this.addUser} style={{ marginLeft: '10px' , padding: '5px 10px', backgroundColor: '#0e7d02ad'}}>
                  Add New User
                </button>
              </div>
            </div>

            {/* TABLE */}
            <div className="table-responsive">
              <table className="table align-middle app-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>SURNAME</th>
                    <th>PROFESSION</th>
                    <th>ROLE</th>
                    <th className="text-end" style={{ textAlign: 'center' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(users) && users.length > 0 ? (
                    users.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.profession}</td>
                        <td>{user.role}</td>
                        <td className="text-end">
                          <button
                            className="btn btn-outline-secondary btn-sm ms-2"
                            onClick={() => this.viewUser(user.id)}
                            style={{ paddingBottom: '30px', marginRight: '10px', marginLeft: '120px', backgroundColor: '#0e7d02ad' }}
                          >
                            Details
                          </button>
                          <button
                            className="btn btn-link btn-sm me-2"
                            onClick={() => this.editUser(user.id)}
                            style={{ paddingBottom: '30px', marginRight: '10px', backgroundColor: '#7d7102ad' }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-link btn-sm"
                            onClick={() => this.deleteUser(user.id)}
                            style={{ paddingBottom: '30px', backgroundColor: '#7d0202ad' }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">No users found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => this.handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                style={{ marginRight: '10px', padding: '5px 10px' }}
              >
                Previous
              </button>
              <span>Page {currentPage + 1} of {totalPages}</span>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => this.handlePageChange(currentPage + 1)}
                disabled={currentPage + 1 === totalPages}
                style={{ marginLeft: '10px', padding: '5px 10px' }}
              >
                Next
              </button>

            </div>
            <div className="d-flex justify-content-between align-items-center small text-muted mt-3">
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginLeft: '620px' }}>Showing {users?.length || 0} values</div>
            </div>
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
        </div>
      </div>
    );
  }
}

export default ListUserComponent;
