import classes from './CardProduct.module.css';
import product from '../../assets/images/product.jpeg';
import { memo } from 'react';

function CardProduct(props) {
    return (
        <div className={classes.CardProduct}>
            <h4 className={classes.CardProduct__title}>{props.title}</h4>
            <img
                className={classes.CardProduct__img}
                src={product}
                alt="image"
                width={100}
                height={100}
            ></img>
            <span className={classes.CardProduct__price}>
                Цена:&nbsp;
                <b>
                    {new Intl.NumberFormat('ru-RU', {
                        style: 'currency',
                        currency: 'RUB',
                    }).format(props.price)}
                </b>
            </span>
            {props.brand && (
                <span className={classes.CardProduct__brand}>
                    Бренд:&nbsp;{props.brand}
                </span>
            )}
            <span className={classes.CardProduct__id}>
                <b>Код товара:&nbsp;</b>
                {props.id}
            </span>
        </div>
    );
}

export default memo(CardProduct);
