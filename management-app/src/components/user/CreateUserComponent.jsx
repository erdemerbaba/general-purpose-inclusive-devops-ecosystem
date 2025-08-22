import React, { Component } from 'react';
import UserService from '../../services/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      additionalNotes: ''
    };

    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeSurnameHandler = this.changeSurnameHandler.bind(this);
    this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
  }

  componentDidMount() {
    if (this.state.id === '_add') return;
    UserService.getUserById(this.state.id).then((res) => {
      const user = res.data || {};
      this.setState({ ...user });
    });
  }

  // --- all your existing handlers (unchanged) ---
  saveOrUpdateUser = (e) => {
    e.preventDefault();
    const {
      name, surname, profession, role, level, team, mentor, joinDate, leaveDate,
      location, email, phoneNumber, birthDate, nationality, address, identityNumber,
      educations, experience, skills, certifications, honors, memberships, projects,
      links, governmentPapers, additionalNotes, id
    } = this.state;

    const user = {
      name, surname, profession, role, level, team, mentor, joinDate, leaveDate,
      location, email, phoneNumber, birthDate, nationality, address, identityNumber,
      educations, experience, skills, certifications, honors, memberships, projects,
      links, governmentPapers, additionalNotes
    };

    if (id === '_add') {
      UserService.createUser(user).then(() => this.props.history.push('/user'));
    } else {
      UserService.updateUser(user, id).then(() => this.props.history.push('/user'));
    }
  };

  changeNameHandler = (e) => this.setState({ name: e.target.value });
  changeSurnameHandler = (e) => this.setState({ surname: e.target.value });
  changeProfessionHandler = (e) => this.setState({ profession: e.target.value });
  changeRoleHandler = (e) => this.setState({ role: e.target.value });
  changeLevelHandler = (e) => this.setState({ level: e.target.value });
  changeTeamHandler = (e) => this.setState({ team: e.target.value });
  changeMentorHandler = (e) => this.setState({ mentor: e.target.value });
  changeJoinDateHandler = (e) => this.setState({ joinDate: e.target.value });
  changeLeaveDateHandler = (e) => this.setState({ leaveDate: e.target.value });
  changeLocationHandler = (e) => this.setState({ location: e.target.value });
  changeEmailHandler = (e) => this.setState({ email: e.target.value });
  changePhoneNumberHandler = (e) => this.setState({ phoneNumber: e.target.value });
  changeBirthDateHandler = (e) => this.setState({ birthDate: e.target.value });
  changeNationalityHandler = (e) => this.setState({ nationality: e.target.value });
  changeAddressHandler = (e) => this.setState({ address: e.target.value });
  changeIdentityNumberHandler = (e) => this.setState({ identityNumber: e.target.value });
  changeEducationsHandler = (e) => this.setState({ educations: e.target.value });
  changeExperienceHandler = (e) => this.setState({ experience: e.target.value });
  changeSkillsHandler = (e) => this.setState({ skills: e.target.value });
  changeCertificationsHandler = (e) => this.setState({ certifications: e.target.value });
  changeHonorsHandler = (e) => this.setState({ honors: e.target.value });
  changeMembershipsHandler = (e) => this.setState({ memberships: e.target.value });
  changeProjectsHandler = (e) => this.setState({ projects: e.target.value });
  changeLinksHandler = (e) => this.setState({ links: e.target.value });
  changeGovernmentPapersHandler = (e) => this.setState({ governmentPapers: e.target.value });
  changeAdditionalNotesHandler = (e) => this.setState({ additionalNotes: e.target.value });

  cancel() { this.props.history.push('/user'); }

  getTitle() {
    return this.state.id === '_add' ? 'Add Employee' : 'Update User';
  }

  // small header badge block
  TitleBar() {
    return (
      <div className="d-flex align-items-center justify-content-between px-4 py-3"
           style={{ borderBottom: '1px solid #eef0f3' }}>
        <div className="d-flex align-items-center gap-2">
          <a className="btn btn-light border" onClick={() => this.props.history.goBack()} role="button">
            <i className="bi bi-arrow-left me-1" /> Back
          </a>
          <h5 className="m-0">{this.getTitle()}</h5>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary" onClick={() => this.cancel()}>Cancel</button>
          <button className="btn btn-primary" onClick={this.saveOrUpdateUser}>
            <i className="bi bi-check2 me-1" /> Save
          </button>
        </div>
      </div>
    );
  }

  render() {
    const s = this.state;

    return (
      <div className="container-fluid" style={{ paddingInlineStart: 72, paddingInlineEnd: 16, marginBottom: 40 }}>
        <div className="card border-0 shadow-sm mx-auto" style={{ borderRadius: 20, maxWidth: 1100 }}>
          {this.TitleBar()}

          <div className="card-body px-4 px-md-5 py-4">
            <form onSubmit={this.saveOrUpdateUser}>
              {/* SECTION: Basic */}
              <div className="mb-4">
                <div className="mb-2 text-uppercase small text-secondary">Basic Information</div>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label">Name</label>
                    <input className="form-control" name="name" placeholder="Jane"
                           value={s.name} onChange={this.changeNameHandler} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Surname</label>
                    <input className="form-control" name="surname" placeholder="Doe"
                           value={s.surname} onChange={this.changeSurnameHandler} />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label">Profession</label>
                    <input className="form-control" name="profession" placeholder="Software Engineer"
                           value={s.profession} onChange={this.changeProfessionHandler} />
                  </div>
                  <div className="col-6 col-md-3">
                    <label className="form-label">Role</label>
                    <input className="form-control" name="role" placeholder="Developer"
                           value={s.role} onChange={this.changeRoleHandler} />
                  </div>
                  <div className="col-6 col-md-3">
                    <label className="form-label">Level</label>
                    <input className="form-control" name="level" placeholder="3"
                           value={s.level} onChange={this.changeLevelHandler} />
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="form-label">Team</label>
                    <input className="form-control" name="team" placeholder="Core Platform"
                           value={s.team} onChange={this.changeTeamHandler} />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label">Mentor</label>
                    <input className="form-control" name="mentor" placeholder="John Smith"
                           value={s.mentor} onChange={this.changeMentorHandler} />
                  </div>
                  <div className="col-6 col-md-2">
                    <label className="form-label">Join Date</label>
                    <input type="date" className="form-control" name="joinDate"
                           value={s.joinDate} onChange={this.changeJoinDateHandler} />
                  </div>
                  <div className="col-6 col-md-2">
                    <label className="form-label">Leave Date</label>
                    <input type="date" className="form-control" name="leaveDate"
                           value={s.leaveDate} onChange={this.changeLeaveDateHandler} />
                  </div>
                </div>
              </div>

              {/* SECTION: Contact */}
              <div className="mb-4">
                <div className="mb-2 text-uppercase small text-secondary">Contact</div>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" placeholder="name@company.com"
                           value={s.email} onChange={this.changeEmailHandler} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Phone Number</label>
                    <input type="tel" className="form-control" name="phoneNumber" placeholder="+90 5xx xxx xx xx"
                           value={s.phoneNumber} onChange={this.changePhoneNumberHandler} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Location</label>
                    <input className="form-control" name="location" placeholder="Istanbul, TR"
                           value={s.location} onChange={this.changeLocationHandler} />
                  </div>
                  <div className="col-6 col-md-3">
                    <label className="form-label">Birth Date</label>
                    <input type="date" className="form-control" name="birthDate"
                           value={s.birthDate} onChange={this.changeBirthDateHandler} />
                  </div>
                  <div className="col-6 col-md-3">
                    <label className="form-label">Nationality</label>
                    <input className="form-control" name="nationality" placeholder="Turkish"
                           value={s.nationality} onChange={this.changeNationalityHandler} />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Address</label>
                    <textarea rows="2" className="form-control" name="address" placeholder="Street, city, country"
                              value={s.address} onChange={this.changeAddressHandler} />
                  </div>
                </div>
              </div>

              {/* SECTION: Identity */}
              <div className="mb-4">
                <div className="mb-2 text-uppercase small text-secondary">Identity</div>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label">Identity Number</label>
                    <input className="form-control" name="identityNumber" placeholder="ID / Passport No."
                           value={s.identityNumber} onChange={this.changeIdentityNumberHandler} />
                  </div>
                </div>
              </div>

              {/* SECTION: Background */}
              <div className="mb-4">
                <div className="mb-2 text-uppercase small text-secondary">Background</div>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label">Educations</label>
                    <textarea rows="2" className="form-control" name="educations"
                              placeholder="BSc, MSc, etc."
                              value={s.educations} onChange={this.changeEducationsHandler} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Experience</label>
                    <textarea rows="2" className="form-control" name="experience"
                              placeholder="Company – Role (YYYY–YYYY)"
                              value={s.experience} onChange={this.changeExperienceHandler} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Skills</label>
                    <textarea rows="2" className="form-control" name="skills"
                              placeholder="Comma-separated or lines"
                              value={s.skills} onChange={this.changeSkillsHandler} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Certifications</label>
                    <textarea rows="2" className="form-control" name="certifications"
                              value={s.certifications} onChange={this.changeCertificationsHandler} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Honors</label>
                    <textarea rows="2" className="form-control" name="honors"
                              value={s.honors} onChange={this.changeHonorsHandler} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Memberships</label>
                    <textarea rows="2" className="form-control" name="memberships"
                              value={s.memberships} onChange={this.changeMembershipsHandler} />
                  </div>
                </div>
              </div>

              {/* SECTION: Projects & Links */}
              <div className="mb-4">
                <div className="mb-2 text-uppercase small text-secondary">Projects & Links</div>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label">Projects</label>
                    <textarea rows="2" className="form-control" name="projects"
                              value={s.projects} onChange={this.changeProjectsHandler} />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Links</label>
                    <textarea rows="2" className="form-control" name="links"
                              placeholder="Portfolio, LinkedIn, GitHub…"
                              value={s.links} onChange={this.changeLinksHandler} />
                  </div>
                </div>
              </div>

              {/* SECTION: Documents & Notes */}
              <div className="mb-4">
                <div className="mb-2 text-uppercase small text-secondary">Documents & Notes</div>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Government Papers</label>
                    <textarea rows="2" className="form-control" name="governmentPapers"
                              value={s.governmentPapers} onChange={this.changeGovernmentPapersHandler} />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Additional Notes</label>
                    <textarea rows="3" className="form-control" name="additionalNotes"
                              value={s.additionalNotes} onChange={this.changeAdditionalNotesHandler} />
                  </div>
                </div>
              </div>

              {/* Bottom actions */}
              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-outline-secondary" onClick={() => this.cancel()}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-check2 me-1" /> Save
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="my-4" />
      </div>
    );
  }
}

export default CreateUserComponent;
