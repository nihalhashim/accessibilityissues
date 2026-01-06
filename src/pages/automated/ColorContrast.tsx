import { useEffect } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { IssueCard } from '@/components/IssueCard';
import { registerIssue, type AccessibilityIssue } from '@/types/issues';

const colorIssues: AccessibilityIssue[] = [
  {
    id: 'AX-034',
    title: 'Text contrast ratio too low (normal text)',
    types: ['automated'],
    expectedFinding: 'Text has contrast ratio below 4.5:1 for normal text',
    wcagMapping: ['1.4.3'],
    wcagName: 'Contrast (Minimum)',
    severity: 'high',
    howToFix: 'Increase contrast to at least 4.5:1 for normal text',
    route: '/automated/color-contrast',
    selectorHint: 'data-issue-id="AX-034"',
    checkHints: ['axe:color-contrast'],
  },
  {
    id: 'AX-035',
    title: 'Text contrast ratio too low (large text)',
    types: ['automated'],
    expectedFinding: 'Large text has contrast ratio below 3:1',
    wcagMapping: ['1.4.3'],
    wcagName: 'Contrast (Minimum)',
    severity: 'medium',
    howToFix: 'Increase contrast to at least 3:1 for large text (18pt+ or 14pt bold)',
    route: '/automated/color-contrast',
    selectorHint: 'data-issue-id="AX-035"',
    checkHints: ['axe:color-contrast'],
  },
  {
    id: 'AX-036',
    title: 'Link not distinguishable from text',
    types: ['automated', 'manual'],
    expectedFinding: 'Link relies only on color to distinguish from surrounding text',
    wcagMapping: ['1.4.1'],
    wcagName: 'Use of Color',
    severity: 'medium',
    howToFix: 'Add underline or other non-color visual distinction to links',
    route: '/automated/color-contrast',
    selectorHint: 'data-issue-id="AX-036"',
    checkHints: ['axe:link-in-text-block'],
  },
  {
    id: 'AX-037',
    title: 'Form input border contrast too low',
    types: ['automated'],
    expectedFinding: 'Input border has contrast ratio below 3:1 against background',
    wcagMapping: ['1.4.11'],
    wcagName: 'Non-text Contrast',
    severity: 'medium',
    howToFix: 'Increase input border contrast to at least 3:1',
    route: '/automated/color-contrast',
    selectorHint: 'data-issue-id="AX-037"',
    checkHints: ['manual:non-text-contrast'],
  },
  {
    id: 'AX-038',
    title: 'Button focus indicator contrast too low',
    types: ['automated', 'guided'],
    expectedFinding: 'Focus indicator color has insufficient contrast',
    wcagMapping: ['1.4.11', '2.4.7'],
    wcagName: 'Non-text Contrast, Focus Visible',
    severity: 'medium',
    howToFix: 'Use focus indicator with at least 3:1 contrast ratio',
    route: '/automated/color-contrast',
    selectorHint: 'data-issue-id="AX-038"',
    checkHints: ['manual:focus-contrast'],
  },
  {
    id: 'AX-039',
    title: 'Icon-only button low contrast',
    types: ['automated'],
    expectedFinding: 'Icon color has insufficient contrast against background',
    wcagMapping: ['1.4.11'],
    wcagName: 'Non-text Contrast',
    severity: 'medium',
    howToFix: 'Increase icon color contrast to at least 3:1',
    route: '/automated/color-contrast',
    selectorHint: 'data-issue-id="AX-039"',
    checkHints: ['manual:non-text-contrast'],
  },
  {
    id: 'AX-040',
    title: 'Placeholder text low contrast',
    types: ['automated'],
    expectedFinding: 'Placeholder text has insufficient contrast',
    wcagMapping: ['1.4.3'],
    wcagName: 'Contrast (Minimum)',
    severity: 'low',
    howToFix: 'Increase placeholder text contrast to at least 4.5:1',
    route: '/automated/color-contrast',
    selectorHint: 'data-issue-id="AX-040"',
    checkHints: ['axe:color-contrast'],
  },
  {
    id: 'AX-041',
    title: 'Color-only error indication',
    types: ['automated', 'manual'],
    expectedFinding: 'Error state indicated only by color change',
    wcagMapping: ['1.4.1'],
    wcagName: 'Use of Color',
    severity: 'high',
    howToFix: 'Add icon, text, or other non-color indicator for errors',
    route: '/automated/color-contrast',
    selectorHint: 'data-issue-id="AX-041"',
    checkHints: ['manual:use-of-color'],
  },
  {
    id: 'AX-042',
    title: 'Chart uses color only to distinguish data',
    types: ['manual'],
    expectedFinding: 'Chart legend relies solely on color differentiation',
    wcagMapping: ['1.4.1'],
    wcagName: 'Use of Color',
    severity: 'medium',
    howToFix: 'Add patterns, labels, or other non-color distinctions',
    route: '/automated/color-contrast',
    selectorHint: 'data-issue-id="AX-042"',
    checkHints: ['manual:use-of-color'],
  },
  {
    id: 'AX-043',
    title: 'Disabled button text too low contrast',
    types: ['automated'],
    expectedFinding: 'Disabled state text contrast is extremely low',
    wcagMapping: ['1.4.3'],
    wcagName: 'Contrast (Minimum)',
    severity: 'low',
    howToFix: 'While disabled elements are exempt, consider improving contrast for usability',
    route: '/automated/color-contrast',
    selectorHint: 'data-issue-id="AX-043"',
    checkHints: ['axe:color-contrast'],
  },
];

export default function AutomatedColorContrast() {
  useEffect(() => {
    colorIssues.forEach(issue => {
      if (!window.__registeredIssues?.has(issue.id)) {
        registerIssue(issue);
        if (!window.__registeredIssues) window.__registeredIssues = new Set();
        window.__registeredIssues.add(issue.id);
      }
    });
  }, []);

  return (
    <PageWrapper 
      title="Color Contrast Issues" 
      description="Accessibility issues related to color contrast and use of color"
    >
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Color Contrast Accessibility Issues
          </h1>
          <p className="text-muted-foreground">
            This page contains {colorIssues.length} color and contrast-related accessibility issues.
          </p>
        </header>

        {/* AX-034: Low contrast normal text */}
        <section>
          <IssueCard issue={colorIssues[0]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            {/* ISSUE: Light gray text on white - about 2:1 contrast */}
            <p 
              style={{ color: '#aaaaaa' }}
              data-issue-id="AX-034"
              data-issue-type="automated"
              data-wcag="1.4.3"
            >
              This text is light gray (#aaa) on white background, failing the 4.5:1 contrast requirement for normal text.
            </p>
          </div>
        </section>

        {/* AX-035: Low contrast large text */}
        <section>
          <IssueCard issue={colorIssues[1]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            {/* ISSUE: Large text with ~2.5:1 contrast */}
            <h2 
              className="text-2xl font-bold"
              style={{ color: '#999999' }}
              data-issue-id="AX-035"
              data-issue-type="automated"
              data-wcag="1.4.3"
            >
              Large Heading with Insufficient Contrast
            </h2>
          </div>
        </section>

        {/* AX-036: Link not distinguishable */}
        <section>
          <IssueCard issue={colorIssues[2]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <p className="text-foreground">
              Here is some paragraph text with a 
              {/* ISSUE: Link only differs by color, no underline */}
              <a 
                href="#"
                className="no-underline"
                style={{ color: 'hsl(var(--primary))' }}
                data-issue-id="AX-036"
                data-issue-type="automated,manual"
                data-wcag="1.4.1"
              > hidden link </a>
              embedded in the middle that only differs by color.
            </p>
          </div>
        </section>

        {/* AX-037: Input border low contrast */}
        <section>
          <IssueCard issue={colorIssues[3]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <label htmlFor="low-border-input" className="block mb-1 font-medium">Email Address</label>
            {/* ISSUE: Very light border - hard to see input boundaries */}
            <input
              type="email"
              id="low-border-input"
              style={{ borderColor: '#e8e8e8' }}
              data-issue-id="AX-037"
              data-issue-type="automated"
              data-wcag="1.4.11"
              className="px-3 py-2 w-full max-w-xs rounded border"
            />
          </div>
        </section>

        {/* AX-038: Focus indicator low contrast */}
        <section>
          <IssueCard issue={colorIssues[4]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <p className="mb-2 text-sm text-muted-foreground">Tab to this button to see the low-contrast focus ring</p>
            {/* ISSUE: Very light focus ring */}
            <button
              data-issue-id="AX-038"
              data-issue-type="automated,guided"
              data-wcag="1.4.11,2.4.7"
              className="px-4 py-2 bg-primary text-primary-foreground rounded"
              style={{ 
                outline: 'none',
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 2px #e0e0e0';
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Click Me
            </button>
          </div>
        </section>

        {/* AX-039: Icon low contrast */}
        <section>
          <IssueCard issue={colorIssues[5]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <p className="mb-2 text-sm text-muted-foreground">Settings Button</p>
            {/* ISSUE: Light gray icon on white */}
            <button
              data-issue-id="AX-039"
              data-issue-type="automated"
              data-wcag="1.4.11"
              className="p-3 rounded border border-border"
              aria-label="Settings"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#cccccc"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
              </svg>
            </button>
          </div>
        </section>

        {/* AX-040: Placeholder low contrast */}
        <section>
          <IssueCard issue={colorIssues[6]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <label htmlFor="placeholder-input" className="block mb-1 font-medium">Search</label>
            {/* ISSUE: Very light placeholder text */}
            <input
              type="text"
              id="placeholder-input"
              placeholder="Enter search term..."
              data-issue-id="AX-040"
              data-issue-type="automated"
              data-wcag="1.4.3"
              className="px-3 py-2 w-full max-w-xs rounded border border-input"
              style={{ 
                ['--placeholder-color' as string]: '#d0d0d0',
              }}
            />
            <style>{`
              input[data-issue-id="AX-040"]::placeholder {
                color: #d0d0d0;
              }
            `}</style>
          </div>
        </section>

        {/* AX-041: Color-only error */}
        <section>
          <IssueCard issue={colorIssues[7]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <label htmlFor="error-field" className="block mb-1 font-medium">Password</label>
            {/* ISSUE: Only border color indicates error - no icon or text */}
            <input
              type="password"
              id="error-field"
              data-issue-id="AX-041"
              data-issue-type="automated,manual"
              data-wcag="1.4.1"
              className="px-3 py-2 w-full max-w-xs rounded border-2"
              style={{ borderColor: '#ef4444' }}
            />
            <p className="text-sm text-muted-foreground mt-1">
              The red border is the only indication of an error state
            </p>
          </div>
        </section>

        {/* AX-042: Chart color-only */}
        <section>
          <IssueCard issue={colorIssues[8]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            {/* ISSUE: Chart legend uses only colors */}
            <div
              data-issue-id="AX-042"
              data-issue-type="manual"
              data-wcag="1.4.1"
              className="space-y-4"
            >
              <div className="flex gap-4 h-32 items-end">
                <div className="w-16 bg-blue-500 h-full"></div>
                <div className="w-16 bg-green-500 h-3/4"></div>
                <div className="w-16 bg-purple-500 h-1/2"></div>
                <div className="w-16 bg-orange-500 h-1/4"></div>
              </div>
              <div className="flex gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-blue-500 rounded"></span> Q1
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-green-500 rounded"></span> Q2
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-purple-500 rounded"></span> Q3
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-orange-500 rounded"></span> Q4
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Chart legend relies only on color to distinguish quarters</p>
            </div>
          </div>
        </section>

        {/* AX-043: Disabled button contrast */}
        <section>
          <IssueCard issue={colorIssues[9]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            {/* ISSUE: Extremely low contrast disabled button */}
            <button
              disabled
              data-issue-id="AX-043"
              data-issue-type="automated"
              data-wcag="1.4.3"
              className="px-4 py-2 rounded"
              style={{ 
                backgroundColor: '#f5f5f5',
                color: '#e0e0e0',
              }}
            >
              Disabled Action
            </button>
            <p className="text-sm text-muted-foreground mt-2">
              While WCAG allows low contrast for disabled elements, this is barely visible
            </p>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
