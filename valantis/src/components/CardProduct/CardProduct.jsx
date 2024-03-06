import classes from './CardProduct.module.css';

function CardProduct(props) {
    return <div className={classes.CardProduct}>
        <span className={classes.CardProduct__id}>{props.id}</span>
        <h3 className={classes.CardProduct__title}>{props.product}</h3>
        <span className={classes.CardProduct__price}>{props.price}</span>
        <span className={classes.CardProduct__brand}>{props.brand}</span>
    </div>;
}

export default CardProduct;
