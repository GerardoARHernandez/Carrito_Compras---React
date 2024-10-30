import { useState, useEffect } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import Footer from "./components/Footer";
import { db } from "./data/db";

function App() {

  const initialCart = () =>{
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  const [data] = useState(db); //Archivo Local se le manda directo db
  // useEffect(() =>{
  //   setData(db)
  // }, []) //Cuando es una api, esta es la forma correcta
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  function addToCart(item){
    const itemExist = cart.findIndex(guitar => guitar.id === item.id)
    if(itemExist >=0){ //Existe en el carrito

      if (cart[itemExist].quantity >= MAX_ITEMS) return;

      const updateCart = [...cart];
      updateCart[itemExist].quantity++;
      setCart(updateCart);
      return
    }
  
    item.quantity= 1;
    setCart([...cart, item]);

  };

  function removeFromCart(id){
    setCart( prevCart => prevCart.filter(guitar => guitar.id !== id))
  };

  function increaseQuantity(id){
    const updateCart = cart.map( item =>{
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity +1
        }
      }
      return item;
    })
    setCart(updateCart);
  };

  function decreaseQuantity(id){
    const updateCart = cart.map( item =>{
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity -1
        }
      }
      return item;
    })
    setCart(updateCart);
  };

  function clearCart(){
    setCart([]);
  };
  
  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar) => (
              <Guitar
                key={guitar.id}
                guitar={guitar}
                addToCart={addToCart}
              />
          ))}
        
        </div>
      </main>

      <Footer />
      
    </>
  )
}

export default App
