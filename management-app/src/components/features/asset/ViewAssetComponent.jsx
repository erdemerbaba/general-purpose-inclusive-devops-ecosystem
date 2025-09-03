import React, { Component } from 'react';
import AssetService from '../../../services/AssetService';
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
    paddingBottom: '30px',
    marginRight: '10px',
  },
  editButton: {
    paddingBottom: '30px',
  },
  closeButton: {
    paddingBottom: '30px',
    marginRight: '10px',
  },
};

class ViewAssetComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      asset: {},
    };
  }

  componentDidMount() {
    AssetService.getAssetById(this.state.id).then((res) => {
      this.setState({ asset: res.data || {} });
    });
  }

  field = (label, value) => (
    <div className="col-12 col-md-6">
      <div className="mb-3 pb-2" style={{ borderBottom: '1px dashed #edf1f5' }}>
        <div className="text-uppercase small text-secondary mb-1">{label}</div>
        <div className="fw-medium">{value ?? '—'}</div>
      </div>
    </div>
  );

  render() {
    const { asset } = this.state;
    const loading = !asset || Object.keys(asset).length === 0;

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
                <h5 className="m-0">Asset Details</h5>
              </div>
              <button
                className="btn btn-outline-primary"
                onClick={() => this.props.history.push(`/add-asset/${this.state.id}`)}
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
                      { label: 'ID', value: asset.id },
                      { label: 'Name', value: asset.name },
                      { label: 'Type', value: asset.type },
                      { label: 'Serial Number', value: asset.serialNumber },
                      { label: 'Department', value: asset.department },
                      { label: 'Assigned To', value: asset.assignedTo },
                      { label: 'Technical Specs', value: asset.technicalSpecs },
                      { label: 'Value', value: asset.value },
                      { label: 'Purchase Date', value: asset.purchaseDate },
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
                      onClick={() => this.props.history.push(`/add-asset/${this.state.id}`)}
                      style={styles.editButton}
                    >
                      <i className="bi bi-pencil-square me-1" /> Edit Asset
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewAssetComponent;
