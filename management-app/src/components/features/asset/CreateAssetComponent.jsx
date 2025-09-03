import React, { Component } from 'react';
import AssetService from '../../../services/AssetService';
import 'bootstrap/dist/css/bootstrap.min.css';

const styles = {
  titleBar: {
    borderBottom: '1px solid #eef0f3',
  },
  backButton: {
    display: 'block',
    paddingBottom: '30px',
  },
  title: {
    display: 'block',
    paddingLeft: '350px',
  },
  card: {
    borderRadius: 20,
    maxWidth: 1100,
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
};

class CreateAssetComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: '',
      type: '',
      serialNumber: '',
      department: '',
      assignedTo: '',
      technicalSpecs: '',
      value: '',
      purchaseDate: '',
    };
  }

  componentDidMount() {
    if (this.state.id === '_add') return;
    AssetService.getAssetById(this.state.id).then((res) => {
      const asset = res.data || {};
      this.setState({ ...asset });
    });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  saveOrUpdateAsset = (e) => {
    e.preventDefault();
    const asset = { ...this.state };

    if (this.state.id === '_add' || !this.state.id) {
      AssetService.createAsset(asset).then(() => this.props.history.push('/assets'));
    } else {
      AssetService.updateAsset(asset, this.state.id).then(() => this.props.history.push('/assets'));
    }
  };

  cancel = () => this.props.history.push('/assets');

  getTitle = () => (this.state.id === '_add' ? 'Add Asset' : 'Update Asset');

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
        <h5 className="m-0" style={styles.title}>{this.getTitle()}</h5>
      </div>
    </div>
  );

  render() {
    const { name, type, serialNumber, department, assignedTo, technicalSpecs, value, purchaseDate } = this.state;

    return (
      <div className="dashboard-container">
        <div className="container-fluid" style={{ paddingInlineStart: 72, paddingInlineEnd: 16, marginBottom: 40 }}>
          <div className="card border-0 shadow-sm mx-auto" style={styles.card}>
            {this.TitleBar()}

            <div className="card-body px-4 px-md-5 py-4">
              <form onSubmit={this.saveOrUpdateAsset}>
                <div className="mb-4">
                  <div className="mb-2 text-uppercase small text-secondary">Asset Information</div>
                  <div className="row g-3">
                    {[
                      { label: 'Name', name: 'name', value: name, placeholder: 'Asset Name' },
                      { label: 'Type', name: 'type', value: type, placeholder: 'Asset Type' },
                      { label: 'Serial Number', name: 'serialNumber', value: serialNumber, placeholder: 'Serial Number' },
                      { label: 'Department', name: 'department', value: department, placeholder: 'Department' },
                      { label: 'Assigned To', name: 'assignedTo', value: assignedTo, placeholder: 'Assigned To' },
                      { label: 'Technical Specs', name: 'technicalSpecs', value: technicalSpecs, placeholder: 'Technical Specifications' },
                      { label: 'Value', name: 'value', value: value, placeholder: 'Value' },
                      { label: 'Purchase Date', name: 'purchaseDate', value: purchaseDate, placeholder: 'YYYY-MM-DD' },
                    ].map((field, index) => (
                      <div className="col-12 col-md-6" key={index}>
                        <label className="form-label">{field.label}</label>
                        <input
                          className="form-control"
                          name={field.name}
                          placeholder={field.placeholder}
                          value={field.value}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="d-flex justify-content-center gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={this.cancel}
                    style={styles.cancelButton}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={styles.saveButton}>
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

export default CreateAssetComponent;
