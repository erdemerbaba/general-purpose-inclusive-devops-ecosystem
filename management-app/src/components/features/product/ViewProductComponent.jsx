import React, { Component } from 'react';
import ProductService from '../../../services/ProductService';
import 'bootstrap/dist/css/bootstrap.min.css';

const styles = {
  card: {
    borderRadius: 20,
    maxWidth: 1100,
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

class ViewProductComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      product: {},
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    ProductService.getProductById(this.state.id)
      .then((res) => this.setState({ product: res.data || {}, loading: false }))
      .catch(() => this.setState({ error: 'Error loading data', loading: false }));
  }

  goBack = () => this.props.history.push('/products');

  editProduct = () => this.props.history.push(`/add-product/${this.state.id}`);

  field = (label, value) => (
    <div className="col-12 col-md-6">
      <div className="mb-3 pb-2" style={{ borderBottom: '1px dashed #edf1f5' }}>
        <div className="text-uppercase small text-secondary mb-1">{label}</div>
        <div className="fw-medium">{value ?? '—'}</div>
      </div>
    </div>
  );

  render() {
    const { product, loading, error } = this.state;

    if (loading) {
      return (
        <div className="container-fluid" style={{ paddingInlineStart: 72, paddingInlineEnd: 16 }}>
          <div className="card border-0 shadow-sm mx-auto mt-4" style={styles.card}>
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
          <div className="card border-0 shadow-sm mx-auto mt-4" style={styles.card}>
            <div className="card-body text-center py-5">
              <i className="bi bi-exclamation-triangle text-danger fs-1 d-block mb-2" />
              <h5 className="text-danger">Error</h5>
              <p className="text-muted">{error}</p>
              <button className="btn btn-primary" onClick={this.goBack}>
                <i className="bi bi-arrow-left me-1" /> Go Back
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="dashboard-container">
        <div className="container-fluid" style={{ paddingInlineStart: 72, paddingInlineEnd: 16 }}>
          <div className="card border-0 shadow-sm mx-auto mt-4" style={styles.card}>
            <div className="d-flex flex-wrap align-items-center justify-content-between px-4 py-3" style={styles.titleBar}>
              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-light border"
                  onClick={this.goBack}
                  style={styles.backButton}
                >
                  <i className="bi bi-arrow-left me-1" /> Back
                </button>
                <h5 className="m-0 w-100 text-center">Product Details</h5>
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-primary"
                  onClick={this.editProduct}
                  style={styles.editButton}
                >
                  <i className="bi bi-pencil-square me-1" /> Edit
                </button>
              </div>
            </div>

            <div className="card-body px-4 px-md-5 py-4">
              <div className="mb-3 text-uppercase small text-secondary">Product Information</div>
              <div className="row">
                {[
                  { label: 'Name', value: product.name },
                  { label: 'Category', value: product.category },
                  { label: 'Description', value: product.description },
                  { label: 'Members', value: product.members },
                  { label: 'Customer Segment', value: product.customerSegment },
                  { label: 'Revenue Source', value: product.revenueSource },
                  { label: 'Cost Source', value: product.costSource },
                  { label: 'Customer Platforms', value: product.customerPlatforms },
                  { label: 'Developer Platforms', value: product.developerPlatforms },
                  { label: 'Tech Stacks', value: product.techStacks },
                  { label: 'Deployments', value: product.deployments },
                  { label: 'Sources', value: product.sources },
                  { label: 'Historic Dates', value: product.historicDates },
                  { label: 'Performance Indicators', value: product.performanceIndicators },
                  { label: 'Legal Compliance', value: product.legalCompliance },
                  { label: 'Financial Procedures', value: product.financialProcedures },
                  { label: 'Additional Notes', value: product.additionalNotes },
                ].map((field, index) => this.field(field.label, field.value))}
              </div>

              <div className="d-flex justify-content-center gap-2 pt-2">
                <button
                  className="btn btn-outline-secondary"
                  onClick={this.goBack}
                  style={styles.closeButton}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={this.editProduct}
                  style={styles.editButton}
                >
                  <i className="bi bi-pencil-square me-1" /> Edit Product
                </button>
              </div>
            </div>
          </div>

          <div className="my-4" />
        </div>
      </div>
    );
  }
}

export default ViewProductComponent;
