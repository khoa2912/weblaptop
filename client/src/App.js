import logo from "./logo.svg";
import "./App.css";
import { HomePage } from "./containers/HomePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ProductListPage } from "./containers/ProductListPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getOrders,
  getToken,
  getUser,
  isUserLoggedIn,
  getCartItems,
} from "./actions";
import ProductDetailsPage from "./containers/ProductDetailsPage";
import { CartPage } from "./containers/CartPage";
import { updateCart } from "./actions/cart";
import CheckoutPage from "./containers/CheckoutPage";
import OrderPage from "./containers/OrderPage";
import OrderDetailsPage from "./containers/OrderDetailsPage";
import SearchPage from "./containers/SearchPage";
import { AccountPage } from "./containers/AccountPage";
import { AddressPage } from "./containers/AccountPage/AddressPage";
import { LoginPage } from "./containers/LoginPage";
import { RegisterPage } from "./containers/RegisterPage";
import ActivationEmail from "./containers/ActivetiPage";
import { useHistory } from "react-router-dom";
import { ForgotPage } from "./containers/ForgotPassPage";
import { ResetPassPage } from "./containers/ResetPassPage";
import NewsPage from "./containers/NewsPage";
import DetailNews from "./containers/DetailNews";
import Page404 from "./containers/Page404";

function App(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  useEffect(() => {
    document.title = "SHOP LAPTOP";
  }, []);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);
  //  useEffect(() => {
  //   if(token){
  //     dispatch(getCartItems());
  //     dispatch(getOrders());
  //   }
  //   console.log('app')
  // }, [token]);
  useEffect(() => {
    console.log("App.js - updateCart");
    dispatch(updateCart());
  }, [auth.authenticate]);
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    const refreshtoken = localStorage.getItem("refreshtoken");

    if (firstLogin && refreshtoken) {
      dispatch(getToken(refreshtoken));
    }
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUser(token, props.history));
    }
  }, [dispatch, auth.token]);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/forgot_password" component={ForgotPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/account/address" exact component={AddressPage} />
          <Route path="/account/orders" exact component={OrderPage} />
          <Route path="/account" exact component={AccountPage} />
          <Route path="/news/:id" exact component={DetailNews} />
          <Route path="/news" exact component={NewsPage} />

          <Route path="/user/reset/:token" component={ResetPassPage} exact />
          <Route
            path="/user/activate/:activation_token"
            component={ActivationEmail}
            exact
          />
          <Route path="/order_details/:orderId" component={OrderDetailsPage} />
          <Route
            path="/:productSlug/:productId/p"
            component={ProductDetailsPage}
          />
          <Route path="/:slug" exact component={ProductListPage} />
          <Route path="*" component={Page404} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
