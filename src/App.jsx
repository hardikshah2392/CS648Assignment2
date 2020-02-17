var contentNode = document.getElementById('contents');

const prods = []



class ProductRow extends React.Component{
  render() {
    const prod = this.props.prod;
    return(
      <tr>
        <td>{prod.name}</td>
        <td>${prod.price}</td>
        <td>{prod.category}</td>
        <td><a href = {prod.url} target = "__blank">View</a></td>        
      </tr>
    )
  }
}

class ProductTable extends React.Component {
  render () {
    const prodrows = this.props.prods.map(prod => <ProductRow key ={prod.id} prod={prod}/>);
    return (
      <table style={{borderCollapse: "collapse"}}>
        <thead>
          <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {prodrows}
        </tbody>
      </table>
    )
  }
}


class ProductAdd extends React.Component {
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.prodAdd;
    this.props.createProd({
      name: form.name.value,
      price:form.price.value.replace("$",""),
      category:form.category.value,
      url:form.url.value
    });
    form.name.value = '',form.price.value = "$", form.category.value = "", form.url.value= ""
  }
  render() {
    return (
      <div>
        <br/>
        <h2>Add a Product</h2>
        <form name="prodAdd" onSubmit={this.handleSubmit}>
        <lable>Category</lable>
        <label>Name</label>
          <select name="category">
               <option value="Shirts">Shirts</option>
               <option value="Jeans">Jeans</option>
               <option value="Jackets">Jackets</option>
               <option value="Sweaters">Sweaters</option>
               <option value="Accessories">Accessories</option>
          </select>
          <input type="text" name="name"/>
          <lable>Price</lable>
          <lable>Image</lable>
          <input type="text" name="price"/>
          <input type="text" name="url"/>
          <button>Add</button>
        </form>
      </div>
    )
  }
}


class ProductList extends React.Component {
  constructor (){
    super();
    this.state = {prods:prods};
    // this.createTestProd = this.createProd.bind(this);
    this.createProd = this.createProd.bind(this);
    // setTimeout(this.createTestProd.bind(this),2000);
  }

  createProd(newProd) {
    const newProds = this.state.prods.slice();
    newProd.id = this.state.prods.length + 1;
    newProds.push(newProd);
    console.log({newProds})
    this.setState({prods:newProds})
  }

  // createTestProd(){
  //   this.createProd({
  //     name:"Deepesh", price:20,category:"Accesories",url:"wikipedia.com"
  //   });
  // }
  render(){
  return (
    <div>
      <h1>My Company Inventory</h1><br/>
      <h2>Showing all available products<hr/></h2>
      <ProductTable prods = {this.state.prods}/>
      <ProductAdd createProd = {this.createProd}/>
    </div>
  )
  }
}


ReactDOM.render(<ProductList />, contentNode);