import { useEffect, useState } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { IssueCard } from '@/components/IssueCard';
import { registerIssue, type AccessibilityIssue } from '@/types/issues';

const modalIssues: AccessibilityIssue[] = [
  {
    id: 'AX-061',
    title: 'Modal without focus trap',
    types: ['guided'],
    expectedFinding: 'Tab moves focus outside open modal to background content',
    wcagMapping: ['2.4.3'],
    wcagName: 'Focus Order',
    severity: 'high',
    howToFix: 'Trap focus within modal while open; return focus on close',
    route: '/guided/modals-dynamic',
    selectorHint: 'data-issue-id="AX-061"',
    checkHints: ['guided:focus-trap'],
  },
  {
    id: 'AX-062',
    title: 'Modal does not close with Escape',
    types: ['guided'],
    expectedFinding: 'Pressing Escape key does not close the modal',
    wcagMapping: ['2.1.1'],
    wcagName: 'Keyboard',
    severity: 'medium',
    howToFix: 'Add Escape key handler to close modal',
    route: '/guided/modals-dynamic',
    selectorHint: 'data-issue-id="AX-062"',
    checkHints: ['guided:escape-close'],
  },
  {
    id: 'AX-063',
    title: 'Focus not restored after modal close',
    types: ['guided'],
    expectedFinding: 'After closing modal, focus is lost or goes to top of page',
    wcagMapping: ['2.4.3'],
    wcagName: 'Focus Order',
    severity: 'medium',
    howToFix: 'Return focus to the element that opened the modal',
    route: '/guided/modals-dynamic',
    selectorHint: 'data-issue-id="AX-063"',
    checkHints: ['guided:focus-restore'],
  },
  {
    id: 'AX-064',
    title: 'Toast not announced to screen readers',
    types: ['guided'],
    expectedFinding: 'Toast notification appears without aria-live announcement',
    wcagMapping: ['4.1.3'],
    wcagName: 'Status Messages',
    severity: 'medium',
    howToFix: 'Use aria-live="polite" or role="status" for toast container',
    route: '/guided/modals-dynamic',
    selectorHint: 'data-issue-id="AX-064"',
    checkHints: ['guided:live-region'],
  },
  {
    id: 'AX-065',
    title: 'Loading spinner with no status',
    types: ['guided'],
    expectedFinding: 'Loading state not announced; no aria-busy or status text',
    wcagMapping: ['4.1.3'],
    wcagName: 'Status Messages',
    severity: 'medium',
    howToFix: 'Add aria-busy="true" and visually hidden loading text',
    route: '/guided/modals-dynamic',
    selectorHint: 'data-issue-id="AX-065"',
    checkHints: ['guided:loading-status'],
  },
  {
    id: 'AX-066',
    title: 'Auto-playing carousel without pause',
    types: ['guided'],
    expectedFinding: 'Carousel auto-advances with no way to pause',
    wcagMapping: ['2.2.2'],
    wcagName: 'Pause, Stop, Hide',
    severity: 'high',
    howToFix: 'Add pause/stop control for auto-playing content',
    route: '/guided/modals-dynamic',
    selectorHint: 'data-issue-id="AX-066"',
    checkHints: ['guided:auto-play'],
  },
  {
    id: 'AX-067',
    title: 'Hover-only tooltip',
    types: ['guided'],
    expectedFinding: 'Tooltip appears on hover but not on focus; cannot be dismissed',
    wcagMapping: ['1.4.13'],
    wcagName: 'Content on Hover or Focus',
    severity: 'medium',
    howToFix: 'Show tooltip on focus too; allow Escape to dismiss; keep visible while hovering tooltip',
    route: '/guided/modals-dynamic',
    selectorHint: 'data-issue-id="AX-067"',
    checkHints: ['guided:hover-focus'],
  },
];

export default function GuidedModalsDynamic() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [tooltip, setTooltip] = useState(false);

  useEffect(() => {
    modalIssues.forEach(issue => {
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
    <PageWrapper title="Modals & Dynamic Content" description="Guided testing for modals, toasts, and dynamic updates">
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-foreground mb-4">Modals & Dynamic Content Issues</h1>
          <p className="text-muted-foreground">Test focus management and dynamic content announcements.</p>
        </header>

        {/* AX-061, 062, 063: Modal issues */}
        <section>
          <IssueCard issue={modalIssues[0]} />
          <IssueCard issue={modalIssues[1]} />
          <IssueCard issue={modalIssues[2]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <button onClick={() => setModalOpen(true)} className="px-4 py-2 bg-primary text-primary-foreground rounded">Open Broken Modal</button>
            {modalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" data-issue-id="AX-061" data-issue-type="guided" data-wcag="2.4.3">
                <div className="bg-card p-6 rounded-lg max-w-md" data-issue-id="AX-062" data-issue-type="guided" data-wcag="2.1.1">
                  <h2 className="text-lg font-semibold mb-4">Broken Modal</h2>
                  <p className="mb-4">Tab can escape this modal. Escape key doesn't close it. Focus won't restore properly.</p>
                  <input type="text" placeholder="Input inside modal" className="px-3 py-2 border border-input rounded w-full mb-4" />
                  <button onClick={() => { setModalOpen(false); document.body.focus(); }} className="px-4 py-2 bg-primary text-primary-foreground rounded" data-issue-id="AX-063" data-issue-type="guided" data-wcag="2.4.3">Close (focus goes to body)</button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* AX-064: Toast not announced */}
        <section>
          <IssueCard issue={modalIssues[3]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <button onClick={() => { setToast(true); setTimeout(() => setToast(false), 3000); }} className="px-4 py-2 bg-primary text-primary-foreground rounded">Show Silent Toast</button>
            {toast && (
              <div className="fixed bottom-4 right-4 bg-foreground text-background px-4 py-2 rounded shadow-lg" data-issue-id="AX-064" data-issue-type="guided" data-wcag="4.1.3">
                Toast message (not announced)
              </div>
            )}
          </div>
        </section>

        {/* AX-065: Loading spinner */}
        <section>
          <IssueCard issue={modalIssues[4]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <button onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 3000); }} className="px-4 py-2 bg-primary text-primary-foreground rounded">Start Loading</button>
            {loading && (
              <div className="mt-4" data-issue-id="AX-065" data-issue-type="guided" data-wcag="4.1.3">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </section>

        {/* AX-066: Carousel auto-play */}
        <section>
          <IssueCard issue={modalIssues[5]} />
          <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-066" data-issue-type="guided" data-wcag="2.2.2">
            <div className="h-24 bg-muted rounded flex items-center justify-center text-lg font-medium">Slide {carouselIndex + 1} of 3</div>
            <p className="text-sm text-muted-foreground mt-2">Auto-advances every 2s with no pause button</p>
          </div>
        </section>

        {/* AX-067: Hover-only tooltip */}
        <section>
          <IssueCard issue={modalIssues[6]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <div className="relative inline-block" onMouseEnter={() => setTooltip(true)} onMouseLeave={() => setTooltip(false)}>
              <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded" data-issue-id="AX-067" data-issue-type="guided" data-wcag="1.4.13">
                Hover for tooltip
              </button>
              {tooltip && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-foreground text-background text-sm rounded whitespace-nowrap">
                  Tooltip content (hover only!)
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
