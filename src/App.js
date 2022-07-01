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
        formDelivery: {
          activeDs: false,
          deliveryAddress: "",
          dsName: "",
          dsPhoneNumber: "",
          email: "",
          phoneNumber: "",
          code: "",
        },
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
          <Route index path="/" element={<Delivery />}></Route>
          <Route path="payment" element={<Payment />}></Route>
          <Route path="finish" element={<Finish />}></Route>
        </Routes>
      </Router>
    );
  }
}

export default App;