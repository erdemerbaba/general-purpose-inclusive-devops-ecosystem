import React, { Component } from 'react';
import AssetService from '../../services/AssetService';
import 'bootstrap/dist/css/bootstrap.min.css';


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

    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.saveOrUpdateAsset = this.saveOrUpdateAsset.bind(this);
  }

  componentDidMount() {
    if (this.state.id === '_add') return;
    AssetService.getAssetById(this.state.id).then((res) => {
      const asset = res.data || {};
      this.setState({ ...asset });
    });
  }

  saveOrUpdateAsset = (e) => {
    e.preventDefault();
    const {
      id, name, type, serialNumber, department, assignedTo, technicalSpecs, value, purchaseDate
    } = this.state;

    const asset = {
      id, name, type, serialNumber, department, assignedTo, technicalSpecs, value, purchaseDate
    };

    if (id === '_add' || !id) {
      AssetService.createAsset(asset).then(() => this.props.history.push('/assets'));
    } else {
      AssetService.updateAsset(asset, id).then(() => this.props.history.push('/assets'));
    }
  };

  changeNameHandler = (e) => this.setState({ name: e.target.value });
  changeTypeHandler = (e) => this.setState({ type: e.target.value });
  changeSerialNumberHandler = (e) => this.setState({ serialNumber: e.target.value });
  changeDepartmentHandler = (e) => this.setState({ department: e.target.value });
  changeAssignedToHandler = (e) => this.setState({ assignedTo: e.target.value });
  changeTechnicalSpecsHandler = (e) => this.setState({ technicalSpecs: e.target.value });
  changeValueHandler = (e) => this.setState({ value: e.target.value });
  changePurchaseDateHandler = (e) => this.setState({ purchaseDate: e.target.value });

  cancel() { this.props.history.push('/assets'); }

  getTitle() {
    return this.state.id === '_add' ? 'Add Asset' : 'Update Asset';
  }

  // small header badge block
  TitleBar() {
    return (
      <div className="d-flex align-items-center justify-content-between px-4 py-3"
           style={{ borderBottom: '1px solid #eef0f3' }}>
        <div className="d-flex align-items-center gap-2">
          <a className="btn btn-light border" onClick={() => this.props.history.goBack()} role="button" style={{ display: 'block', paddingBottom: '30px' }}>
            <i className="bi bi-arrow-left me-1" /> Back
          </a>
          <h5 className="m-0" style={{ display: 'block', paddingLeft: '350px' }}>{this.getTitle()}</h5>
        </div>
      </div>
    );
  }

  render() {
    const s = this.state;

    return (
      <div className="dashboard-container">
        <div className="container-fluid" style={{ paddingInlineStart: 72, paddingInlineEnd: 16, marginBottom: 40 }}>
          <div className="card border-0 shadow-sm mx-auto" style={{ borderRadius: 20, maxWidth: 1100 }}>
            {this.TitleBar()}

            <div className="card-body px-4 px-md-5 py-4">
              <form onSubmit={this.saveOrUpdateAsset}>
                <div className="mb-4">
                  <div className="mb-2 text-uppercase small text-secondary">Asset Information</div>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label">Name</label>
                      <input className="form-control" name="name" placeholder="Asset Name" value={s.name} onChange={this.changeNameHandler} />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Type</label>
                      <input className="form-control" name="type" placeholder="Asset Type" value={s.type} onChange={this.changeTypeHandler} />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Serial Number</label>
                      <input className="form-control" name="serialNumber" placeholder="Serial Number" value={s.serialNumber} onChange={this.changeSerialNumberHandler} />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Department</label>
                      <input className="form-control" name="department" placeholder="Department" value={s.department} onChange={this.changeDepartmentHandler} />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Assigned To</label>
                      <input className="form-control" name="assignedTo" placeholder="Assigned To" value={s.assignedTo} onChange={this.changeAssignedToHandler} />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Technical Specs</label>
                      <input className="form-control" name="technicalSpecs" placeholder="Technical Specifications" value={s.technicalSpecs} onChange={this.changeTechnicalSpecsHandler} />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Value</label>
                      <input className="form-control" name="value" placeholder="Value" value={s.value} onChange={this.changeValueHandler} />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Purchase Date</label>
                      <input className="form-control" name="purchaseDate" placeholder="YYYY-MM-DD" value={s.purchaseDate} onChange={this.changePurchaseDateHandler} />
                    </div>
                  </div>
                </div>

                {/* Bottom actions */}
                <div className="d-flex justify-content-center gap-2">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => this.cancel()} style={{ display: 'block', paddingBottom: '30px', marginRight: '8px' }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ display: 'block', paddingBottom: '30px' }}>
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
