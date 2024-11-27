import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";
import AppContext from "../../context";

function Card({
  id,
  onFavorite,
  imageUrl,
  price,
  title,
  onPlus,
  favorited = false,
  loading = false,
}) {
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const { isItemAdded } = React.useContext(AppContext);
  const obj = { imageUrl, price, title, id, parentId: id };

  const onClickPlus = () => {
    onPlus(obj);
  };
  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={160}
          height={265}
          viewBox="0 0 150 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
          <rect x="0" y="104" rx="10" ry="10" width="150" height="15" />
          <rect x="0" y="129" rx="10" ry="10" width="100" height="15" />
          <rect x="0" y="200" rx="10" ry="10" width="80" height="25" />
          <rect x="124" y="200" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img
                src={isFavorite ? "/img/heartlike.svg" : "/img/heartunlike.svg"}
                alt="Unliked"
              />
            </div>
          )}

          <img width={130} height={112} src={imageUrl} alt="" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column ">
              <span>Цена:</span>
              <b>{price}</b>
            </div>

            {onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={isItemAdded(id) ? "/img/bntcheck.svg" : "/img/btnplus.svg"}
                alt="Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
