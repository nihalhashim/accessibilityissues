/**
 * WarningBanner - Persistent safety banner shown on every page
 * 
 * This banner warns users that the application intentionally contains
 * accessibility issues and should NOT be used in production.
 */
export function WarningBanner() {
  return (
    <div 
      className="bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] py-2 px-4 text-center font-medium text-sm"
      role="alert"
    >
      ⚠️ Accessibility Audit Playground — intentionally contains accessibility issues — NOT for production
    </div>
  );
}
