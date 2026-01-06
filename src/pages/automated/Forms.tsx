import { useEffect } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { IssueCard } from '@/components/IssueCard';
import { registerIssue, type AccessibilityIssue } from '@/types/issues';

// Define all form-related accessibility issues
const formIssues: AccessibilityIssue[] = [
  {
    id: 'AX-001',
    title: 'Input without associated label',
    types: ['automated'],
    expectedFinding: 'Form input has no accessible name - missing label element or aria-label',
    wcagMapping: ['1.3.1', '3.3.2'],
    wcagName: 'Info and Relationships, Labels or Instructions',
    severity: 'high',
    howToFix: 'Add a <label> element with for attribute matching the input id, or add aria-label to the input',
    route: '/automated/forms',
    selectorHint: 'data-issue-id="AX-001"',
    checkHints: ['axe:label', 'axe:form-field-multiple-labels'],
  },
  {
    id: 'AX-002',
    title: 'Placeholder-only label',
    types: ['automated'],
    expectedFinding: 'Input uses placeholder as only label - disappears when typing',
    wcagMapping: ['1.3.1', '3.3.2'],
    wcagName: 'Info and Relationships, Labels or Instructions',
    severity: 'medium',
    howToFix: 'Add a visible label element. Placeholders should supplement labels, not replace them',
    route: '/automated/forms',
    selectorHint: 'data-issue-id="AX-002"',
    checkHints: ['axe:label', 'manual:placeholder-label'],
  },
  {
    id: 'AX-003',
    title: 'Label not programmatically associated',
    types: ['automated'],
    expectedFinding: 'Visible label exists but not linked to input via for/id',
    wcagMapping: ['1.3.1'],
    wcagName: 'Info and Relationships',
    severity: 'high',
    howToFix: 'Add matching for attribute to label and id to input',
    route: '/automated/forms',
    selectorHint: 'data-issue-id="AX-003"',
    checkHints: ['axe:label'],
  },
  {
    id: 'AX-004',
    title: 'Required field not indicated',
    types: ['automated', 'manual'],
    expectedFinding: 'Required input has no visual or programmatic indicator',
    wcagMapping: ['3.3.2'],
    wcagName: 'Labels or Instructions',
    severity: 'medium',
    howToFix: 'Add required attribute and visible asterisk or "required" text',
    route: '/automated/forms',
    selectorHint: 'data-issue-id="AX-004"',
    checkHints: ['manual:required-indicator'],
  },
  {
    id: 'AX-005',
    title: 'Duplicate form field IDs',
    types: ['automated'],
    expectedFinding: 'Multiple inputs share the same ID - breaks label association',
    wcagMapping: ['4.1.1'],
    wcagName: 'Parsing',
    severity: 'high',
    howToFix: 'Ensure all IDs are unique within the document',
    route: '/automated/forms',
    selectorHint: 'data-issue-id="AX-005"',
    checkHints: ['axe:duplicate-id', 'axe:duplicate-id-active'],
  },
  {
    id: 'AX-006',
    title: 'Checkbox without accessible label',
    types: ['automated'],
    expectedFinding: 'Checkbox input has no accessible name',
    wcagMapping: ['1.3.1', '4.1.2'],
    wcagName: 'Info and Relationships, Name Role Value',
    severity: 'high',
    howToFix: 'Wrap checkbox in label or use aria-label/aria-labelledby',
    route: '/automated/forms',
    selectorHint: 'data-issue-id="AX-006"',
    checkHints: ['axe:label'],
  },
  {
    id: 'AX-007',
    title: 'Radio group without group label',
    types: ['automated'],
    expectedFinding: 'Radio button group has no fieldset/legend or group label',
    wcagMapping: ['1.3.1', '3.3.2'],
    wcagName: 'Info and Relationships, Labels or Instructions',
    severity: 'medium',
    howToFix: 'Wrap radio buttons in fieldset with legend, or use role="radiogroup" with aria-labelledby',
    route: '/automated/forms',
    selectorHint: 'data-issue-id="AX-007"',
    checkHints: ['axe:radiogroup'],
  },
  {
    id: 'AX-008',
    title: 'Select without accessible label',
    types: ['automated'],
    expectedFinding: 'Select dropdown has no associated label',
    wcagMapping: ['1.3.1', '3.3.2'],
    wcagName: 'Info and Relationships, Labels or Instructions',
    severity: 'high',
    howToFix: 'Add label element with for attribute or aria-label',
    route: '/automated/forms',
    selectorHint: 'data-issue-id="AX-008"',
    checkHints: ['axe:select-name'],
  },
  {
    id: 'AX-009',
    title: 'Textarea without label',
    types: ['automated'],
    expectedFinding: 'Textarea element has no accessible name',
    wcagMapping: ['1.3.1', '3.3.2'],
    wcagName: 'Info and Relationships, Labels or Instructions',
    severity: 'high',
    howToFix: 'Add label element with for attribute matching textarea id',
    route: '/automated/forms',
    selectorHint: 'data-issue-id="AX-009"',
    checkHints: ['axe:label'],
  },
  {
    id: 'AX-010',
    title: 'Form submit button with no text',
    types: ['automated'],
    expectedFinding: 'Submit button has no accessible name - empty or icon-only',
    wcagMapping: ['4.1.2', '2.5.3'],
    wcagName: 'Name Role Value, Label in Name',
    severity: 'high',
    howToFix: 'Add visible text content or aria-label to button',
    route: '/automated/forms',
    selectorHint: 'data-issue-id="AX-010"',
    checkHints: ['axe:button-name'],
  },
  {
    id: 'AX-011',
    title: 'Autocomplete attribute missing on identity field',
    types: ['automated'],
    expectedFinding: 'Personal information field missing autocomplete attribute',
    wcagMapping: ['1.3.5'],
    wcagName: 'Identify Input Purpose',
    severity: 'medium',
    howToFix: 'Add appropriate autocomplete value (name, email, tel, etc.)',
    route: '/automated/forms',
    selectorHint: 'data-issue-id="AX-011"',
    checkHints: ['axe:autocomplete-valid'],
  },
  {
    id: 'AX-012',
    title: 'Wrong autocomplete value',
    types: ['automated'],
    expectedFinding: 'Autocomplete attribute value does not match field type',
    wcagMapping: ['1.3.5'],
    wcagName: 'Identify Input Purpose',
    severity: 'medium',
    howToFix: 'Use correct autocomplete value that matches the expected input',
    route: '/automated/forms',
    selectorHint: 'data-issue-id="AX-012"',
    checkHints: ['axe:autocomplete-valid'],
  },
];

/**
 * Automated Forms Page - Form-related accessibility issues
 */
export default function AutomatedForms() {
  // Register issues on mount
  useEffect(() => {
    formIssues.forEach(issue => {
      if (!window.__registeredIssues?.has(issue.id)) {
        registerIssue(issue);
        if (!window.__registeredIssues) window.__registeredIssues = new Set();
        window.__registeredIssues.add(issue.id);
      }
    });
  }, []);

  return (
    <PageWrapper 
      title="Form Issues" 
      description="Automated accessibility issues related to form inputs, labels, and controls"
    >
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Form Accessibility Issues
          </h1>
          <p className="text-muted-foreground">
            This page contains {formIssues.length} form-related accessibility issues 
            detectable by automated testing tools.
          </p>
        </header>

        {/* AX-001: Input without label */}
        <section>
          <IssueCard issue={formIssues[0]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <p className="mb-2 text-sm text-muted-foreground">Signup Form</p>
            {/* ISSUE: Input has no label element or aria-label */}
            <input
              type="text"
              data-issue-id="AX-001"
              data-issue-type="automated"
              data-wcag="1.3.1,3.3.2"
              className="border border-input rounded px-3 py-2 w-full max-w-xs"
            />
          </div>
        </section>

        {/* AX-002: Placeholder-only label */}
        <section>
          <IssueCard issue={formIssues[1]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <p className="mb-2 text-sm text-muted-foreground">Email Subscription</p>
            {/* ISSUE: Uses placeholder as only label - no actual label element */}
            <input
              type="email"
              placeholder="Enter your email address"
              data-issue-id="AX-002"
              data-issue-type="automated"
              data-wcag="1.3.1,3.3.2"
              className="border border-input rounded px-3 py-2 w-full max-w-xs"
            />
          </div>
        </section>

        {/* AX-003: Label not associated */}
        <section>
          <IssueCard issue={formIssues[2]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            {/* ISSUE: Label exists but for attribute doesn't match input id */}
            <label htmlFor="wrong-id" className="block mb-1 font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone-field"
              data-issue-id="AX-003"
              data-issue-type="automated"
              data-wcag="1.3.1"
              className="border border-input rounded px-3 py-2 w-full max-w-xs"
            />
          </div>
        </section>

        {/* AX-004: Required field not indicated */}
        <section>
          <IssueCard issue={formIssues[3]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <label htmlFor="username-field" className="block mb-1 font-medium">
              Username
            </label>
            {/* ISSUE: Field is required but has no indicator */}
            <input
              type="text"
              id="username-field"
              required
              data-issue-id="AX-004"
              data-issue-type="automated,manual"
              data-wcag="3.3.2"
              className="border border-input rounded px-3 py-2 w-full max-w-xs"
            />
          </div>
        </section>

        {/* AX-005: Duplicate IDs */}
        <section>
          <IssueCard issue={formIssues[4]} />
          <div className="p-4 border border-border rounded-lg bg-card space-y-4">
            <div>
              <label htmlFor="duplicate-name" className="block mb-1 font-medium">First Name</label>
              {/* ISSUE: Both inputs share same ID */}
              <input
                type="text"
                id="duplicate-name"
                data-issue-id="AX-005"
                data-issue-type="automated"
                data-wcag="4.1.1"
                className="border border-input rounded px-3 py-2 w-full max-w-xs"
              />
            </div>
            <div>
              <label htmlFor="duplicate-name" className="block mb-1 font-medium">Last Name</label>
              {/* ISSUE: Duplicate ID - same as above */}
              <input
                type="text"
                id="duplicate-name"
                data-issue-id="AX-005"
                data-issue-type="automated"
                data-wcag="4.1.1"
                className="border border-input rounded px-3 py-2 w-full max-w-xs"
              />
            </div>
          </div>
        </section>

        {/* AX-006: Checkbox without label */}
        <section>
          <IssueCard issue={formIssues[5]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <p className="mb-2 text-sm text-muted-foreground">Newsletter Preferences</p>
            <div className="space-y-2">
              {/* ISSUE: Checkbox has no label or aria-label */}
              <input
                type="checkbox"
                data-issue-id="AX-006"
                data-issue-type="automated"
                data-wcag="1.3.1,4.1.2"
                className="mr-2"
              />
              <span className="text-foreground">Subscribe to updates</span>
            </div>
          </div>
        </section>

        {/* AX-007: Radio group without group label */}
        <section>
          <IssueCard issue={formIssues[6]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            {/* ISSUE: No fieldset/legend or role="radiogroup" */}
            <div 
              className="space-y-2"
              data-issue-id="AX-007"
              data-issue-type="automated"
              data-wcag="1.3.1,3.3.2"
            >
              <div>
                <input type="radio" name="plan" id="plan-free" className="mr-2" />
                <label htmlFor="plan-free">Free Plan</label>
              </div>
              <div>
                <input type="radio" name="plan" id="plan-pro" className="mr-2" />
                <label htmlFor="plan-pro">Pro Plan</label>
              </div>
              <div>
                <input type="radio" name="plan" id="plan-enterprise" className="mr-2" />
                <label htmlFor="plan-enterprise">Enterprise Plan</label>
              </div>
            </div>
          </div>
        </section>

        {/* AX-008: Select without label */}
        <section>
          <IssueCard issue={formIssues[7]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <p className="mb-2 text-sm text-muted-foreground">Account Settings</p>
            {/* ISSUE: Select has no associated label */}
            <select
              data-issue-id="AX-008"
              data-issue-type="automated"
              data-wcag="1.3.1,3.3.2"
              className="border border-input rounded px-3 py-2"
            >
              <option value="">Choose timezone</option>
              <option value="pst">Pacific Time</option>
              <option value="est">Eastern Time</option>
              <option value="utc">UTC</option>
            </select>
          </div>
        </section>

        {/* AX-009: Textarea without label */}
        <section>
          <IssueCard issue={formIssues[8]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <p className="mb-2 text-sm text-muted-foreground">Feedback Form</p>
            {/* ISSUE: Textarea has no label */}
            <textarea
              data-issue-id="AX-009"
              data-issue-type="automated"
              data-wcag="1.3.1,3.3.2"
              rows={4}
              className="border border-input rounded px-3 py-2 w-full max-w-md"
              placeholder="Your feedback..."
            />
          </div>
        </section>

        {/* AX-010: Button with no text */}
        <section>
          <IssueCard issue={formIssues[9]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <p className="mb-2 text-sm text-muted-foreground">Quick Actions</p>
            {/* ISSUE: Button has only icon, no accessible name */}
            <button
              type="submit"
              data-issue-id="AX-010"
              data-issue-type="automated"
              data-wcag="4.1.2,2.5.3"
              className="px-4 py-2 bg-primary text-primary-foreground rounded"
            >
              {/* Icon without text or aria-label */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </section>

        {/* AX-011: Missing autocomplete */}
        <section>
          <IssueCard issue={formIssues[10]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <label htmlFor="full-name-field" className="block mb-1 font-medium">Full Name</label>
            {/* ISSUE: Personal info field missing autocomplete attribute */}
            <input
              type="text"
              id="full-name-field"
              data-issue-id="AX-011"
              data-issue-type="automated"
              data-wcag="1.3.5"
              className="border border-input rounded px-3 py-2 w-full max-w-xs"
            />
          </div>
        </section>

        {/* AX-012: Wrong autocomplete value */}
        <section>
          <IssueCard issue={formIssues[11]} />
          <div className="p-4 border border-border rounded-lg bg-card">
            <label htmlFor="email-field-wrong" className="block mb-1 font-medium">Email Address</label>
            {/* ISSUE: autocomplete says "name" but field is for email */}
            <input
              type="email"
              id="email-field-wrong"
              autoComplete="name"
              data-issue-id="AX-012"
              data-issue-type="automated"
              data-wcag="1.3.5"
              className="border border-input rounded px-3 py-2 w-full max-w-xs"
            />
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}

// Type declaration for global registry tracker
declare global {
  interface Window {
    __registeredIssues?: Set<string>;
  }
}
