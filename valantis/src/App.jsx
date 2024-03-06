import ProductsSection from './components/ProductsSection/ProductsSection';
import Input from './components/UI/Input/Input';
import './App.css';
import { useEffect, useMemo, useState } from 'react';
import loadData from './utils/loadData';

function App() {
    const [products, setProducts] = useState([]);

    const [searchNameQuery, setSearchNameQuery] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    // const filteredByNameProducts = useMemo(() => {
    //     return products.filter((product) =>
    //         product.title.toLowerCase().includes(searchNameQuery.toLowerCase())
    //     );
    // }, [searchNameQuery, products]);

    const newProducts = {
        action: 'get_ids',
        params: { offset: 0, limit: 10 },
    };

    useEffect(() => {
        loadData(newProducts).then((data) => {
            const getItemsRequest = {
                action: 'get_items',
                params: { ids: data.result },
            };
            setIsLoading(true);
            loadData(getItemsRequest)
                .then((data) => {
                    console.log(data.result);
                })
                .catch((err) => {
                    console.error(err.message + ' aaaaaaaaaa');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        });
    }, []);

    return (
        <>
            <Input
                placeholder={'search'}
                value={searchNameQuery}
                onChange={(event) => setSearchNameQuery(event.target.value)}
            />
            {isLoading && <p>loading...</p>}
            <ProductsSection products={products} />
        </>
    );
}

export default App;
