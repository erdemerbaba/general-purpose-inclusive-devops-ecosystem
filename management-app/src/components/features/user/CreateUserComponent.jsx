import React, { Component } from 'react';
import UserService from '../../../services/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';

const styles = {
  titleBar: {
    borderBottom: '1px solid #eef0f3',
  },
  backButton: {
    display: 'block',
    paddingBottom: '30px',
  },
  cancelButton: {
    display: 'block',
    paddingBottom: '30px',
    marginRight: '8px',
  },
  saveButton: {
    display: 'block',
    paddingBottom: '30px',
  },
  card: {
    borderRadius: 20,
    maxWidth: 1100,
  },
};

class CreateUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: '',
      surname: '',
      profession: '',
      role: '',
      level: '',
      team: '',
      mentor: '',
      joinDate: '',
      leaveDate: '',
      location: '',
      email: '',
      phoneNumber: '',
      birthDate: '',
      nationality: '',
      address: '',
      identityNumber: '',
      educations: '',
      experience: '',
      skills: '',
      certifications: '',
      honors: '',
      memberships: '',
      projects: '',
      links: '',
      governmentPapers: '',
      additionalNotes: '',
    };
  }

  componentDidMount() {
    if (this.state.id === '_add') return;
    UserService.getUserById(this.state.id).then((res) => {
      const user = res.data || {};
      this.setState({ ...user });
    });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  saveOrUpdateUser = (e) => {
    e.preventDefault();
    const { id, ...user } = this.state;

    if (id === '_add') {
      UserService.createUser(user).then(() => this.props.history.push('/users'));
    } else {
      UserService.updateUser(user, id).then(() => this.props.history.push('/users'));
    }
  };

  cancel = () => this.props.history.push('/users');

  getTitle = () => (this.state.id === '_add' ? 'Add Employee' : 'Update User');

  TitleBar = () => (
    <div className="d-flex align-items-center justify-content-between px-4 py-3" style={styles.titleBar}>
      <div className="d-flex align-items-center gap-2">
        <button
          className="btn btn-light border"
          onClick={() => this.props.history.goBack()}
          style={styles.backButton}
        >
          <i className="bi bi-arrow-left me-1" /> Back
        </button>
        <h5 className="m-0" style={{ paddingLeft: '350px' }}>{this.getTitle()}</h5>
      </div>
    </div>
  );

  render() {
    const { id, ...fields } = this.state;

    return (
      <div className="dashboard-container">
        <div className="container-fluid" style={{ paddingInlineStart: 72, paddingInlineEnd: 16, marginBottom: 40 }}>
          <div className="card border-0 shadow-sm mx-auto" style={styles.card}>
            {this.TitleBar()}

            <div className="card-body px-4 px-md-5 py-4">
              <form onSubmit={this.saveOrUpdateUser}>
                {[
                  {
                    section: 'Basic Information',
                    fields: [
                      { label: 'Name', name: 'name', placeholder: 'Jane' },
                      { label: 'Surname', name: 'surname', placeholder: 'Doe' },
                      { label: 'Profession', name: 'profession', placeholder: 'Software Engineer' },
                      { label: 'Role', name: 'role', placeholder: 'Developer' },
                      { label: 'Level', name: 'level', placeholder: '3' },
                      { label: 'Team', name: 'team', placeholder: 'Core Platform' },
                      { label: 'Mentor', name: 'mentor', placeholder: 'John Smith' },
                      { label: 'Join Date', name: 'joinDate', type: 'date' },
                      { label: 'Leave Date', name: 'leaveDate', type: 'date' },
                    ],
                  },
                  {
                    section: 'Contact',
                    fields: [
                      { label: 'Email', name: 'email', placeholder: 'name@company.com', type: 'email' },
                      { label: 'Phone Number', name: 'phoneNumber', placeholder: '+90 5xx xxx xx xx', type: 'tel' },
                      { label: 'Location', name: 'location', placeholder: 'Istanbul, TR' },
                      { label: 'Birth Date', name: 'birthDate', type: 'date' },
                      { label: 'Nationality', name: 'nationality', placeholder: 'Turkish' },
                      { label: 'Address', name: 'address', type: 'textarea', placeholder: 'Street, city, country' },
                    ],
                  },
                  {
                    section: 'Identity',
                    fields: [
                      { label: 'Identity Number', name: 'identityNumber', placeholder: 'ID / Passport No.' },
                    ],
                  },
                  {
                    section: 'Background',
                    fields: [
                      { label: 'Educations', name: 'educations', type: 'textarea', placeholder: 'BSc, MSc, etc.' },
                      { label: 'Experience', name: 'experience', type: 'textarea', placeholder: 'Company – Role (YYYY–YYYY)' },
                      { label: 'Skills', name: 'skills', type: 'textarea', placeholder: 'Comma-separated or lines' },
                      { label: 'Certifications', name: 'certifications', type: 'textarea' },
                      { label: 'Honors', name: 'honors', type: 'textarea' },
                      { label: 'Memberships', name: 'memberships', type: 'textarea' },
                    ],
                  },
                  {
                    section: 'Projects & Links',
                    fields: [
                      { label: 'Projects', name: 'projects', type: 'textarea' },
                      { label: 'Links', name: 'links', type: 'textarea', placeholder: 'Portfolio, LinkedIn, GitHub…' },
                    ],
                  },
                  {
                    section: 'Documents & Notes',
                    fields: [
                      { label: 'Government Papers', name: 'governmentPapers', type: 'textarea' },
                      { label: 'Additional Notes', name: 'additionalNotes', type: 'textarea' },
                    ],
                  },
                ].map((section, index) => (
                  <div className="mb-4" key={index}>
                    <div className="mb-2 text-uppercase small text-secondary">{section.section}</div>
                    <div className="row g-3">
                      {section.fields.map((field, idx) => (
                        <div className={`col-12 ${field.type === 'textarea' ? '' : 'col-md-6'}`} key={idx}>
                          <label className="form-label">{field.label}</label>
                          {field.type === 'textarea' ? (
                            <textarea
                              rows="2"
                              className="form-control"
                              name={field.name}
                              value={fields[field.name] || ''}
                              onChange={this.handleInputChange}
                              placeholder={field.placeholder}
                            />
                          ) : (
                            <input
                              className="form-control"
                              name={field.name}
                              value={fields[field.name] || ''}
                              onChange={this.handleInputChange}
                              placeholder={field.placeholder}
                              type={field.type || 'text'}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="d-flex justify-content-center gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={this.cancel}
                    style={styles.cancelButton}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={styles.saveButton}
                  >
                    <i className="bi bi-check2 me-1" /> Save
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="my-4" />
        </div>
      </div>
    );
  }
}

export default CreateUserComponent;
