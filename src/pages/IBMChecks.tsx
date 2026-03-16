import { useEffect, useRef } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { IssueCard } from '@/components/IssueCard';
import { registerIssue, type AccessibilityIssue } from '@/types/issues';

// ============ IBM CHECK ISSUES ============
const ibmIssues: AccessibilityIssue[] = [
  {
    id: 'AX-095',
    title: 'Applet element missing alt attribute',
    types: ['automated'],
    expectedFinding: '<applet> element has no alt attribute — scanner flags Fail_1 (missing alt)',
    wcagMapping: ['1.1.1'],
    wcagName: 'Non-text Content',
    severity: 'high',
    howToFix: 'Add an alt attribute to the <applet> element whose value differs from the code attribute, and provide inner fallback HTML content',
    route: '/ibm-checks',
    selectorHint: 'data-issue-id="AX-095"',
    checkHints: ['ibm:applet_alt_exists'],
  },
  {
    id: 'AX-096',
    title: 'aria-activedescendant is empty string',
    types: ['automated'],
    expectedFinding: 'aria-activedescendant="" is present but empty — scanner flags Fail_1 (empty value never resolves to a valid active child)',
    wcagMapping: ['4.1.2'],
    wcagName: 'Name, Role, Value',
    severity: 'high',
    howToFix: 'Either remove aria-activedescendant entirely or set it to a valid ID of a visible, non-hidden descendant element',
    route: '/ibm-checks',
    selectorHint: 'data-issue-id="AX-096"',
    checkHints: ['ibm:aria_activedescendant_valid'],
  },
  {
    id: 'AX-097',
    title: 'Element with HTML event handler attribute has no valid ARIA role',
    types: ['automated'],
    expectedFinding: 'A <div> with an onclick HTML attribute has no role — scanner flags Fail_1',
    wcagMapping: ['4.1.2'],
    wcagName: 'Name, Role, Value',
    severity: 'high',
    howToFix: 'Add a valid ARIA role (e.g. role="button") or use a native interactive element',
    route: '/ibm-checks',
    selectorHint: 'data-issue-id="AX-097"',
    checkHints: ['ibm:aria_eventhandler_role_valid'],
  },
  {
    id: 'AX-098',
    title: 'Combobox aria-activedescendant references option without aria-selected="true"',
    types: ['automated'],
    expectedFinding: 'aria-activedescendant references an option with aria-selected="false" — scanner flags Fail_active_not_selected',
    wcagMapping: ['4.1.2'],
    wcagName: 'Name, Role, Value',
    severity: 'high',
    howToFix: 'Set aria-selected="true" on the option referenced by aria-activedescendant',
    route: '/ibm-checks',
    selectorHint: 'data-issue-id="AX-098"',
    checkHints: ['ibm:combobox_active_descendant'],
  },
  {
    id: 'AX-099',
    title: 'Combobox uses unsupported aria-autocomplete="inline"',
    types: ['automated'],
    expectedFinding: 'aria-autocomplete="inline" on combobox input — scanner flags Fail_inline',
    wcagMapping: ['4.1.2'],
    wcagName: 'Name, Role, Value',
    severity: 'medium',
    howToFix: 'Use aria-autocomplete="list" or "both" on the input; never "inline" for combobox; remove aria-autocomplete from popup children',
    route: '/ibm-checks',
    selectorHint: 'data-issue-id="AX-099"',
    checkHints: ['ibm:combobox_autocomplete_valid'],
  },
  {
    id: 'AX-100',
    title: 'Combobox uses invalid ARIA 1.1 design pattern',
    types: ['automated'],
    expectedFinding: 'Non-input element has role="combobox" with aria-owns but no aria-controls (ARIA 1.1 pattern) — scanner flags Fail_1.1',
    wcagMapping: ['4.1.2'],
    wcagName: 'Name, Role, Value',
    severity: 'high',
    howToFix: 'Use ARIA 1.2 pattern: apply role="combobox" only to an <input type="text"> with aria-controls (not aria-owns)',
    route: '/ibm-checks',
    selectorHint: 'data-issue-id="AX-100"',
    checkHints: ['ibm:combobox_design_valid'],
  },
  {
    id: 'AX-101',
    title: 'Combobox aria-haspopup value does not match popup role',
    types: ['automated'],
    expectedFinding: 'aria-haspopup="tree" but popup has role="listbox" — scanner flags Fail_combobox_popup_role_mismatch',
    wcagMapping: ['4.1.2'],
    wcagName: 'Name, Role, Value',
    severity: 'medium',
    howToFix: 'Set aria-haspopup to the actual role of the popup element (listbox, tree, grid, or dialog)',
    route: '/ibm-checks',
    selectorHint: 'data-issue-id="AX-101"',
    checkHints: ['ibm:combobox_haspopup_valid'],
  },
  {
    id: 'AX-102',
    title: 'Input with list attribute has explicit aria-haspopup',
    types: ['automated'],
    expectedFinding: '<input type="text"> with both list and aria-haspopup attributes — scanner flags potential_type_misuse',
    wcagMapping: ['4.1.2'],
    wcagName: 'Name, Role, Value',
    severity: 'medium',
    howToFix: 'Remove the aria-haspopup attribute from <input> elements that already have a list attribute pointing to a <datalist>',
    route: '/ibm-checks',
    selectorHint: 'data-issue-id="AX-102"',
    checkHints: ['ibm:input_haspopup_conflict'],
  },
  {
    id: 'AX-103',
    title: 'Checkbox or radio label placed before the input',
    types: ['automated'],
    expectedFinding: 'Label element appears before its associated checkbox in DOM order — scanner flags Fail_2',
    wcagMapping: ['3.3.2'],
    wcagName: 'Labels or Instructions',
    severity: 'medium',
    howToFix: 'Place the label text immediately after the checkbox or radio button element in the DOM',
    route: '/ibm-checks',
    selectorHint: 'data-issue-id="AX-103"',
    checkHints: ['ibm:input_label_after'],
  },
  {
    id: 'AX-104',
    title: 'Text input or select label placed after the input',
    types: ['automated'],
    expectedFinding: 'Label element appears after its associated text input in DOM order — scanner flags Fail_2',
    wcagMapping: ['3.3.2'],
    wcagName: 'Labels or Instructions',
    severity: 'medium',
    howToFix: 'Place the label immediately before the text <input> or <select> element in the DOM',
    route: '/ibm-checks',
    selectorHint: 'data-issue-id="AX-104"',
    checkHints: ['ibm:input_label_before'],
  },
  {
    id: 'AX-105',
    title: 'Non-decorative SVG has no accessible name',
    types: ['automated'],
    expectedFinding: 'SVG element has no aria-label, aria-labelledby, or <title> child — scanner flags fail_acc_name',
    wcagMapping: ['1.1.1'],
    wcagName: 'Non-text Content',
    severity: 'high',
    howToFix: 'Add aria-label, a <title> child, or aria-labelledby to the SVG; mark decorative SVGs with aria-hidden="true"',
    route: '/ibm-checks',
    selectorHint: 'data-issue-id="AX-105"',
    checkHints: ['ibm:svg_graphics_labelled'],
  },
  {
    id: 'AX-106',
    title: 'Table descendant has explicit role that differs from its implicit role',
    types: ['automated'],
    expectedFinding: '<tr role="presentation"> inside role="grid" — implicit role is "row", explicit differs — scanner flags explicit_role',
    wcagMapping: ['4.1.2'],
    wcagName: 'Name, Role, Value',
    severity: 'medium',
    howToFix: 'Remove explicit role attributes from <tr>, <th>, and <td> inside table containers with role="table", "grid", or "treegrid"',
    route: '/ibm-checks',
    selectorHint: 'data-issue-id="AX-106"',
    checkHints: ['ibm:table_aria_descendants'],
  },
];

// ---- Shared label/box styles ----
const failBadge = 'inline-block text-xs font-semibold px-2 py-0.5 rounded bg-red-100 text-red-700 border border-red-300 mb-2';
const passBadge = 'inline-block text-xs font-semibold px-2 py-0.5 rounded bg-green-100 text-green-700 border border-green-300 mb-2';
const naBadge   = 'inline-block text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-700 border border-blue-300 mb-2';

const failBox = 'p-4 border border-red-200 rounded-lg bg-card mb-3';
const passBox = 'p-4 border border-green-200 rounded-lg bg-card mb-3';
const naBox   = 'p-4 border border-blue-200 rounded-lg bg-card mb-3';

export default function IBMChecks() {
  const appletFailRef = useRef<HTMLDivElement>(null);
  const appletPassRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ibmIssues.forEach(issue => {
      if (!window.__registeredIssues?.has(issue.id)) {
        registerIssue(issue);
        if (!window.__registeredIssues) window.__registeredIssues = new Set();
        window.__registeredIssues.add(issue.id);
      }
    });
  }, []);

  // AX-095: programmatically create <applet> elements so modern browsers
  // reliably expose them as proper DOM nodes (tagName "APPLET") to the scanner.
  useEffect(() => {
    if (appletFailRef.current && !appletFailRef.current.querySelector('applet')) {
      const applet = document.createElement('applet');
      applet.setAttribute('code', 'salesChart.class');
      applet.setAttribute('width', '300');
      applet.setAttribute('height', '200');
      const p = document.createElement('p');
      p.textContent = 'This chart displays quarterly sales figures by region for the past fiscal year.';
      applet.appendChild(p);
      appletFailRef.current.appendChild(applet);
    }
    if (appletPassRef.current && !appletPassRef.current.querySelector('applet')) {
      const applet = document.createElement('applet');
      applet.setAttribute('code', 'salesChart.class');
      applet.setAttribute('alt', 'Interactive quarterly sales chart');
      applet.setAttribute('width', '300');
      applet.setAttribute('height', '200');
      const p = document.createElement('p');
      p.textContent = 'This chart displays quarterly sales figures. Enable Java to view the interactive version.';
      applet.appendChild(p);
      appletPassRef.current.appendChild(applet);
    }
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
            demonstrates three scenarios: a <strong>Failure</strong> (broken pattern the scanner flags),
            a <strong>Pass</strong> (conformant HTML), and a <strong>Not Applicable</strong> (context where
            the rule returns null and does not evaluate).
          </p>
        </header>

        {/* ========== APPLET SECTION ========== */}
        <section id="applet-section">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">
            Applet Alternative Text
          </h2>

          {/* AX-095: applet_alt_exists */}
          <div id="AX-095" className="space-y-3">
            <IssueCard issue={ibmIssues[0]} />

            {/*
              FAIL — Fail_1: <applet> has inner content but no alt attribute.
              Rule context is dom:applet. Applet is inserted via document.createElement
              in useEffect so modern browsers create a proper APPLET DOM node that the
              IBM scanner can reliably query. The rule checks attributeNonEmpty(el,"alt"):
              if false → RuleFail("Fail_1").
            */}
            <div
              className={failBox}
              data-issue-id="AX-095"
              data-issue-type="automated"
              data-wcag="1.1.1"
              data-expected="fail"
            >
              <span className={failBadge}>Failure — Fail_1: no alt attribute</span>
              <p className="text-sm text-muted-foreground mb-2">
                <code>&lt;applet&gt;</code> has inner fallback content but is missing the required <code>alt</code> attribute.
              </p>
              <div ref={appletFailRef} />
            </div>

            {/*
              PASS — has alt attribute that differs from the code value, AND has inner content.
              Rule: attributeNonEmpty(alt) = true; alt != code; hasInnerContentHidden = true → Pass_0.
              Also inserted via document.createElement in useEffect for reliability.
            */}
            <div
              className={passBox}
              data-issue-id="AX-095"
              data-expected="pass"
            >
              <span className={passBadge}>Pass — alt attribute present, differs from code, inner content present</span>
              <p className="text-sm text-muted-foreground mb-2">
                <code>&lt;applet&gt;</code> has an <code>alt</code> value distinct from the <code>code</code> attribute, plus inner fallback HTML.
              </p>
              <div ref={appletPassRef} />
            </div>

            {/* NOT APPLICABLE — no <applet> element present; rule context never matches */}
            <div
              className={naBox}
              data-issue-id="AX-095"
              data-expected="notapplicable"
            >
              <span className={naBadge}>Not Applicable — no applet element on page</span>
              <p className="text-sm text-muted-foreground mb-2">
                No <code>&lt;applet&gt;</code> element; rule context <code>dom:applet</code> never matches.
                An <code>&lt;img&gt;</code> with proper alt text is used instead.
              </p>
              <img src="/placeholder.svg" alt="Quarterly sales chart" width={200} height={100} className="border border-border rounded" />
            </div>
          </div>
        </section>

        {/* ========== ARIA ATTRIBUTE CHECKS ========== */}
        <section id="aria-checks">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">
            ARIA Attribute Checks
          </h2>

          <div className="space-y-8">

            {/* AX-096: aria_activedescendant_valid */}
            <div id="AX-096" className="space-y-3">
              <IssueCard issue={ibmIssues[1]} />

            {/*
              FAIL — Fail_1: aria-activedescendant is present but its value is an empty
              string. Rule source:
                if (!descendant_id || descendant_id.trim() === "") return RuleFail("Fail_1");
              This is the earliest check in the rule and fires unconditionally —
              no visibility or containment checks are needed.
            */}
            <div
              className={failBox}
              data-issue-id="AX-096"
              data-issue-type="automated"
              data-wcag="4.1.2"
              data-expected="fail"
            >
              <span className={failBadge}>Failure — Fail_1: aria-activedescendant is empty string</span>
              <p className="text-sm text-muted-foreground mb-2">
                The listbox has <code>aria-activedescendant=""</code> — an empty value that
                never resolves to a valid active child. The scanner immediately flags <code>Fail_1</code>.
              </p>
              <div
                role="listbox"
                tabIndex={0}
                aria-label="Choose a city"
                aria-activedescendant=""
                className="border border-red-400 rounded p-2 w-52 focus:outline-none focus:ring-2"
              >
                <div role="option" aria-selected={false}>New York</div>
                <div role="option" aria-selected={false}>Los Angeles</div>
                <div role="option" aria-selected={false}>San Francisco</div>
              </div>
            </div>

              {/*
                PASS — aria-activedescendant references a visible descendant.
                ruleContext.contains(descendant) = true and descendant is visible → Pass_0.
              */}
              <div
                className={passBox}
                data-issue-id="AX-096"
                data-expected="pass"
              >
                <span className={passBadge}>Pass — references visible descendant</span>
                <p className="text-sm text-muted-foreground mb-2">
                  <code>aria-activedescendant="ax096-pass-sf"</code> points to a visible child element within the listbox.
                </p>
                <div
                  role="listbox"
                  tabIndex={0}
                  aria-label="Choose a city"
                  aria-activedescendant="ax096-pass-sf"
                  className="border border-green-400 rounded p-2 w-52 focus:outline-none focus:ring-2"
                >
                  <div id="ax096-pass-ny" role="option" aria-selected={false}>New York</div>
                  <div id="ax096-pass-sf" role="option" aria-selected={true} className="bg-primary/10 font-medium">
                    San Francisco
                  </div>
                  <div id="ax096-pass-la" role="option" aria-selected={false}>Los Angeles</div>
                </div>
              </div>

              {/* NOT APPLICABLE — no aria-activedescendant attribute; rule context never matches */}
              <div
                className={naBox}
                data-issue-id="AX-096"
                data-expected="notapplicable"
              >
                <span className={naBadge}>Not Applicable — no aria-activedescendant attribute</span>
                <p className="text-sm text-muted-foreground mb-2">
                  Native <code>&lt;select&gt;</code> used — no <code>aria-activedescendant</code> needed;
                  rule context <code>dom:*[aria-activedescendant]</code> never matches.
                </p>
                <label htmlFor="ax096-na-select" className="block text-sm font-medium mb-1">Choose a city</label>
                <select id="ax096-na-select" className="border border-input rounded px-3 py-2">
                  <option value="ny">New York</option>
                  <option value="sf">San Francisco</option>
                  <option value="la">Los Angeles</option>
                </select>
              </div>
            </div>

            {/* AX-097: aria_eventhandler_role_valid */}
            <div id="AX-097" className="space-y-3">
              <IssueCard issue={ibmIssues[2]} />

              {/*
                FAIL — Rule context: dom:*[onclick] (and other HTML event attributes).
                CRITICAL: React's onClick JSX prop does NOT write an onclick HTML attribute.
                The IBM scanner only fires on elements that have the literal HTML attribute.
                dangerouslySetInnerHTML is required to produce actual onclick= attributes.

                Rule logic: AriaUtil.hasAnyRole(el, true) = false (div has no implicit or
                explicit role) AND isfocusableByDefault = false → RuleFail("Fail_1").
              */}
              <div
                className={failBox}
                data-issue-id="AX-097"
                data-issue-type="automated"
                data-wcag="4.1.2"
                data-expected="fail"
              >
                <span className={failBadge}>Failure — Fail_1: onclick attribute present, no ARIA role</span>
                <p className="text-sm text-muted-foreground mb-2">
                  The <code>&lt;div&gt;</code> below has a literal HTML <code>onclick</code> attribute but no <code>role</code>.
                  React's <code>onClick</code> prop does not create an HTML attribute; raw HTML is required here.
                </p>
                <div dangerouslySetInnerHTML={{
                  __html: `<div onclick="void(0)" style="display:inline-block;padding:8px 16px;background:#f3f4f6;border:1px solid #d1d5db;border-radius:4px;cursor:pointer;">
  Delete record (no role)
</div>`
                }} />
              </div>

              {/*
                PASS — Same onclick HTML attribute but with role="button".
                Rule: AriaUtil.hasAnyRole(el, true) = true (explicit role="button") → Pass_0.
              */}
              <div
                className={passBox}
                data-issue-id="AX-097"
                data-expected="pass"
              >
                <span className={passBadge}>Pass — onclick attribute present with role="button"</span>
                <p className="text-sm text-muted-foreground mb-2">
                  Same pattern but <code>role="button"</code> and <code>tabindex="0"</code> added.
                </p>
                <div dangerouslySetInnerHTML={{
                  __html: `<div onclick="void(0)" role="button" tabindex="0" style="display:inline-block;padding:8px 16px;background:#3b82f6;color:#fff;border-radius:4px;cursor:pointer;">
  Delete record (role=button)
</div>`
                }} />
              </div>

              {/*
                NOT APPLICABLE — native <button> element.
                Rule: isfocusableByDefault(button) = true → Pass_0 (no fail raised).
                Also shown: no HTML event attribute means rule context never matches.
              */}
              <div
                className={naBox}
                data-issue-id="AX-097"
                data-expected="notapplicable"
              >
                <span className={naBadge}>Not Applicable — native button (isfocusableByDefault = true)</span>
                <p className="text-sm text-muted-foreground mb-2">
                  A native <code>&lt;button&gt;</code> element with an <code>onclick</code> attribute passes because
                  <code>isfocusableByDefault</code> returns true — no explicit role is needed.
                </p>
                <div dangerouslySetInnerHTML={{
                  __html: `<button onclick="void(0)" style="padding:8px 16px;background:#e5e7eb;border:1px solid #9ca3af;border-radius:4px;cursor:pointer;">
  Native Button
</button>`
                }} />
              </div>
            </div>

          </div>
        </section>

        {/* ========== COMBOBOX CHECKS ========== */}
        <section id="combobox-checks">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">
            Combobox Pattern Checks
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            All combobox rules depend on <code>combobox_popup_reference</code> (which depends on
            <code>combobox_design_valid</code>). For ARIA 1.2: popup must be <strong>visible</strong> when
            <code>aria-expanded="true"</code> and <strong>hidden</strong> when <code>aria-expanded="false"</code>.
          </p>

          <div className="space-y-8">

            {/* AX-098: combobox_active_descendant */}
            <div id="AX-098" className="space-y-3">
              <IssueCard issue={ibmIssues[3]} />

              {/*
                FAIL — Fail_active_not_selected:
                The combobox follows ARIA 1.2 (input + aria-controls + visible popup).
                aria-activedescendant references an option that has aria-selected="false".
                Rule: activeElem.getAttribute("aria-selected") !== "true" → RuleFail("Fail_active_not_selected").
              */}
              <div
                className={failBox}
                data-issue-id="AX-098"
                data-issue-type="automated"
                data-wcag="4.1.2"
                data-expected="fail"
              >
                <span className={failBadge}>Failure — Fail_active_not_selected: referenced option has aria-selected="false"</span>
                <p className="text-sm text-muted-foreground mb-2">
                  The combobox's <code>aria-activedescendant</code> points to <code>#ax098-fail-opt1</code>
                  which has <code>aria-selected="false"</code> — the active descendant must have <code>aria-selected="true"</code>.
                </p>
                <div className="relative w-72">
                  <label htmlFor="ax098-fail-input" className="block text-sm font-medium mb-1">City (fail)</label>
                  <input
                    id="ax098-fail-input"
                    type="text"
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded={true}
                    aria-controls="ax098-fail-popup"
                    aria-activedescendant="ax098-fail-opt1"
                    defaultValue="San"
                    className="border border-red-400 rounded px-3 py-2 w-full"
                    readOnly
                  />
                  {/* Popup is visible because aria-expanded="true" */}
                  <ul id="ax098-fail-popup" role="listbox" className="w-full border border-input bg-background rounded shadow mt-1">
                    {/* aria-selected="false" on the active item → Fail_active_not_selected */}
                    <li id="ax098-fail-opt1" role="option" aria-selected={false} className="px-3 py-1 bg-muted cursor-pointer">
                      San Francisco
                    </li>
                    <li id="ax098-fail-opt2" role="option" aria-selected={false} className="px-3 py-1 hover:bg-muted cursor-pointer">
                      San Diego
                    </li>
                  </ul>
                </div>
              </div>

              {/*
                PASS — aria-activedescendant references an option with role="option" AND
                aria-selected="true". All combobox_popup_reference requirements met.
              */}
              <div
                className={passBox}
                data-issue-id="AX-098"
                data-expected="pass"
              >
                <span className={passBadge}>Pass — referenced option has role="option" and aria-selected="true"</span>
                <p className="text-sm text-muted-foreground mb-2">
                  <code>#ax098-pass-opt1</code> has <code>role="option"</code> and <code>aria-selected="true"</code>.
                </p>
                <div className="relative w-72">
                  <label htmlFor="ax098-pass-input" className="block text-sm font-medium mb-1">City (pass)</label>
                  <input
                    id="ax098-pass-input"
                    type="text"
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded={true}
                    aria-controls="ax098-pass-popup"
                    aria-activedescendant="ax098-pass-opt1"
                    defaultValue="San"
                    className="border border-green-400 rounded px-3 py-2 w-full"
                    readOnly
                  />
                  <ul id="ax098-pass-popup" role="listbox" className="w-full border border-input bg-background rounded shadow mt-1">
                    <li id="ax098-pass-opt1" role="option" aria-selected={true} className="px-3 py-1 bg-primary/10 font-medium cursor-pointer">
                      San Francisco
                    </li>
                    <li id="ax098-pass-opt2" role="option" aria-selected={false} className="px-3 py-1 hover:bg-muted cursor-pointer">
                      San Diego
                    </li>
                  </ul>
                </div>
              </div>

              {/*
                NOT APPLICABLE — no aria-activedescendant set.
                Rule: if (!activeId || activeId.trim().length === 0) return null.
                The combobox is collapsed (aria-expanded="false") and no item is highlighted.
              */}
              <div
                className={naBox}
                data-issue-id="AX-098"
                data-expected="notapplicable"
              >
                <span className={naBadge}>Not Applicable — no aria-activedescendant set (collapsed combobox)</span>
                <p className="text-sm text-muted-foreground mb-2">
                  Combobox is collapsed with <code>aria-expanded="false"</code> and no <code>aria-activedescendant</code>
                  — rule returns null immediately.
                </p>
                <div className="w-72">
                  <label htmlFor="ax098-na-input" className="block text-sm font-medium mb-1">City (n/a)</label>
                  <input
                    id="ax098-na-input"
                    type="text"
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded={false}
                    aria-controls="ax098-na-popup"
                    placeholder="Start typing…"
                    className="border border-input rounded px-3 py-2 w-full"
                    readOnly
                  />
                  {/* Popup hidden because aria-expanded="false" */}
                  <ul id="ax098-na-popup" role="listbox" style={{ display: 'none' }}>
                    <li role="option" aria-selected={false}>San Francisco</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* AX-099: combobox_autocomplete_valid */}
            <div id="AX-099" className="space-y-3">
              <IssueCard issue={ibmIssues[4]} />

              {/*
                FAIL — Fail_inline: aria-autocomplete="inline" on the combobox input.
                Rule: ruleContext.getAttribute("aria-autocomplete") === "inline"
                      → RuleFail("Fail_inline").
              */}
              <div
                className={failBox}
                data-issue-id="AX-099"
                data-issue-type="automated"
                data-wcag="4.1.2"
                data-expected="fail"
              >
                <span className={failBadge}>Failure — Fail_inline: aria-autocomplete="inline" on combobox input</span>
                <p className="text-sm text-muted-foreground mb-2">
                  The combobox input has <code>aria-autocomplete="inline"</code> which is not supported for combobox.
                </p>
                <div className="relative w-72">
                  <label htmlFor="ax099-fail-input" className="block text-sm font-medium mb-1">Search (fail)</label>
                  <input
                    id="ax099-fail-input"
                    type="text"
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded={true}
                    aria-controls="ax099-fail-popup"
                    aria-autocomplete="inline"
                    defaultValue="Rea"
                    className="border border-red-400 rounded px-3 py-2 w-full"
                    readOnly
                  />
                  <ul id="ax099-fail-popup" role="listbox" className="w-full border border-input bg-background rounded shadow mt-1">
                    <li role="option" aria-selected={false} className="px-3 py-1 hover:bg-muted cursor-pointer">React</li>
                    <li role="option" aria-selected={false} className="px-3 py-1 hover:bg-muted cursor-pointer">Reason</li>
                  </ul>
                </div>
              </div>

              {/*
                PASS — aria-autocomplete="list" only on the input; no aria-autocomplete
                anywhere in the popup children.
              */}
              <div
                className={passBox}
                data-issue-id="AX-099"
                data-expected="pass"
              >
                <span className={passBadge}>Pass — aria-autocomplete="list" on input only; popup has none</span>
                <p className="text-sm text-muted-foreground mb-2">
                  <code>aria-autocomplete="list"</code> on the input only; no <code>aria-autocomplete</code> on any popup descendant.
                </p>
                <div className="relative w-72">
                  <label htmlFor="ax099-pass-input" className="block text-sm font-medium mb-1">Search (pass)</label>
                  <input
                    id="ax099-pass-input"
                    type="text"
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded={true}
                    aria-controls="ax099-pass-popup"
                    aria-autocomplete="list"
                    defaultValue="Rea"
                    className="border border-green-400 rounded px-3 py-2 w-full"
                    readOnly
                  />
                  <ul id="ax099-pass-popup" role="listbox" className="w-full border border-input bg-background rounded shadow mt-1">
                    <li role="option" aria-selected={false} className="px-3 py-1 hover:bg-muted cursor-pointer">React</li>
                    <li role="option" aria-selected={false} className="px-3 py-1 hover:bg-muted cursor-pointer">Reason</li>
                  </ul>
                </div>
              </div>

              {/* NOT APPLICABLE — combobox with no aria-autocomplete at all */}
              <div
                className={naBox}
                data-issue-id="AX-099"
                data-expected="notapplicable"
              >
                <span className={naBadge}>Not Applicable — no aria-autocomplete on combobox or popup</span>
                <p className="text-sm text-muted-foreground mb-2">
                  Combobox has no autocomplete behavior; neither <code>aria-autocomplete="inline"</code> nor
                  any popup descendant with <code>aria-autocomplete</code>. Rule returns Pass (no violation).
                </p>
                <div className="w-72">
                  <label htmlFor="ax099-na-input" className="block text-sm font-medium mb-1">Category (n/a)</label>
                  <input
                    id="ax099-na-input"
                    type="text"
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded={false}
                    aria-controls="ax099-na-popup"
                    placeholder="Select a category"
                    className="border border-input rounded px-3 py-2 w-full"
                    readOnly
                  />
                  <ul id="ax099-na-popup" role="listbox" style={{ display: 'none' }}>
                    <li role="option" aria-selected={false}>Category A</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* AX-100: combobox_design_valid */}
            <div id="AX-100" className="space-y-3">
              <IssueCard issue={ibmIssues[5]} />

              {/*
                FAIL — Fail_1.1: ARIA 1.1 pattern detected.
                patternDetect logic:
                  elem.nodeName !== "input" AND has aria-owns AND does NOT have aria-controls
                  → pattern = "1.1" → RuleFail("Fail_1.1")
                Using <div role="combobox" aria-owns="..." (no aria-controls)>.
              */}
              <div
                className={failBox}
                data-issue-id="AX-100"
                data-issue-type="automated"
                data-wcag="4.1.2"
                data-expected="fail"
              >
                <span className={failBadge}>Failure — Fail_1.1: ARIA 1.1 pattern (non-input with aria-owns, no aria-controls)</span>
                <p className="text-sm text-muted-foreground mb-2">
                  A <code>&lt;div&gt;</code> has <code>role="combobox"</code> with <code>aria-owns</code> but no
                  <code>aria-controls</code>. This is the deprecated ARIA 1.1 pattern.
                </p>
                <div className="w-72">
                  {/* ARIA 1.1 fail: non-input + aria-owns + no aria-controls */}
                  <div
                    role="combobox"
                    aria-owns="ax100-fail-popup"
                    aria-expanded={false}
                    aria-haspopup="listbox"
                    tabIndex={0}
                    className="border border-red-400 rounded px-3 py-2 cursor-text bg-background"
                  >
                    <span className="text-muted-foreground text-sm">Select a city…</span>
                  </div>
                  <ul id="ax100-fail-popup" role="listbox" style={{ display: 'none' }}>
                    <li role="option" aria-selected={false}>Chicago</li>
                    <li role="option" aria-selected={false}>Charlotte</li>
                  </ul>
                </div>
              </div>

              {/*
                PASS — Pass_1.2: ARIA 1.2 pattern.
                input element + aria-controls (no aria-owns) → pattern = "1.2" → Pass_1.2.
              */}
              <div
                className={passBox}
                data-issue-id="AX-100"
                data-expected="pass"
              >
                <span className={passBadge}>Pass — Pass_1.2: input with aria-controls (ARIA 1.2 pattern)</span>
                <p className="text-sm text-muted-foreground mb-2">
                  <code>&lt;input type="text" role="combobox" aria-controls="..."&gt;</code> — correct ARIA 1.2 pattern.
                </p>
                <div className="w-72">
                  <label htmlFor="ax100-pass-input" className="block text-sm font-medium mb-1">City (pass)</label>
                  <input
                    id="ax100-pass-input"
                    type="text"
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded={false}
                    aria-controls="ax100-pass-popup"
                    placeholder="Select a city…"
                    className="border border-green-400 rounded px-3 py-2 w-full"
                    readOnly
                  />
                  <ul id="ax100-pass-popup" role="listbox" style={{ display: 'none' }}>
                    <li role="option" aria-selected={false}>Chicago</li>
                    <li role="option" aria-selected={false}>Charlotte</li>
                  </ul>
                </div>
              </div>

              {/*
                NOT APPLICABLE — native <select> element.
                patternDetect: tagName === "select" && role !== "combobox" → "implicit" → return null.
              */}
              <div
                className={naBox}
                data-issue-id="AX-100"
                data-expected="notapplicable"
              >
                <span className={naBadge}>Not Applicable — native &lt;select&gt; (implicit combobox, no explicit role)</span>
                <p className="text-sm text-muted-foreground mb-2">
                  A plain <code>&lt;select&gt;</code> without explicit <code>role="combobox"</code>
                  is detected as "implicit" pattern and skipped by the rule.
                </p>
                <label htmlFor="ax100-na-select" className="block text-sm font-medium mb-1">Country</label>
                <select id="ax100-na-select" className="border border-input rounded px-3 py-2 w-48">
                  <option value="us">United States</option>
                  <option value="gb">United Kingdom</option>
                </select>
              </div>
            </div>

            {/* AX-101: combobox_haspopup_valid */}
            <div id="AX-101" className="space-y-3">
              <IssueCard issue={ibmIssues[6]} />

              {/*
                FAIL — Fail_combobox_popup_role_mismatch:
                aria-haspopup="tree" but the popup element has role="listbox".
                Rule: haspopupVal ("tree") !== popupRole ("listbox") → RuleFail("Fail_combobox_popup_role_mismatch").
                Popup must be visible (aria-expanded="true") for combobox_popup_reference to cache it.
              */}
              <div
                className={failBox}
                data-issue-id="AX-101"
                data-issue-type="automated"
                data-wcag="4.1.2"
                data-expected="fail"
              >
                <span className={failBadge}>Failure — Fail_combobox_popup_role_mismatch: aria-haspopup="tree" vs popup role="listbox"</span>
                <p className="text-sm text-muted-foreground mb-2">
                  The combobox declares <code>aria-haspopup="tree"</code> but its popup has <code>role="listbox"</code>.
                </p>
                <div className="relative w-72">
                  <label htmlFor="ax101-fail-input" className="block text-sm font-medium mb-1">City (fail)</label>
                  <input
                    id="ax101-fail-input"
                    type="text"
                    role="combobox"
                    aria-haspopup="tree"
                    aria-expanded={true}
                    aria-controls="ax101-fail-popup"
                    defaultValue="Ch"
                    className="border border-red-400 rounded px-3 py-2 w-full"
                    readOnly
                  />
                  {/* role="listbox" but aria-haspopup="tree" — mismatch */}
                  <ul id="ax101-fail-popup" role="listbox" className="w-full border border-input bg-background rounded shadow mt-1">
                    <li role="option" aria-selected={false} className="px-3 py-1 hover:bg-muted cursor-pointer">Chicago</li>
                    <li role="option" aria-selected={false} className="px-3 py-1 hover:bg-muted cursor-pointer">Charlotte</li>
                  </ul>
                </div>
              </div>

              {/*
                PASS — aria-haspopup="listbox" matches popup role="listbox".
              */}
              <div
                className={passBox}
                data-issue-id="AX-101"
                data-expected="pass"
              >
                <span className={passBadge}>Pass — aria-haspopup="listbox" matches popup role="listbox"</span>
                <p className="text-sm text-muted-foreground mb-2">
                  <code>aria-haspopup="listbox"</code> correctly matches the popup's <code>role="listbox"</code>.
                </p>
                <div className="relative w-72">
                  <label htmlFor="ax101-pass-input" className="block text-sm font-medium mb-1">City (pass)</label>
                  <input
                    id="ax101-pass-input"
                    type="text"
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded={true}
                    aria-controls="ax101-pass-popup"
                    defaultValue="Ch"
                    className="border border-green-400 rounded px-3 py-2 w-full"
                    readOnly
                  />
                  <ul id="ax101-pass-popup" role="listbox" className="w-full border border-input bg-background rounded shadow mt-1">
                    <li role="option" aria-selected={false} className="px-3 py-1 hover:bg-muted cursor-pointer">Chicago</li>
                    <li role="option" aria-selected={false} className="px-3 py-1 hover:bg-muted cursor-pointer">Charlotte</li>
                  </ul>
                </div>
              </div>

              {/* NOT APPLICABLE — no combobox present */}
              <div
                className={naBox}
                data-issue-id="AX-101"
                data-expected="notapplicable"
              >
                <span className={naBadge}>Not Applicable — no combobox element</span>
                <p className="text-sm text-muted-foreground mb-2">
                  Rule context is <code>aria:combobox</code>; plain inputs without combobox role are not evaluated.
                </p>
                <label htmlFor="ax101-na-input" className="block text-sm font-medium mb-1">Plain search</label>
                <input
                  id="ax101-na-input"
                  type="search"
                  placeholder="Search…"
                  className="border border-input rounded px-3 py-2 w-48"
                />
              </div>
            </div>

          </div>
        </section>

        {/* ========== INPUT CHECKS ========== */}
        <section id="input-checks">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">
            Input Attribute and Label Checks
          </h2>

          <div className="space-y-8">

            {/* AX-102: input_haspopup_conflict */}
            <div id="AX-102" className="space-y-3">
              <IssueCard issue={ibmIssues[7]} />

              {/*
                FAIL — RuleFail("potential_list_notexist"):
                Rule context: dom:input[list][aria-haspopup].
                Both list AND aria-haspopup must be present.
                When the element referenced by the list attribute does not exist in the DOM,
                the rule returns RuleFail("potential_list_notexist") — a hard violation
                (despite the misleading key name). No datalist element is intentionally
                created so getElementById(list) returns null → RuleFail.
              */}
              <div
                className={failBox}
                data-issue-id="AX-102"
                data-issue-type="automated"
                data-wcag="4.1.2"
                data-expected="fail"
              >
                <span className={failBadge}>Failure — list references nonexistent datalist + aria-haspopup present</span>
                <p className="text-sm text-muted-foreground mb-2">
                  <code>&lt;input type="text"&gt;</code> has a <code>list</code> attribute pointing to a
                  nonexistent element <em>and</em> an explicit <code>aria-haspopup="listbox"</code>.
                  The missing datalist triggers a hard <code>RuleFail</code>.
                </p>
                <label htmlFor="ax102-fail-input" className="block text-sm font-medium mb-1">Favourite fruit</label>
                <input
                  id="ax102-fail-input"
                  type="text"
                  list="ax102-fail-fruits-nonexistent"
                  aria-haspopup="listbox"
                  className="border border-red-400 rounded px-3 py-2 w-56"
                  placeholder="Type a fruit…"
                />
              </div>

              {/* PASS — list attribute present but no aria-haspopup */}
              <div
                className={passBox}
                data-issue-id="AX-102"
                data-expected="pass"
              >
                <span className={passBadge}>Pass — list attribute present but no aria-haspopup</span>
                <p className="text-sm text-muted-foreground mb-2">
                  Input with a <code>list</code> attribute only — no <code>aria-haspopup</code>.
                  Rule context <code>dom:input[list][aria-haspopup]</code> never matches.
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

              {/* NOT APPLICABLE — input without list attribute */}
              <div
                className={naBox}
                data-issue-id="AX-102"
                data-expected="notapplicable"
              >
                <span className={naBadge}>Not Applicable — input has no list attribute</span>
                <p className="text-sm text-muted-foreground mb-2">
                  Plain text input without a <code>list</code> attribute — rule context
                  <code>dom:input[list][aria-haspopup]</code> requires both attributes.
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

            {/* AX-103: input_label_after */}
            <div id="AX-103" className="space-y-3">
              <IssueCard issue={ibmIssues[8]} />

              {/*
                FAIL — Fail_2: label is before the checkbox in DOM order.
                Rule: compareNodeOrder(labelElem, ruleContext) returns -1 (label before input),
                which is != 1 (expected: label after input) → RuleFail("Fail_2").
                Label found via for/id association. React htmlFor → for in DOM.
              */}
              <div
                className={failBox}
                data-issue-id="AX-103"
                data-issue-type="automated"
                data-wcag="3.3.2"
                data-expected="fail"
              >
                <span className={failBadge}>Failure — Fail_2: label appears before checkbox in DOM order</span>
                <p className="text-sm text-muted-foreground mb-2">
                  The <code>&lt;label&gt;</code> element precedes the <code>&lt;input type="checkbox"&gt;</code> in the DOM.
                  Rule expects label to come <strong>after</strong> the input.
                </p>
                <div className="space-y-2">
                  {/* label BEFORE checkbox = Fail_2 */}
                  <div>
                    <label htmlFor="ax103-fail-cb" className="text-sm mr-2">I agree to the terms and conditions</label>
                    <input type="checkbox" id="ax103-fail-cb" />
                  </div>
                  <div>
                    <label htmlFor="ax103-fail-rb" className="text-sm mr-2">Subscribe to newsletter</label>
                    <input type="radio" id="ax103-fail-rb" name="ax103-fail-group" />
                  </div>
                </div>
              </div>

              {/*
                PASS — label appears AFTER the checkbox in DOM order.
                compareNodeOrder(labelElem, ruleContext) returns 1 → Pass_0.
              */}
              <div
                className={passBox}
                data-issue-id="AX-103"
                data-expected="pass"
              >
                <span className={passBadge}>Pass — label appears after checkbox in DOM order</span>
                <p className="text-sm text-muted-foreground mb-2">
                  The <code>&lt;input type="checkbox"&gt;</code> comes first in the DOM, followed by the label.
                </p>
                <div className="space-y-2">
                  {/* input BEFORE label = Pass */}
                  <div>
                    <input type="checkbox" id="ax103-pass-cb" className="mr-2" />
                    <label htmlFor="ax103-pass-cb" className="text-sm">I agree to the terms and conditions</label>
                  </div>
                  <div>
                    <input type="radio" id="ax103-pass-rb" name="ax103-pass-group" className="mr-2" />
                    <label htmlFor="ax103-pass-rb" className="text-sm">Subscribe to newsletter</label>
                  </div>
                </div>
              </div>

              {/*
                NOT APPLICABLE — input type is "text" (not checkbox/radio).
                Rule: if (type != "checkbox" && type != "radio") return null.
              */}
              <div
                className={naBox}
                data-issue-id="AX-103"
                data-expected="notapplicable"
              >
                <span className={naBadge}>Not Applicable — input type is "text" (rule only fires for checkbox/radio)</span>
                <p className="text-sm text-muted-foreground mb-2">
                  Rule context is <code>dom:input</code> but rule logic returns null immediately
                  for any type other than "checkbox" or "radio".
                </p>
                <label htmlFor="ax103-na-text" className="block text-sm font-medium mb-1">First name</label>
                <input type="text" id="ax103-na-text" className="border border-input rounded px-3 py-2 w-48" />
              </div>
            </div>

            {/* AX-104: input_label_before */}
            <div id="AX-104" className="space-y-3">
              <IssueCard issue={ibmIssues[9]} />

              {/*
                FAIL — Fail_2: label appears AFTER the text input in DOM order.
                Rule: compareNodeOrder(labelElem, ruleContext) returns 1 (label after input),
                which is != -1 (expected: label before input) → RuleFail("Fail_2").
                Only fires for type="text", "file", "password", or missing type.
              */}
              <div
                className={failBox}
                data-issue-id="AX-104"
                data-issue-type="automated"
                data-wcag="3.3.2"
                data-expected="fail"
              >
                <span className={failBadge}>Failure — Fail_2: label appears after text input in DOM order</span>
                <p className="text-sm text-muted-foreground mb-2">
                  The <code>&lt;input type="text"&gt;</code> appears before its label in the DOM.
                  Rule expects the label to come <strong>before</strong> the input.
                </p>
                <div className="space-y-3">
                  {/* input BEFORE label = Fail_2 */}
                  <div className="flex flex-col gap-0.5 w-48">
                    <input type="text" id="ax104-fail-input" className="border border-red-400 rounded px-3 py-2" />
                    <label htmlFor="ax104-fail-input" className="text-sm">Email address</label>
                  </div>
                  <div className="flex flex-col gap-0.5 w-48">
                    <select id="ax104-fail-select" className="border border-red-400 rounded px-3 py-2">
                      <option>Option 1</option>
                      <option>Option 2</option>
                    </select>
                    <label htmlFor="ax104-fail-select" className="text-sm">Timezone</label>
                  </div>
                </div>
              </div>

              {/*
                PASS — label appears BEFORE the text input in DOM order.
                compareNodeOrder(labelElem, ruleContext) returns -1 → Pass_0.
              */}
              <div
                className={passBox}
                data-issue-id="AX-104"
                data-expected="pass"
              >
                <span className={passBadge}>Pass — label appears before text input in DOM order</span>
                <p className="text-sm text-muted-foreground mb-2">
                  Label precedes the input in the DOM — correct order.
                </p>
                <div className="space-y-3">
                  <div className="flex flex-col gap-0.5 w-48">
                    <label htmlFor="ax104-pass-input" className="text-sm font-medium">Email address</label>
                    <input type="text" id="ax104-pass-input" className="border border-green-400 rounded px-3 py-2" />
                  </div>
                  <div className="flex flex-col gap-0.5 w-48">
                    <label htmlFor="ax104-pass-select" className="text-sm font-medium">Timezone</label>
                    <select id="ax104-pass-select" className="border border-green-400 rounded px-3 py-2">
                      <option>Option 1</option>
                      <option>Option 2</option>
                    </select>
                  </div>
                </div>
              </div>

              {/*
                NOT APPLICABLE — input type="checkbox" (rule returns null for non-text types).
                Rule: if type != "text" && type != "file" && type != "password" → return null.
              */}
              <div
                className={naBox}
                data-issue-id="AX-104"
                data-expected="notapplicable"
              >
                <span className={naBadge}>Not Applicable — input type="checkbox" (rule only fires for text/file/password)</span>
                <p className="text-sm text-muted-foreground mb-2">
                  Rule logic immediately returns null for inputs that are not type "text", "file", or "password".
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
            SVG Accessibility
          </h2>

          {/* AX-105: svg_graphics_labelled */}
          <div id="AX-105" className="space-y-3">
            <IssueCard issue={ibmIssues[10]} />

            {/*
              FAIL — fail_acc_name:
              SVG element has no accessible name. AccNameUtil.computeAccessibleName returns
              empty (no aria-label, no aria-labelledby, no <title> child).
              Rule: name_pair.name is empty → RuleFail("fail_acc_name").
            */}
            <div
              className={failBox}
              data-issue-id="AX-105"
              data-issue-type="automated"
              data-wcag="1.1.1"
              data-expected="fail"
            >
              <span className={failBadge}>Failure — fail_acc_name: no aria-label, title, or aria-labelledby</span>
              <p className="text-sm text-muted-foreground mb-2">
                Meaningful SVG icon with no accessible name. No <code>aria-label</code>, no <code>&lt;title&gt;</code>
                child, no <code>aria-labelledby</code>.
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
                className="text-foreground"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>

            {/*
              PASS — SVG has aria-label providing an accessible name.
              AccNameUtil.computeAccessibleName finds the aria-label → RulePass("pass").
            */}
            <div
              className={passBox}
              data-issue-id="AX-105"
              data-expected="pass"
            >
              <span className={passBadge}>Pass — aria-label provides accessible name</span>
              <p className="text-sm text-muted-foreground mb-2">
                SVG has <code>aria-label="Upload file"</code> and <code>role="img"</code>.
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

            {/*
              NOT APPLICABLE — SVG is hidden from AT via aria-hidden="true".
              Rule: VisUtil.isNodeHiddenFromAT(ruleContext) = true → return null.
            */}
            <div
              className={naBox}
              data-issue-id="AX-105"
              data-expected="notapplicable"
            >
              <span className={naBadge}>Not Applicable — aria-hidden="true" (isNodeHiddenFromAT = true)</span>
              <p className="text-sm text-muted-foreground mb-2">
                Decorative SVG with <code>aria-hidden="true"</code>. Rule returns null immediately
                because <code>isNodeHiddenFromAT</code> is true.
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
                  focusable="false"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span className="text-sm">Decorative icon next to visible text label</span>
              </span>
            </div>
          </div>
        </section>

        {/* ========== TABLE CHECKS ========== */}
        <section id="table-checks">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">
            Table Structure Checks
          </h2>

          {/* AX-106: table_aria_descendants */}
          <div id="AX-106" className="space-y-3">
            <IssueCard issue={ibmIssues[11]} />

            {/*
              FAIL — explicit_role:
              Rule context: aria:grid dom:tr[role], aria:grid dom:td[role].
              CRITICAL: The rule SKIPS elements where explicit role == implicit role
              (that's handled by aria_role_redundant). So <tr role="row"> inside
              role="grid" is skipped because tr's implicit role IS "row".

              To actually trigger this rule, the explicit role must DIFFER from implicit:
              - <tr role="presentation"> inside role="grid": tr's implicit is "row",
                "presentation" != "row" → rule fires.
              - <td role="button"> inside role="grid": td's implicit in grid is "gridcell",
                "button" != "gridcell" → rule fires.
            */}
            <div
              className={failBox}
              data-issue-id="AX-106"
              data-issue-type="automated"
              data-wcag="4.1.2"
              data-expected="fail"
            >
              <span className={failBadge}>Failure — explicit_role: tr/td have explicit roles differing from implicit roles inside role="grid"</span>
              <p className="text-sm text-muted-foreground mb-2">
                <code>&lt;tr role="presentation"&gt;</code> (implicit = "row") and
                <code>&lt;td role="button"&gt;</code> (implicit = "gridcell") — both differ from their implicit roles
                inside a <code>role="grid"</code> container.
              </p>
              <table role="grid" aria-label="Orders (failure)" className="border-collapse border border-border text-sm">
                <thead>
                  {/* role="presentation" differs from tr's implicit "row" → rule fires */}
                  <tr role="presentation">
                    <th scope="col" className="border border-border px-3 py-2 bg-muted">Order</th>
                    <th scope="col" className="border border-border px-3 py-2 bg-muted">Status</th>
                    <th scope="col" className="border border-border px-3 py-2 bg-muted">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {/* role="button" differs from td's implicit "gridcell" in grid context → rule fires */}
                    <td role="button" className="border border-border px-3 py-2">#1042</td>
                    <td className="border border-border px-3 py-2">Shipped</td>
                    <td className="border border-border px-3 py-2">$49.99</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/*
              PASS — no explicit roles on tr/th/td inside role="grid".
              Rule context dom:tr[role] never matches because no role attribute present.
            */}
            <div
              className={passBox}
              data-issue-id="AX-106"
              data-expected="pass"
            >
              <span className={passBadge}>Pass — no explicit roles on tr/td inside role="grid"</span>
              <p className="text-sm text-muted-foreground mb-2">
                Same <code>role="grid"</code> container but <code>&lt;tr&gt;</code>, <code>&lt;th&gt;</code>,
                and <code>&lt;td&gt;</code> have no explicit role attributes. Rule context
                <code>dom:tr[role]</code> never matches.
              </p>
              <table role="grid" aria-label="Orders (pass)" className="border-collapse border border-border text-sm">
                <thead>
                  <tr>
                    <th scope="col" className="border border-border px-3 py-2 bg-muted">Order</th>
                    <th scope="col" className="border border-border px-3 py-2 bg-muted">Status</th>
                    <th scope="col" className="border border-border px-3 py-2 bg-muted">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-3 py-2">#1042</td>
                    <td className="border border-border px-3 py-2">Shipped</td>
                    <td className="border border-border px-3 py-2">$49.99</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/*
              NOT APPLICABLE — plain <table> with no role attribute.
              Rule context requires aria:grid (or aria:table / aria:treegrid) ancestor.
              A table without role="grid/table/treegrid" is not matched.
            */}
            <div
              className={naBox}
              data-issue-id="AX-106"
              data-expected="notapplicable"
            >
              <span className={naBadge}>Not Applicable — plain &lt;table&gt; without role="grid/table/treegrid"</span>
              <p className="text-sm text-muted-foreground mb-2">
                Rule context requires an ancestor with <code>role="table"</code>, <code>"grid"</code>, or
                <code>"treegrid"</code>. A plain HTML <code>&lt;table&gt;</code> with no role attribute is not matched.
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
