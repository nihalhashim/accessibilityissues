// Types for accessibility issues

export type IssueType = 'automated' | 'guided' | 'manual';
export type Severity = 'low' | 'medium' | 'high';

export interface AccessibilityIssue {
  id: string; // e.g., "AX-001"
  title: string;
  types: IssueType[];
  expectedFinding: string;
  wcagMapping: string[]; // e.g., ["1.1.1", "2.4.4"]
  wcagName: string; // e.g., "Non-text Content, Link Purpose"
  severity: Severity;
  howToFix: string;
  route: string; // e.g., "/automated/forms"
  selectorHint: string; // e.g., 'data-issue-id="AX-001"'
  checkHints: string[]; // e.g., ["axe:image-alt", "manual:alt-text-quality"]
}

// Master issue registry - all issues defined here for the matrix
export const issueRegistry: AccessibilityIssue[] = [];

// Helper to add issues to registry
export function registerIssue(issue: AccessibilityIssue): AccessibilityIssue {
  issueRegistry.push(issue);
  return issue;
}

// Get issues by route
export function getIssuesByRoute(route: string): AccessibilityIssue[] {
  return issueRegistry.filter(issue => issue.route === route);
}

// Get issues by type
export function getIssuesByType(type: IssueType): AccessibilityIssue[] {
  return issueRegistry.filter(issue => issue.types.includes(type));
}

// Get issue counts
export function getIssueCounts(): { automated: number; guided: number; manual: number; total: number } {
  return {
    automated: issueRegistry.filter(i => i.types.includes('automated')).length,
    guided: issueRegistry.filter(i => i.types.includes('guided')).length,
    manual: issueRegistry.filter(i => i.types.includes('manual')).length,
    total: issueRegistry.length,
  };
}
