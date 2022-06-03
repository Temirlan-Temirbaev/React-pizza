import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
export default function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [activeSort, setActiveSort] = useState({ name: 'популярности ↓', sort: 'rating' });
  const [currentPage, setCurrentPage] = useState(1);
  const { searchValue } = useContext(SearchContext);
  useEffect(() => {
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
      window.scroll(0, 0);
    });
  }, [categoryId, activeSort, searchValue, currentPage]);
  const pizzas = items.map((pizza) => <PizzaBlock pizza={pizza} key={pizza.id} />);
  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  return (
    <div className='container'>
      <div className='content__top'>
        <Categories categoryId={categoryId} setCategoryId={setCategoryId} />
        <Sort activeSort={activeSort} setActiveSort={setActiveSort} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? skeleton : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}
