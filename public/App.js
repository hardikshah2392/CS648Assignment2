var contentNode = document.getElementById('contents');

const prods = [];

class ProductRow extends React.Component {
  render() {
    const prod = this.props.prod;
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        null,
        prod.name
      ),
      React.createElement(
        "td",
        null,
        "$",
        prod.price
      ),
      React.createElement(
        "td",
        null,
        prod.category
      ),
      React.createElement(
        "td",
        null,
        React.createElement(
          "a",
          { href: prod.url, target: "__blank" },
          "View"
        )
      )
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const prodrows = this.props.prods.map(prod => React.createElement(ProductRow, { key: prod.id, prod: prod }));
    return React.createElement(
      "table",
      { style: { borderCollapse: "collapse" } },
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            null,
            "Product Name"
          ),
          React.createElement(
            "th",
            null,
            "Price"
          ),
          React.createElement(
            "th",
            null,
            "Category"
          ),
          React.createElement(
            "th",
            null,
            "Image"
          )
        )
      ),
      React.createElement(
        "tbody",
        null,
        prodrows
      )
    );
  }
}

class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.prodAdd;
    this.props.createProd({
      name: form.name.value,
      price: form.price.value.replace("$", ""),
      category: form.category.value,
      url: form.url.value
    });
    form.name.value = '', form.price.value = "$", form.category.value = "", form.url.value = "";
  }
  render() {
    return React.createElement(
      "div",
      null,
      React.createElement("br", null),
      React.createElement(
        "h2",
        null,
        "Add a Product"
      ),
      React.createElement(
        "form",
        { name: "prodAdd", onSubmit: this.handleSubmit },
        React.createElement(
          "lable",
          null,
          "Category"
        ),
        React.createElement(
          "label",
          null,
          "Name"
        ),
        React.createElement(
          "select",
          { name: "category" },
          React.createElement(
            "option",
            { value: "Shirts" },
            "Shirts"
          ),
          React.createElement(
            "option",
            { value: "Jeans" },
            "Jeans"
          ),
          React.createElement(
            "option",
            { value: "Jackets" },
            "Jackets"
          ),
          React.createElement(
            "option",
            { value: "Sweaters" },
            "Sweaters"
          ),
          React.createElement(
            "option",
            { value: "Accessories" },
            "Accessories"
          )
        ),
        React.createElement("input", { type: "text", name: "name" }),
        React.createElement(
          "lable",
          null,
          "Price"
        ),
        React.createElement(
          "lable",
          null,
          "Image"
        ),
        React.createElement("input", { type: "text", name: "price" }),
        React.createElement("input", { type: "text", name: "url" }),
        React.createElement(
          "button",
          null,
          "Add"
        )
      )
    );
  }
}

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { prods: prods };
    // this.createTestProd = this.createProd.bind(this);
    this.createProd = this.createProd.bind(this);
    // setTimeout(this.createTestProd.bind(this),2000);
  }

  createProd(newProd) {
    const newProds = this.state.prods.slice();
    newProd.id = this.state.prods.length + 1;
    newProds.push(newProd);
    console.log({ newProds });
    this.setState({ prods: newProds });
  }

  // createTestProd(){
  //   this.createProd({
  //     name:"Deepesh", price:20,category:"Accesories",url:"wikipedia.com"
  //   });
  // }
  render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "My Company Inventory"
      ),
      React.createElement("br", null),
      React.createElement(
        "h2",
        null,
        "Showing all available products",
        React.createElement("hr", null)
      ),
      React.createElement(ProductTable, { prods: this.state.prods }),
      React.createElement(ProductAdd, { createProd: this.createProd })
    );
  }
}

ReactDOM.render(React.createElement(ProductList, null), contentNode);