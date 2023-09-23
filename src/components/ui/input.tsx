import * as React from 'react';
import { Dots } from 'react-activity';

import { cn } from '@/libs/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isLoading, ...props }, ref) => {
    return (
      <div className="flex h-10 items-center gap-2">
        <input
          type={type}
          className={cn(
            'flex flex-1 h-full w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300',
            className,
          )}
          ref={ref}
          {...props}
        />
        {isLoading && (
          <div className="flex h-full items-center">
            <Dots size={10} />
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
