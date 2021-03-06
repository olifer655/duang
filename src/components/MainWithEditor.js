def((Form, FormSubmit, PanelFailure, ErrorDisplay) => class extends Jinkela {
  load() {
    let { id, resolvedKey, params } = this.depot || depot;
    id = id || params.copy;
    if (!id) return Promise.resolve();
    return api([resolvedKey, id]);
  }
  init() {
    let depot = this.depot || window.depot;
    this.$promise = this.load().then(value => {
      let form = new Form({ depot }).to(this);
      form.value = value;
      return form.$promise;
    }, error => {
      new ErrorDisplay({ error }).to(this);
    });
  }
});
