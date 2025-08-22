import React, { Component } from 'react';
import ProductService from '../../services/ProductService';
import 'bootstrap/dist/css/bootstrap.min.css';

class ViewProductComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      product: {},
      loading: true,
      error: null
    };

    this.goBack = this.goBack.bind(this);
    this.editProduct = this.editProduct.bind(this);
  }

  componentDidMount() {
    ProductService.getProductById(this.state.id)
      .then(res => this.setState({ product: res.data || {}, loading: false }))
      .catch(() => this.setState({ error: 'Error loading data', loading: false }));
  }

  goBack() {
    this.props.history.push('/products');
  }

  editProduct() {
    this.props.history.push(`/add-product/${this.state.id}`);
  }

  // --- UI helpers ---
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
    const { product, loading, error } = this.state;

    if (loading) {
      return (
        <div className="container-fluid" style={{ paddingInlineStart: 72, paddingInlineEnd: 16 }}>
          <div className="card border-0 shadow-sm mx-auto mt-4" style={{ borderRadius: 20, maxWidth: 1080 }}>
            <div className="card-body text-center py-5">
              <div className="spinner-border text-primary" role="status" />
              <p className="mt-3 text-muted">Loading...</p>
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="container-fluid" style={{ paddingInlineStart: 72, paddingInlineEnd: 16 }}>
          <div className="card border-0 shadow-sm mx-auto mt-4" style={{ borderRadius: 20, maxWidth: 1080 }}>
            <div className="card-body text-center py-5">
              <i className="bi bi-exclamation-triangle text-danger fs-1 d-block mb-2" />
              <h5 className="text-danger">Error</h5>
              <p className="text-muted">{error}</p>
              <button className="btn btn-primary" onClick={this.goBack}>
                <i className="bi bi-arrow-left me-1" />
                Go Back
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container-fluid" style={{ paddingInlineStart: 72, paddingInlineEnd: 16 }}>
        <div className="card border-0 shadow-sm mx-auto mt-4" style={{ borderRadius: 20, maxWidth: 1100 }}>
          {/* Header / actions */}
          <div className="d-flex flex-wrap align-items-center justify-content-between px-4 py-3"
               style={{ borderBottom: '1px solid #eef0f3' }}>
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-light border" onClick={this.goBack}>
                <i className="bi bi-arrow-left me-1" /> Back
              </button>
              <h5 className="m-0">Product Details</h5>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary" onClick={this.editProduct}>
                <i className="bi bi-pencil-square me-1" />
                Edit
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="card-body px-4 px-md-5 py-4">
            {/* “Product Information” section title */}
            <div className="mb-3 text-uppercase small text-secondary">
              Product Information
            </div>

            {/* Two-column spec grid */}
            <div className="row">
              {this.field('Name', product.name)}
              {this.field('Category', product.category)}
              {this.field('Description', product.description)}
              {this.field('Members', product.members)}
              {this.field('Customer Segment', product.customerSegment)}
              {this.field('Revenue Source', product.revenueSource)}
              {this.field('Cost Source', product.costSource)}
              {this.field('Customer Platforms', product.customerPlatforms)}
              {this.field('Developer Platforms', product.developerPlatforms)}
              {this.field('Tech Stacks', product.techStacks)}
              {this.field('Deployments', product.deployments)}
              {this.field('Sources', product.sources)}
              {this.field('Historic Dates', product.historicDates)}
              {this.field('Performance Indicators', product.performanceIndicators)}
              {this.field('Legal Compliance', product.legalCompliance)}
              {this.field('Financial Procedures', product.financialProcedures)}
              {this.field('Additional Notes', product.additionalNotes)}
            </div>

            {/* Footer actions */}
            <div className="d-flex justify-content-end gap-2 pt-2">
              <button className="btn btn-outline-secondary" onClick={this.goBack}>
                Close
              </button>
              <button className="btn btn-primary" onClick={this.editProduct}>
                <i className="bi bi-pencil-square me-1" />
                Edit Product
              </button>
            </div>
          </div>
        </div>

        <div className="my-4" />
      </div>
    );
  }
}

export default ViewProductComponent;
