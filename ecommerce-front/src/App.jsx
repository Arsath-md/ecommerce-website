import { Route,BrowserRouter,Routes } from 'react-router-dom'
import './App.css'
import Register from './components/register'
import Footer from './pages/Footer'
import Home from './pages/home'
import Login from './pages/login'
import CartItems from './components/cartitems'
import Checkout from './components/checkout'
import Admin from './admin/dashboard'
import Adds from './admin/addproduct'
import Views from './admin/view'
import AddOffer from './admin/addoffer'
import Showall from "./product/showall"
import Catalog from './product/catagory'
import Adminlogin from './admin/adminlogin'
import AdminProtected from './admin/adminprotected'
import BillPage from './components/bill'

function App() {

  return(
    <>
      <BrowserRouter>
        <Routes>
           <Route path='/' element={<Home/>}/>

           <Route path='/admin' element={<AdminProtected>
            <Admin/>
            </AdminProtected>}>
            </Route>
            
           <Route path='/cart' element={<CartItems/>}></Route>
           <Route path="/login" element={<Login/>}></Route>
           <Route path='/register' element={<Register/>}></Route>
           <Route path='/checkout' element={<Checkout/>}></Route>
           {/* product route */}
           <Route path='/allproduct' ></Route>
           <Route path="/showall" element={<Showall/>}></Route>
           <Route path="/cat/:id" element={<Catalog/>}></Route>
           {/* admin route  */}
           <Route path="/adminlogin" element={<Adminlogin/>}></Route>
           <Route path="/add" element={<Adds/>}></Route>
           <Route path='/view' element={<Views/>}></Route>
           <Route path='/offer' element={<AddOffer/>}></Route>

           <Route path="/showbill/:id" element={<BillPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
