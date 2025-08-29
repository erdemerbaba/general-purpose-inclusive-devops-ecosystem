import React, { Component } from 'react';
import ProductService from '../../services/ProductService';
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

class CreateProductComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: '',
      category: '',
      description: '',
      members: '',
      customerSegment: '',
      revenueSource: '',
      costSource: '',
      customerPlatforms: '',
      developerPlatforms: '',
      techStacks: '',
      deployments: '',
      sources: '',
      historicDates: '',
      performanceIndicators: '',
      legalCompliance: '',
      financialProcedures: '',
      additionalNotes: '',
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    if (this.state.id === '_add') return;

    this.setState({ loading: true });
    ProductService.getProductById(this.state.id)
      .then((res) => {
        const product = res.data || {};
        this.setState({ ...product, loading: false });
      })
      .catch(() => this.setState({ error: 'Error loading data', loading: false }));
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  saveOrUpdateProduct = (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: null });

    const { id, ...product } = this.state;

    if (id === '_add') {
      ProductService.createProduct(product)
        .then(() => this.props.history.push('/products'))
        .catch(() => this.setState({ error: 'Error creating record', loading: false }));
    } else {
      ProductService.updateProduct(product, id)
        .then(() => this.props.history.push('/products'))
        .catch(() => this.setState({ error: 'Error updating record', loading: false }));
    }
  };

  cancel = () => this.props.history.push('/products');

  TitleBar = () => (
    <div className="d-flex align-items-center justify-content-between px-4 py-3" style={styles.titleBar}>
      <div className="d-flex align-items-center gap-2">
        <button
          type="button"
          className="btn btn-light border"
          onClick={() => this.props.history.goBack()}
          style={styles.backButton}
        >
          <i className="bi bi-arrow-left me-1" /> Back
        </button>
        <h5 className="m-0" style={{ paddingLeft: '350px' }}>
          {this.state.id === '_add' ? 'Add Product' : 'Update Product'}
        </h5>
      </div>
    </div>
  );

  render() {
    const { error, loading, ...fields } = this.state;

    return (
      <div className="dashboard-container">
        <div className="container-fluid" style={{ paddingInlineStart: 72, paddingInlineEnd: 16, marginBottom: 40 }}>
          <div className="card border-0 shadow-sm mx-auto mt-4" style={styles.card}>
            {this.TitleBar()}

            <div className="card-body px-4 px-md-5 py-4">
              {error && (
                <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
                  <i className="bi bi-exclamation-triangle me-2" />
                  {error}
                  <button type="button" className="btn-close" onClick={() => this.setState({ error: null })} />
                </div>
              )}

              <form id="turnForm" onSubmit={this.saveOrUpdateProduct}>
                {[
                  {
                    section: 'Basic',
                    fields: [
                      { label: 'Name', name: 'name', placeholder: 'e.g., Washington' },
                      { label: 'Category', name: 'category', placeholder: 'Category A' },
                      { label: 'Description', name: 'description', type: 'textarea', placeholder: 'Short description...' },
                      { label: 'Members', name: 'members', placeholder: 'Comma-separated members' },
                    ],
                  },
                  {
                    section: 'Business',
                    fields: [
                      { label: 'Customer Segment', name: 'customerSegment' },
                      { label: 'Revenue Source', name: 'revenueSource' },
                      { label: 'Cost Source', name: 'costSource' },
                      { label: 'Performance Indicators', name: 'performanceIndicators', placeholder: 'KPIs' },
                      { label: 'Financial Procedures', name: 'financialProcedures' },
                      { label: 'Legal Compliance', name: 'legalCompliance' },
                    ],
                  },
                  {
                    section: 'Platforms & Tech',
                    fields: [
                      { label: 'Customer Platforms', name: 'customerPlatforms', placeholder: 'Web, iOS, Android' },
                      { label: 'Developer Platforms', name: 'developerPlatforms', placeholder: 'SDKs, APIs...' },
                      { label: 'Tech Stacks', name: 'techStacks', placeholder: 'React, Spring Boot, MongoDB...' },
                      { label: 'Deployments', name: 'deployments', placeholder: 'Cloud/On-prem details' },
                      { label: 'Sources', name: 'sources', type: 'textarea', placeholder: 'References, repos, docs...' },
                    ],
                  },
                  {
                    section: 'Timeline & Notes',
                    fields: [
                      { label: 'Historic Dates', name: 'historicDates', type: 'textarea', placeholder: 'Key milestones, dates...' },
                      { label: 'Additional Notes', name: 'additionalNotes', type: 'textarea', placeholder: 'Anything else…' },
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
                              rows="3"
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
                    disabled={loading}
                    style={styles.saveButton}
                  >
                    {loading ? (
                      <><i className="bi bi-arrow-repeat me-1" /> Saving…</>
                    ) : (
                      <><i className="bi bi-check2 me-1" /> Save</>
                    )}
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

export default CreateProductComponent;
