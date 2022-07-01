import { Component } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Delivery from "./container/Delivery";
import Payment from "./container/Payment";
import Finish from "./container/Finish";
import storageKey from "./key/storage.key";

class App extends Component {

  componentDidMount() {
    let obj = localStorage.getItem(storageKey.storeKey);
    let summary = JSON.parse(obj)
    if (summary === null || summary === undefined) {
      let payload = {
        formDelivery: {},
        activeShipment: {},
        activePayment: {},
      }

      const dataStr = JSON.stringify(payload);
      localStorage.setItem(storageKey.storeKey, dataStr);
    }
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Delivery />}></Route>
        </Routes>
        <Routes>
          <Route path="/payment" element={<Payment />}></Route>
        </Routes>
        <Routes>
          <Route path="/finish" element={<Finish />}></Route>
        </Routes>
      </Router>
    );
  }
}

export default App;