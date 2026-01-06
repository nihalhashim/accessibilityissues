import { useEffect } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { IssueCard } from '@/components/IssueCard';
import { registerIssue, type AccessibilityIssue } from '@/types/issues';

const captionIssues: AccessibilityIssue[] = [
  { id: 'AX-091', title: 'Inaccurate captions', types: ['manual'], expectedFinding: 'Captions do not accurately represent spoken content', wcagMapping: ['1.2.2'], wcagName: 'Captions (Prerecorded)', severity: 'high', howToFix: 'Review and correct caption accuracy', route: '/manual/captions-quality', selectorHint: 'data-issue-id="AX-091"', checkHints: ['manual:caption-accuracy'] },
  { id: 'AX-092', title: 'Missing speaker identification', types: ['manual'], expectedFinding: 'Multiple speakers not identified in captions', wcagMapping: ['1.2.2'], wcagName: 'Captions (Prerecorded)', severity: 'medium', howToFix: 'Add speaker labels when multiple people speak', route: '/manual/captions-quality', selectorHint: 'data-issue-id="AX-092"', checkHints: ['manual:speaker-id'] },
  { id: 'AX-093', title: 'Missing sound descriptions', types: ['manual'], expectedFinding: 'Significant sounds not described in captions', wcagMapping: ['1.2.2'], wcagName: 'Captions (Prerecorded)', severity: 'medium', howToFix: 'Include [sound descriptions] for significant audio', route: '/manual/captions-quality', selectorHint: 'data-issue-id="AX-093"', checkHints: ['manual:sound-descriptions'] },
  { id: 'AX-094', title: 'Poor caption timing', types: ['manual'], expectedFinding: 'Captions significantly out of sync with audio', wcagMapping: ['1.2.2'], wcagName: 'Captions (Prerecorded)', severity: 'medium', howToFix: 'Synchronize caption timing with audio', route: '/manual/captions-quality', selectorHint: 'data-issue-id="AX-094"', checkHints: ['manual:caption-timing'] },
];

export default function ManualCaptionsQuality() {
  useEffect(() => { captionIssues.forEach(issue => { if (!window.__registeredIssues?.has(issue.id)) { registerIssue(issue); if (!window.__registeredIssues) window.__registeredIssues = new Set(); window.__registeredIssues.add(issue.id); } }); }, []);

  return (
    <PageWrapper title="Captions Quality" description="Manual testing for caption and subtitle quality">
      <div className="space-y-8">
        <header><h1 className="text-3xl font-bold text-foreground mb-4">Captions Quality Issues</h1></header>

        <section>
          <IssueCard issue={captionIssues[0]} />
          <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-091" data-issue-type="manual" data-wcag="1.2.2">
            <div className="bg-muted p-4 rounded">
              <p className="font-medium">Audio: "The accessibility audit revealed seventeen critical issues"</p>
              <p className="text-muted-foreground">Caption: "The accessibility audit revealed several critical issues"</p>
            </div>
          </div>
        </section>

        <section>
          <IssueCard issue={captionIssues[1]} />
          <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-092" data-issue-type="manual" data-wcag="1.2.2">
            <div className="bg-muted p-4 rounded space-y-1">
              <p>I think we should prioritize this feature.</p>
              <p>No, the other feature is more important.</p>
              <p>Let me explain why I disagree.</p>
              <p className="text-sm text-muted-foreground mt-2">Three speakers, no identification</p>
            </div>
          </div>
        </section>

        <section>
          <IssueCard issue={captionIssues[2]} />
          <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-093" data-issue-type="manual" data-wcag="1.2.2">
            <div className="bg-muted p-4 rounded">
              <p>Let's get started with the presentation.</p>
              <p className="text-sm text-muted-foreground mt-2">[Missing: Door slams, audience gasps, dramatic music plays]</p>
            </div>
          </div>
        </section>

        <section>
          <IssueCard issue={captionIssues[3]} />
          <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-094" data-issue-type="manual" data-wcag="1.2.2">
            <div className="bg-muted p-4 rounded">
              <p className="font-medium">00:05 - "Hello everyone"</p>
              <p className="text-muted-foreground">Audio actually at 00:12</p>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
