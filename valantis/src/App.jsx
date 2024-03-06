import ProductsSection from './components/ProductsSection/ProductsSection';
import Input from './components/UI/Input/Input';
import './App.css';
import { useEffect, useState } from 'react';
import loadData from './utils/loadData';

function App() {
    const [products, setProducts] = useState([]);

    const [searchNameQuery, setSearchNameQuery] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    function uniq(arr, getId) {
        const result = [];
        const set = new Set();

        arr.forEach((el) => {
            const id = getId(el);
            if (!set.has(id)) {
                result.push(el);
                set.add(id);
            }
        });

        return result;
    }

    function loadPage(offset, limit) {
        const newProducts = {
            action: 'get_ids',
            params: { offset: offset, limit: limit },
        };

        loadData(newProducts).then((data) => {
            const uniqIds = uniq(data.result, (id) => id);
            const getItemsRequest = {
                action: 'get_items',
                params: { ids: uniqIds },
            };
            setIsLoading(true);
            loadData(getItemsRequest)
                .then((d) => {
                    const uniqProducts = uniq(d.result, (p) => p.id);
                    setProducts(uniqProducts);
                })
                .catch((err) => {
                    console.error(err.message + ' aaaaaaaaaa');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        });
    }

    useEffect(() => {
        loadPage(0, 50);
    }, []);

    return (
        <>
            <Input
                placeholder={'search'}
                value={searchNameQuery}
                onChange={(event) => setSearchNameQuery(event.target.value)}
            />
            {isLoading && <p>loading...</p>}
            <ProductsSection products={products} isLoading={isLoading}/>
        </>
    );
}

export default App;
