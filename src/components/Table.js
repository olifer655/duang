def((TableRow, TableHead, TableCaption) => class extends Jinkela {
  get tagName() { return 'table'; }
  init() {
    let { scheme } = this;
    if (scheme.caption) new TableCaption({ scheme }).renderTo(this);
    new TableHead({ scheme }).renderTo(this);
    if (!scheme.key) return alert('require key');
  }
  render(list) {
    let { scheme } = this;
    list = list.map(data => {
      let fields = scheme.fields.map(item => {
        item = Object.create(item);
        item.value = data[item.key];
        return item;
      });
      return { fields, id: data.id };
    });
    TableRow.cast(list, { scheme }).renderTo(this);
  }
  get styleSheet() {
    return `
      :scope {
        color: #666;
        font-size: 14px;
        line-height: 32px;
        margin: 1em;
        width: calc(100% - 2em);
        border-collapse: collapse;
      }
    `;
  }
});
