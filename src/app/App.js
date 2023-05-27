import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
import Layout from '../components/sidebar/Layout';
import './App.scss';
import './App_modified.css';
// eslint-disable-next-line
import "swiper/css/bundle";
import "../pages/Dashboard/swiperstyle.css";

/**
 * "user manual": basname will affect the routing
 * For example 
 * if put basename_setting as "/ABC", then it will render the url as "/ABC/Page_a"
 */
const basename_setting = "/etourismmarketplace" 
const App = () => (
  <Router basename={basename_setting}>
    <Layout />
  </Router>
);
export default App;
