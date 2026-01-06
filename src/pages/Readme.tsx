import { PageWrapper } from '@/components/PageWrapper';

/**
 * Readme Page - Usage guide for the Accessibility Audit Playground
 */
export default function Readme() {
  return (
    <PageWrapper 
      title="Usage Guide" 
      description="How to use the Accessibility Audit Playground for automated, guided, and manual accessibility testing"
    >
      <div className="space-y-8 prose prose-slate max-w-none">
        <header>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Usage Guide
          </h1>
          <p className="text-lg text-muted-foreground">
            How to use this playground for accessibility auditing.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Purpose</h2>
          <p className="text-muted-foreground">
            This application is a <strong>test harness</strong> for accessibility auditing tools and 
            workflows. It intentionally contains accessibility issues across three categories:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><strong>Automated:</strong> Issues detectable by automated scanning tools</li>
            <li><strong>Guided:</strong> Issues requiring human interaction with tool guidance</li>
            <li><strong>Manual:</strong> Issues requiring expert human judgment</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">For Automated Testing</h2>
          <p className="text-muted-foreground">Run your automated tools against this site:</p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p className="text-foreground"># Using axe-core CLI</p>
            <p className="text-muted-foreground">npx @axe-core/cli https://your-deployed-url.com</p>
            <br />
            <p className="text-foreground"># Using Pa11y</p>
            <p className="text-muted-foreground">pa11y https://your-deployed-url.com/automated/forms</p>
            <br />
            <p className="text-foreground"># Using Lighthouse</p>
            <p className="text-muted-foreground">lighthouse https://your-deployed-url.com --only-categories=accessibility</p>
          </div>
          <p className="text-muted-foreground">
            Each issue is tagged with <code className="bg-muted px-1 rounded">data-issue-id</code> attributes 
            for easy identification in test results.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">For Guided Testing</h2>
          <p className="text-muted-foreground">
            Guided issues require human interaction. Follow these testing patterns:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><strong>Keyboard Testing:</strong> Navigate with Tab, Enter, Escape, Arrow keys</li>
            <li><strong>Focus Management:</strong> Watch for focus traps, lost focus, invisible focus</li>
            <li><strong>Dynamic Content:</strong> Test modals, toasts, loading states with screen readers</li>
            <li><strong>Error Handling:</strong> Submit forms with invalid data, check announcements</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">For Manual Testing</h2>
          <p className="text-muted-foreground">
            Manual issues require expert judgment and cannot be detected by tools:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><strong>Content Quality:</strong> Evaluate if content is clear and understandable</li>
            <li><strong>Cognitive Accessibility:</strong> Assess information overload, confusing layouts</li>
            <li><strong>Sensory Instructions:</strong> Check for color-only or position-only guidance</li>
            <li><strong>Caption Quality:</strong> Verify accuracy, speaker identification, timing</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Issue Card Format</h2>
          <p className="text-muted-foreground">
            Every intentional issue has an Issue Card directly above it containing:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><strong>Issue ID:</strong> Unique identifier (AX-###)</li>
            <li><strong>Title:</strong> Brief description of the issue</li>
            <li><strong>Type:</strong> Automated, Guided, or Manual</li>
            <li><strong>WCAG Mapping:</strong> Relevant success criteria</li>
            <li><strong>Severity:</strong> Low, Medium, or High</li>
            <li><strong>Expected Finding:</strong> What tools/auditors should detect</li>
            <li><strong>How to Fix:</strong> Remediation guidance (not implemented)</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Data Attributes for Testing</h2>
          <p className="text-muted-foreground">
            Each issue element includes data attributes for programmatic testing:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
            <p><span className="text-foreground">data-issue-id</span>=<span className="text-muted-foreground">"AX-001"</span></p>
            <p><span className="text-foreground">data-issue-type</span>=<span className="text-muted-foreground">"automated,guided"</span></p>
            <p><span className="text-foreground">data-wcag</span>=<span className="text-muted-foreground">"1.1.1,2.4.4"</span></p>
            <p><span className="text-foreground">data-expected</span>=<span className="text-muted-foreground">"fail"</span></p>
            <p><span className="text-foreground">data-check-hints</span>=<span className="text-muted-foreground">"axe:image-alt, manual:context"</span></p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Sitemap</h2>
          <p className="text-muted-foreground">
            A sitemap is available at <code className="bg-muted px-1 rounded">/sitemap.xml</code> for 
            crawlers and automated testing tools.
          </p>
        </section>

        <section className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-destructive mb-2">⚠️ Important Warning</h2>
          <p className="text-foreground">
            This application is <strong>NOT for production use</strong>. It intentionally contains 
            accessibility issues that would harm real users. Use only for testing and training purposes.
          </p>
        </section>
      </div>
    </PageWrapper>
  );
}
