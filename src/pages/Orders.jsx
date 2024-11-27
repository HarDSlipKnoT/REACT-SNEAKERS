import Card from "../components/Card";
import React from "react";
import axios from "axios";
import AppContext from "../context";

function Orders() {
  const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [orders, setOrders] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://1bfb3ba08044c410.mokky.dev/Orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert("ошибка при запросе заказа");
      }
    })();
  }, []);
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои Заказы</h1>
      </div>

      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(10)] : orders).map((item, index) => (
          <Card
            key={index}
            {...item}
            loading={isLoading}
          />
        ))}
      </div>
    </div>
  );
}

export default Orders;
