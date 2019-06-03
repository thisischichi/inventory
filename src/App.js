import React, { Component } from 'react';

class App extends Component {

  state = {
    products: []
  }

  componentDidMount() {
    this.getProducts();
  }
  
  getProducts = _ => {
    fetch('http://localhost:3010/products')
    .then(response => response.json())
    .then(response => this.setState({ products: response.data })) 
    .catch(err => console.error(err))
  }

  renderProduct = ({ id, name }) => <div key={id}>{name}</div>

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
      </div>
    );
  }
}

export default App;
