import { Component } from 'react';
import axios from 'axios';
import DataCard from './DataCard';
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      usersCollection: [],
      searchText: '',
     };
  }

  componentDidMount() {
    const options = {
      method: 'GET',
      url: 'https://us-states.p.rapidapi.com/basic',
      headers: {
        'X-RapidAPI-Key': 'fabedb7bc4msh38f07c828303cb6p1e251ejsnb36e6d3fd536',
        'X-RapidAPI-Host': 'us-states.p.rapidapi.com'
      }
    };
    
    axios
      .request(options)
      .then((response) => {
        
        this.setState({ usersCollection: response.data });
        console.log(response.data);
        
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  handleSearch = (event) => {
    this.setState({ searchText: event.target.value });
  }


  dataCard() {
    return this.state.usersCollection.map((data, i) => {
      return <DataCard obj={data} key={i} />;
    });
  }

  render() {
    const filteredData = this.state.usersCollection.filter(data =>
      data.name.toLowerCase().includes(this.state.searchText.toLowerCase())
    );

    return (
      <>
      <div className="logo">
        <img src="/images/logo.png" alt="Logo" />
          <h1>PROJET 4DWR</h1>
          </div>
        <div style={{ marginTop: '50px', padding: '20px'}}>
          
          <div>
            <h1>PROJET 4DWR. Realisé par : NGAHAN DONAL STEVE & SIMO TOTCHEU PATRICE </h1>
          </div>
          <div className="search-bar">
              <input type="search" name="" id="" placeholder='search' onChange={this.handleSearch} value={this.state.searchText} />
          </div>
          
          <div className="table-container">
          <table className='table'>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Code Postal</th>
                <th>Capitale</th>
                <th>Population</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data, i) => (
                <DataCard obj={data} key={i} />
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </>
    );
  }
}

  
