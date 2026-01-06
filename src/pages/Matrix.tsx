import { Link } from 'react-router-dom';
import { PageWrapper } from '@/components/PageWrapper';
import { issueRegistry } from '@/types/issues';

/**
 * Matrix Page - Master issue table with all accessibility issues
 * 
 * Provides a complete overview of all issues with links to each anchor.
 */
export default function Matrix() {
  return (
    <PageWrapper 
      title="Issue Matrix" 
      description="Complete matrix of all accessibility issues in the Accessibility Audit Playground"
    >
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Issue Matrix
          </h1>
          <p className="text-muted-foreground">
            Complete listing of all {issueRegistry.length} accessibility issues. Click any issue ID 
            to jump directly to that issue on its page.
          </p>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border px-3 py-2 text-left font-semibold">Issue ID</th>
                <th className="border border-border px-3 py-2 text-left font-semibold">Title</th>
                <th className="border border-border px-3 py-2 text-left font-semibold">Type</th>
                <th className="border border-border px-3 py-2 text-left font-semibold">WCAG SC</th>
                <th className="border border-border px-3 py-2 text-left font-semibold">Route</th>
                <th className="border border-border px-3 py-2 text-left font-semibold">Selector Hint</th>
                <th className="border border-border px-3 py-2 text-left font-semibold">Expected Finding</th>
              </tr>
            </thead>
            <tbody>
              {issueRegistry.length === 0 ? (
                <tr>
                  <td colSpan={7} className="border border-border px-3 py-8 text-center text-muted-foreground">
                    Issues are registered as pages load. Visit the issue pages to populate this matrix.
                  </td>
                </tr>
              ) : (
                issueRegistry.map((issue) => (
                  <tr key={issue.id} className="hover:bg-muted/50">
                    <td className="border border-border px-3 py-2">
                      <Link 
                        to={`${issue.route}#${issue.id}`}
                        className="font-mono text-primary hover:underline"
                      >
                        {issue.id}
                      </Link>
                    </td>
                    <td className="border border-border px-3 py-2">{issue.title}</td>
                    <td className="border border-border px-3 py-2">
                      {issue.types.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')}
                    </td>
                    <td className="border border-border px-3 py-2 font-mono text-xs">
                      {issue.wcagMapping.join(', ')}
                    </td>
                    <td className="border border-border px-3 py-2 font-mono text-xs">
                      {issue.route}
                    </td>
                    <td className="border border-border px-3 py-2 font-mono text-xs">
                      {issue.selectorHint}
                    </td>
                    <td className="border border-border px-3 py-2 text-xs">
                      {issue.expectedFinding}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {issueRegistry.length > 0 && (
          <div className="text-sm text-muted-foreground">
            Showing {issueRegistry.length} issues
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
