var contentNode = document.getElementById('contents');

const reset_values = {name: '', price: '$', category: 'Shirts', image: ''}



class ProdRow extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <tr>
        <td> {this.props.prod.name} </td>
        <td> ${this.props.prod.price} </td>
        <td> {this.props.prod.category} </td>
        <td> <a href = {this.props.prod.image} target="__blank"> View </a> </td>
      </tr>
    )
  }
}

class ProdTable extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const prodlist = Object.keys(this.props.prods).map((id) => {
      const prodInfo = this.props.prods[id] || {};
      return <ProdRow key={id} prod={prodInfo}/>
    })
    return (
      <table>
        <thead>
          <tr>
            <th> Product Name </th>
            <th> Price </th>
            <th> Category </th>
            <th> Image </th>
          </tr>
        </thead>
        <tbody>
          {prodlist}
        </tbody>
      </table>
    )
  }
}

class ProdForm extends React.Component {
  constructor(props) {
    super(props)
      this.handleChange = this.handleChange.bind(this)
      this.handleSave = this.handleSave.bind(this)
      this.state = {
          prod: this.props.formInput || Object.assign({}, reset_values),
          errors: {}
    }
  }

  handleChange(e) {
    const target = e.target
    const value = target.value
    const name = target.name
    this.setState((prevState) => {
        prevState.prod[name] = value
        return { prod: prevState.prod }
    })
  }

  handleSave(e) {
    e.preventDefault();
    this.props.onSave(this.state.prod);
    
    this.setState({
        prod: Object.assign({}, reset_values), 
        errors: {}
    })
  }

  render () {
    return (
        <form>
            <label>Category</label>
            <label>Price Per Unit </label>
            <select name="category" onChange={this.handleChange}>
              <option value="Shirts">Shirts</option>
              <option value="Jeans">Jeans</option>
              <option value="Jackets">Jackets</option>
              <option value="Sweaters">Sweaters</option>
              <option value="Accessories">Accessories</option>
            </select>
            <input type="text" name="price" onChange={this.handleChange} value={this.state.prod.price} />
            <label>Product Name </label>
            <label>Image URL </label>
            <input type="text" name="name" onChange={this.handleChange} value={this.state.prod.name} />
            <input type="text" name="image" onChange={this.handleChange} value={this.state.prod.image} />
            <div id='btn'><input type="submit" value="Add Product" onClick={this.handleSave}></input></div>
        </form>
    )
  }
}
class ProdList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        prods: {
      },
      formData: null
    }
    this.handleSave = this.handleSave.bind(this)
  }
  handleSave(prod) {
    prod['price'] = prod['price'].substring(1)
    this.setState((prevState) => {
      let prods = prevState.prods
      prods[Math.floor((Math.random() * 1000000) + 1)] = prod
      return { prods }
    })
  }
  render() {
    return (
      <div>
        <h1>My Company Inventory</h1>
        <h2>Showing all available products. <hr/></h2>
      <ProdTable prods={this.state.prods}/>
      <h3> Add a new product to inventory </h3>
      <hr/>
      <ProdForm formInput={this.state.formData} onSave={this.handleSave}/>
      </div>
    )
  }
}


ReactDOM.render(<ProdList />, contentNode);