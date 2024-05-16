import './App.css';
import Home from './Home';
function App() {

  // axios.post(`https://banquemisr.gateway.mastercard.com/api/rest/version/60/merchant/TESTMERCHTST_EGP/session`, {}, {
  //   auth: {
  //     username: 'merchant.TESTMERCHTST_EGP',
  //     password: '26c176246ea2389bea43649c5e1d426e'
  //   },
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //     "Content-Type": "application/x-www-form-urlencoded",
  //     "X-Requested-With": "XMLHttpRequest",
  //   },
  // })
  //   .then(res => {

  //     console.log(res.data)
  //   })
  return (
    <div className="App">
      <Home />
    </div >
  );
}

export default App;
