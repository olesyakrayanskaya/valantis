import ProductsSection from './components/ProductsSection/ProductsSection';
import FiltersSection from './components/FiltersSection/FiltersSection';
import PageLayout from './components/PageLayout/PageLayout';
import Header from './components/Header/Header';
import Input from './components/UI/Input/Input';
import './App.css';
import { useEffect, useState } from 'react';
import loadData from './API/loadData';
import Select from './components/UI/Select/Select';
import Button from './components/UI/Button/Button';
import Pagination from './components/Pagination/Pagination';

function App() {
    const [products, setProducts] = useState([]);

    const [filterQuery, setFilterQuery] = useState('');

    const [filterName, setFilterName] = useState('all');

    const [isLoading, setIsLoading] = useState(false);

    const [pageNumber, setPageNumber] = useState(0);

    const [hasNext, setHasNext] = useState(true);

    const pageLimit = 50;

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
        console.log(new Date() + 'load page start');
        const newProducts = {
            action: 'get_ids',
            params: { offset: offset, limit: limit },
        };

        loadData(newProducts).then((data) => {
            console.log(new Date() + 'load page 1');
            const uniqIds = uniq(data.result, (id) => id);
            const getItemsRequest = {
                action: 'get_items',
                params: { ids: uniqIds },
            };
            if (data.result.length < pageLimit) {
                setHasNext(false);
            }
            if (data.result.length === 0) {
                setPageNumber(pageNumber - 1);
            }
            setIsLoading(true);
            loadData(getItemsRequest)
                .then((d) => {
                    console.log(new Date() + 'load page 2');
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

    function loadPageFiltered(filterName, filterValue) {
        const filteredProducts = {
            action: 'filter',
            params: { [filterName]: filterValue },
        };

        loadData(filteredProducts).then((data) => {
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

    console.log(new Date() + 'main');

    useEffect(() => {
        console.log(new Date() + 'use effect');
        if (filterName !== 'all') {
            if (filterName === 'price') {
                loadPageFiltered(
                    filterName,
                    parseFloat(filterQuery.replaceAll(' ', ''))
                );
            }
            loadPageFiltered(filterName, filterQuery);
        } else {
            loadPage(pageNumber, pageLimit);
        }
        console.log(new Date() + 'use effect end');
    }, [filterName, filterQuery, pageNumber]);

    return (
        <PageLayout>
            <Header></Header>
            <FiltersSection>
                <Select
                    options={[
                        { value: 'all', name: 'показать все' },
                        { value: 'product', name: 'по названию' },
                        { value: 'price', name: 'по цене' },
                        { value: 'brand', name: 'по бренду' },
                    ]}
                    value={filterName}
                    onChange={(event) => {
                        setFilterName(event.target.value);
                        setFilterQuery('');
                    }}
                    id="filter"
                    labelText={'фильтр:'}
                />
                {filterName !== 'all' && (
                    <Input
                        value={filterQuery}
                        onChange={(event) => {
                            setFilterQuery(event.target.value);
                        }}
                    />
                )}
            </FiltersSection>
            <PageLayout>
                {isLoading && <p>loading...</p>}
                <ProductsSection products={products} isLoading={isLoading} />
                {filterName === 'all' && (
                    <Pagination>
                        <Button
                            onClick={() => {
                                pageNumber > 0
                                    ? setPageNumber(pageNumber - 1)
                                    : setPageNumber(0);
                                setHasNext(true);
                            }}
                            isActive={pageNumber > 0}
                            disabled={pageNumber === 0}
                        >
                            prev
                        </Button>
                        <Button
                            onClick={() => {
                                setPageNumber(pageNumber + 1);
                            }}
                            isActive={hasNext}
                            disabled={!hasNext}
                        >
                            next
                        </Button>
                    </Pagination>
                )}
            </PageLayout>
        </PageLayout>
    );
}

export default App;
