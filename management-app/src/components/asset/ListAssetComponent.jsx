// ListAssetComponent.jsx
import React, { Component } from 'react';
import AssetService from '../../services/AssetService';

class ListAssetComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assets: [],
      searchQuery: '',
      searchName: '',
      searchType: '',
      searchSerialNumber: '',
      searchDepartment: '',
      searchAssignedTo: '',
      searchTechnicalSpecs: '',
      searchValue: '',
      searchPurchaseDate: ''
    };

    this.addAsset = this.addAsset.bind(this);
    this.editAsset = this.editAsset.bind(this);
    this.deleteAsset = this.deleteAsset.bind(this);

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.searchAsset = this.searchAsset.bind(this);
  }

  handleSearchChange(e) { this.setState({ searchQuery: e.target.value }); }
  searchAsset() {
    AssetService.getAllAssets().then(res => this.setState({ assets: res.data }));
  }

  deleteAsset(id) {
    AssetService.deleteAsset(id).then(() => {
      this.setState({ assets: this.state.assets.filter(a => a.id !== id) });
    });
  }

    searchNameAsset() {
      AssetService.getAssetsByName(this.state.searchName).then(res => this.setState({ assets: res.data }));
    }
  viewAsset(id) { this.props.history.push(`/view-asset/${id}`); }
  editAsset(id) { this.props.history.push(`/add-asset/${id}`); }

  componentDidMount() {
    AssetService.getAllAssets().then(res => {
      if (res.data == null) {
        this.props.history.push('/add-asset/_add');
      }
      this.setState({ assets: res.data });
    });
  }

  addAsset() { this.props.history.push('/add-asset/_add'); }

  render() {
    return (
      <div className="dashboard-container">
        <h1 className="about-title">Assets</h1>
        <p className="about-text">
          Asset Details listed below.
        </p>
        <div className="page-wrap">
          <div className="page-card">

            {/* Header Row */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-3">
                <h5 className="m-0">All Assets</h5>
              </div>

              <div className="d-flex align-items-center gap-2">
                <button className="btn btn-primary btn-sm" onClick={this.addAsset} style={{  paddingBottom: '30px' }}>
                  + Add New Asset
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
                    <th>TYPE</th>
                    <th>SERIAL NUMBER</th>
                    <th>DEPARTMENT</th>
                    <th>ASSIGNED TO</th>
                    <th>TECHNICAL SPECS</th>
                    <th>VALUE</th>
                    <th>PURCHASE DATE</th>
                    <th className="text-end" style={{ textAlign: 'center' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.assets.map(asset => (
                    <tr key={asset.id}>
                      <td>{asset.id}</td>
                      <td>{asset.name}</td>
                      <td>{asset.type}</td>
                      <td>{asset.serialNumber}</td>
                      <td>{asset.department}</td>
                      <td>{asset.assignedTo}</td>
                      <td>{asset.technicalSpecs}</td>
                      <td>{asset.value}</td>
                      <td>{asset.purchaseDate}</td>
                      <td className="text-end">
                        <button className="btn btn-outline-secondary btn-sm ms-2" onClick={() => this.viewAsset(asset.id)} style={{  paddingBottom: '30px', marginRight: '10px' }}>
                          Details
                        </button>
                        <button className="btn btn-link btn-sm me-2" onClick={() => this.editAsset(asset.id)} style={{  paddingBottom: '30px', marginRight: '10px' }}>
                          Edit
                        </button>
                        <button className="btn btn-link text-danger btn-sm" onClick={() => this.deleteAsset(asset.id)} style={{  paddingBottom: '30px' }}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between align-items-center small text-muted mt-3">
              <div>Showing {this.state.assets?.length || 0} values</div>
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

export default ListAssetComponent;
