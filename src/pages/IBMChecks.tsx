import { useEffect } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { IssueCard } from '@/components/IssueCard';
import { registerIssue, type AccessibilityIssue } from '@/types/issues';

// ============ IBM CHECK ISSUES ============
const ibmIssues: AccessibilityIssue[] = [
  {
    id: 'AX-095',
    title: 'Applet element missing alt attribute',
    types: ['automated'],
    expectedFinding: '<applet> element has no alt attribute and no inner fallback description',
    wcagMapping: ['1.1.1'],
    wcagName: 'Non-text Content',
    severity: 'high',
    howToFix: 'Add an alt attribute to the <applet> element and provide HTML-based inner content describing its function',
    route: '/ibm-checks',
    selectorHint: 'data-issue-id="AX-095"',
    checkHints: ['ibm:ibm-applet-alt-exists'],
  },
  {
    id: 'AX-096',
    title: 'aria-activedescendant references invalid or hidden element',
    types: ['automated'],
    expectedFinding: 'aria-activedescendant points to a non-existent, empty, or hidden element ID',
    wcagMapping: ['4.1.2'],
    wcagName: 'Name, Role, Value',
    severity: 'high',
    howToFix: 'Ensure aria-activedescendant references an existing, non-empty, non-hidden descendant element ID',
    route: '/ibm-checks',
    selectorHint: 'data-issue-id="AX-096"',
    checkHints: ['ibm:ibm-aria-activedescendant-valid'],
  },
  {
    id: 'AX-097',
    title: 'Element with event handler has no valid ARIA role',
    types: ['automated'],
    expectedFinding: 'Element with an event handler has no valid ARIA role to convey its interactive purpose',
    wcagMapping: ['4.1.2'],
    wcagName: 'Name, Role, Value',
    severity: 'high',
    howToFix: 'Add a valid ARIA role (e.g. role="button") or use a native HTML element with an implicit role',
    route: '/ibm-checks',
    selectorHint: 'data-issue-id="AX-097"',
    checkHints: ['ibm:ibm-aria-eventhandler-role-valid'],
  },
  {
    id: 'AX-098',
    title: 'Combobox popup focus not managed via aria-activedescendant',
    types: ['automated'],
    expectedFinding: 'Combobox text input does not use aria-activedescendant to indicate the focused option in the popup',
    wcagMapping: ['4.1.2'],
    wcagName: 'Name, Role, Value',
    severity: 'high',
    howToFix: 'Set aria-activedescendant on the combobox text <input> to reference the currently active option in the popup',
    route: '/ibm-checks',
    selectorHint: 'data-issue-id="AX-098"',
    checkHints: ['ibm:ibm-combobox-active-descendant'],
  },
  {
    id: 'AX-099',
    title: 'Combobox aria-autocomplete attribute invalid or misplaced',
    types: ['automated'],
    expectedFinding: 'aria-autocomplete is set to "inline" (unsupported for combobox) or placed on the popup element instead of the text input',
    wcagMapping: ['4.1.2'],
    wcagName: 'Name, Role, Value',
    severity: 'medium',
    howToFix: 'Use aria-autocomplete="list" or "both" only on the combobox text <input> element; remove it from popup elements',
    route: '/ibm-checks',
    selectorHint: 'data-issue-id="AX-099"',
    checkHints: ['ibm:ibm-combobox-autocomplete-valid'],
  },
  {
    id: 'AX-100',
    title: 'Combobox design pattern invalid for ARIA 1.2',
    types: ['automated'],
    expectedFinding: 'role="combobox" is applied to a non-input element (e.g. textarea or div) violating the ARIA 1.2 pattern',
    wcagMapping: ['4.1.2'],
    wcagName: 'Name, Role, Value',
    severity: 'high',
    howToFix: 'Apply role="combobox" only to a single-line text <input> element and connect it to its popup via aria-controls and aria-expanded',
    route: '/ibm-checks',
    selectorHint: 'data-issue-id="AX-100"',
    checkHints: ['ibm:ibm-combobox-design-valid'],
  },
  {
    id: 'AX-101',
    title: 'Combobox aria-haspopup value does not match popup role',
    types: ['automated'],
    expectedFinding: 'The aria-haspopup value on the combobox does not match the actual role of the popup it controls',
    wcagMapping: ['4.1.2'],
    wcagName: 'Name, Role, Value',
    severity: 'medium',
    howToFix: 'Set aria-haspopup to the role of the popup element (listbox, tree, grid, or dialog)',
    route: '/ibm-checks',
    selectorHint: 'data-issue-id="AX-101"',
    checkHints: ['ibm:ibm-combobox-haspopup-valid'],
  },
  {
    id: 'AX-102',
    title: 'Input with list attribute has redundant aria-haspopup',
    types: ['automated'],
    expectedFinding: '<input> element has both a list attribute and an explicit aria-haspopup, causing a conflict',
    wcagMapping: ['4.1.2'],
    wcagName: 'Name, Role, Value',
    severity: 'medium',
    howToFix: 'Remove the aria-haspopup attribute from <input> elements that already have a list attribute',
    route: '/ibm-checks',
    selectorHint: 'data-issue-id="AX-102"',
    checkHints: ['ibm:ibm-input-haspopup-conflict'],
  },
  {
    id: 'AX-103',
    title: 'Checkbox or radio button label placed before the input',
    types: ['automated'],
    expectedFinding: 'The label for a checkbox or radio button appears before the input control instead of after it',
    wcagMapping: ['1.3.1', '3.3.2'],
    wcagName: 'Info and Relationships, Labels or Instructions',
    severity: 'medium',
    howToFix: 'Place the label text immediately after the checkbox or radio button element',
    route: '/ibm-checks',
    selectorHint: 'data-issue-id="AX-103"',
    checkHints: ['ibm:ibm-input-label-after'],
  },
  {
    id: 'AX-104',
    title: 'Text input or select label placed after the input',
    types: ['automated'],
    expectedFinding: 'The label for a text input or <select> element appears after the control instead of before it',
    wcagMapping: ['1.3.1', '3.3.2'],
    wcagName: 'Info and Relationships, Labels or Instructions',
    severity: 'medium',
    howToFix: 'Place the label immediately before the text <input> or <select> element',
    route: '/ibm-checks',
    selectorHint: 'data-issue-id="AX-104"',
    checkHints: ['ibm:ibm-input-label-before'],
  },
  {
    id: 'AX-105',
    title: 'Non-decorative SVG element has no accessible name',
    types: ['automated'],
    expectedFinding: 'A meaningful SVG element lacks an accessible name (no aria-label, aria-labelledby, or <title> child)',
    wcagMapping: ['1.1.1'],
    wcagName: 'Non-text Content',
    severity: 'high',
    howToFix: 'Add aria-label, aria-labelledby, or a <title> child element to the SVG; mark decorative SVGs with aria-hidden="true"',
    route: '/ibm-checks',
    selectorHint: 'data-issue-id="AX-105"',
    checkHints: ['ibm:ibm-svg-graphics-labelled'],
  },
  {
    id: 'AX-106',
    title: 'Table structure elements have explicit role inside table container',
    types: ['automated'],
    expectedFinding: '<tr>, <th>, or <td> elements inside a role="grid/table/treegrid" container have explicit role attributes',
    wcagMapping: ['1.3.1'],
    wcagName: 'Info and Relationships',
    severity: 'medium',
    howToFix: 'Remove role attributes from <tr>, <th>, and <td> elements inside any container with role="table", "grid", or "treegrid"',
    route: '/ibm-checks',
    selectorHint: 'data-issue-id="AX-106"',
    checkHints: ['ibm:ibm-table-aria-descendants'],
  },
];

// ---- Shared label styles for Fail / Pass / N/A blocks ----
const failBadge = 'inline-block text-xs font-semibold px-2 py-0.5 rounded bg-red-100 text-red-700 border border-red-300 mb-2';
const passBadge = 'inline-block text-xs font-semibold px-2 py-0.5 rounded bg-green-100 text-green-700 border border-green-300 mb-2';
const naBadge   = 'inline-block text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-700 border border-blue-300 mb-2';

const failBox = 'p-4 border border-red-200 rounded-lg bg-card mb-3';
const passBox = 'p-4 border border-green-200 rounded-lg bg-card mb-3';
const naBox   = 'p-4 border border-blue-200 rounded-lg bg-card mb-3';

export default function IBMChecks() {
  useEffect(() => {
    ibmIssues.forEach(issue => {
      if (!window.__registeredIssues?.has(issue.id)) {
        registerIssue(issue);
        if (!window.__registeredIssues) window.__registeredIssues = new Set();
        window.__registeredIssues.add(issue.id);
      }
    });
  }, []);

  return (
    <PageWrapper
      title="IBM Checks"
      description="12 IBM accessibility rule checks each with Failure, Pass, and Not Applicable examples"
    >
      <div className="space-y-12">
        <header>
          <h1 className="text-3xl font-bold text-foreground mb-4">IBM Accessibility Checks</h1>
          <p className="text-muted-foreground">
            This page covers {ibmIssues.length} IBM accessibility rule checks (AX-095–AX-106). Each check
            demonstrates three scenarios: a <strong>Failure</strong> (broken HTML the scanner should flag),
            a <strong>Pass</strong> (conformant HTML), and a <strong>Not Applicable</strong> (context where
            the rule does not apply).
          </p>
        </header>

        {/* ========== AX-095: ibm-applet-alt-exists ========== */}
        <section id="applet-alt">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">
            Applet &amp; Media Alternatives
          </h2>

          <div id="AX-095" className="space-y-3">
            <IssueCard issue={ibmIssues[0]} />

            {/* FAIL */}
            <div
              className={failBox}
              data-issue-id="AX-095"
              data-issue-type="automated"
              data-wcag="1.1.1"
              data-expected="fail"
            >
              <span className={failBadge}>Failure</span>
              <p className="text-sm text-muted-foreground mb-2">
                <code>&lt;applet&gt;</code> with no <code>alt</code> attribute and no inner fallback text.
              </p>
              {/* dangerouslySetInnerHTML used because <applet> is not a valid JSX/HTML5 element */}
              <div dangerouslySetInnerHTML={{ __html: `<applet code="chart.class" width="200" height="100"><!-- no alt, no fallback --></applet>` }} />
            </div>

            {/* PASS */}
            <div
              className={passBox}
              data-issue-id="AX-095"
              data-expected="pass"
            >
              <span className={passBadge}>Pass</span>
              <p className="text-sm text-muted-foreground mb-2">
                <code>&lt;applet&gt;</code> with an <code>alt</code> attribute and inner fallback HTML.
              </p>
              <div dangerouslySetInnerHTML={{ __html: `<applet code="chart.class" alt="Interactive sales chart" width="200" height="100"><p>This chart compares quarterly sales by region. Enable Java to view the interactive version.</p></applet>` }} />
            </div>

            {/* NOT APPLICABLE */}
            <div
              className={naBox}
              data-issue-id="AX-095"
              data-expected="notapplicable"
            >
              <span className={naBadge}>Not Applicable</span>
              <p className="text-sm text-muted-foreground mb-2">
                No <code>&lt;applet&gt;</code> element present. A standard <code>&lt;img&gt;</code> is used instead.
              </p>
              <img src="/placeholder.svg" alt="Quarterly sales chart" width={200} height={100} className="border border-border rounded" />
            </div>
          </div>
        </section>

        {/* ========== ARIA CHECKS ========== */}
        <section id="aria-checks">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">
            ARIA Attribute Checks
          </h2>

          <div className="space-y-8">
            {/* AX-096: ibm-aria-activedescendant-valid */}
            <div id="AX-096" className="space-y-3">
              <IssueCard issue={ibmIssues[1]} />

              {/* FAIL */}
              <div
                className={failBox}
                data-issue-id="AX-096"
                data-issue-type="automated"
                data-wcag="4.1.2"
                data-expected="fail"
              >
                <span className={failBadge}>Failure</span>
                <p className="text-sm text-muted-foreground mb-2">
                  <code>aria-activedescendant</code> references <code>"ghost-id"</code> which does not exist in the DOM.
                </p>
                <div
                  role="listbox"
                  tabIndex={0}
                  aria-label="Choose a city"
                  aria-activedescendant="ghost-id"
                  className="border border-input rounded p-2 w-48 focus:outline-none focus:ring-2"
                >
                  <div id="ax096-city-ny" role="option" aria-selected={false}>New York</div>
                  <div id="ax096-city-la" role="option" aria-selected={false}>Los Angeles</div>
                </div>
              </div>

              {/* PASS */}
              <div
                className={passBox}
                data-issue-id="AX-096"
                data-expected="pass"
              >
                <span className={passBadge}>Pass</span>
                <p className="text-sm text-muted-foreground mb-2">
                  <code>aria-activedescendant="ax096-pass-sf"</code> references a real, non-hidden child element.
                </p>
                <div
                  role="listbox"
                  tabIndex={0}
                  aria-label="Choose a city"
                  aria-activedescendant="ax096-pass-sf"
                  className="border border-input rounded p-2 w-48 focus:outline-none focus:ring-2"
                >
                  <div id="ax096-pass-ny" role="option" aria-selected={false}>New York</div>
                  <div id="ax096-pass-sf" role="option" aria-selected={true} className="bg-primary/10 font-medium">San Francisco</div>
                  <div id="ax096-pass-la" role="option" aria-selected={false}>Los Angeles</div>
                </div>
              </div>

              {/* NOT APPLICABLE */}
              <div
                className={naBox}
                data-issue-id="AX-096"
                data-expected="notapplicable"
              >
                <span className={naBadge}>Not Applicable</span>
                <p className="text-sm text-muted-foreground mb-2">
                  Native <code>&lt;select&gt;</code> used — no <code>aria-activedescendant</code> needed.
                </p>
                <label htmlFor="ax096-na-select" className="block text-sm font-medium mb-1">Choose a city</label>
                <select id="ax096-na-select" className="border border-input rounded px-3 py-2">
                  <option value="ny">New York</option>
                  <option value="sf">San Francisco</option>
                  <option value="la">Los Angeles</option>
                </select>
              </div>
            </div>

            {/* AX-097: ibm-aria-eventhandler-role-valid */}
            <div id="AX-097" className="space-y-3">
              <IssueCard issue={ibmIssues[2]} />

              {/* FAIL */}
              <div
                className={failBox}
                data-issue-id="AX-097"
                data-issue-type="automated"
                data-wcag="4.1.2"
                data-expected="fail"
              >
                <span className={failBadge}>Failure</span>
                <p className="text-sm text-muted-foreground mb-2">
                  A <code>&lt;div&gt;</code> with an <code>onClick</code> handler but no <code>role</code> attribute.
                </p>
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
                <div
                  onClick={() => alert('clicked')}
                  className="px-4 py-2 bg-muted rounded cursor-pointer w-fit"
                >
                  Click me (no role)
                </div>
              </div>

              {/* PASS */}
              <div
                className={passBox}
                data-issue-id="AX-097"
                data-expected="pass"
              >
                <span className={passBadge}>Pass</span>
                <p className="text-sm text-muted-foreground mb-2">
                  Same interactive element with <code>role="button"</code> and <code>tabIndex={0}</code>.
                </p>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => alert('clicked')}
                  onKeyDown={(e) => e.key === 'Enter' && alert('clicked')}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded cursor-pointer w-fit"
                >
                  Click me (role=button)
                </div>
              </div>

              {/* NOT APPLICABLE */}
              <div
                className={naBox}
                data-issue-id="AX-097"
                data-expected="notapplicable"
              >
                <span className={naBadge}>Not Applicable</span>
                <p className="text-sm text-muted-foreground mb-2">
                  Native <code>&lt;button&gt;</code> element — implicit role, rule does not apply.
                </p>
                <button
                  type="button"
                  onClick={() => alert('clicked')}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded"
                >
                  Native Button
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========== COMBOBOX CHECKS ========== */}
        <section id="combobox-checks">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">
            Combobox Pattern Checks
          </h2>

          <div className="space-y-8">
            {/* AX-098: ibm-combobox-active-descendant */}
            <div id="AX-098" className="space-y-3">
              <IssueCard issue={ibmIssues[3]} />

              {/* FAIL */}
              <div
                className={failBox}
                data-issue-id="AX-098"
                data-issue-type="automated"
                data-wcag="4.1.2"
                data-expected="fail"
              >
                <span className={failBadge}>Failure</span>
                <p className="text-sm text-muted-foreground mb-2">
                  Combobox input is missing <code>aria-activedescendant</code> while the popup is expanded.
                </p>
                <div className="relative w-64">
                  <label htmlFor="ax098-fail-input" className="block text-sm font-medium mb-1">City</label>
                  <input
                    id="ax098-fail-input"
                    type="text"
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded={true}
                    aria-controls="ax098-fail-popup"
                    className="border border-input rounded px-3 py-2 w-full"
                    defaultValue="San"
                    readOnly
                  />
                  <ul id="ax098-fail-popup" role="listbox" className="absolute z-10 w-full border border-input bg-background rounded shadow mt-1">
                    <li id="ax098-fail-opt1" role="option" aria-selected={false} className="px-3 py-1 hover:bg-muted cursor-pointer">San Francisco</li>
                    <li id="ax098-fail-opt2" role="option" aria-selected={false} className="px-3 py-1 hover:bg-muted cursor-pointer">San Diego</li>
                  </ul>
                </div>
              </div>

              {/* PASS */}
              <div
                className={passBox}
                data-issue-id="AX-098"
                data-expected="pass"
              >
                <span className={passBadge}>Pass</span>
                <p className="text-sm text-muted-foreground mb-2">
                  Combobox input has <code>aria-activedescendant="ax098-pass-opt1"</code> referencing the active option.
                </p>
                <div className="relative w-64">
                  <label htmlFor="ax098-pass-input" className="block text-sm font-medium mb-1">City</label>
                  <input
                    id="ax098-pass-input"
                    type="text"
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded={true}
                    aria-controls="ax098-pass-popup"
                    aria-activedescendant="ax098-pass-opt1"
                    className="border border-input rounded px-3 py-2 w-full"
                    defaultValue="San"
                    readOnly
                  />
                  <ul id="ax098-pass-popup" role="listbox" className="absolute z-10 w-full border border-input bg-background rounded shadow mt-1">
                    <li id="ax098-pass-opt1" role="option" aria-selected={true} className="px-3 py-1 bg-primary/10 font-medium cursor-pointer">San Francisco</li>
                    <li id="ax098-pass-opt2" role="option" aria-selected={false} className="px-3 py-1 hover:bg-muted cursor-pointer">San Diego</li>
                  </ul>
                </div>
              </div>

              {/* NOT APPLICABLE */}
              <div
                className={naBox}
                data-issue-id="AX-098"
                data-expected="notapplicable"
              >
                <span className={naBadge}>Not Applicable</span>
                <p className="text-sm text-muted-foreground mb-2">
                  Combobox with <code>aria-haspopup="dialog"</code> — rule explicitly exempts dialog popups.
                </p>
                <div className="w-64">
                  <label htmlFor="ax098-na-input" className="block text-sm font-medium mb-1">Date</label>
                  <input
                    id="ax098-na-input"
                    type="text"
                    role="combobox"
                    aria-haspopup="dialog"
                    aria-expanded={false}
                    aria-controls="ax098-na-dialog"
                    className="border border-input rounded px-3 py-2 w-full"
                    placeholder="MM/DD/YYYY"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* AX-099: ibm-combobox-autocomplete-valid */}
            <div id="AX-099" className="space-y-3">
              <IssueCard issue={ibmIssues[4]} />

              {/* FAIL */}
              <div
                className={failBox}
                data-issue-id="AX-099"
                data-issue-type="automated"
                data-wcag="4.1.2"
                data-expected="fail"
              >
                <span className={failBadge}>Failure</span>
                <p className="text-sm text-muted-foreground mb-2">
                  <code>aria-autocomplete="inline"</code> on a combobox input (unsupported value), and also placed on the popup <code>&lt;ul&gt;</code>.
                </p>
                <div className="relative w-64">
                  <label htmlFor="ax099-fail-input" className="block text-sm font-medium mb-1">Search</label>
                  {/* aria-autocomplete="inline" is invalid for combobox; also on the popup */}
                  <input
                    id="ax099-fail-input"
                    type="text"
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded={true}
                    aria-controls="ax099-fail-popup"
                    aria-autocomplete="inline"
                    className="border border-red-400 rounded px-3 py-2 w-full"
                    defaultValue="Rea"
                    readOnly
                  />
                  {/* aria-autocomplete on popup is also wrong */}
                  <ul
                    id="ax099-fail-popup"
                    role="listbox"
                    aria-autocomplete="list"
                    className="absolute z-10 w-full border border-input bg-background rounded shadow mt-1"
                  >
                    <li role="option" aria-selected={false} className="px-3 py-1 hover:bg-muted cursor-pointer">React</li>
                    <li role="option" aria-selected={false} className="px-3 py-1 hover:bg-muted cursor-pointer">Reason</li>
                  </ul>
                </div>
              </div>

              {/* PASS */}
              <div
                className={passBox}
                data-issue-id="AX-099"
                data-expected="pass"
              >
                <span className={passBadge}>Pass</span>
                <p className="text-sm text-muted-foreground mb-2">
                  <code>aria-autocomplete="list"</code> only on the text <code>&lt;input&gt;</code>; popup has no <code>aria-autocomplete</code>.
                </p>
                <div className="relative w-64">
                  <label htmlFor="ax099-pass-input" className="block text-sm font-medium mb-1">Search</label>
                  <input
                    id="ax099-pass-input"
                    type="text"
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded={true}
                    aria-controls="ax099-pass-popup"
                    aria-autocomplete="list"
                    className="border border-green-400 rounded px-3 py-2 w-full"
                    defaultValue="Rea"
                    readOnly
                  />
                  <ul id="ax099-pass-popup" role="listbox" className="absolute z-10 w-full border border-input bg-background rounded shadow mt-1">
                    <li role="option" aria-selected={false} className="px-3 py-1 hover:bg-muted cursor-pointer">React</li>
                    <li role="option" aria-selected={false} className="px-3 py-1 hover:bg-muted cursor-pointer">Reason</li>
                  </ul>
                </div>
              </div>

              {/* NOT APPLICABLE */}
              <div
                className={naBox}
                data-issue-id="AX-099"
                data-expected="notapplicable"
              >
                <span className={naBadge}>Not Applicable</span>
                <p className="text-sm text-muted-foreground mb-2">
                  Combobox with no autocomplete behavior — <code>aria-autocomplete</code> is absent entirely.
                </p>
                <div className="w-64">
                  <label htmlFor="ax099-na-input" className="block text-sm font-medium mb-1">Category</label>
                  <input
                    id="ax099-na-input"
                    type="text"
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded={false}
                    aria-controls="ax099-na-popup"
                    className="border border-input rounded px-3 py-2 w-full"
                    placeholder="Select a category"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* AX-100: ibm-combobox-design-valid */}
            <div id="AX-100" className="space-y-3">
              <IssueCard issue={ibmIssues[5]} />

              {/* FAIL */}
              <div
                className={failBox}
                data-issue-id="AX-100"
                data-issue-type="automated"
                data-wcag="4.1.2"
                data-expected="fail"
              >
                <span className={failBadge}>Failure</span>
                <p className="text-sm text-muted-foreground mb-2">
                  <code>role="combobox"</code> applied to a <code>&lt;textarea&gt;</code> — violates ARIA 1.2 which requires a single-line input.
                </p>
                <label htmlFor="ax100-fail-ta" className="block text-sm font-medium mb-1">Address</label>
                <textarea
                  id="ax100-fail-ta"
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-expanded={false}
                  rows={2}
                  className="border border-red-400 rounded px-3 py-2 w-64"
                  placeholder="Start typing an address…"
                  readOnly
                />
              </div>

              {/* PASS */}
              <div
                className={passBox}
                data-issue-id="AX-100"
                data-expected="pass"
              >
                <span className={passBadge}>Pass</span>
                <p className="text-sm text-muted-foreground mb-2">
                  <code>role="combobox"</code> on a single-line <code>&lt;input type="text"&gt;</code>.
                </p>
                <label htmlFor="ax100-pass-input" className="block text-sm font-medium mb-1">Address</label>
                <input
                  id="ax100-pass-input"
                  type="text"
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-expanded={false}
                  aria-controls="ax100-pass-popup"
                  className="border border-green-400 rounded px-3 py-2 w-64"
                  placeholder="Start typing an address…"
                  readOnly
                />
              </div>

              {/* NOT APPLICABLE */}
              <div
                className={naBox}
                data-issue-id="AX-100"
                data-expected="notapplicable"
              >
                <span className={naBadge}>Not Applicable</span>
                <p className="text-sm text-muted-foreground mb-2">
                  No combobox widget on this section — rule does not apply.
                </p>
                <label htmlFor="ax100-na-select" className="block text-sm font-medium mb-1">Country</label>
                <select id="ax100-na-select" className="border border-input rounded px-3 py-2 w-48">
                  <option value="us">United States</option>
                  <option value="gb">United Kingdom</option>
                </select>
              </div>
            </div>

            {/* AX-101: ibm-combobox-haspopup-valid */}
            <div id="AX-101" className="space-y-3">
              <IssueCard issue={ibmIssues[6]} />

              {/* FAIL */}
              <div
                className={failBox}
                data-issue-id="AX-101"
                data-issue-type="automated"
                data-wcag="4.1.2"
                data-expected="fail"
              >
                <span className={failBadge}>Failure</span>
                <p className="text-sm text-muted-foreground mb-2">
                  <code>aria-haspopup="menu"</code> but the popup element has <code>role="listbox"</code> — mismatch.
                </p>
                <div className="relative w-64">
                  <label htmlFor="ax101-fail-input" className="block text-sm font-medium mb-1">City</label>
                  <input
                    id="ax101-fail-input"
                    type="text"
                    role="combobox"
                    aria-haspopup="menu"
                    aria-expanded={true}
                    aria-controls="ax101-fail-popup"
                    className="border border-red-400 rounded px-3 py-2 w-full"
                    defaultValue="Ch"
                    readOnly
                  />
                  <ul id="ax101-fail-popup" role="listbox" className="absolute z-10 w-full border border-input bg-background rounded shadow mt-1">
                    <li role="option" aria-selected={false} className="px-3 py-1 hover:bg-muted cursor-pointer">Chicago</li>
                    <li role="option" aria-selected={false} className="px-3 py-1 hover:bg-muted cursor-pointer">Charlotte</li>
                  </ul>
                </div>
              </div>

              {/* PASS */}
              <div
                className={passBox}
                data-issue-id="AX-101"
                data-expected="pass"
              >
                <span className={passBadge}>Pass</span>
                <p className="text-sm text-muted-foreground mb-2">
                  <code>aria-haspopup="listbox"</code> correctly matches the popup's <code>role="listbox"</code>.
                </p>
                <div className="relative w-64">
                  <label htmlFor="ax101-pass-input" className="block text-sm font-medium mb-1">City</label>
                  <input
                    id="ax101-pass-input"
                    type="text"
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded={true}
                    aria-controls="ax101-pass-popup"
                    className="border border-green-400 rounded px-3 py-2 w-full"
                    defaultValue="Ch"
                    readOnly
                  />
                  <ul id="ax101-pass-popup" role="listbox" className="absolute z-10 w-full border border-input bg-background rounded shadow mt-1">
                    <li role="option" aria-selected={false} className="px-3 py-1 hover:bg-muted cursor-pointer">Chicago</li>
                    <li role="option" aria-selected={false} className="px-3 py-1 hover:bg-muted cursor-pointer">Charlotte</li>
                  </ul>
                </div>
              </div>

              {/* NOT APPLICABLE */}
              <div
                className={naBox}
                data-issue-id="AX-101"
                data-expected="notapplicable"
              >
                <span className={naBadge}>Not Applicable</span>
                <p className="text-sm text-muted-foreground mb-2">
                  No combobox element present — rule does not apply.
                </p>
                <p className="text-sm text-foreground">This section contains only plain text inputs with no combobox role.</p>
                <input type="text" aria-label="Plain text input" className="border border-input rounded px-3 py-2 w-48 mt-2" placeholder="No role=combobox" readOnly />
              </div>
            </div>
          </div>
        </section>

        {/* ========== INPUT CHECKS ========== */}
        <section id="input-checks">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">
            Input Attribute Checks
          </h2>

          <div className="space-y-8">
            {/* AX-102: ibm-input-haspopup-conflict */}
            <div id="AX-102" className="space-y-3">
              <IssueCard issue={ibmIssues[7]} />

              {/* FAIL */}
              <div
                className={failBox}
                data-issue-id="AX-102"
                data-issue-type="automated"
                data-wcag="4.1.2"
                data-expected="fail"
              >
                <span className={failBadge}>Failure</span>
                <p className="text-sm text-muted-foreground mb-2">
                  <code>&lt;input&gt;</code> with a <code>list</code> attribute <em>and</em> an explicit <code>aria-haspopup="listbox"</code> — redundant/conflicting.
                </p>
                <label htmlFor="ax102-fail-input" className="block text-sm font-medium mb-1">Favourite fruit</label>
                <input
                  id="ax102-fail-input"
                  type="text"
                  list="ax102-fruits"
                  aria-haspopup="listbox"
                  className="border border-red-400 rounded px-3 py-2 w-56"
                  placeholder="Type a fruit…"
                />
                <datalist id="ax102-fruits">
                  <option value="Apple" />
                  <option value="Banana" />
                  <option value="Cherry" />
                </datalist>
              </div>

              {/* PASS */}
              <div
                className={passBox}
                data-issue-id="AX-102"
                data-expected="pass"
              >
                <span className={passBadge}>Pass</span>
                <p className="text-sm text-muted-foreground mb-2">
                  <code>&lt;input&gt;</code> with a <code>list</code> attribute only — no explicit <code>aria-haspopup</code>.
                </p>
                <label htmlFor="ax102-pass-input" className="block text-sm font-medium mb-1">Favourite fruit</label>
                <input
                  id="ax102-pass-input"
                  type="text"
                  list="ax102-pass-fruits"
                  className="border border-green-400 rounded px-3 py-2 w-56"
                  placeholder="Type a fruit…"
                />
                <datalist id="ax102-pass-fruits">
                  <option value="Apple" />
                  <option value="Banana" />
                  <option value="Cherry" />
                </datalist>
              </div>

              {/* NOT APPLICABLE */}
              <div
                className={naBox}
                data-issue-id="AX-102"
                data-expected="notapplicable"
              >
                <span className={naBadge}>Not Applicable</span>
                <p className="text-sm text-muted-foreground mb-2">
                  <code>&lt;input&gt;</code> without a <code>list</code> attribute — rule does not apply.
                </p>
                <label htmlFor="ax102-na-input" className="block text-sm font-medium mb-1">Name</label>
                <input
                  id="ax102-na-input"
                  type="text"
                  className="border border-input rounded px-3 py-2 w-56"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            {/* AX-103: ibm-input-label-after */}
            <div id="AX-103" className="space-y-3">
              <IssueCard issue={ibmIssues[8]} />

              {/* FAIL */}
              <div
                className={failBox}
                data-issue-id="AX-103"
                data-issue-type="automated"
                data-wcag="1.3.1,3.3.2"
                data-expected="fail"
              >
                <span className={failBadge}>Failure</span>
                <p className="text-sm text-muted-foreground mb-2">
                  Label placed <strong>before</strong> the checkbox input — should be after.
                </p>
                {/* label before checkbox = fail */}
                <div className="flex items-center gap-2">
                  <label htmlFor="ax103-fail-cb" className="text-sm">I agree to the terms</label>
                  <input type="checkbox" id="ax103-fail-cb" />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <label htmlFor="ax103-fail-rb" className="text-sm">Subscribe to newsletter</label>
                  <input type="radio" id="ax103-fail-rb" name="ax103-fail-group" />
                </div>
              </div>

              {/* PASS */}
              <div
                className={passBox}
                data-issue-id="AX-103"
                data-expected="pass"
              >
                <span className={passBadge}>Pass</span>
                <p className="text-sm text-muted-foreground mb-2">
                  Label placed <strong>after</strong> the checkbox/radio input.
                </p>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="ax103-pass-cb" />
                  <label htmlFor="ax103-pass-cb" className="text-sm">I agree to the terms</label>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input type="radio" id="ax103-pass-rb" name="ax103-pass-group" />
                  <label htmlFor="ax103-pass-rb" className="text-sm">Subscribe to newsletter</label>
                </div>
              </div>

              {/* NOT APPLICABLE */}
              <div
                className={naBox}
                data-issue-id="AX-103"
                data-expected="notapplicable"
              >
                <span className={naBadge}>Not Applicable</span>
                <p className="text-sm text-muted-foreground mb-2">
                  No checkbox or radio button present — rule does not apply.
                </p>
                <label htmlFor="ax103-na-text" className="block text-sm font-medium mb-1">First name</label>
                <input type="text" id="ax103-na-text" className="border border-input rounded px-3 py-2 w-48" />
              </div>
            </div>

            {/* AX-104: ibm-input-label-before */}
            <div id="AX-104" className="space-y-3">
              <IssueCard issue={ibmIssues[9]} />

              {/* FAIL */}
              <div
                className={failBox}
                data-issue-id="AX-104"
                data-issue-type="automated"
                data-wcag="1.3.1,3.3.2"
                data-expected="fail"
              >
                <span className={failBadge}>Failure</span>
                <p className="text-sm text-muted-foreground mb-2">
                  Label placed <strong>after</strong> the text input — should be before.
                </p>
                <div className="flex flex-col gap-1 w-48">
                  {/* input before label = fail */}
                  <input type="text" id="ax104-fail-input" className="border border-red-400 rounded px-3 py-2" />
                  <label htmlFor="ax104-fail-input" className="text-sm">Email address</label>
                </div>
                <div className="flex flex-col gap-1 w-48 mt-2">
                  <select id="ax104-fail-select" className="border border-red-400 rounded px-3 py-2">
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                  <label htmlFor="ax104-fail-select" className="text-sm">Timezone</label>
                </div>
              </div>

              {/* PASS */}
              <div
                className={passBox}
                data-issue-id="AX-104"
                data-expected="pass"
              >
                <span className={passBadge}>Pass</span>
                <p className="text-sm text-muted-foreground mb-2">
                  Label placed <strong>before</strong> the text input.
                </p>
                <div className="flex flex-col gap-1 w-48">
                  <label htmlFor="ax104-pass-input" className="text-sm font-medium">Email address</label>
                  <input type="text" id="ax104-pass-input" className="border border-green-400 rounded px-3 py-2" />
                </div>
                <div className="flex flex-col gap-1 w-48 mt-2">
                  <label htmlFor="ax104-pass-select" className="text-sm font-medium">Timezone</label>
                  <select id="ax104-pass-select" className="border border-green-400 rounded px-3 py-2">
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                </div>
              </div>

              {/* NOT APPLICABLE */}
              <div
                className={naBox}
                data-issue-id="AX-104"
                data-expected="notapplicable"
              >
                <span className={naBadge}>Not Applicable</span>
                <p className="text-sm text-muted-foreground mb-2">
                  No text input or select element present — rule does not apply.
                </p>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="ax104-na-cb" />
                  <label htmlFor="ax104-na-cb" className="text-sm">Accept terms</label>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== SVG CHECKS ========== */}
        <section id="svg-checks">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">
            SVG Accessibility Checks
          </h2>

          <div id="AX-105" className="space-y-3">
            <IssueCard issue={ibmIssues[10]} />

            {/* FAIL */}
            <div
              className={failBox}
              data-issue-id="AX-105"
              data-issue-type="automated"
              data-wcag="1.1.1"
              data-expected="fail"
            >
              <span className={failBadge}>Failure</span>
              <p className="text-sm text-muted-foreground mb-2">
                Meaningful SVG icon with no <code>aria-label</code>, <code>aria-labelledby</code>, or <code>&lt;title&gt;</code>.
              </p>
              {/* No accessible name — scanner should flag this */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>

            {/* PASS */}
            <div
              className={passBox}
              data-issue-id="AX-105"
              data-expected="pass"
            >
              <span className={passBadge}>Pass</span>
              <p className="text-sm text-muted-foreground mb-2">
                Non-decorative SVG with an <code>aria-label</code> providing an accessible name.
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-label="Upload file"
                role="img"
                className="text-green-600"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>

            {/* NOT APPLICABLE */}
            <div
              className={naBox}
              data-issue-id="AX-105"
              data-expected="notapplicable"
            >
              <span className={naBadge}>Not Applicable</span>
              <p className="text-sm text-muted-foreground mb-2">
                Decorative SVG with <code>aria-hidden="true"</code> and <code>role="presentation"</code> — rule explicitly excludes decorative SVGs.
              </p>
              <span className="flex items-center gap-2 text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span className="text-sm">Decorative icon beside visible text label</span>
              </span>
            </div>
          </div>
        </section>

        {/* ========== TABLE CHECKS ========== */}
        <section id="table-checks">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">
            Table Structure Checks
          </h2>

          <div id="AX-106" className="space-y-3">
            <IssueCard issue={ibmIssues[11]} />

            {/* FAIL */}
            <div
              className={failBox}
              data-issue-id="AX-106"
              data-issue-type="automated"
              data-wcag="1.3.1"
              data-expected="fail"
            >
              <span className={failBadge}>Failure</span>
              <p className="text-sm text-muted-foreground mb-2">
                <code>&lt;tr role="row"&gt;</code> and <code>&lt;td role="gridcell"&gt;</code> inside a <code>role="grid"</code> container — explicit roles on table descendants are invalid.
              </p>
              <table role="grid" aria-label="Orders (failure example)" className="border-collapse border border-border text-sm">
                <thead>
                  {/* role="row" on tr inside role="grid" = violation */}
                  <tr role="row">
                    <th role="columnheader" scope="col" className="border border-border px-3 py-2 bg-muted">Order</th>
                    <th role="columnheader" scope="col" className="border border-border px-3 py-2 bg-muted">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr role="row">
                    <td role="gridcell" className="border border-border px-3 py-2">#1042</td>
                    <td role="gridcell" className="border border-border px-3 py-2">Shipped</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* PASS */}
            <div
              className={passBox}
              data-issue-id="AX-106"
              data-expected="pass"
            >
              <span className={passBadge}>Pass</span>
              <p className="text-sm text-muted-foreground mb-2">
                Same <code>role="grid"</code> table but <code>&lt;tr&gt;</code>, <code>&lt;th&gt;</code>, and <code>&lt;td&gt;</code> have <strong>no explicit roles</strong>.
              </p>
              <table role="grid" aria-label="Orders (pass example)" className="border-collapse border border-border text-sm">
                <thead>
                  <tr>
                    <th scope="col" className="border border-border px-3 py-2 bg-muted">Order</th>
                    <th scope="col" className="border border-border px-3 py-2 bg-muted">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-3 py-2">#1042</td>
                    <td className="border border-border px-3 py-2">Shipped</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* NOT APPLICABLE */}
            <div
              className={naBox}
              data-issue-id="AX-106"
              data-expected="notapplicable"
            >
              <span className={naBadge}>Not Applicable</span>
              <p className="text-sm text-muted-foreground mb-2">
                Plain <code>&lt;table&gt;</code> without <code>role="grid"</code>, <code>"table"</code>, or <code>"treegrid"</code> — rule is not triggered.
              </p>
              <table className="border-collapse border border-border text-sm">
                <thead>
                  <tr>
                    <th scope="col" className="border border-border px-3 py-2 bg-muted">Item</th>
                    <th scope="col" className="border border-border px-3 py-2 bg-muted">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-3 py-2">Widget A</td>
                    <td className="border border-border px-3 py-2">$9.99</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
