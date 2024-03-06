import ProductsSection from './components/ProductsSection/ProductsSection';
import FiltersSection from './components/FiltersSection/FiltersSection';
import PageLayout from './components/PageLayout/PageLayout';
import Input from './components/UI/Input/Input';
import './App.css';
import { useEffect, useState } from 'react';
import loadData from './utils/loadData';

function App() {
    const [products, setProducts] = useState([]);

    const [filterNameQuery, setFilterNameQuery] = useState('');

    const [filterPriceQuery, setFilterPriceQuery] = useState('');

    const [filterBrandQuery, setFilterBrandQuery] = useState('');

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
        <PageLayout>
            <FiltersSection>
                <Input
                    value={filterNameQuery}
                    onChange={(event) => setFilterNameQuery(event.target.value)}
                    id="filter-name"
                    htmlFor="filter-name"
                    text="по названию:&nbsp;"
                />
                <Input
                    value={filterPriceQuery}
                    onChange={(event) => setFilterPriceQuery(event.target.value)}
                    id="filter-price"
                    htmlFor="filter-price"
                    text="по цене:&nbsp;"
                />
                <Input
                    value={filterBrandQuery}
                    onChange={(event) => setFilterBrandQuery(event.target.value)}
                    id="filter-brand"
                    htmlFor="filter-brand"
                    text="по бренду:&nbsp;"
                />
            </FiltersSection>
            <PageLayout>
                {isLoading && <p>loading...</p>}
                <ProductsSection products={products} isLoading={isLoading} />
            </PageLayout>
        </PageLayout>
    );
}

export default App;
