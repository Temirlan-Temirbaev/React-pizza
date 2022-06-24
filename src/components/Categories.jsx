const categories = ['Все', 'Мясныe', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
export default function Categories({ categoryId, setCategoryId }) {
  function isActive(index) {
    if (index === categoryId) return 'active';
  }
  function onClickCategory(index) {
    setCategoryId(index);
  }
  return (
    <div className='categories'>
      <ul>
        {categories.map((category, index) => (
          <li key={index} onClick={() => onClickCategory(index)} className={isActive(index)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
