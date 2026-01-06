import { useEffect } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { IssueCard } from '@/components/IssueCard';
import { registerIssue, type AccessibilityIssue } from '@/types/issues';

const structureIssues: AccessibilityIssue[] = [
  {
    id: 'AX-013',
    title: 'Skipped heading level',
    types: ['automated'],
    expectedFinding: 'Heading levels are skipped (e.g., h2 followed by h4)',
    wcagMapping: ['1.3.1', '2.4.6'],
    wcagName: 'Info and Relationships, Headings and Labels',
    severity: 'medium',
    howToFix: 'Use sequential heading levels without skipping (h1, h2, h3, etc.)',
    route: '/automated/structure',
    selectorHint: 'data-issue-id="AX-013"',
    checkHints: ['axe:heading-order'],
  },
  {
    id: 'AX-014',
    title: 'Empty heading',
    types: ['automated'],
    expectedFinding: 'Heading element contains no text content',
    wcagMapping: ['1.3.1', '2.4.6'],
    wcagName: 'Info and Relationships, Headings and Labels',
    severity: 'high',
    howToFix: 'Add meaningful text content to the heading or remove it',
    route: '/automated/structure',
    selectorHint: 'data-issue-id="AX-014"',
    checkHints: ['axe:empty-heading'],
  },
  {
    id: 'AX-015',
    title: 'Multiple h1 elements',
    types: ['automated'],
    expectedFinding: 'Page contains multiple h1 headings',
    wcagMapping: ['1.3.1'],
    wcagName: 'Info and Relationships',
    severity: 'medium',
    howToFix: 'Use only one h1 per page representing the main topic',
    route: '/automated/structure',
    selectorHint: 'data-issue-id="AX-015"',
    checkHints: ['axe:page-has-heading-one'],
  },
  {
    id: 'AX-016',
    title: 'Missing page title',
    types: ['automated'],
    expectedFinding: 'Document has empty or missing title element',
    wcagMapping: ['2.4.2'],
    wcagName: 'Page Titled',
    severity: 'high',
    howToFix: 'Add a descriptive title element to the document head',
    route: '/automated/structure',
    selectorHint: 'data-issue-id="AX-016"',
    checkHints: ['axe:document-title'],
  },
  {
    id: 'AX-017',
    title: 'Missing main landmark',
    types: ['automated'],
    expectedFinding: 'Page has no main landmark element',
    wcagMapping: ['1.3.1'],
    wcagName: 'Info and Relationships',
    severity: 'medium',
    howToFix: 'Add <main> element or role="main" to primary content area',
    route: '/automated/structure',
    selectorHint: 'data-issue-id="AX-017"',
    checkHints: ['axe:landmark-main-is-top-level', 'axe:landmark-one-main'],
  },
  {
    id: 'AX-018',
    title: 'Duplicate landmarks without labels',
    types: ['automated'],
    expectedFinding: 'Multiple nav elements without distinguishing labels',
    wcagMapping: ['1.3.1'],
    wcagName: 'Info and Relationships',
    severity: 'medium',
    howToFix: 'Add aria-label to distinguish multiple landmarks of same type',
    route: '/automated/structure',
    selectorHint: 'data-issue-id="AX-018"',
    checkHints: ['axe:landmark-unique'],
  },
  {
    id: 'AX-019',
    title: 'List markup misuse',
    types: ['automated'],
    expectedFinding: 'List-like content not using ul/ol/li elements',
    wcagMapping: ['1.3.1'],
    wcagName: 'Info and Relationships',
    severity: 'low',
    howToFix: 'Use proper list markup (ul/ol with li children)',
    route: '/automated/structure',
    selectorHint: 'data-issue-id="AX-019"',
    checkHints: ['manual:list-structure'],
  },
  {
    id: 'AX-020',
    title: 'Table without headers',
    types: ['automated'],
    expectedFinding: 'Data table has no th elements or scope attributes',
    wcagMapping: ['1.3.1'],
    wcagName: 'Info and Relationships',
    severity: 'high',
    howToFix: 'Add th elements for column/row headers with scope attribute',
    route: '/automated/structure',
    selectorHint: 'data-issue-id="AX-020"',
    checkHints: ['axe:td-headers-attr', 'axe:th-has-data-cells'],
  },
  {
    id: 'AX-021',
    title: 'Layout table with role=presentation missing',
    types: ['automated'],
    expectedFinding: 'Layout table should have role="presentation" or role="none"',
    wcagMapping: ['1.3.1'],
    wcagName: 'Info and Relationships',
    severity: 'low',
    howToFix: 'Add role="presentation" to tables used purely for layout',
    route: '/automated/structure',
    selectorHint: 'data-issue-id="AX-021"',
    checkHints: ['axe:table-fake-caption'],
  },
  {
    id: 'AX-022',
    title: 'Content in wrong reading order',
    types: ['automated', 'manual'],
    expectedFinding: 'DOM order differs from visual order in ways that affect meaning',
    wcagMapping: ['1.3.2'],
    wcagName: 'Meaningful Sequence',
    severity: 'medium',
    howToFix: 'Ensure DOM order matches visual reading order',
    route: '/automated/structure',
    selectorHint: 'data-issue-id="AX-022"',
    checkHints: ['manual:reading-order'],
  },
];

export default function AutomatedStructure() {
  useEffect(() => {
    structureIssues.forEach(issue => {
      if (!window.__registeredIssues?.has(issue.id)) {
        registerIssue(issue);
        if (!window.__registeredIssues) window.__registeredIssues = new Set();
        window.__registeredIssues.add(issue.id);
      }
    });
  }, []);

  return (
    <PageWrapper 
      title="Structure Issues" 
      description="Automated accessibility issues related to document structure, headings, and landmarks"
    >
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Structure Accessibility Issues
          </h1>
          <p className="text-muted-foreground">
            This page contains {structureIssues.length} structure-related accessibility issues.
          </p>
        </header>

        {/* AX-013: Skipped heading level */}
        <section>
          <IssueCard issue={structureIssues[0]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <h2 className="text-xl font-semibold mb-2">Section Title</h2>
            {/* ISSUE: h4 follows h2, skipping h3 */}
            <h4 
              className="text-lg font-medium"
              data-issue-id="AX-013"
              data-issue-type="automated"
              data-wcag="1.3.1,2.4.6"
            >
              Subsection That Skipped h3
            </h4>
            <p className="text-muted-foreground">Content under improperly nested heading.</p>
          </div>
        </section>

        {/* AX-014: Empty heading */}
        <section>
          <IssueCard issue={structureIssues[1]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            {/* ISSUE: Heading has no text content */}
            <h3 
              className="text-lg font-semibold mb-2"
              data-issue-id="AX-014"
              data-issue-type="automated"
              data-wcag="1.3.1,2.4.6"
            >
              {/* Empty heading - no text */}
            </h3>
            <p className="text-muted-foreground">Content following an empty heading.</p>
          </div>
        </section>

        {/* AX-015: Multiple h1 */}
        <section>
          <IssueCard issue={structureIssues[2]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            {/* ISSUE: Second h1 on the page */}
            <h1 
              className="text-2xl font-bold mb-2"
              data-issue-id="AX-015"
              data-issue-type="automated"
              data-wcag="1.3.1"
            >
              Another Main Heading (Duplicate H1)
            </h1>
            <p className="text-muted-foreground">This is a second h1 which violates best practices.</p>
          </div>
        </section>

        {/* AX-016: Note about missing title - can't demonstrate without breaking page */}
        <section>
          <IssueCard issue={structureIssues[3]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <p 
              className="text-muted-foreground"
              data-issue-id="AX-016"
              data-issue-type="automated"
              data-wcag="2.4.2"
            >
              <strong>Note:</strong> This issue would require an empty or missing title tag in the HTML head. 
              For demonstration, imagine the page had no title element.
            </p>
          </div>
        </section>

        {/* AX-017: Missing main landmark - demonstrated in isolated div */}
        <section>
          <IssueCard issue={structureIssues[4]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <p 
              className="text-muted-foreground"
              data-issue-id="AX-017"
              data-issue-type="automated"
              data-wcag="1.3.1"
            >
              <strong>Note:</strong> This demo shows content that should be in a main landmark. 
              The actual page has a main element, but this illustrates the issue pattern.
            </p>
          </div>
        </section>

        {/* AX-018: Duplicate landmarks */}
        <section>
          <IssueCard issue={structureIssues[5]} />
          <div className="p-4 border border-border rounded-lg bg-card space-y-4">
            {/* ISSUE: Two nav elements without aria-labels */}
            <nav 
              data-issue-id="AX-018"
              data-issue-type="automated"
              data-wcag="1.3.1"
              className="flex gap-4 p-2 bg-muted rounded"
            >
              <a href="#" className="text-primary">Home</a>
              <a href="#" className="text-primary">Products</a>
            </nav>
            <nav className="flex gap-4 p-2 bg-muted rounded">
              <a href="#" className="text-primary">Privacy</a>
              <a href="#" className="text-primary">Terms</a>
            </nav>
            <p className="text-sm text-muted-foreground">Two nav elements above with no distinguishing labels.</p>
          </div>
        </section>

        {/* AX-019: List markup misuse */}
        <section>
          <IssueCard issue={structureIssues[6]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            {/* ISSUE: List-like content using divs instead of ul/li */}
            <div 
              data-issue-id="AX-019"
              data-issue-type="automated"
              data-wcag="1.3.1"
              className="space-y-1"
            >
              <div>• Feature one</div>
              <div>• Feature two</div>
              <div>• Feature three</div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Above uses divs with bullet characters instead of proper list markup.</p>
          </div>
        </section>

        {/* AX-020: Table without headers */}
        <section>
          <IssueCard issue={structureIssues[7]} />
          <div className="p-4 border border-border rounded-lg bg-card overflow-x-auto">
            {/* ISSUE: Data table with no th elements */}
            <table 
              data-issue-id="AX-020"
              data-issue-type="automated"
              data-wcag="1.3.1"
              className="w-full border-collapse"
            >
              <tbody>
                <tr className="bg-muted">
                  <td className="border border-border px-3 py-2 font-semibold">Name</td>
                  <td className="border border-border px-3 py-2 font-semibold">Email</td>
                  <td className="border border-border px-3 py-2 font-semibold">Role</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2">John Doe</td>
                  <td className="border border-border px-3 py-2">john@example.com</td>
                  <td className="border border-border px-3 py-2">Admin</td>
                </tr>
                <tr>
                  <td className="border border-border px-3 py-2">Jane Smith</td>
                  <td className="border border-border px-3 py-2">jane@example.com</td>
                  <td className="border border-border px-3 py-2">Editor</td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm text-muted-foreground mt-2">Table uses td for headers instead of th with scope.</p>
          </div>
        </section>

        {/* AX-021: Layout table */}
        <section>
          <IssueCard issue={structureIssues[8]} />
          <div className="p-4 border border-border rounded-lg bg-card overflow-x-auto">
            {/* ISSUE: Layout table missing role="presentation" */}
            <table 
              data-issue-id="AX-021"
              data-issue-type="automated"
              data-wcag="1.3.1"
              className="w-full"
            >
              <tbody>
                <tr>
                  <td className="p-4 align-top">
                    <div className="bg-muted p-3 rounded">Sidebar content</div>
                  </td>
                  <td className="p-4 align-top">
                    <div className="bg-muted p-3 rounded">Main content area</div>
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm text-muted-foreground mt-2">Layout table without role="presentation".</p>
          </div>
        </section>

        {/* AX-022: Wrong reading order */}
        <section>
          <IssueCard issue={structureIssues[9]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            {/* ISSUE: Visual order differs from DOM order */}
            <div 
              className="flex flex-row-reverse gap-4"
              data-issue-id="AX-022"
              data-issue-type="automated,manual"
              data-wcag="1.3.2"
            >
              <div className="bg-primary text-primary-foreground p-3 rounded">
                3. Third in DOM, First visually
              </div>
              <div className="bg-secondary text-secondary-foreground p-3 rounded">
                2. Second in DOM, Second visually
              </div>
              <div className="bg-muted text-foreground p-3 rounded">
                1. First in DOM, Third visually
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">CSS flex-row-reverse makes visual order opposite of DOM order.</p>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
