import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't show breadcrumbs on the home page
  if (pathnames.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <ol className="flex items-center space-x-2 text-[10px] font-bold tracking-widest uppercase">
        <li>
          <Link
            to="/"
            className="flex items-center text-on-surface-variant/40 hover:text-primary transition-colors"
          >
            <Home className="w-3 h-3 mr-1" />
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          // Format the display name (e.g., chaos-lab -> Chaos Lab)
          const name = value
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase());

          return (
            <li key={to} className="flex items-center space-x-2">
              <ChevronRight className="w-3 h-3 text-on-surface-variant/20" />
              {last ? (
                <span className="text-primary truncate max-w-[150px] sm:max-w-none">
                  {name}
                </span>
              ) : (
                <Link
                  to={to}
                  className="text-on-surface-variant/40 hover:text-primary transition-colors whitespace-nowrap"
                >
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
