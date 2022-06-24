import { useCallback, useContext, useState } from 'react';
import { SearchContext } from '../../App';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';
export default function Search() {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const [value, setValue] = useState('');
  const updateSearchValue = useCallback(
    debounce((value) => {
      setSearchValue(value);
    }, 1000),
    [],
  );
  const onChangeInput = (value) => {
    setValue(value);
    updateSearchValue(value);
  };
  return (
    <input
      type='text'
      value={value}
      onChange={(e) => onChangeInput(e.target.value)}
      className={styles.root}
      placeholder='Поиск пиццы...'
    />
  );
}
