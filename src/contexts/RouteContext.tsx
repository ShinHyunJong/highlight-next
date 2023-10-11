import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { createContext, useEffect, useRef } from 'react';

type RouteContextType = {
  path: string | null;
};

const RouteContext = createContext<RouteContextType>({
  path: null,
});

function RouteProvider({ children }: { children: ReactNode }) {
  const routeRef = useRef<string | null>(null);
  const { asPath } = useRouter();

  useEffect(() => {
    routeRef.current = asPath;
  }, [asPath]);

  return (
    <RouteContext.Provider
      value={{
        path: routeRef.current,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
}

export { RouteContext, RouteProvider };
