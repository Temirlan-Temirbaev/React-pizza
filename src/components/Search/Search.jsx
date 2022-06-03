import { useContext } from 'react';
import { SearchContext } from '../../App';
import styles from './Search.module.scss';
export default function Search() {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  return (
    <input
      type='text'
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      className={styles.root}
      placeholder='Поиск пиццы...'
    />
  );
}
