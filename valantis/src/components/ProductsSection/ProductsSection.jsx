import classes from './ProductsSection.module.css';
import CardProduct from '../CardProduct/CardProduct';
import { memo } from 'react';

function ProductsSection({ products, isLoading }) {
    let startKey = 0;

    return (
        <section className={classes.ProductsSection}>
            {products.length
                ? products.map((prod) => (
                      <CardProduct
                          key={(startKey += 1)}
                          id={prod.id}
                          title={prod.product}
                          price={prod.price}
                          brand={prod.brand}
                      />
                  ))
                : !isLoading && <p>Простите, ничего не найдено :(</p>}
        </section>
    );
}

export default memo(ProductsSection);
