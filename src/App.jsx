import './App.css';

import { createHashRouter, RouterProvider } from 'react-router-dom';
import MasterLayout from './components/MasterLayout/MasterLayout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Products from './pages/Products/Products';
import Card from './pages/Card/Card';
import Contact from './pages/Contact/contact';
import ProductDetails from './pages/Products/ProductDetails';



function App() {
  
  let routes = createHashRouter([
    {
      path: '/', element: <MasterLayout />, errorElement: <NotFound />, children: [
        { index: true, element: <Home /> },
        { path: 'About', element: <About /> },
        { path: 'Products', element: <Products/> },
        { path: 'login', element: <Login /> },
        { path: 'Card', element: <Card/> },
        { path: 'contact', element: <Contact/> },
        { path: "products/:id", element: <ProductDetails /> },
        { path: 'register', element: <Register /> }

      ]}
  ])
  return (
    <div className="App">
      <RouterProvider router={routes}/>
    </div>
  );
}

export default App;
