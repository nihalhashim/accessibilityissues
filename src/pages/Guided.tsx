import { useEffect, useState } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { IssueCard } from '@/components/IssueCard';
import { registerIssue, type AccessibilityIssue } from '@/types/issues';

// ============ KEYBOARD & FOCUS ISSUES ============
const keyboardIssues: AccessibilityIssue[] = [
  { id: 'AX-055', title: 'Keyboard trap in custom widget', types: ['guided'], expectedFinding: 'User cannot Tab out of widget once focused', wcagMapping: ['2.1.2'], wcagName: 'No Keyboard Trap', severity: 'high', howToFix: 'Ensure Tab moves focus out of widget; provide documented escape method', route: '/guided', selectorHint: 'data-issue-id="AX-055"', checkHints: ['guided:keyboard-trap'] },
  { id: 'AX-056', title: 'Positive tabindex disrupts order', types: ['guided'], expectedFinding: 'Elements with positive tabindex break natural focus order', wcagMapping: ['2.4.3'], wcagName: 'Focus Order', severity: 'medium', howToFix: 'Remove positive tabindex values; use DOM order for focus sequence', route: '/guided', selectorHint: 'data-issue-id="AX-056"', checkHints: ['axe:tabindex', 'guided:focus-order'] },
  { id: 'AX-057', title: 'Focus indicator removed via CSS', types: ['guided', 'automated'], expectedFinding: 'Element has outline:none without replacement focus style', wcagMapping: ['2.4.7'], wcagName: 'Focus Visible', severity: 'high', howToFix: 'Remove outline:none or add visible custom focus indicator', route: '/guided', selectorHint: 'data-issue-id="AX-057"', checkHints: ['guided:focus-visible'] },
  { id: 'AX-058', title: 'Custom control not keyboard operable', types: ['guided'], expectedFinding: 'Div-based control cannot be activated with Enter/Space', wcagMapping: ['2.1.1'], wcagName: 'Keyboard', severity: 'high', howToFix: 'Add keyboard event handlers or use native button element', route: '/guided', selectorHint: 'data-issue-id="AX-058"', checkHints: ['guided:keyboard-operable'] },
  { id: 'AX-059', title: 'Skip link missing or broken', types: ['guided'], expectedFinding: 'No skip link, or skip link target does not exist', wcagMapping: ['2.4.1'], wcagName: 'Bypass Blocks', severity: 'medium', howToFix: 'Add working skip link as first focusable element', route: '/guided', selectorHint: 'data-issue-id="AX-059"', checkHints: ['axe:skip-link', 'guided:skip-link'] },
  { id: 'AX-060', title: 'Focus moves unexpectedly', types: ['guided'], expectedFinding: 'Focus jumps to unexpected location on interaction', wcagMapping: ['3.2.1'], wcagName: 'On Focus', severity: 'medium', howToFix: 'Do not change context on focus; only on explicit activation', route: '/guided', selectorHint: 'data-issue-id="AX-060"', checkHints: ['guided:focus-behavior'] },
];

// ============ MODALS & DYNAMIC CONTENT ISSUES ============
const modalIssues: AccessibilityIssue[] = [
  { id: 'AX-061', title: 'Modal without focus trap', types: ['guided'], expectedFinding: 'Tab moves focus outside open modal to background content', wcagMapping: ['2.4.3'], wcagName: 'Focus Order', severity: 'high', howToFix: 'Trap focus within modal while open; return focus on close', route: '/guided', selectorHint: 'data-issue-id="AX-061"', checkHints: ['guided:focus-trap'] },
  { id: 'AX-062', title: 'Modal does not close with Escape', types: ['guided'], expectedFinding: 'Pressing Escape key does not close the modal', wcagMapping: ['2.1.1'], wcagName: 'Keyboard', severity: 'medium', howToFix: 'Add Escape key handler to close modal', route: '/guided', selectorHint: 'data-issue-id="AX-062"', checkHints: ['guided:escape-close'] },
  { id: 'AX-063', title: 'Focus not restored after modal close', types: ['guided'], expectedFinding: 'After closing modal, focus is lost or goes to top of page', wcagMapping: ['2.4.3'], wcagName: 'Focus Order', severity: 'medium', howToFix: 'Return focus to the element that opened the modal', route: '/guided', selectorHint: 'data-issue-id="AX-063"', checkHints: ['guided:focus-restore'] },
  { id: 'AX-064', title: 'Toast not announced to screen readers', types: ['guided'], expectedFinding: 'Toast notification appears without aria-live announcement', wcagMapping: ['4.1.3'], wcagName: 'Status Messages', severity: 'medium', howToFix: 'Use aria-live="polite" or role="status" for toast container', route: '/guided', selectorHint: 'data-issue-id="AX-064"', checkHints: ['guided:live-region'] },
  { id: 'AX-065', title: 'Loading spinner with no status', types: ['guided'], expectedFinding: 'Loading state not announced; no aria-busy or status text', wcagMapping: ['4.1.3'], wcagName: 'Status Messages', severity: 'medium', howToFix: 'Add aria-busy="true" and visually hidden loading text', route: '/guided', selectorHint: 'data-issue-id="AX-065"', checkHints: ['guided:loading-status'] },
  { id: 'AX-066', title: 'Auto-playing carousel without pause', types: ['guided'], expectedFinding: 'Carousel auto-advances with no way to pause', wcagMapping: ['2.2.2'], wcagName: 'Pause, Stop, Hide', severity: 'high', howToFix: 'Add pause/stop control for auto-playing content', route: '/guided', selectorHint: 'data-issue-id="AX-066"', checkHints: ['guided:auto-play'] },
  { id: 'AX-067', title: 'Hover-only tooltip', types: ['guided'], expectedFinding: 'Tooltip appears on hover but not on focus; cannot be dismissed', wcagMapping: ['1.4.13'], wcagName: 'Content on Hover or Focus', severity: 'medium', howToFix: 'Show tooltip on focus too; allow Escape to dismiss', route: '/guided', selectorHint: 'data-issue-id="AX-067"', checkHints: ['guided:hover-focus'] },
];

// ============ NAVIGATION & LINKS ISSUES ============
const navIssues: AccessibilityIssue[] = [
  { id: 'AX-068', title: 'Ambiguous link text - click here', types: ['automated', 'guided'], expectedFinding: 'Link text "click here" does not describe destination', wcagMapping: ['2.4.4'], wcagName: 'Link Purpose (In Context)', severity: 'medium', howToFix: 'Use descriptive link text that indicates destination', route: '/guided', selectorHint: 'data-issue-id="AX-068"', checkHints: ['axe:link-name'] },
  { id: 'AX-069', title: 'Multiple identical link texts', types: ['guided'], expectedFinding: 'Multiple "Read more" links without distinguishing context', wcagMapping: ['2.4.4'], wcagName: 'Link Purpose (In Context)', severity: 'medium', howToFix: 'Add aria-label or visually hidden text to distinguish links', route: '/guided', selectorHint: 'data-issue-id="AX-069"', checkHints: ['guided:link-context'] },
  { id: 'AX-070', title: 'Link opens new window without warning', types: ['guided'], expectedFinding: 'Link has target="_blank" without indication', wcagMapping: ['3.2.5'], wcagName: 'Change on Request', severity: 'low', howToFix: 'Add "(opens in new tab)" text or icon with accessible name', route: '/guided', selectorHint: 'data-issue-id="AX-070"', checkHints: ['guided:new-window'] },
  { id: 'AX-071', title: 'Download link without file info', types: ['guided', 'manual'], expectedFinding: 'Download link missing file type and size information', wcagMapping: ['2.4.4'], wcagName: 'Link Purpose (In Context)', severity: 'low', howToFix: 'Include file type and size in link text or adjacent content', route: '/guided', selectorHint: 'data-issue-id="AX-071"', checkHints: ['manual:download-info'] },
  { id: 'AX-072', title: 'Empty link', types: ['automated'], expectedFinding: 'Link element contains no text or accessible name', wcagMapping: ['2.4.4', '4.1.2'], wcagName: 'Link Purpose, Name Role Value', severity: 'high', howToFix: 'Add text content or aria-label to link', route: '/guided', selectorHint: 'data-issue-id="AX-072"', checkHints: ['axe:link-name'] },
];

// ============ ERRORS & FEEDBACK ISSUES ============
const errorIssues: AccessibilityIssue[] = [
  { id: 'AX-073', title: 'Error message not linked to field', types: ['guided', 'automated'], expectedFinding: 'Validation error not programmatically associated with input', wcagMapping: ['3.3.1', '4.1.3'], wcagName: 'Error Identification, Status Messages', severity: 'high', howToFix: 'Use aria-describedby to link error message to input', route: '/guided', selectorHint: 'data-issue-id="AX-073"', checkHints: ['guided:error-association'] },
  { id: 'AX-074', title: 'Error summary not focused', types: ['guided'], expectedFinding: 'Form submission errors shown but focus not moved to summary', wcagMapping: ['3.3.1'], wcagName: 'Error Identification', severity: 'medium', howToFix: 'Move focus to error summary on form submission failure', route: '/guided', selectorHint: 'data-issue-id="AX-074"', checkHints: ['guided:focus-error-summary'] },
  { id: 'AX-075', title: 'Success message not announced', types: ['guided'], expectedFinding: 'Form success feedback not announced to screen readers', wcagMapping: ['4.1.3'], wcagName: 'Status Messages', severity: 'medium', howToFix: 'Use role="status" or aria-live for success messages', route: '/guided', selectorHint: 'data-issue-id="AX-075"', checkHints: ['guided:status-announcement'] },
  { id: 'AX-076', title: 'Error suggestion missing', types: ['manual'], expectedFinding: 'Error tells user what is wrong but not how to fix it', wcagMapping: ['3.3.3'], wcagName: 'Error Suggestion', severity: 'medium', howToFix: 'Provide specific guidance on how to correct the error', route: '/guided', selectorHint: 'data-issue-id="AX-076"', checkHints: ['manual:error-suggestion'] },
];

const allIssues = [...keyboardIssues, ...modalIssues, ...navIssues, ...errorIssues];

export default function GuidedIssues() {
  const [trapActive, setTrapActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [tooltip, setTooltip] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    allIssues.forEach(issue => {
      if (!window.__registeredIssues?.has(issue.id)) {
        registerIssue(issue);
        if (!window.__registeredIssues) window.__registeredIssues = new Set();
        window.__registeredIssues.add(issue.id);
      }
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCarouselIndex(i => (i + 1) % 3), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageWrapper title="Guided Issues" description="Accessibility issues requiring manual keyboard and interaction testing">
      <div className="space-y-12">
        <header>
          <h1 className="text-3xl font-bold text-foreground mb-4">Guided Accessibility Issues</h1>
          <p className="text-muted-foreground">This page contains {allIssues.length} issues requiring manual keyboard testing and interaction verification.</p>
        </header>

        {/* ========== KEYBOARD & FOCUS ISSUES ========== */}
        <section id="keyboard-focus">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">Keyboard & Focus Issues</h2>
          
          <div className="space-y-6">
            {/* AX-055: Keyboard trap */}
            <div id="AX-055">
              <IssueCard issue={keyboardIssues[0]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <p className="mb-2 text-sm text-muted-foreground">Tab into this widget - you cannot Tab out!</p>
                <div data-issue-id="AX-055" data-issue-type="guided" data-wcag="2.1.2" className="p-4 bg-muted rounded" onKeyDown={(e) => { if (e.key === 'Tab' && trapActive) e.preventDefault(); }}>
                  <button onClick={() => setTrapActive(true)} className="px-3 py-1 bg-primary text-primary-foreground rounded mr-2">Activate Trap</button>
                  <button onClick={() => setTrapActive(false)} className="px-3 py-1 bg-secondary text-secondary-foreground rounded">Deactivate</button>
                  {trapActive && <p className="mt-2 text-sm text-destructive">Trap active!</p>}
                </div>
              </div>
            </div>

            {/* AX-056: Positive tabindex */}
            <div id="AX-056">
              <IssueCard issue={keyboardIssues[1]} />
              <div className="p-4 border border-border rounded-lg bg-card space-y-2" data-issue-id="AX-056" data-issue-type="guided" data-wcag="2.4.3">
                <button tabIndex={3} className="px-3 py-1 bg-muted rounded">Third (tabindex=3)</button>
                <button tabIndex={1} className="px-3 py-1 bg-muted rounded ml-2">First (tabindex=1)</button>
                <button tabIndex={2} className="px-3 py-1 bg-muted rounded ml-2">Second (tabindex=2)</button>
              </div>
            </div>

            {/* AX-057: Focus indicator removed */}
            <div id="AX-057">
              <IssueCard issue={keyboardIssues[2]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <button data-issue-id="AX-057" data-issue-type="guided,automated" data-wcag="2.4.7" className="px-4 py-2 bg-primary text-primary-foreground rounded" style={{ outline: 'none' }}>No Focus Ring Visible</button>
              </div>
            </div>

            {/* AX-058: Custom control not keyboard operable */}
            <div id="AX-058">
              <IssueCard issue={keyboardIssues[3]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <div data-issue-id="AX-058" data-issue-type="guided" data-wcag="2.1.1" tabIndex={0} onClick={() => alert('Clicked!')} className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded cursor-pointer">Click Me (Enter/Space won't work)</div>
              </div>
            </div>

            {/* AX-059: Skip link broken */}
            <div id="AX-059">
              <IssueCard issue={keyboardIssues[4]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <a href="#nonexistent-main" data-issue-id="AX-059" data-issue-type="guided" data-wcag="2.4.1" className="text-primary underline">Skip to main content</a>
                <p className="text-sm text-muted-foreground mt-2">Target #nonexistent-main doesn't exist</p>
              </div>
            </div>

            {/* AX-060: Focus moves unexpectedly */}
            <div id="AX-060">
              <IssueCard issue={keyboardIssues[5]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <input type="text" placeholder="Focus here triggers alert" data-issue-id="AX-060" data-issue-type="guided" data-wcag="3.2.1" onFocus={() => alert('Context change on focus!')} className="px-3 py-2 border border-input rounded" />
              </div>
            </div>
          </div>
        </section>

        {/* ========== MODALS & DYNAMIC CONTENT ISSUES ========== */}
        <section id="modals-dynamic">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">Modals & Dynamic Content Issues</h2>
          
          <div className="space-y-6">
            {/* AX-061, 062, 063: Modal issues */}
            <div id="AX-061">
              <IssueCard issue={modalIssues[0]} />
              <IssueCard issue={modalIssues[1]} />
              <IssueCard issue={modalIssues[2]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <button onClick={() => setModalOpen(true)} className="px-4 py-2 bg-primary text-primary-foreground rounded">Open Broken Modal</button>
                {modalOpen && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" data-issue-id="AX-061" data-issue-type="guided" data-wcag="2.4.3">
                    <div className="bg-card p-6 rounded-lg max-w-md" data-issue-id="AX-062" data-issue-type="guided" data-wcag="2.1.1">
                      <h2 className="text-lg font-semibold mb-4">Broken Modal</h2>
                      <p className="mb-4">Tab can escape. Escape doesn't close. Focus won't restore.</p>
                      <input type="text" placeholder="Input inside modal" className="px-3 py-2 border border-input rounded w-full mb-4" />
                      <button onClick={() => { setModalOpen(false); document.body.focus(); }} className="px-4 py-2 bg-primary text-primary-foreground rounded" data-issue-id="AX-063" data-issue-type="guided" data-wcag="2.4.3">Close</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* AX-064: Toast not announced */}
            <div id="AX-064">
              <IssueCard issue={modalIssues[3]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <button onClick={() => { setToast(true); setTimeout(() => setToast(false), 3000); }} className="px-4 py-2 bg-primary text-primary-foreground rounded">Show Silent Toast</button>
                {toast && <div className="fixed bottom-4 right-4 bg-foreground text-background px-4 py-2 rounded shadow-lg" data-issue-id="AX-064" data-issue-type="guided" data-wcag="4.1.3">Toast (not announced)</div>}
              </div>
            </div>

            {/* AX-065: Loading spinner */}
            <div id="AX-065">
              <IssueCard issue={modalIssues[4]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <button onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 3000); }} className="px-4 py-2 bg-primary text-primary-foreground rounded">Start Loading</button>
                {loading && <div className="mt-4" data-issue-id="AX-065" data-issue-type="guided" data-wcag="4.1.3"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>}
              </div>
            </div>

            {/* AX-066: Carousel auto-play */}
            <div id="AX-066">
              <IssueCard issue={modalIssues[5]} />
              <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-066" data-issue-type="guided" data-wcag="2.2.2">
                <div className="h-24 bg-muted rounded flex items-center justify-center text-lg font-medium">Slide {carouselIndex + 1} of 3</div>
                <p className="text-sm text-muted-foreground mt-2">Auto-advances every 2s with no pause button</p>
              </div>
            </div>

            {/* AX-067: Hover-only tooltip */}
            <div id="AX-067">
              <IssueCard issue={modalIssues[6]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <div className="relative inline-block" onMouseEnter={() => setTooltip(true)} onMouseLeave={() => setTooltip(false)}>
                  <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded" data-issue-id="AX-067" data-issue-type="guided" data-wcag="1.4.13">Hover for tooltip</button>
                  {tooltip && <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-foreground text-background text-sm rounded whitespace-nowrap">Tooltip (hover only!)</div>}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== NAVIGATION & LINKS ISSUES ========== */}
        <section id="navigation-links">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">Navigation & Links Issues</h2>
          
          <div className="space-y-6">
            {/* AX-068: Click here */}
            <div id="AX-068">
              <IssueCard issue={navIssues[0]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <p>To learn more, <a href="#" data-issue-id="AX-068" data-issue-type="automated,guided" data-wcag="2.4.4" className="text-primary underline">click here</a>.</p>
              </div>
            </div>

            {/* AX-069: Multiple identical links */}
            <div id="AX-069">
              <IssueCard issue={navIssues[1]} />
              <div className="p-4 border border-border rounded-lg bg-card space-y-4" data-issue-id="AX-069" data-issue-type="guided" data-wcag="2.4.4">
                <div className="border-b border-border pb-2"><h3 className="font-medium">Article One</h3><a href="#" className="text-primary underline">Read more</a></div>
                <div className="border-b border-border pb-2"><h3 className="font-medium">Article Two</h3><a href="#" className="text-primary underline">Read more</a></div>
                <div><h3 className="font-medium">Article Three</h3><a href="#" className="text-primary underline">Read more</a></div>
              </div>
            </div>

            {/* AX-070: New window without warning */}
            <div id="AX-070">
              <IssueCard issue={navIssues[2]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <a href="https://example.com" target="_blank" rel="noopener" data-issue-id="AX-070" data-issue-type="guided" data-wcag="3.2.5" className="text-primary underline">Visit partner site</a>
                <p className="text-sm text-muted-foreground mt-1">Opens in new tab with no warning</p>
              </div>
            </div>

            {/* AX-071: Download link */}
            <div id="AX-071">
              <IssueCard issue={navIssues[3]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <a href="#" data-issue-id="AX-071" data-issue-type="guided,manual" data-wcag="2.4.4" className="text-primary underline">Download</a>
                <p className="text-sm text-muted-foreground mt-1">No file type or size indicated</p>
              </div>
            </div>

            {/* AX-072: Empty link */}
            <div id="AX-072">
              <IssueCard issue={navIssues[4]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <a href="#" data-issue-id="AX-072" data-issue-type="automated" data-wcag="2.4.4,4.1.2" className="inline-block w-6 h-6 bg-primary rounded"></a>
                <p className="text-sm text-muted-foreground mt-1">Empty link - no text</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========== ERRORS & FEEDBACK ISSUES ========== */}
        <section id="errors-feedback">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">Errors & Feedback Issues</h2>
          
          <div className="space-y-6">
            {/* AX-073: Error not linked */}
            <div id="AX-073">
              <IssueCard issue={errorIssues[0]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <label htmlFor="email-error" className="block font-medium mb-1">Email</label>
                <input type="email" id="email-error" className="px-3 py-2 border border-destructive rounded w-full max-w-xs" data-issue-id="AX-073" data-issue-type="guided,automated" data-wcag="3.3.1,4.1.3" />
                <p className="text-sm text-destructive mt-1">Invalid email format</p>
              </div>
            </div>

            {/* AX-074: Error summary not focused */}
            <div id="AX-074">
              <IssueCard issue={errorIssues[1]} />
              <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-074" data-issue-type="guided" data-wcag="3.3.1">
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  {submitted && (
                    <div className="mb-4 p-3 bg-destructive/10 border border-destructive rounded">
                      <p className="font-medium text-destructive">Please fix errors:</p>
                      <ul className="list-disc list-inside text-sm text-destructive"><li>Name is required</li></ul>
                    </div>
                  )}
                  <input type="text" placeholder="Name" className="px-3 py-2 border border-input rounded w-full max-w-xs mb-2" />
                  <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded">Submit</button>
                </form>
              </div>
            </div>

            {/* AX-075: Success not announced */}
            <div id="AX-075">
              <IssueCard issue={errorIssues[2]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <button onClick={() => { setSuccess(true); setTimeout(() => setSuccess(false), 3000); }} className="px-4 py-2 bg-primary text-primary-foreground rounded">Save Changes</button>
                {success && <div className="mt-2 p-2 bg-green-100 text-green-800 rounded" data-issue-id="AX-075" data-issue-type="guided" data-wcag="4.1.3">Changes saved! (not announced)</div>}
              </div>
            </div>

            {/* AX-076: Error suggestion missing */}
            <div id="AX-076">
              <IssueCard issue={errorIssues[3]} />
              <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-076" data-issue-type="manual" data-wcag="3.3.3">
                <label className="block font-medium mb-1">Password</label>
                <input type="password" className="px-3 py-2 border border-destructive rounded w-full max-w-xs" />
                <p className="text-sm text-destructive mt-1">Password is invalid</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}

declare global {
  interface Window {
    __registeredIssues?: Set<string>;
  }
}
