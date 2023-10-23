import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { categoryConfig } from '@/configs/category.config';

type CategorySelectorProps = {
  value: string | null;
  onChange: (c: string) => void;
  hasAll?: boolean;
};

function CategorySelector({
  value,
  onChange,
  hasAll = false,
}: CategorySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setSelectedCategory(value);
  }, [value]);

  const handleCategory = (c: string) => {
    onChange(c);
  };

  const configList = hasAll ? categoryConfig : categoryConfig.slice(1);

  return (
    <div className="space-x-2">
      {configList.map((x) => {
        return (
          <button
            type="button"
            className={clsx(
              'rounded-md px-3 py-1 text-sm',
              selectedCategory === x.value
                ? 'bg-gray-500 text-white'
                : 'border border-gray-500 bg-black text-white',
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
