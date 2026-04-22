



import Hero from "./component/Hero";
import Product from "./component/Product";
import Navbar from "./layout/Navbar";



export default function App() {
  

  return (
    <div className="relative overflow-hidden">
        <Navbar/>
      <Hero/>
      <Product/>
    
    </div>
  );
}