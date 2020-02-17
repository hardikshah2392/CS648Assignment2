var contentNode = document.getElementById('contents');

// const reset_values = {name: '', price: '$', category: 'Shirts', image: ''}


// class ProdRow extends React.Component {
//   constructor(props) {
//     super(props)
//   }
//   render() {
//     return (
//       <tr>
//         <td> {this.props.prod.name} </td>
//         <td> ${this.props.prod.price} </td>
//         <td> {this.props.prod.category} </td>
//         <td> <a href = {this.props.prod.image} target="__blank"> View </a> </td>
//       </tr>
//     )
//   }
// }

// class ProdTable extends React.Component {
//   constructor(props) {
//     super(props)
//   }
//   render() {
//     const prodlist = Object.keys(this.props.prods).map((id) => {
//       const prodInfo = this.props.prods[id] || {};
//       return <ProdRow key={id} prod={prodInfo}/>
//     })
//     return (
//       <table>
//         <thead>
//           <tr>
//             <th> Product Name </th>
//             <th> Price </th>
//             <th> Category </th>
//             <th> Image </th>
//           </tr>
//         </thead>
//         <tbody>
//           {prodlist}
//         </tbody>
//       </table>
//     )
//   }
// }

// class ProdForm extends React.Component {
//   constructor(props) {
//     super(props)
//       this.handleChange = this.handleChange.bind(this)
//       this.handleSave = this.handleSave.bind(this)
//       this.state = {
//           prod: this.props.formInput || Object.assign({}, reset_values),
//           errors: {}
//     }
//   }

//   handleChange(e) {
//     const target = e.target
//     const value = target.value
//     const name = target.name
//     this.setState((prevState) => {
//         prevState.prod[name] = value
//         return { prod: prevState.prod }
//     })
//   }

//   handleSave(e) {
//     e.preventDefault();
//     this.props.onSave(this.state.prod);

//     this.setState({
//         prod: Object.assign({}, reset_values), 
//         errors: {}
//     })
//   }

//   render () {
//     return (
//         <form>
//             <label>Category</label>
//             <label>Price Per Unit </label>
//             <select name="category" onChange={this.handleChange}>
//               <option value="Shirts">Shirts</option>
//               <option value="Jeans">Jeans</option>
//               <option value="Jackets">Jackets</option>
//               <option value="Sweaters">Sweaters</option>
//               <option value="Accessories">Accessories</option>
//             </select>
//             <input type="text" name="price" onChange={this.handleChange} value={this.state.prod.price} />
//             <label>Product Name </label>
//             <label>Image URL </label>
//             <input type="text" name="name" onChange={this.handleChange} value={this.state.prod.name} />
//             <input type="text" name="image" onChange={this.handleChange} value={this.state.prod.image} />
//             <div id='btn'><input type="submit" value="Add Product" onClick={this.handleSave}></input></div>
//         </form>
//     )
//   }
// }
// class ProdList extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//         prods: {
//       },
//       formData: null
//     }
//     this.handleSave = this.handleSave.bind(this)
//   }
//   handleSave(prod) {
//     prod['price'] = prod['price'].substring(1)
//     this.setState((prevState) => {
//       let prods = prevState.prods
//       prods[Math.floor((Math.random() * 1000000) + 1)] = prod
//       return { prods }
//     })
//   }
//   render() {
//     return (
//       <div>
//         <h1>My Company Inventory</h1>
//         <h2>Showing all available products. <hr/></h2>
//       <ProdTable prods={this.state.prods}/>
//       <h3> Add a new product to inventory </h3>
//       <hr/>
//       <ProdForm formInput={this.state.formData} onSave={this.handleSave}/>
//       </div>
//     )
//   }
// }

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
          { href: `//${prod.url}`, target: "__blank" },
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
    console.log(form.price.value);
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