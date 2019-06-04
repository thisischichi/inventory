import React, { Component } from 'react';

class App extends Component {

  state = {
    products: [],
    count: ''
  }

  componentDidMount() {
    this.getProducts();
  }

  handleCountChange(e){
    this.setState({
      count: e.target.value
    });
  }

  handleProductChange(e){
    this.setState({
      product_name: e.target.value
    });
  }

  getProducts = _ => {
    fetch('http://localhost:3010/products')
    .then(response => response.json())
    .then(response => this.setState({ products: response.data }))
    .catch(err => console.error(err))
  }

  renderUpdatedCount = ({ id, name, manual_count }) =>
    <div key={id}>
      {name} {'\u00A0'} {'\u00A0'}
      <input type="text" placeholder={manual_count} value={this.state.count}
        onChange={this.handleCountChange.bind(this)} />
      <span>{'\u00A0'} {this.state.count}</span>
    </div>

  renderTable = ({ name, current_count, manual_count }) =>
    <tr>
      <td>{name}</td>
      <td>{current_count}</td>
      <td>{manual_count}</td>
    </tr>

  render() {
    const { products } = this.state;
    return (
      <div className="App">
        <h1>Simple Inventory</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Current Count</th>
              <th>Manual Count</th>
            </tr>
          </thead>
          <tbody>
            {products.map(this.renderTable)}
          </tbody>
        </table>
        <h4>Update Manual Count</h4>
        {products.map(this.renderUpdatedCount)}
      </div>
    );
  }
}

export default App;
