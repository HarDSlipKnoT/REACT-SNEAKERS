import Card from "../components/Card";
import React from "react";
import AppContext from "../context";

function Favorites({ onAddToFavorite }) {
  const { favorites } = React.useContext(AppContext);
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои Закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {" "}
        {favorites.map((item, index) => (
          <Card
            key={index}
            favorited={true}
            // onPlus={(obj) => onAddToCart(obj)}
            onFavorite={onAddToFavorite}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
