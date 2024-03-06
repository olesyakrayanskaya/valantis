import classes from './ProductsSection.module.css';
import CardProduct from '../CardProduct/CardProduct';

function ProductsSection({ products }) {
    return (
        <section className={classes.ProductsSection}>
            {products.length ? (
                products.map((prod) => (
                    <CardProduct
                        key={prod.id}
                        id={prod.id}
                        title={prod.product}
                        price={prod.price}
                        brand={prod.brand}
                    />
                ))
            ) : (
                <p>Sorry, no products</p>
            )}
        </section>
    );
}

export default ProductsSection;
