import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home } from './containers/Home';
import { Signup } from './containers/Signup';
import PrivateRouter from './components/HOC/PrivateRouter';
import Signin from './containers/Signin';
import { useEffect } from 'react';
import { isUserLoggedIn } from './actions/auth';
import { useDispatch , useSelector } from 'react-redux';
import Products from './containers/Products';
import Orders from './containers/Orders';
import  {Category}  from './containers/Category';
import { getInitialData } from './actions/initialData';
import {getProducts, getToken,getUser}from './actions'
import  NewPage  from './containers/NewPage';
import { UserPage } from './containers/User';
import { AddProduct } from './containers/Products/AddProduct';
import { EditProduct } from './containers/Products/EditProduct';
import ManagerListDetailProduct from './containers/ManagerDetailProduct';
import "typeface-roboto";

function App(props) {
  const dispatch=useDispatch()
  const auth = useSelector(state => state.auth)
//component DidMount and component DidUpdate
useEffect(() => {
  document.title = "SHOP LAPTOP"
}, [])
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }
    if(auth.authenticate){
      dispatch(getInitialData())
    }
  }, [auth.authenticate])
  useEffect(() => {
    const refreshtoken = localStorage.getItem("refreshtoken");
    
    if (refreshtoken) {
      dispatch(getToken(refreshtoken));
    }
    
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUser(token, props.history));
    }
    dispatch(getProducts())
  }, [dispatch,auth.token]);
  return (
    <div className="App">
      <Switch>
        
        <PrivateRouter path="/products"  component={Products} />
        <PrivateRouter path="/orders"  component={Orders} /> 
        <PrivateRouter path="/createProduct"  component={AddProduct} /> 
        <PrivateRouter path="/editProduct/:productId"  component={EditProduct} /> 
        <PrivateRouter path="/page"  component={NewPage} /> 
        <PrivateRouter path="/user"  component={UserPage} /> 
        <PrivateRouter path="/category"  component={Category} /> 
        <PrivateRouter path="/" exact component={Home} />
        <PrivateRouter path="/managerPost" exact component={ManagerListDetailProduct} />

        <Route path="/signin" component={Signin} />
        {/* <Route path="/signup" component={Signup} /> */}
      </Switch>
    </div>
  );
}

export default App;
