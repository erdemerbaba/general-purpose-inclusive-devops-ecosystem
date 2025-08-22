import React, { Component } from 'react';
import UserService from '../../services/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';

class ViewUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      user: {}
    };
  }

  componentDidMount() {
    UserService.getUserById(this.state.id).then(res => {
      this.setState({ user: res.data || {} });
    });
  }

  // --- helpers (pure UI) ---
  avatar(initials) {
    return (
      <div
        className="d-flex align-items-center justify-content-center rounded-circle"
        style={{ width: 56, height: 56, background: '#eef2ff', color: '#4338ca', fontWeight: 700 }}
      >
        {initials}
      </div>
    );
  }

  initialsFromName(name) {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(p => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  field(label, value) {
    return (
      <div className="col-12 col-md-6">
        <div className="mb-3 pb-2" style={{ borderBottom: '1px dashed #edf1f5' }}>
          <div className="text-uppercase small text-secondary mb-1">{label}</div>
          <div className="fw-medium">{value ?? '—'}</div>
        </div>
      </div>
    );
  }

  render() {
    const { user } = this.state;
    const loading = !user || Object.keys(user).length === 0;

    return (
      <div className="container-fluid" style={{ paddingInlineStart: 72, paddingInlineEnd: 16 }}>
        <div className="d-flex align-items-center justify-content-between mt-4 mb-3">
          <div className="d-flex align-items-center gap-2">
            <a
              className="btn btn-light border"
              onClick={() => this.props.history.goBack()}
              role="button"
            >
              <i className="bi bi-arrow-left me-1" /> Back
            </a>
            <h4 className="m-0">Employee Details</h4>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-primary"
              onClick={() => this.props.history.push(`/add-user/${this.state.id}`)}
            >
              <i className="bi bi-pencil-square me-1" />
              Edit
            </button>
          </div>
        </div>

        <div
          className="card border-0 shadow-sm mx-auto"
          style={{ borderRadius: 20, maxWidth: 1080 }}
        >
          {/* Header strip */}
          <div
            className="d-flex flex-wrap align-items-center justify-content-between px-4 py-3"
            style={{ borderBottom: '1px solid #eef0f3' }}
          >
            <div className="d-flex align-items-center">
              {this.avatar(this.initialsFromName(user.name))}
              <div className="ms-3">
                <div className="d-flex align-items-center gap-2">
                  <h5 className="mb-0">{user.name || '—'}</h5>
                  {user.role && (
                    <span
                      className="badge rounded-pill text-dark"
                      style={{ background: '#fff7e6', border: '1px solid #ffe8b3' }}
                    >
                      {user.role}
                    </span>
                  )}
                  {user.level && (
                    <span
                      className="badge rounded-pill"
                      style={{ background: '#eef6ff', color: '#1d4ed8' }}
                    >
                      L{user.level}
                    </span>
                  )}
                </div>
                <div className="text-secondary small">
                  {user.profession || '—'} {user.team ? `• ${user.team}` : ''}
                </div>
              </div>
            </div>

            {/* quick contact chips */}
            <div className="d-flex flex-wrap gap-2">
              {user.email && (
                <span className="badge bg-light text-dark border">
                  <i className="bi bi-envelope me-1" />
                  {user.email}
                </span>
              )}
              {user.phoneNumber && (
                <span className="badge bg-light text-dark border">
                  <i className="bi bi-telephone me-1" />
                  {user.phoneNumber}
                </span>
              )}
              {user.location && (
                <span className="badge bg-light text-dark border">
                  <i className="bi bi-geo-alt me-1" />
                  {user.location}
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="card-body px-4 px-md-5 py-4">
            {loading ? (
              <div className="d-flex align-items-center justify-content-center py-5">
                <div className="spinner-border text-primary" role="status" />
              </div>
            ) : (
              <>
                {/* Two-column details grid */}
                <div className="row">
                  {this.field('ID', user.id)}
                  {this.field('Surname', user.surname)}
                  {this.field('Profession', user.profession)}
                  {this.field('Role', user.role)}
                  {this.field('Level', user.level)}
                  {this.field('Team', user.team)}
                  {this.field('Mentor', user.mentor)}
                  {this.field('Join Date', user.joinDate)}
                  {this.field('Leave Date', user.leaveDate)}
                  {this.field('Location', user.location)}
                  {this.field('Email', user.email)}
                  {this.field('Phone Number', user.phoneNumber)}
                  {this.field('Birth Date', user.birthDate)}
                  {this.field('Nationality', user.nationality)}
                  {this.field('Address', user.address)}
                  {this.field('Identity Number', user.identityNumber)}
                  {this.field('Educations', user.educations)}
                  {this.field('Experience', user.experience)}
                  {this.field('Skills', user.skills)}
                  {this.field('Certifications', user.certifications)}
                  {this.field('Honors', user.honors)}
                  {this.field('Memberships', user.memberships)}
                  {this.field('Projects', user.projects)}
                  {this.field('Links', user.links)}
                  {this.field('Government Papers', user.governmentPapers)}
                  {this.field('Additional Notes', user.additionalNotes)}
                </div>

                {/* Sticky footer actions */}
                <div className="d-flex justify-content-end gap-2 pt-2">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => this.props.history.goBack()}
                  >
                    Close
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => this.props.history.push(`/add-user/${this.state.id}`)}
                  >
                    <i className="bi bi-pencil-square me-1" />
                    Edit User
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="my-4" />
      </div>
    );
  }
}

export default ViewUserComponent;
