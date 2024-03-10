import ProductsSection from './components/ProductsSection/ProductsSection';
import FiltersSection from './components/FiltersSection/FiltersSection';
import PageLayout from './components/PageLayout/PageLayout';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import Input from './components/UI/Input/Input';
import './App.css';
import { useEffect, useState } from 'react';
import loadData from './API/loadData';
import Select from './components/UI/Select/Select';
import Button from './components/UI/Button/Button';
import Pagination from './components/Pagination/Pagination';
import uniq from './utils/uniq';
import prev from './assets/images/prev.png';
import next from './assets/images/next.png';

function App() {
    const [products, setProducts] = useState([]);
    const [filterQuery, setFilterQuery] = useState('');
    const [filterName, setFilterName] = useState('all');
    const [pageNumber, setPageNumber] = useState(0);
    const [hasNext, setHasNext] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        function loadPage(offset, limit) {
            const newProducts = {
                action: 'get_ids',
                params: { offset: offset, limit: Number(limit) },
            };

            loadData(newProducts).then((data) => {
                const uniqIds = uniq(data.result, (id) => id);
                const getItemsRequest = {
                    action: 'get_items',
                    params: { ids: uniqIds },
                };
                if (data.result.length < process.env.REACT_APP_PAGE_LIMIT) {
                    setHasNext(false);
                }
                if (data.result.length === 0) {
                    setPageNumber(pageNumber - 1);
                }
                setIsLoading(true);
                loadData(getItemsRequest)
                    .then((d) => {
                        const uniqProducts = uniq(d.result, (p) => p.id);
                        setProducts(uniqProducts);
                    })
                    .catch((err) => {
                        console.error(err.message);
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
                        console.error(err.message);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            });
        }
        if (filterName !== 'all') {
            if (filterName === 'price') {
                loadPageFiltered(
                    filterName,
                    parseFloat(filterQuery.replaceAll(' ', ''))
                );
            }
            loadPageFiltered(filterName, filterQuery);
        } else {
            loadPage(pageNumber, process.env.REACT_APP_PAGE_LIMIT);
        }
    }, [filterName, filterQuery, pageNumber]);

    return (
        <>
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
            {isLoading && <Loader />}
            {!isLoading && (
                <PageLayout>
                    <ProductsSection
                        products={products}
                        isLoading={isLoading}
                    />
                    {filterName === 'all' && products.length > 0 && (
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
                                <img
                                    src={prev}
                                    alt="button prev"
                                    width={100}
                                    height={30}
                                />
                            </Button>
                            <Button
                                onClick={() => {
                                    setPageNumber(pageNumber + 1);
                                }}
                                isActive={hasNext}
                                disabled={!hasNext}
                            >
                                <img
                                    src={next}
                                    alt="button next"
                                    width={100}
                                    height={30}
                                />
                            </Button>
                        </Pagination>
                    )}
                </PageLayout>
            )}
        </>
    );
}

export default App;
