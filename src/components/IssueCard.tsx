import { type AccessibilityIssue } from '@/types/issues';

interface IssueCardProps {
  issue: AccessibilityIssue;
}

/**
 * IssueCard - Documents an intentional accessibility issue
 * 
 * This component displays metadata about each accessibility issue
 * including WCAG mapping, severity, expected findings, and fix guidance.
 * 
 * Data attributes enable automated testing and issue tracking.
 */
export function IssueCard({ issue }: IssueCardProps) {
  const severityColors: Record<string, string> = {
    low: 'bg-[hsl(var(--severity-low))] text-[hsl(var(--success-foreground))]',
    medium: 'bg-[hsl(var(--severity-medium))] text-[hsl(var(--warning-foreground))]',
    high: 'bg-[hsl(var(--severity-high))] text-[hsl(var(--destructive-foreground))]',
  };

  const typeColors: Record<string, string> = {
    automated: 'bg-[hsl(var(--type-automated))] text-[hsl(var(--primary-foreground))]',
    guided: 'bg-[hsl(var(--type-guided))] text-[hsl(var(--info-foreground))]',
    manual: 'bg-[hsl(var(--type-manual))] text-[hsl(var(--success-foreground))]',
  };

  return (
    <div
      id={issue.id}
      className="border border-border rounded-lg p-4 mb-4 bg-card"
      data-issue-id={issue.id}
      data-issue-type={issue.types.join(',')}
      data-wcag={issue.wcagMapping.join(',')}
      data-expected="fail"
      data-check-hints={issue.checkHints.join(', ')}
    >
      {/* Header with ID and Title */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
            {issue.id}
          </code>
          <h3 className="font-semibold text-foreground">{issue.title}</h3>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded ${severityColors[issue.severity]}`}>
          {issue.severity.toUpperCase()}
        </span>
      </div>

      {/* Issue Types */}
      <div className="flex flex-wrap gap-2 mb-3">
        {issue.types.map(type => (
          <span
            key={type}
            className={`text-xs font-medium px-2 py-1 rounded ${typeColors[type]}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        ))}
      </div>

      {/* WCAG Mapping */}
      <div className="mb-2">
        <span className="text-sm font-medium text-muted-foreground">WCAG 2.2: </span>
        <span className="text-sm text-foreground">
          {issue.wcagMapping.join(', ')} — {issue.wcagName}
        </span>
      </div>

      {/* Expected Finding */}
      <div className="mb-2">
        <span className="text-sm font-medium text-muted-foreground">Expected Finding: </span>
        <span className="text-sm text-foreground">{issue.expectedFinding}</span>
      </div>

      {/* How to Fix */}
      <div className="bg-muted rounded p-3 mt-3">
        <span className="text-sm font-medium text-muted-foreground">How to Fix: </span>
        <span className="text-sm text-foreground">{issue.howToFix}</span>
      </div>
    </div>
  );
}
