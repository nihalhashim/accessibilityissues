import { ReactNode } from 'react';
import { WarningBanner } from './WarningBanner';
import { AppSidebar } from './AppSidebar';
import { Helmet } from 'react-helmet-async';

interface PageWrapperProps {
  children: ReactNode;
  title: string;
  description?: string;
}

/**
 * PageWrapper - Layout wrapper for all pages
 * 
 * Includes:
 * - Warning banner (always visible)
 * - Meta tags for SEO (noindex, nofollow)
 * - Sidebar navigation
 * - Main content area
 */
export function PageWrapper({ children, title, description }: PageWrapperProps) {
  const fullTitle = `${title} | Accessibility Audit Playground`;
  
  return (
    <>
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        {description && <meta name="description" content={description} />}
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <WarningBanner />
        
        <div className="flex flex-1">
          <AppSidebar />
          
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-4xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
