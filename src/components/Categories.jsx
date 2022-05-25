import { useState } from 'react';
const categories = ['Все', 'Мясныe', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
export default function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);
  function isActive(index) {
    if (index === activeIndex) return 'active';
  }
  function onClickCategory(index) {
    setActiveIndex(index);
  }
  return (
    <div className="categories">
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
