import React, { Component } from 'react';
import AssetService from '../../services/AssetService';
import 'bootstrap/dist/css/bootstrap.min.css';

class ViewAssetComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      asset: {}
    };
  }

  componentDidMount() {
    AssetService.getAssetById(this.state.id).then(res => {
      this.setState({ asset: res.data || {} });
    });
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
    const { asset } = this.state;
    const loading = !asset || Object.keys(asset).length === 0;

    return (
      <div className="dashboard-container">
        <div className="container-fluid" style={{ paddingInlineStart: 72, paddingInlineEnd: 16 }}>
          <div className="card border-0 shadow-sm mx-auto" style={{ borderRadius: 20, maxWidth: 1080 }}>
            <div className="d-flex align-items-center justify-content-between px-4 py-3" style={{ borderBottom: '1px solid #eef0f3' }}>
              <div className="d-flex align-items-center gap-2">
                <button className="btn btn-light border" onClick={() => this.props.history.goBack()} style={{  paddingBottom: '30px', marginRight: '10px' }}>
                  <i className="bi bi-arrow-left me-1" /> Back
                </button>
                <h5 className="m-0" style={{ display: 'block', paddingLeft: '350px' }}>Asset Details</h5>
              </div>
              <button className="btn btn-outline-primary" onClick={() => this.props.history.push(`/add-asset/${this.state.id}`)} style={{  paddingBottom: '30px' }}>
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
                    {this.field('ID', asset.id)}
                    {this.field('Name', asset.name)}
                    {this.field('Type', asset.type)}
                    {this.field('Serial Number', asset.serialNumber)}
                    {this.field('Department', asset.department)}
                    {this.field('Assigned To', asset.assignedTo)}
                    {this.field('Technical Specs', asset.technicalSpecs)}
                    {this.field('Value', asset.value)}
                    {this.field('Purchase Date', asset.purchaseDate)}
                  </div>

                  <div className="d-flex justify-content-center gap-2 pt-2">
                    <button className="btn btn-outline-secondary" onClick={() => this.props.history.goBack()} style={{  paddingBottom: '30px', marginRight: '10px' }}>
                      Close
                    </button>
                    <button className="btn btn-primary" onClick={() => this.props.history.push(`/add-asset/${this.state.id}`)} style={{  paddingBottom: '30px' }}>
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
