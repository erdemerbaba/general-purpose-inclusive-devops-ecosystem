import React, { Component } from 'react';
import ProductService from '../../services/ProductService';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      error: null
    };

    // keep your original explicit bindings
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeCategoryHandler = this.changeCategoryHandler.bind(this);
    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.changeMembersHandler = this.changeMembersHandler.bind(this);
    this.changeCustomerSegmentHandler = this.changeCustomerSegmentHandler.bind(this);
    this.changeRevenueSourceHandler = this.changeRevenueSourceHandler.bind(this);
    this.changeCostSourceHandler = this.changeCostSourceHandler.bind(this);
    this.changeCustomerPlatformsHandler = this.changeCustomerPlatformsHandler.bind(this);
    this.changeDeveloperPlatformsHandler = this.changeDeveloperPlatformsHandler.bind(this);
    this.changeTechStacksHandler = this.changeTechStacksHandler.bind(this);
    this.changeDeploymentsHandler = this.changeDeploymentsHandler.bind(this);
    this.changeSourcesHandler = this.changeSourcesHandler.bind(this);
    this.changeHistoricDatesHandler = this.changeHistoricDatesHandler.bind(this);
    this.changePerformanceIndicatorsHandler = this.changePerformanceIndicatorsHandler.bind(this);
    this.changeLegalComplianceHandler = this.changeLegalComplianceHandler.bind(this);
    this.changeFinancialProceduresHandler = this.changeFinancialProceduresHandler.bind(this);
    this.changeAdditionalNotesHandler = this.changeAdditionalNotesHandler.bind(this);
    this.saveOrUpdateProduct = this.saveOrUpdateProduct.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    if (this.state.id === '_add') return;

    this.setState({ loading: true });
    ProductService.getProductById(this.state.id)
      .then((res) => {
        const t = res.data || {};
        this.setState({
          name: t.name || '',
          category: t.category || '',
          description: t.description || '',
          members: t.members || '',
          customerSegment: t.customerSegment || '',
          revenueSource: t.revenueSource || '',
          costSource: t.costSource || '',
          customerPlatforms: t.customerPlatforms || '',
          developerPlatforms: t.developerPlatforms || '',
          techStacks: t.techStacks || '',
          deployments: t.deployments || '',
          sources: t.sources || '',
          historicDates: t.historicDates || '',
          performanceIndicators: t.performanceIndicators || '',
          legalCompliance: t.legalCompliance || '',
          financialProcedures: t.financialProcedures || '',
          additionalNotes: t.additionalNotes || '',
          loading: false
        });
      })
      .catch(() => this.setState({ error: 'Veri yüklenirken hata oluştu', loading: false }));
  }

  // ---- submit / nav ----
  saveOrUpdateProduct = (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: null });

    const {
      id, name, category, description, members, customerSegment, revenueSource, costSource,
      customerPlatforms, developerPlatforms, techStacks, deployments, sources, historicDates,
      performanceIndicators, legalCompliance, financialProcedures, additionalNotes
    } = this.state;

    const product = {
      name, category, description, members, customerSegment, revenueSource, costSource,
      customerPlatforms, developerPlatforms, techStacks, deployments, sources, historicDates,
      performanceIndicators, legalCompliance, financialProcedures, additionalNotes
    };

    if (id === '_add') {
      ProductService.createProduct(product)
        .then(() => this.props.history.push('/products'))
        .catch(() => this.setState({ error: 'Kayıt oluşturulurken hata oluştu', loading: false }));
    } else {
      ProductService.updateProduct(product, id)
        .then(() => this.props.history.push('/products'))
        .catch(() => this.setState({ error: 'Kayıt güncellenirken hata oluştu', loading: false }));
    }
  };

  cancel() { this.props.history.push('/products'); }

  // ---- field handlers (unchanged) ----
  changeNameHandler = (e) => this.setState({ name: e.target.value });
  changeCategoryHandler = (e) => this.setState({ category: e.target.value });
  changeDescriptionHandler = (e) => this.setState({ description: e.target.value });
  changeMembersHandler = (e) => this.setState({ members: e.target.value });
  changeCustomerSegmentHandler = (e) => this.setState({ customerSegment: e.target.value });
  changeRevenueSourceHandler = (e) => this.setState({ revenueSource: e.target.value });
  changeCostSourceHandler = (e) => this.setState({ costSource: e.target.value });
  changeCustomerPlatformsHandler = (e) => this.setState({ customerPlatforms: e.target.value });
  changeDeveloperPlatformsHandler = (e) => this.setState({ developerPlatforms: e.target.value });
  changeTechStacksHandler = (e) => this.setState({ techStacks: e.target.value });
  changeDeploymentsHandler = (e) => this.setState({ deployments: e.target.value });
  changeSourcesHandler = (e) => this.setState({ sources: e.target.value });
  changeHistoricDatesHandler = (e) => this.setState({ historicDates: e.target.value });
  changePerformanceIndicatorsHandler = (e) => this.setState({ performanceIndicators: e.target.value });
  changeLegalComplianceHandler = (e) => this.setState({ legalCompliance: e.target.value });
  changeFinancialProceduresHandler = (e) => this.setState({ financialProcedures: e.target.value });
  changeAdditionalNotesHandler = (e) => this.setState({ additionalNotes: e.target.value });

  // ---- UI helpers ----
  TitleBar() {
    const isAdd = this.state.id === '_add';
    return (
      <div className="d-flex align-items-center justify-content-between px-4 py-3"
           style={{ borderBottom: '1px solid #eef0f3' }}>
        <div className="d-flex align-items-center gap-2">
          <button type="button" className="btn btn-light border" onClick={() => this.props.history.goBack()} style={{ display: 'block', paddingBottom: '30px' }}>
            <i className="bi bi-arrow-left me-1" /> Back
          </button>
          <h5 className="m-0" style={{ display: 'block', paddingLeft: '350px' }} >{isAdd ? 'Add Product' : 'Update Product'}</h5>
        </div>
        <div className="d-flex gap-2">
        </div>
      </div>
    );
  }

  render() {
    const s = this.state;

    return (
      <div className="dashboard-container">
        <div className="container-fluid" style={{ paddingInlineStart: 72, paddingInlineEnd: 16, marginBottom: 40 }}>
          <div className="card border-0 shadow-sm mx-auto mt-4" style={{ borderRadius: 20, maxWidth: 1100 }}>
            {/* Top actions */}
            {this.TitleBar()}

            <div className="card-body px-4 px-md-5 py-4">
              {/* Error bar */}
              {s.error && (
                <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
                  <i className="bi bi-exclamation-triangle me-2" />
                  {s.error}
                  <button type="button" className="btn-close" onClick={() => this.setState({ error: null })} />
                </div>
              )}

              <form id="turnForm" onSubmit={this.saveOrUpdateProduct}>
                {/* SECTION: Basic */}
                <div className="mb-4">
                  <div className="mb-2 text-uppercase small text-secondary">Basic</div>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label">Name</label>
                      <input className="form-control" value={s.name} onChange={this.changeNameHandler} placeholder="e.g., Washington" />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Category</label>
                      <input className="form-control" value={s.category} onChange={this.changeCategoryHandler} placeholder="Category A" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Description</label>
                      <textarea rows="3" className="form-control" value={s.description} onChange={this.changeDescriptionHandler} placeholder="Short description..." />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Members</label>
                      <input className="form-control" value={s.members} onChange={this.changeMembersHandler} placeholder="Comma-separated members" />
                    </div>
                  </div>
                </div>

                {/* SECTION: Business */}
                <div className="mb-4">
                  <div className="mb-2 text-uppercase small text-secondary">Business</div>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label">Customer Segment</label>
                      <input className="form-control" value={s.customerSegment} onChange={this.changeCustomerSegmentHandler} />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Revenue Source</label>
                      <input className="form-control" value={s.revenueSource} onChange={this.changeRevenueSourceHandler} />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Cost Source</label>
                      <input className="form-control" value={s.costSource} onChange={this.changeCostSourceHandler} />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Performance Indicators</label>
                      <input className="form-control" value={s.performanceIndicators} onChange={this.changePerformanceIndicatorsHandler} placeholder="KPIs" />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Financial Procedures</label>
                      <input className="form-control" value={s.financialProcedures} onChange={this.changeFinancialProceduresHandler} />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Legal Compliance</label>
                      <input className="form-control" value={s.legalCompliance} onChange={this.changeLegalComplianceHandler} />
                    </div>
                  </div>
                </div>

                {/* SECTION: Platforms & Tech */}
                <div className="mb-4">
                  <div className="mb-2 text-uppercase small text-secondary">Platforms & Tech</div>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label">Customer Platforms</label>
                      <input className="form-control" value={s.customerPlatforms} onChange={this.changeCustomerPlatformsHandler} placeholder="Web, iOS, Android" />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Developer Platforms</label>
                      <input className="form-control" value={s.developerPlatforms} onChange={this.changeDeveloperPlatformsHandler} placeholder="SDKs, APIs..." />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Tech Stacks</label>
                      <input className="form-control" value={s.techStacks} onChange={this.changeTechStacksHandler} placeholder="React, Spring Boot, MongoDB..." />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Deployments</label>
                      <input className="form-control" value={s.deployments} onChange={this.changeDeploymentsHandler} placeholder="Cloud/On-prem details" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Sources</label>
                      <textarea rows="2" className="form-control" value={s.sources} onChange={this.changeSourcesHandler} placeholder="References, repos, docs..." />
                    </div>
                  </div>
                </div>

                {/* SECTION: Timeline & Notes */}
                <div className="mb-4">
                  <div className="mb-2 text-uppercase small text-secondary">Timeline & Notes</div>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label">Historic Dates</label>
                      <textarea rows="2" className="form-control" value={s.historicDates} onChange={this.changeHistoricDatesHandler} placeholder="Key milestones, dates..." />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Additional Notes</label>
                      <textarea rows="3" className="form-control" value={s.additionalNotes} onChange={this.changeAdditionalNotesHandler} placeholder="Anything else…" />
                    </div>
                  </div>
                </div>

                {/* Bottom actions */}
                <div className="d-flex justify-content-center gap-2">
                  <button type="button" className="btn btn-outline-secondary" onClick={this.cancel} style={{ display: 'block', paddingBottom: '30px', marginRight: '8px' }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={s.loading} style={{ display: 'block', paddingBottom: '30px' }}>
                    {s.loading ? (<><i className="bi bi-arrow-repeat me-1" /> Saving…</>) : (<><i className="bi bi-check2 me-1" /> Save</>)}
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
