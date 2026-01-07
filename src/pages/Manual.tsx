import { useEffect } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { IssueCard } from '@/components/IssueCard';
import { registerIssue, type AccessibilityIssue } from '@/types/issues';

// ============ MEANINGFUL SEQUENCE ISSUES ============
const sequenceIssues: AccessibilityIssue[] = [
  { id: 'AX-077', title: 'CSS reorder breaks reading sequence', types: ['manual'], expectedFinding: 'Visual order differs from DOM order affecting meaning', wcagMapping: ['1.3.2'], wcagName: 'Meaningful Sequence', severity: 'medium', howToFix: 'Ensure DOM order matches intended reading order', route: '/manual', selectorHint: 'data-issue-id="AX-077"', checkHints: ['manual:reading-order'] },
  { id: 'AX-078', title: 'Flexbox order property misuse', types: ['manual'], expectedFinding: 'CSS order property creates confusing tab sequence', wcagMapping: ['1.3.2', '2.4.3'], wcagName: 'Meaningful Sequence, Focus Order', severity: 'medium', howToFix: 'Avoid CSS order or ensure it matches logical reading', route: '/manual', selectorHint: 'data-issue-id="AX-078"', checkHints: ['manual:flex-order'] },
  { id: 'AX-079', title: 'Grid layout breaks sequence', types: ['manual'], expectedFinding: 'CSS Grid placement creates illogical reading order', wcagMapping: ['1.3.2'], wcagName: 'Meaningful Sequence', severity: 'medium', howToFix: 'Use DOM order that matches grid visual placement', route: '/manual', selectorHint: 'data-issue-id="AX-079"', checkHints: ['manual:grid-order'] },
];

// ============ SENSORY INSTRUCTIONS ISSUES ============
const sensoryIssues: AccessibilityIssue[] = [
  { id: 'AX-080', title: 'Color-only instruction', types: ['manual'], expectedFinding: 'Instruction relies on color perception alone', wcagMapping: ['1.3.3'], wcagName: 'Sensory Characteristics', severity: 'high', howToFix: 'Add text label in addition to color reference', route: '/manual', selectorHint: 'data-issue-id="AX-080"', checkHints: ['manual:sensory-color'] },
  { id: 'AX-081', title: 'Position-only instruction', types: ['manual'], expectedFinding: 'Instruction relies on visual position only', wcagMapping: ['1.3.3'], wcagName: 'Sensory Characteristics', severity: 'medium', howToFix: 'Include element name or label in instruction', route: '/manual', selectorHint: 'data-issue-id="AX-081"', checkHints: ['manual:sensory-position'] },
  { id: 'AX-082', title: 'Shape-only instruction', types: ['manual'], expectedFinding: 'Instruction relies on shape recognition only', wcagMapping: ['1.3.3'], wcagName: 'Sensory Characteristics', severity: 'medium', howToFix: 'Add text label describing the control', route: '/manual', selectorHint: 'data-issue-id="AX-082"', checkHints: ['manual:sensory-shape'] },
  { id: 'AX-083', title: 'Icon-only instruction', types: ['manual'], expectedFinding: 'Instruction references icon without text description', wcagMapping: ['1.3.3'], wcagName: 'Sensory Characteristics', severity: 'medium', howToFix: 'Include text description of the icon or its label', route: '/manual', selectorHint: 'data-issue-id="AX-083"', checkHints: ['manual:sensory-icon'] },
];

// ============ READING & LANGUAGE ISSUES ============
const langIssues: AccessibilityIssue[] = [
  { id: 'AX-084', title: 'Wrong lang attribute value', types: ['automated'], expectedFinding: 'HTML lang attribute does not match content language', wcagMapping: ['3.1.1'], wcagName: 'Language of Page', severity: 'medium', howToFix: 'Set correct lang attribute on html element', route: '/manual', selectorHint: 'data-issue-id="AX-084"', checkHints: ['axe:html-lang-valid'] },
  { id: 'AX-085', title: 'Language change not marked', types: ['manual'], expectedFinding: 'Inline text in different language not marked with lang', wcagMapping: ['3.1.2'], wcagName: 'Language of Parts', severity: 'low', howToFix: 'Add lang attribute to elements with different language', route: '/manual', selectorHint: 'data-issue-id="AX-085"', checkHints: ['manual:lang-parts'] },
  { id: 'AX-086', title: 'Unclear abbreviations', types: ['manual'], expectedFinding: 'Abbreviations used without expansion', wcagMapping: ['3.1.4'], wcagName: 'Abbreviations', severity: 'low', howToFix: 'Provide expansion on first use or use abbr element', route: '/manual', selectorHint: 'data-issue-id="AX-086"', checkHints: ['manual:abbreviations'] },
];

// ============ COGNITIVE LOAD ISSUES ============
const cogIssues: AccessibilityIssue[] = [
  { id: 'AX-087', title: 'Overwhelming information density', types: ['manual'], expectedFinding: 'Too much information presented at once', wcagMapping: ['3.1.5'], wcagName: 'Reading Level', severity: 'medium', howToFix: 'Break content into digestible chunks; use progressive disclosure', route: '/manual', selectorHint: 'data-issue-id="AX-087"', checkHints: ['manual:cognitive-load'] },
  { id: 'AX-088', title: 'Confusing jargon', types: ['manual'], expectedFinding: 'Technical terms used without explanation', wcagMapping: ['3.1.3'], wcagName: 'Unusual Words', severity: 'low', howToFix: 'Define technical terms or provide glossary', route: '/manual', selectorHint: 'data-issue-id="AX-088"', checkHints: ['manual:jargon'] },
  { id: 'AX-089', title: 'Destructive action without confirmation', types: ['manual'], expectedFinding: 'Delete action occurs immediately without confirmation', wcagMapping: ['3.3.4'], wcagName: 'Error Prevention (Legal, Financial, Data)', severity: 'high', howToFix: 'Add confirmation dialog for destructive actions', route: '/manual', selectorHint: 'data-issue-id="AX-089"', checkHints: ['manual:error-prevention'] },
  { id: 'AX-090', title: 'Session timeout without warning', types: ['manual', 'guided'], expectedFinding: 'Session expires without warning or extension option', wcagMapping: ['2.2.1'], wcagName: 'Timing Adjustable', severity: 'high', howToFix: 'Warn users before timeout; allow extension', route: '/manual', selectorHint: 'data-issue-id="AX-090"', checkHints: ['manual:timing'] },
];

// ============ CAPTIONS QUALITY ISSUES ============
const captionIssues: AccessibilityIssue[] = [
  { id: 'AX-091', title: 'Inaccurate captions', types: ['manual'], expectedFinding: 'Captions do not accurately represent spoken content', wcagMapping: ['1.2.2'], wcagName: 'Captions (Prerecorded)', severity: 'high', howToFix: 'Review and correct caption accuracy', route: '/manual', selectorHint: 'data-issue-id="AX-091"', checkHints: ['manual:caption-accuracy'] },
  { id: 'AX-092', title: 'Missing speaker identification', types: ['manual'], expectedFinding: 'Multiple speakers not identified in captions', wcagMapping: ['1.2.2'], wcagName: 'Captions (Prerecorded)', severity: 'medium', howToFix: 'Add speaker labels when multiple people speak', route: '/manual', selectorHint: 'data-issue-id="AX-092"', checkHints: ['manual:speaker-id'] },
  { id: 'AX-093', title: 'Missing sound descriptions', types: ['manual'], expectedFinding: 'Significant sounds not described in captions', wcagMapping: ['1.2.2'], wcagName: 'Captions (Prerecorded)', severity: 'medium', howToFix: 'Include [sound descriptions] for significant audio', route: '/manual', selectorHint: 'data-issue-id="AX-093"', checkHints: ['manual:sound-descriptions'] },
  { id: 'AX-094', title: 'Poor caption timing', types: ['manual'], expectedFinding: 'Captions significantly out of sync with audio', wcagMapping: ['1.2.2'], wcagName: 'Captions (Prerecorded)', severity: 'medium', howToFix: 'Synchronize caption timing with audio', route: '/manual', selectorHint: 'data-issue-id="AX-094"', checkHints: ['manual:caption-timing'] },
];

const allIssues = [...sequenceIssues, ...sensoryIssues, ...langIssues, ...cogIssues, ...captionIssues];

export default function ManualIssues() {
  useEffect(() => {
    allIssues.forEach(issue => {
      if (!window.__registeredIssues?.has(issue.id)) {
        registerIssue(issue);
        if (!window.__registeredIssues) window.__registeredIssues = new Set();
        window.__registeredIssues.add(issue.id);
      }
    });
  }, []);

  return (
    <PageWrapper title="Manual Issues" description="Accessibility issues requiring human judgment and manual review">
      <div className="space-y-12">
        <header>
          <h1 className="text-3xl font-bold text-foreground mb-4">Manual Accessibility Issues</h1>
          <p className="text-muted-foreground">This page contains {allIssues.length} issues requiring human judgment and cannot be fully automated.</p>
        </header>

        {/* ========== MEANINGFUL SEQUENCE ISSUES ========== */}
        <section id="meaningful-sequence">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">Meaningful Sequence Issues</h2>
          
          <div className="space-y-6">
            {/* AX-077: CSS reorder */}
            <div id="AX-077">
              <IssueCard issue={sequenceIssues[0]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <div className="flex flex-col-reverse" data-issue-id="AX-077" data-issue-type="manual" data-wcag="1.3.2">
                  <p>1. First paragraph in DOM (displays last)</p>
                  <p>2. Second paragraph in DOM (displays second)</p>
                  <p>3. Third paragraph in DOM (displays first)</p>
                </div>
              </div>
            </div>

            {/* AX-078: Flexbox order */}
            <div id="AX-078">
              <IssueCard issue={sequenceIssues[1]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <div className="flex gap-4" data-issue-id="AX-078" data-issue-type="manual" data-wcag="1.3.2,2.4.3">
                  <button style={{ order: 3 }} className="px-3 py-1 bg-muted rounded">Button A (order:3)</button>
                  <button style={{ order: 1 }} className="px-3 py-1 bg-muted rounded">Button B (order:1)</button>
                  <button style={{ order: 2 }} className="px-3 py-1 bg-muted rounded">Button C (order:2)</button>
                </div>
              </div>
            </div>

            {/* AX-079: Grid layout */}
            <div id="AX-079">
              <IssueCard issue={sequenceIssues[2]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <div className="grid grid-cols-3 gap-2" data-issue-id="AX-079" data-issue-type="manual" data-wcag="1.3.2">
                  <div className="bg-muted p-2 rounded col-start-3">1st in DOM</div>
                  <div className="bg-muted p-2 rounded col-start-1">2nd in DOM</div>
                  <div className="bg-muted p-2 rounded col-start-2">3rd in DOM</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== SENSORY INSTRUCTIONS ISSUES ========== */}
        <section id="sensory-instructions">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">Sensory Instructions Issues</h2>
          
          <div className="space-y-6">
            {/* AX-080: Color-only instruction */}
            <div id="AX-080">
              <IssueCard issue={sensoryIssues[0]} />
              <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-080" data-issue-type="manual" data-wcag="1.3.3">
                <p className="mb-3">Click the <span className="text-green-600 font-bold">green</span> button to continue or the <span className="text-red-600 font-bold">red</span> button to cancel.</p>
                <button className="px-4 py-2 bg-green-600 text-white rounded mr-2">●</button>
                <button className="px-4 py-2 bg-red-600 text-white rounded">●</button>
              </div>
            </div>

            {/* AX-081: Position-only instruction */}
            <div id="AX-081">
              <IssueCard issue={sensoryIssues[1]} />
              <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-081" data-issue-type="manual" data-wcag="1.3.3">
                <p className="mb-3">Use the button on the right to submit your form.</p>
                <div className="flex gap-4">
                  <button className="px-4 py-2 bg-muted rounded">Cancel</button>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded">Submit</button>
                </div>
              </div>
            </div>

            {/* AX-082: Shape-only instruction */}
            <div id="AX-082">
              <IssueCard issue={sensoryIssues[2]} />
              <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-082" data-issue-type="manual" data-wcag="1.3.3">
                <p className="mb-3">Click the round button to play the video.</p>
                <button className="w-12 h-12 rounded-full bg-primary text-primary-foreground">▶</button>
              </div>
            </div>

            {/* AX-083: Icon-only instruction */}
            <div id="AX-083">
              <IssueCard issue={sensoryIssues[3]} />
              <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-083" data-issue-type="manual" data-wcag="1.3.3">
                <p className="mb-3">Click the gear icon to access settings.</p>
                <button className="p-2 bg-muted rounded">⚙️</button>
              </div>
            </div>
          </div>
        </section>

        {/* ========== READING & LANGUAGE ISSUES ========== */}
        <section id="reading-language">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">Reading & Language Issues</h2>
          
          <div className="space-y-6">
            {/* AX-084: Wrong lang attribute */}
            <div id="AX-084">
              <IssueCard issue={langIssues[0]} />
              <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-084" data-issue-type="automated" data-wcag="3.1.1">
                <p>This page has lang="en" but imagine the HTML element had lang="fr" while content is English.</p>
              </div>
            </div>

            {/* AX-085: Language change not marked */}
            <div id="AX-085">
              <IssueCard issue={langIssues[1]} />
              <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-085" data-issue-type="manual" data-wcag="3.1.2">
                <p>Welcome to our service. As we say in French: <span>C'est la vie</span> - that's life!</p>
                <p className="text-sm text-muted-foreground mt-2">French phrase not marked with lang="fr"</p>
              </div>
            </div>

            {/* AX-086: Unclear abbreviations */}
            <div id="AX-086">
              <IssueCard issue={langIssues[2]} />
              <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-086" data-issue-type="manual" data-wcag="3.1.4">
                <p>The CEO announced the new ROI targets for Q4 FY25 during the AGM. The CFO presented KPIs showing YoY growth.</p>
                <p className="text-sm text-muted-foreground mt-2">Multiple abbreviations with no expansions</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========== COGNITIVE LOAD ISSUES ========== */}
        <section id="cognitive-load">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">Cognitive Load Issues</h2>
          
          <div className="space-y-6">
            {/* AX-087: Overwhelming info */}
            <div id="AX-087">
              <IssueCard issue={cogIssues[0]} />
              <div className="p-4 border border-border rounded-lg bg-card text-xs" data-issue-id="AX-087" data-issue-type="manual" data-wcag="3.1.5">
                <p>IMPORTANT: Read all terms carefully. By using this service you agree to binding arbitration for all disputes. Your data may be shared with third-party partners for marketing purposes unless you opt out within 30 days. Cancellation fees apply. Minimum commitment 12 months. Auto-renewal enabled by default. Price changes effective immediately upon notice. We reserve the right to modify terms at any time.</p>
              </div>
            </div>

            {/* AX-088: Confusing jargon */}
            <div id="AX-088">
              <IssueCard issue={cogIssues[1]} />
              <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-088" data-issue-type="manual" data-wcag="3.1.3">
                <p>Configure your SSO SAML endpoints with the IdP metadata. Ensure your SCIM provisioning webhook has proper JWT validation and OIDC claims mapping.</p>
              </div>
            </div>

            {/* AX-089: Destructive action */}
            <div id="AX-089">
              <IssueCard issue={cogIssues[2]} />
              <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-089" data-issue-type="manual" data-wcag="3.3.4">
                <button onClick={() => alert('Account deleted!')} className="px-4 py-2 bg-destructive text-destructive-foreground rounded">Delete Account</button>
                <p className="text-sm text-muted-foreground mt-2">No confirmation - deletes immediately</p>
              </div>
            </div>

            {/* AX-090: Session timeout */}
            <div id="AX-090">
              <IssueCard issue={cogIssues[3]} />
              <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-090" data-issue-type="manual,guided" data-wcag="2.2.1">
                <p className="text-destructive font-medium">Your session will expire in 30 seconds</p>
                <p className="text-sm text-muted-foreground">No way to extend or warning before this point</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========== CAPTIONS QUALITY ISSUES ========== */}
        <section id="captions-quality">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">Captions Quality Issues</h2>
          
          <div className="space-y-6">
            {/* AX-091: Inaccurate captions */}
            <div id="AX-091">
              <IssueCard issue={captionIssues[0]} />
              <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-091" data-issue-type="manual" data-wcag="1.2.2">
                <div className="bg-muted p-4 rounded">
                  <p className="font-medium">Audio: "The accessibility audit revealed seventeen critical issues"</p>
                  <p className="text-muted-foreground">Caption: "The accessibility audit revealed several critical issues"</p>
                </div>
              </div>
            </div>

            {/* AX-092: Missing speaker ID */}
            <div id="AX-092">
              <IssueCard issue={captionIssues[1]} />
              <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-092" data-issue-type="manual" data-wcag="1.2.2">
                <div className="bg-muted p-4 rounded space-y-1">
                  <p>I think we should prioritize this feature.</p>
                  <p>No, the other feature is more important.</p>
                  <p>Let me explain why I disagree.</p>
                  <p className="text-sm text-muted-foreground mt-2">Three speakers, no identification</p>
                </div>
              </div>
            </div>

            {/* AX-093: Missing sound descriptions */}
            <div id="AX-093">
              <IssueCard issue={captionIssues[2]} />
              <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-093" data-issue-type="manual" data-wcag="1.2.2">
                <div className="bg-muted p-4 rounded">
                  <p>Let's get started with the presentation.</p>
                  <p className="text-sm text-muted-foreground mt-2">[Missing: Door slams, audience gasps, dramatic music]</p>
                </div>
              </div>
            </div>

            {/* AX-094: Poor caption timing */}
            <div id="AX-094">
              <IssueCard issue={captionIssues[3]} />
              <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-094" data-issue-type="manual" data-wcag="1.2.2">
                <div className="bg-muted p-4 rounded">
                  <p className="font-medium">00:05 - "Hello everyone"</p>
                  <p className="text-muted-foreground">Audio actually at 00:12</p>
                </div>
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
