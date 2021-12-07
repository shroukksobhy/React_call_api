import logo from './logo.svg';
import './App.css';
import axios from 'axios';
function App() {
  axios.post(`https://banquemisr.gateway.mastercard.com/api/rest/version/60/merchant/TESTMERCHTST_EGP/session`, {}, {
    auth: {
      username: 'merchant.TESTMERCHTST_EGP',
      password: '26c176246ea2389bea43649c5e1d426e'
    }
  })
    .then(res => {

      console.log(res.data)
    })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Editt <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
