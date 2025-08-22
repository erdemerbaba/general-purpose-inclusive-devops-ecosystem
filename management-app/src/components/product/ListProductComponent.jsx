import React, { Component } from 'react';
import ProductService from '../../services/ProductService';
import 'bootstrap/dist/css/bootstrap.min.css';

class ListProductComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], searchQuery: '', loading: false, error: null };

    this.addProduct = this.addProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.searchProduct = this.searchProduct.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  handleSearchChange(e) { this.setState({ searchQuery: e.target.value }); }

  searchProduct() {
    this.setState({ loading: true });
    ProductService.getProductsByName(this.state.searchQuery)
      .then(res => this.setState({ products: res.data, loading: false }))
      .catch(err => this.setState({ error: err.message, loading: false }));
  }

  clearSearch() {
    this.setState({ loading: true, searchQuery: '' });
    ProductService.getAllProducts()
      .then(res => this.setState({ products: res.data, loading: false }))
      .catch(err => this.setState({ error: err.message, loading: false }));
  }

  deleteProduct(id) {
    if (window.confirm('Are you sure you want to delete this record?')) {
      ProductService.deleteProduct(id)
        .then(() => this.setState({ products: this.state.products.filter(t => t.id !== id) }))
        .catch(err => this.setState({ error: err.message }));
    }
  }

  viewProduct(id) { this.props.history.push(`/view-product/${id}`); }
  editProduct(id) { this.props.history.push(`/add-product/${id}`); }

  componentDidMount() {
    this.setState({ loading: true });
    ProductService.getAllProducts()
      .then(res => this.setState({ products: res.data, loading: false }))
      .catch(err => this.setState({ error: err.message, loading: false }));
  }

  addProduct() { this.props.history.push('/add-product/_add'); }

  renderAvatar(name) {
    const initials = ((name || '').split(' ').map(p => p[0]).join('').slice(0,2) || 'P').toUpperCase();
    return (
      <div className="d-inline-flex align-items-center justify-content-center rounded-circle me-2"
           style={{ width: 36, height: 36, background: '#eef2ff', color: '#4338ca', fontWeight: 700 }}>
        {initials}
      </div>
    );
  }

  render() {
    const { products, loading, error, searchQuery } = this.state;

    return (
      <div className="container-fluid" style={{ paddingInlineStart: 72, paddingInlineEnd: 16 }}>
        {/* Toolbar */}
        <div className="d-flex flex-wrap align-items-center justify-content-between my-4">
          <div className="d-flex align-items-center gap-3">
            <h4 className="m-0">Groups</h4>
            <span className="text-secondary">{products.length}</span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <div className="d-flex align-items-center px-3"
                 style={{ height: 40, border: '1px solid #e5e7eb', borderRadius: 12 }}>
              <i className="bi bi-search me-2" style={{ color: '#64748b' }} />
              <input
                type="text"
                className="border-0"
                style={{ outline: 'none', width: 260 }}
                placeholder="Search by name"
                value={searchQuery}
                onChange={this.handleSearchChange}
              />
            </div>
            <button className="btn btn-light" onClick={this.searchProduct}>Search</button>
            <button className="btn btn-outline-secondary" onClick={this.clearSearch}>Clear</button>
            <button className="btn btn-primary d-flex align-items-center" onClick={this.addProduct}>
              <i className="bi bi-plus-lg me-2" /> Add New Group
            </button>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row g-3 g-md-4">
          {products.map((product) => (
            <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={product.id}>
              <div className="card shadow-sm border-0 h-100" style={{ borderRadius: 18 }}>
                <div className="card-body d-flex flex-column">
                  {/* card header */}
                  <div className="d-flex align-items-start justify-content-between">
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <h6 className="mb-1">{product.name || 'Untitled'}</h6>
                        <span className="badge rounded-pill text-dark"
                              style={{ background: '#fff7e6', border: '1px solid #ffe8b3' }}>
                          Active
                        </span>
                      </div>
                      <small className="text-secondary">{product.category || '—'}</small>
                    </div>

                    {/* kebab still available */}
                    <div className="dropdown">
                      <button className="btn btn-sm btn-link text-secondary" data-bs-toggle="dropdown">
                        <i className="bi bi-three-dots-vertical" />
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li><button className="dropdown-item" onClick={() => this.viewProduct(product.id)}><i className="bi bi-eye me-2" />View</button></li>
                        <li><button className="dropdown-item" onClick={() => this.editProduct(product.id)}><i className="bi bi-pencil-square me-2" />Edit</button></li>
                        <li><button className="dropdown-item text-danger" onClick={() => this.deleteProduct(product.id)}><i className="bi bi-trash me-2" />Delete</button></li>
                      </ul>
                    </div>
                  </div>

                  {/* owner/desc */}
                  <div className="d-flex align-items-center mt-3">
                    {this.renderAvatar(product.name)}
                    <div>
                      <div className="fw-medium" style={{ lineHeight: 1 }}>{product.name}</div>
                      <small className="text-secondary">{product.description || 'No description'}</small>
                    </div>
                  </div>

                  {/* meta */}
                  <div className="row mt-3">
                    <div className="col-6">
                      <small className="text-secondary d-block">Region</small>
                      <div className="fw-semibold">#{product.id}</div>
                    </div>
                    <div className="col-6">
                      <small className="text-secondary d-block">Sub Region</small>
                      <div className="fw-semibold">{product.category || '—'}</div>
                    </div>
                  </div>

                  {/* spacer */}
                  <div className="flex-grow-1" />

                  {/* members (visual) */}
                  <div className="d-flex align-items-center mt-3">
                    <div className="d-flex" style={{ marginRight: 8 }}>
                      {[0,1,2].map((i) => (
                        <div key={i}
                             className="rounded-circle border border-white"
                             style={{ width: 26, height: 26, background: '#e2e8f0', marginLeft: i ? -8 : 0 }} />
                      ))}
                    </div>
                    <small className="text-secondary">+4</small>
                  </div>

                  {/* CRUD ACTION BAR (always visible) */}
                  <div className="mt-3 d-flex justify-content-end gap-2">
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => this.viewProduct(product.id)}>
                      <i className="bi bi-eye me-1" /> View
                    </button>
                    <button className="btn btn-sm btn-outline-primary" onClick={() => this.editProduct(product.id)}>
                      <i className="bi bi-pencil-square me-1" /> Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => this.deleteProduct(product.id)}>
                      <i className="bi bi-trash me-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {!loading && products.length === 0 && (
            <div className="col-12">
              <div className="text-center text-secondary py-5">No items found.</div>
            </div>
          )}
        </div>

        {loading && (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status" />
          </div>
        )}
      </div>
    );
  }
}

export default ListProductComponent;
