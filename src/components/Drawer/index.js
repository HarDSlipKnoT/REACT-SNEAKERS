import React from "react";
import Info from "../Info";
import { useCart } from "../../hooks/useCart";

import axios from "axios";
import styles from "./Drawer.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, items = [], onRemove, opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://1bfb3ba08044c410.mokky.dev/Orders",
        { items: cartItems }
      );

      setOrderId(data.id);

      setIsOrderComplete(true);
      setCartItems([]);
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete("https://1bfb3ba08044c410.mokky.dev/cart" + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert("не удалось  найти заказ");
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex justify-between">
          Корзина{" "}
          <img
            onClick={onClose}
            className="cu-p"
            src="/img/btn-remove.svg"
            alt="Remove"
          />
        </h2>

        {items.length > 0 ? (
          <div className="items flex">
            {items.map((obj) => (
              <div key={obj.id} className="cartItem d-flex align-center mb-20">
                <div
                  style={{ backgroundImage: `url(${obj.imageUrl})` }}
                  className="cartItemImg"
                ></div>
                <div className="mr-20p flex">
                  <p className="mb-5">{obj.title}</p>
                  <b>{obj.price}</b>
                </div>
                <img
                  onClick={() => onRemove(obj.id)}
                  className="removeBtn"
                  src="/img/btn-remove.svg"
                  alt="Remove"
                />
              </div>
            ))}
            <div className="cartTotalBlock">
              <ul>
                <li className="d-flex ">
                  <span>Итого: </span>
                  <b>{totalPrice} руб. </b>
                </li>
                <li>
                  <span>Налог 5%: </span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} руб. </b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ Оформлен" : "Корзина Пустая"}
            description={
              isOrderComplete
                ? `Ваш Заказ передан #${orderId}`
                : "Добавьте в корзину"
            }
            image={
              isOrderComplete ? "/img/complety.png" : "/img/empty-cart.png"
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
