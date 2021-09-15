import React, { useState } from "react";
import Header from "./components/Layoult/Header/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
    const [cartIsShown, setCartIsShown] = useState(false);

    const showCartHandler = () => {
        setCartIsShown(true);
    };

    const hideCartHandler = () => {
        setCartIsShown(false);
    };

    return (
        <CartProvider>
            <Header onShowCart={showCartHandler} />
            {cartIsShown && <Cart onClose={hideCartHandler} />}
            <main>
                <Meals />
            </main>
        </CartProvider>
    );
}

export default App;
