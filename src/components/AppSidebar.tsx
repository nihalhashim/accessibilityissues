import { Link, useLocation } from 'react-router-dom';
import { Home, Table, BookOpen, Cog, Keyboard, ClipboardCheck, ShieldCheck } from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: 'Core',
    items: [
      { title: 'Home', href: '/', icon: Home },
      { title: 'Issue Matrix', href: '/matrix', icon: Table },
      { title: 'Readme', href: '/readme', icon: BookOpen },
    ],
  },
  {
    title: 'Issue Pages',
    items: [
      { title: 'Automated Issues', href: '/automated', icon: Cog },
      { title: 'Guided Issues', href: '/guided', icon: Keyboard },
      { title: 'Manual Issues', href: '/manual', icon: ClipboardCheck },
      { title: 'IBM Checks', href: '/ibm-checks', icon: ShieldCheck },
    ],
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 border-r border-border bg-sidebar-background min-h-screen flex-shrink-0">
      <div className="p-4">
        <h2 className="font-bold text-lg text-sidebar-foreground mb-4">
          A11y Playground
        </h2>
        
        <nav>
          {navSections.map((section) => (
            <div key={section.title} className="mb-6">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.href;
                  const Icon = item.icon;
                  
                  return (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                          isActive
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
