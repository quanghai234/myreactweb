
import './App.css';
import {Routes,Route,useLocation}from 'react-router-dom';


import Header1 from './components/Header1';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Blog from './components/Blog';
import Contact from './components/Contact';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Header2 from './components/Header2';
import BlogDetail from './components/BlogDetail';
import ShoppingCard from './components/ShoppingCard';
import Search from './components/Search';
import Userform from './components/user/Userform';
import Account from './components/account/Account';
import Payment from './components/account/Payment';
import AccountDetail from './components/account/AccountDetail';
import Orders from './components/account/Orders';
import Wishlist from './components/Wishlist';

function App() {
  
    const location = useLocation();
    

    let header;
      if(location.pathname==='/'){
        header=<Header1 ></Header1>
      }
      else{
        header=<Header2 ></Header2>
      }
      
  
  return (
    <>
     {header}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/product' element={<ProductList/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/product-detail' element={<ProductDetail/>}/>
        <Route path='/blog-detail/' element={<BlogDetail/>}/>
        <Route path='/card' element={<ShoppingCard/>}/>
        <Route path='/search' element={<Search />}/>
        <Route path='/login' element={<Userform/>}/>
        <Route path='/account-detail' element={<AccountDetail/>}>
          <Route path='payment' element={<Payment/>}/>
          <Route path='account' element={<Account/>}/>
          <Route path='orders' element={<Orders/>}/>
        </Route>
        <Route path='/wishlist' element={<Wishlist/>} />
      </Routes>
     
     <Footer></Footer>
     
    </>
  );
}

export default App;
