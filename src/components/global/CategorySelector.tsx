import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { categoryConfig } from '@/configs/category.config';

type CategorySelectorProps = {
  value: string | null;
  onChange: (c: string) => void;
};

function CategorySelector({ value, onChange }: CategorySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setSelectedCategory(value);
  }, [value]);

  const handleCategory = (c: string) => {
    onChange(c);
  };

  return (
    <div className="space-x-2">
      {categoryConfig.map((x) => {
        return (
          <button
            type="button"
            className={clsx(
              'rounded-md px-4 py-2 text-sm',
              selectedCategory === x.value
                ? 'bg-gray-500 text-white'
                : 'border border-white bg-black text-white',
            )}
            onClick={() => handleCategory(x.value)}
            key={`category-${x.id}`}
          >
            {x.name}
          </button>
        );
      })}
    </div>
  );
}

export default CategorySelector;
