import { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { sortValues } from '../components/Sort';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  setSort,
} from '../redux/reducers/filterReducer';
export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const { categoryId, activeSort, currentPage } = useSelector((state) => state.filter);
  const { searchValue } = useContext(SearchContext);
  function fetchPizzas() {
    const order = activeSort.sort.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';
    const categoryAndSort = `${
      categoryId === 0
        ? `?sortBy=${activeSort.sort.replace('-', '')}`
        : `?category=${categoryId}&sortBy=${activeSort.sort.replace('-', '')}`
    }`;
    const url = `https://628f6befdc478523654030f2.mockapi.io/pizzas${categoryAndSort}&order=${order}${search}&limit=4&page=${currentPage}`;
    axios.get(url).then((res) => {
      setItems(res.data);
      setInterval(() => {
        setIsLoading(false);
      }, 1000);
    });
  }
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortValues.find((obj) => obj.sortProperty === params.sortProperty);
      if (sort) {
        params.sort = sort;
      }
      dispatch(setFilters(params));
    }
    isMounted.current = true;
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, activeSort, searchValue, currentPage]);
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({ sortBy: activeSort.sort, categoryId, currentPage });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, currentPage, activeSort.sort]);
  const pizzas = items.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />);
  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories categoryId={categoryId} setCategoryId={(id) => dispatch(setCategoryId(id))} />
        <Sort
          activeSort={activeSort}
          setActiveSort={(obj) => {
            dispatch(setSort(obj));
          }}
        />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? skeleton : pizzas}</div>
      <Pagination
        currentPage={currentPage}
        onChangePage={(num) => {
          dispatch(setCurrentPage(num));
        }}
      />
    </div>
  );
}
