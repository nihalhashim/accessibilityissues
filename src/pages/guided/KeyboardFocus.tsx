import { useEffect, useState } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { IssueCard } from '@/components/IssueCard';
import { registerIssue, type AccessibilityIssue } from '@/types/issues';

const keyboardIssues: AccessibilityIssue[] = [
  {
    id: 'AX-055',
    title: 'Keyboard trap in custom widget',
    types: ['guided'],
    expectedFinding: 'User cannot Tab out of widget once focused',
    wcagMapping: ['2.1.2'],
    wcagName: 'No Keyboard Trap',
    severity: 'high',
    howToFix: 'Ensure Tab moves focus out of widget; provide documented escape method',
    route: '/guided/keyboard-focus',
    selectorHint: 'data-issue-id="AX-055"',
    checkHints: ['guided:keyboard-trap'],
  },
  {
    id: 'AX-056',
    title: 'Positive tabindex disrupts order',
    types: ['guided'],
    expectedFinding: 'Elements with positive tabindex break natural focus order',
    wcagMapping: ['2.4.3'],
    wcagName: 'Focus Order',
    severity: 'medium',
    howToFix: 'Remove positive tabindex values; use DOM order for focus sequence',
    route: '/guided/keyboard-focus',
    selectorHint: 'data-issue-id="AX-056"',
    checkHints: ['axe:tabindex', 'guided:focus-order'],
  },
  {
    id: 'AX-057',
    title: 'Focus indicator removed via CSS',
    types: ['guided', 'automated'],
    expectedFinding: 'Element has outline:none without replacement focus style',
    wcagMapping: ['2.4.7'],
    wcagName: 'Focus Visible',
    severity: 'high',
    howToFix: 'Remove outline:none or add visible custom focus indicator',
    route: '/guided/keyboard-focus',
    selectorHint: 'data-issue-id="AX-057"',
    checkHints: ['guided:focus-visible'],
  },
  {
    id: 'AX-058',
    title: 'Custom control not keyboard operable',
    types: ['guided'],
    expectedFinding: 'Div-based control cannot be activated with Enter/Space',
    wcagMapping: ['2.1.1'],
    wcagName: 'Keyboard',
    severity: 'high',
    howToFix: 'Add keyboard event handlers or use native button element',
    route: '/guided/keyboard-focus',
    selectorHint: 'data-issue-id="AX-058"',
    checkHints: ['guided:keyboard-operable'],
  },
  {
    id: 'AX-059',
    title: 'Skip link missing or broken',
    types: ['guided'],
    expectedFinding: 'No skip link, or skip link target does not exist',
    wcagMapping: ['2.4.1'],
    wcagName: 'Bypass Blocks',
    severity: 'medium',
    howToFix: 'Add working skip link as first focusable element',
    route: '/guided/keyboard-focus',
    selectorHint: 'data-issue-id="AX-059"',
    checkHints: ['axe:skip-link', 'guided:skip-link'],
  },
  {
    id: 'AX-060',
    title: 'Focus moves unexpectedly',
    types: ['guided'],
    expectedFinding: 'Focus jumps to unexpected location on interaction',
    wcagMapping: ['3.2.1'],
    wcagName: 'On Focus',
    severity: 'medium',
    howToFix: 'Do not change context on focus; only on explicit activation',
    route: '/guided/keyboard-focus',
    selectorHint: 'data-issue-id="AX-060"',
    checkHints: ['guided:focus-behavior'],
  },
];

export default function GuidedKeyboardFocus() {
  const [trapActive, setTrapActive] = useState(false);

  useEffect(() => {
    keyboardIssues.forEach(issue => {
      if (!window.__registeredIssues?.has(issue.id)) {
        registerIssue(issue);
        if (!window.__registeredIssues) window.__registeredIssues = new Set();
        window.__registeredIssues.add(issue.id);
      }
    });
  }, []);

  return (
    <PageWrapper title="Keyboard & Focus Issues" description="Guided accessibility testing for keyboard navigation and focus management">
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-foreground mb-4">Keyboard & Focus Issues</h1>
          <p className="text-muted-foreground">Test these issues with keyboard navigation (Tab, Shift+Tab, Enter, Escape).</p>
        </header>

        {/* AX-055: Keyboard trap */}
        <section>
          <IssueCard issue={keyboardIssues[0]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <p className="mb-2 text-sm text-muted-foreground">Tab into this widget - you cannot Tab out!</p>
            <div
              data-issue-id="AX-055"
              data-issue-type="guided"
              data-wcag="2.1.2"
              className="p-4 bg-muted rounded"
              onKeyDown={(e) => {
                if (e.key === 'Tab' && trapActive) {
                  e.preventDefault();
                }
              }}
            >
              <button onClick={() => setTrapActive(true)} className="px-3 py-1 bg-primary text-primary-foreground rounded mr-2">Activate Trap</button>
              <button onClick={() => setTrapActive(false)} className="px-3 py-1 bg-secondary text-secondary-foreground rounded">Deactivate</button>
              {trapActive && <p className="mt-2 text-sm text-destructive">Trap active! Tab is blocked.</p>}
            </div>
          </div>
        </section>

        {/* AX-056: Positive tabindex */}
        <section>
          <IssueCard issue={keyboardIssues[1]} />
          <div className="p-4 border border-border rounded-lg bg-card space-y-2" data-issue-id="AX-056" data-issue-type="guided" data-wcag="2.4.3">
            <button tabIndex={3} className="px-3 py-1 bg-muted rounded">Third (tabindex=3)</button>
            <button tabIndex={1} className="px-3 py-1 bg-muted rounded ml-2">First (tabindex=1)</button>
            <button tabIndex={2} className="px-3 py-1 bg-muted rounded ml-2">Second (tabindex=2)</button>
            <p className="text-sm text-muted-foreground">Tab order is 1→2→3, not visual order</p>
          </div>
        </section>

        {/* AX-057: Focus indicator removed */}
        <section>
          <IssueCard issue={keyboardIssues[2]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <button
              data-issue-id="AX-057"
              data-issue-type="guided,automated"
              data-wcag="2.4.7"
              className="px-4 py-2 bg-primary text-primary-foreground rounded"
              style={{ outline: 'none' }}
            >
              No Focus Ring Visible
            </button>
          </div>
        </section>

        {/* AX-058: Custom control not keyboard operable */}
        <section>
          <IssueCard issue={keyboardIssues[3]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <div
              data-issue-id="AX-058"
              data-issue-type="guided"
              data-wcag="2.1.1"
              tabIndex={0}
              onClick={() => alert('Clicked!')}
              className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded cursor-pointer"
            >
              Click Me (Enter/Space won't work)
            </div>
          </div>
        </section>

        {/* AX-059: Skip link broken */}
        <section>
          <IssueCard issue={keyboardIssues[4]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <a href="#nonexistent-main" data-issue-id="AX-059" data-issue-type="guided" data-wcag="2.4.1" className="text-primary underline">
              Skip to main content
            </a>
            <p className="text-sm text-muted-foreground mt-2">This skip link targets #nonexistent-main which doesn't exist</p>
          </div>
        </section>

        {/* AX-060: Focus moves unexpectedly */}
        <section>
          <IssueCard issue={keyboardIssues[5]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <input
              type="text"
              placeholder="Focus here triggers alert"
              data-issue-id="AX-060"
              data-issue-type="guided"
              data-wcag="3.2.1"
              onFocus={() => alert('Context change on focus!')}
              className="px-3 py-2 border border-input rounded"
            />
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
