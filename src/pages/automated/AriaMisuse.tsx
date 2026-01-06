import { useEffect } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { IssueCard } from '@/components/IssueCard';
import { registerIssue, type AccessibilityIssue } from '@/types/issues';

const ariaIssues: AccessibilityIssue[] = [
  {
    id: 'AX-044',
    title: 'Invalid ARIA role',
    types: ['automated'],
    expectedFinding: 'Element has non-existent ARIA role value',
    wcagMapping: ['4.1.2'],
    wcagName: 'Name, Role, Value',
    severity: 'high',
    howToFix: 'Use valid ARIA role from the WAI-ARIA specification',
    route: '/automated/aria-misuse',
    selectorHint: 'data-issue-id="AX-044"',
    checkHints: ['axe:aria-roles'],
  },
  {
    id: 'AX-045',
    title: 'aria-labelledby references non-existent ID',
    types: ['automated'],
    expectedFinding: 'aria-labelledby points to ID that does not exist',
    wcagMapping: ['4.1.2'],
    wcagName: 'Name, Role, Value',
    severity: 'high',
    howToFix: 'Ensure aria-labelledby references an existing element ID',
    route: '/automated/aria-misuse',
    selectorHint: 'data-issue-id="AX-045"',
    checkHints: ['axe:aria-valid-attr-value'],
  },
  {
    id: 'AX-046',
    title: 'aria-describedby references non-existent ID',
    types: ['automated'],
    expectedFinding: 'aria-describedby points to ID that does not exist',
    wcagMapping: ['4.1.2'],
    wcagName: 'Name, Role, Value',
    severity: 'medium',
    howToFix: 'Ensure aria-describedby references an existing element ID',
    route: '/automated/aria-misuse',
    selectorHint: 'data-issue-id="AX-046"',
    checkHints: ['axe:aria-valid-attr-value'],
  },
  {
    id: 'AX-047',
    title: 'Invalid ARIA attribute value',
    types: ['automated'],
    expectedFinding: 'ARIA attribute has invalid value',
    wcagMapping: ['4.1.2'],
    wcagName: 'Name, Role, Value',
    severity: 'medium',
    howToFix: 'Use correct value type for the ARIA attribute',
    route: '/automated/aria-misuse',
    selectorHint: 'data-issue-id="AX-047"',
    checkHints: ['axe:aria-valid-attr-value'],
  },
  {
    id: 'AX-048',
    title: 'ARIA attribute not allowed on element',
    types: ['automated'],
    expectedFinding: 'ARIA attribute used on element where it is not valid',
    wcagMapping: ['4.1.2'],
    wcagName: 'Name, Role, Value',
    severity: 'medium',
    howToFix: 'Use ARIA attributes only on appropriate elements',
    route: '/automated/aria-misuse',
    selectorHint: 'data-issue-id="AX-048"',
    checkHints: ['axe:aria-allowed-attr'],
  },
  {
    id: 'AX-049',
    title: 'Required ARIA attribute missing',
    types: ['automated'],
    expectedFinding: 'Element with role missing required ARIA attribute',
    wcagMapping: ['4.1.2'],
    wcagName: 'Name, Role, Value',
    severity: 'high',
    howToFix: 'Add required ARIA attributes for the specified role',
    route: '/automated/aria-misuse',
    selectorHint: 'data-issue-id="AX-049"',
    checkHints: ['axe:aria-required-attr'],
  },
  {
    id: 'AX-050',
    title: 'Role conflicts with native semantics',
    types: ['automated'],
    expectedFinding: 'ARIA role overrides appropriate native element semantics',
    wcagMapping: ['4.1.2'],
    wcagName: 'Name, Role, Value',
    severity: 'medium',
    howToFix: 'Use native HTML elements instead of ARIA roles when possible',
    route: '/automated/aria-misuse',
    selectorHint: 'data-issue-id="AX-050"',
    checkHints: ['manual:native-semantics'],
  },
  {
    id: 'AX-051',
    title: 'aria-hidden on focusable element',
    types: ['automated'],
    expectedFinding: 'Focusable element has aria-hidden="true"',
    wcagMapping: ['4.1.2'],
    wcagName: 'Name, Role, Value',
    severity: 'high',
    howToFix: 'Remove aria-hidden or make element non-focusable',
    route: '/automated/aria-misuse',
    selectorHint: 'data-issue-id="AX-051"',
    checkHints: ['axe:aria-hidden-focus'],
  },
  {
    id: 'AX-052',
    title: 'Empty aria-label',
    types: ['automated'],
    expectedFinding: 'Element has aria-label with empty or whitespace-only value',
    wcagMapping: ['4.1.2'],
    wcagName: 'Name, Role, Value',
    severity: 'high',
    howToFix: 'Provide meaningful text in aria-label',
    route: '/automated/aria-misuse',
    selectorHint: 'data-issue-id="AX-052"',
    checkHints: ['axe:aria-valid-attr-value'],
  },
  {
    id: 'AX-053',
    title: 'Nested interactive elements',
    types: ['automated'],
    expectedFinding: 'Button or link contains another interactive element',
    wcagMapping: ['4.1.2'],
    wcagName: 'Name, Role, Value',
    severity: 'high',
    howToFix: 'Flatten interactive structure - no buttons inside links or vice versa',
    route: '/automated/aria-misuse',
    selectorHint: 'data-issue-id="AX-053"',
    checkHints: ['axe:nested-interactive'],
  },
  {
    id: 'AX-054',
    title: 'Incorrect tablist structure',
    types: ['automated'],
    expectedFinding: 'Tab structure missing required roles or relationships',
    wcagMapping: ['4.1.2'],
    wcagName: 'Name, Role, Value',
    severity: 'medium',
    howToFix: 'Use tablist, tab, and tabpanel roles with proper aria-controls/labelledby',
    route: '/automated/aria-misuse',
    selectorHint: 'data-issue-id="AX-054"',
    checkHints: ['axe:aria-required-children'],
  },
];

export default function AutomatedAriaMisuse() {
  useEffect(() => {
    ariaIssues.forEach(issue => {
      if (!window.__registeredIssues?.has(issue.id)) {
        registerIssue(issue);
        if (!window.__registeredIssues) window.__registeredIssues = new Set();
        window.__registeredIssues.add(issue.id);
      }
    });
  }, []);

  return (
    <PageWrapper 
      title="ARIA Misuse Issues" 
      description="Accessibility issues related to incorrect ARIA usage"
    >
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            ARIA Misuse Accessibility Issues
          </h1>
          <p className="text-muted-foreground">
            This page contains {ariaIssues.length} ARIA-related accessibility issues.
          </p>
        </header>

        {/* AX-044: Invalid ARIA role */}
        <section>
          <IssueCard issue={ariaIssues[0]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            {/* ISSUE: "superbutton" is not a valid ARIA role */}
            <div
              role="superbutton"
              data-issue-id="AX-044"
              data-issue-type="automated"
              data-wcag="4.1.2"
              className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded cursor-pointer"
            >
              Invalid Role Element
            </div>
          </div>
        </section>

        {/* AX-045: aria-labelledby broken reference */}
        <section>
          <IssueCard issue={ariaIssues[1]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            {/* ISSUE: References ID "dialog-title" which doesn't exist */}
            <div
              role="dialog"
              aria-labelledby="nonexistent-dialog-title"
              data-issue-id="AX-045"
              data-issue-type="automated"
              data-wcag="4.1.2"
              className="p-4 border border-border rounded bg-muted"
            >
              <p>This dialog's aria-labelledby points to an ID that doesn't exist.</p>
            </div>
          </div>
        </section>

        {/* AX-046: aria-describedby broken reference */}
        <section>
          <IssueCard issue={ariaIssues[2]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <label htmlFor="described-input" className="block mb-1 font-medium">Password</label>
            {/* ISSUE: References ID that doesn't exist */}
            <input
              type="password"
              id="described-input"
              aria-describedby="password-requirements-that-dont-exist"
              data-issue-id="AX-046"
              data-issue-type="automated"
              data-wcag="4.1.2"
              className="px-3 py-2 border border-input rounded w-full max-w-xs"
            />
          </div>
        </section>

        {/* AX-047: Invalid attribute value */}
        <section>
          <IssueCard issue={ariaIssues[3]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            {/* ISSUE: aria-expanded should be "true" or "false", not "yes" */}
            <div
              role="button"
              aria-expanded={"yes" as unknown as boolean}
              data-issue-id="AX-047"
              data-issue-type="automated"
              data-wcag="4.1.2"
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded"
            >
              Toggle Menu (invalid aria-expanded="yes")
            </button>
          </div>
        </section>

        {/* AX-048: ARIA attribute not allowed */}
        <section>
          <IssueCard issue={ariaIssues[4]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            {/* ISSUE: aria-checked is not valid on a paragraph */}
            <p
              aria-checked="true"
              data-issue-id="AX-048"
              data-issue-type="automated"
              data-wcag="4.1.2"
              className="text-foreground"
            >
              This paragraph has aria-checked which is not valid for this element.
            </p>
          </div>
        </section>

        {/* AX-049: Required attribute missing */}
        <section>
          <IssueCard issue={ariaIssues[5]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            {/* ISSUE: role="slider" requires aria-valuenow, aria-valuemin, aria-valuemax */}
            <div
              role="slider"
              data-issue-id="AX-049"
              data-issue-type="automated"
              data-wcag="4.1.2"
              className="w-full h-4 bg-muted rounded cursor-pointer"
              tabIndex={0}
            >
              <div className="w-1/3 h-full bg-primary rounded"></div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Slider missing required aria-valuenow, aria-valuemin, aria-valuemax
            </p>
          </div>
        </section>

        {/* AX-050: Role conflicts with native */}
        <section>
          <IssueCard issue={ariaIssues[6]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            {/* ISSUE: Button element given role="link" - confusing */}
            <button
              role="link"
              data-issue-id="AX-050"
              data-issue-type="automated"
              data-wcag="4.1.2"
              className="px-4 py-2 bg-primary text-primary-foreground rounded"
            >
              I'm a button with role="link"
            </button>
          </div>
        </section>

        {/* AX-051: aria-hidden on focusable */}
        <section>
          <IssueCard issue={ariaIssues[7]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            {/* ISSUE: Button is hidden from AT but still focusable */}
            <button
              aria-hidden="true"
              data-issue-id="AX-051"
              data-issue-type="automated"
              data-wcag="4.1.2"
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded"
            >
              Hidden but Focusable
            </button>
            <p className="text-sm text-muted-foreground mt-2">
              This button has aria-hidden="true" but can still receive keyboard focus
            </p>
          </div>
        </section>

        {/* AX-052: Empty aria-label */}
        <section>
          <IssueCard issue={ariaIssues[8]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            {/* ISSUE: aria-label is empty */}
            <button
              aria-label="   "
              data-issue-id="AX-052"
              data-issue-type="automated"
              data-wcag="4.1.2"
              className="p-3 bg-primary text-primary-foreground rounded"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <p className="text-sm text-muted-foreground mt-2">
              Button has aria-label with only whitespace
            </p>
          </div>
        </section>

        {/* AX-053: Nested interactive */}
        <section>
          <IssueCard issue={ariaIssues[9]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            {/* ISSUE: Button nested inside a link */}
            <a 
              href="#"
              data-issue-id="AX-053"
              data-issue-type="automated"
              data-wcag="4.1.2"
              className="block p-4 border border-border rounded hover:bg-muted"
            >
              <span className="block font-medium">Product Card Link</span>
              <span className="block text-sm text-muted-foreground">Click anywhere to view</span>
              <button className="mt-2 px-3 py-1 bg-primary text-primary-foreground rounded text-sm">
                Add to Cart
              </button>
            </a>
          </div>
        </section>

        {/* AX-054: Incorrect tablist structure */}
        <section>
          <IssueCard issue={ariaIssues[10]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            {/* ISSUE: Tab structure missing proper aria-controls and roles */}
            <div
              role="tablist"
              data-issue-id="AX-054"
              data-issue-type="automated"
              data-wcag="4.1.2"
              className="flex gap-2 border-b border-border"
            >
              <button className="px-4 py-2 border-b-2 border-primary">Tab 1</button>
              <button className="px-4 py-2">Tab 2</button>
              <button className="px-4 py-2">Tab 3</button>
            </div>
            <div className="p-4">
              Tab content here - but no tabpanel role, no aria-controls on tabs
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
