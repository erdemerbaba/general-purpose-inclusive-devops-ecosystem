import React, { Component } from 'react';
import UserService from '../../../services/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';

const styles = {
  card: {
    borderRadius: 20,
    maxWidth: 1080,
  },
  titleBar: {
    borderBottom: '1px solid #eef0f3',
  },
  backButton: {
    display: 'block',
    paddingBottom: '30px',
  },
  editButton: {
    display: 'block',
    paddingBottom: '30px',
  },
  closeButton: {
    display: 'block',
    paddingBottom: '30px',
    marginRight: '8px',
  },
};

class ViewUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      user: {},
    };
  }

  componentDidMount() {
    UserService.getUserById(this.state.id).then((res) => {
      this.setState({ user: res.data || {} });
    });
  }

  initialsFromName = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  field = (label, value) => (
    <div className="col-12 col-md-6">
      <div className="mb-3 pb-2" style={{ borderBottom: '1px dashed #edf1f5' }}>
        <div className="text-uppercase small text-secondary mb-1">{label}</div>
        <div className="fw-medium">{value ?? '—'}</div>
      </div>
    </div>
  );

  render() {
    const { user } = this.state;
    const loading = !user || Object.keys(user).length === 0;

    return (
      <div className="dashboard-container">
        <div className="container-fluid" style={{ paddingInlineStart: 72, paddingInlineEnd: 16 }}>
          <div className="card border-0 shadow-sm mx-auto" style={styles.card}>
            <div className="d-flex align-items-center justify-content-between px-4 py-3" style={styles.titleBar}>
              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-light border"
                  onClick={() => this.props.history.goBack()}
                  style={styles.backButton}
                >
                  <i className="bi bi-arrow-left me-1" /> Back
                </button>
                <h5 className="m-0">Employee Details</h5>
              </div>
              <button
                className="btn btn-outline-primary"
                onClick={() => this.props.history.push(`/add-user/${this.state.id}`)}
                style={styles.editButton}
              >
                <i className="bi bi-pencil-square me-1" /> Edit
              </button>
            </div>

            <div className="card-body px-4 px-md-5 py-4">
              {loading ? (
                <div className="d-flex align-items-center justify-content-center py-5">
                  <div className="spinner-border text-primary" role="status" />
                </div>
              ) : (
                <>
                  <div className="row">
                    {[
                      { label: 'ID', value: user.id },
                      { label: 'Surname', value: user.surname },
                      { label: 'Profession', value: user.profession },
                      { label: 'Role', value: user.role },
                      { label: 'Level', value: user.level },
                      { label: 'Team', value: user.team },
                      { label: 'Mentor', value: user.mentor },
                      { label: 'Join Date', value: user.joinDate },
                      { label: 'Leave Date', value: user.leaveDate },
                      { label: 'Location', value: user.location },
                      { label: 'Email', value: user.email },
                      { label: 'Phone Number', value: user.phoneNumber },
                      { label: 'Birth Date', value: user.birthDate },
                      { label: 'Nationality', value: user.nationality },
                      { label: 'Address', value: user.address },
                      { label: 'Identity Number', value: user.identityNumber },
                      { label: 'Educations', value: user.educations },
                      { label: 'Experience', value: user.experience },
                      { label: 'Skills', value: user.skills },
                      { label: 'Certifications', value: user.certifications },
                      { label: 'Honors', value: user.honors },
                      { label: 'Memberships', value: user.memberships },
                      { label: 'Projects', value: user.projects },
                      { label: 'Links', value: user.links },
                      { label: 'Government Papers', value: user.governmentPapers },
                      { label: 'Additional Notes', value: user.additionalNotes },
                    ].map((field, index) => this.field(field.label, field.value))}
                  </div>

                  <div className="d-flex justify-content-center gap-2 pt-2">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => this.props.history.goBack()}
                      style={styles.closeButton}
                    >
                      Close
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => this.props.history.push(`/add-user/${this.state.id}`)}
                      style={styles.editButton}
                    >
                      <i className="bi bi-pencil-square me-1" /> Edit User
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="my-4" />
        </div>
      </div>
    );
  }
}

export default ViewUserComponent;
