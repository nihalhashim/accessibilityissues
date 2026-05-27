import { useEffect } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { IssueCard } from '@/components/IssueCard';
import { registerIssue, type AccessibilityIssue } from '@/types/issues';

// ============ FORM ISSUES ============
const formIssues: AccessibilityIssue[] = [
  { id: 'AX-001', title: 'Input without associated label', types: ['automated'], expectedFinding: 'Form input has no accessible name - missing label element or aria-label', wcagMapping: ['1.3.1', '3.3.2'], wcagName: 'Info and Relationships, Labels or Instructions', severity: 'high', howToFix: 'Add a <label> element with for attribute matching the input id, or add aria-label to the input', route: '/automated', selectorHint: 'data-issue-id="AX-001"', checkHints: ['axe:label', 'axe:form-field-multiple-labels'] },
  { id: 'AX-002', title: 'Placeholder-only label', types: ['automated'], expectedFinding: 'Input uses placeholder as only label - disappears when typing', wcagMapping: ['1.3.1', '3.3.2'], wcagName: 'Info and Relationships, Labels or Instructions', severity: 'medium', howToFix: 'Add a visible label element. Placeholders should supplement labels, not replace them', route: '/automated', selectorHint: 'data-issue-id="AX-002"', checkHints: ['axe:label', 'manual:placeholder-label'] },
  { id: 'AX-003', title: 'Label not programmatically associated', types: ['automated'], expectedFinding: 'Visible label exists but not linked to input via for/id', wcagMapping: ['1.3.1'], wcagName: 'Info and Relationships', severity: 'high', howToFix: 'Add matching for attribute to label and id to input', route: '/automated', selectorHint: 'data-issue-id="AX-003"', checkHints: ['axe:label'] },
  { id: 'AX-004', title: 'Required field not indicated', types: ['automated', 'manual'], expectedFinding: 'Required input has no visual or programmatic indicator', wcagMapping: ['3.3.2'], wcagName: 'Labels or Instructions', severity: 'medium', howToFix: 'Add required attribute and visible asterisk or "required" text', route: '/automated', selectorHint: 'data-issue-id="AX-004"', checkHints: ['manual:required-indicator'] },
  { id: 'AX-005', title: 'Duplicate form field IDs', types: ['automated'], expectedFinding: 'Multiple inputs share the same ID - breaks label association', wcagMapping: ['4.1.1'], wcagName: 'Parsing', severity: 'high', howToFix: 'Ensure all IDs are unique within the document', route: '/automated', selectorHint: 'data-issue-id="AX-005"', checkHints: ['axe:duplicate-id', 'axe:duplicate-id-active'] },
  { id: 'AX-006', title: 'Checkbox without accessible label', types: ['automated'], expectedFinding: 'Checkbox input has no accessible name', wcagMapping: ['1.3.1', '4.1.2'], wcagName: 'Info and Relationships, Name Role Value', severity: 'high', howToFix: 'Wrap checkbox in label or use aria-label/aria-labelledby', route: '/automated', selectorHint: 'data-issue-id="AX-006"', checkHints: ['axe:label'] },
  { id: 'AX-007', title: 'Radio group without group label', types: ['automated'], expectedFinding: 'Radio button group has no fieldset/legend or group label', wcagMapping: ['1.3.1', '3.3.2'], wcagName: 'Info and Relationships, Labels or Instructions', severity: 'medium', howToFix: 'Wrap radio buttons in fieldset with legend, or use role="radiogroup" with aria-labelledby', route: '/automated', selectorHint: 'data-issue-id="AX-007"', checkHints: ['axe:radiogroup'] },
  { id: 'AX-008', title: 'Select without accessible label', types: ['automated'], expectedFinding: 'Select dropdown has no associated label', wcagMapping: ['1.3.1', '3.3.2'], wcagName: 'Info and Relationships, Labels or Instructions', severity: 'high', howToFix: 'Add label element with for attribute or aria-label', route: '/automated', selectorHint: 'data-issue-id="AX-008"', checkHints: ['axe:select-name'] },
  { id: 'AX-009', title: 'Textarea without label', types: ['automated'], expectedFinding: 'Textarea element has no accessible name', wcagMapping: ['1.3.1', '3.3.2'], wcagName: 'Info and Relationships, Labels or Instructions', severity: 'high', howToFix: 'Add label element with for attribute matching textarea id', route: '/automated', selectorHint: 'data-issue-id="AX-009"', checkHints: ['axe:label'] },
  { id: 'AX-010', title: 'Form submit button with no text', types: ['automated'], expectedFinding: 'Submit button has no accessible name - empty or icon-only', wcagMapping: ['4.1.2', '2.5.3'], wcagName: 'Name Role Value, Label in Name', severity: 'high', howToFix: 'Add visible text content or aria-label to button', route: '/automated', selectorHint: 'data-issue-id="AX-010"', checkHints: ['axe:button-name'] },
  { id: 'AX-011', title: 'Autocomplete attribute missing on identity field', types: ['automated'], expectedFinding: 'Personal information field missing autocomplete attribute', wcagMapping: ['1.3.5'], wcagName: 'Identify Input Purpose', severity: 'medium', howToFix: 'Add appropriate autocomplete value (name, email, tel, etc.)', route: '/automated', selectorHint: 'data-issue-id="AX-011"', checkHints: ['axe:autocomplete-valid'] },
  { id: 'AX-012', title: 'Wrong autocomplete value', types: ['automated'], expectedFinding: 'Autocomplete attribute value does not match field type', wcagMapping: ['1.3.5'], wcagName: 'Identify Input Purpose', severity: 'medium', howToFix: 'Use correct autocomplete value that matches the expected input', route: '/automated', selectorHint: 'data-issue-id="AX-012"', checkHints: ['axe:autocomplete-valid'] },
];

// ============ STRUCTURE ISSUES ============
const structureIssues: AccessibilityIssue[] = [
  { id: 'AX-013', title: 'Skipped heading level', types: ['automated'], expectedFinding: 'Heading levels are skipped (e.g., h2 followed by h4)', wcagMapping: ['1.3.1', '2.4.6'], wcagName: 'Info and Relationships, Headings and Labels', severity: 'medium', howToFix: 'Use sequential heading levels without skipping (h1, h2, h3, etc.)', route: '/automated', selectorHint: 'data-issue-id="AX-013"', checkHints: ['axe:heading-order'] },
  { id: 'AX-014', title: 'Empty heading', types: ['automated'], expectedFinding: 'Heading element contains no text content', wcagMapping: ['1.3.1', '2.4.6'], wcagName: 'Info and Relationships, Headings and Labels', severity: 'high', howToFix: 'Add meaningful text content to the heading or remove it', route: '/automated', selectorHint: 'data-issue-id="AX-014"', checkHints: ['axe:empty-heading'] },
  { id: 'AX-015', title: 'Multiple h1 elements', types: ['automated'], expectedFinding: 'Page contains multiple h1 headings', wcagMapping: ['1.3.1'], wcagName: 'Info and Relationships', severity: 'medium', howToFix: 'Use only one h1 per page representing the main topic', route: '/automated', selectorHint: 'data-issue-id="AX-015"', checkHints: ['axe:page-has-heading-one'] },
  { id: 'AX-016', title: 'Missing page title', types: ['automated'], expectedFinding: 'Document has empty or missing title element', wcagMapping: ['2.4.2'], wcagName: 'Page Titled', severity: 'high', howToFix: 'Add a descriptive title element to the document head', route: '/automated', selectorHint: 'data-issue-id="AX-016"', checkHints: ['axe:document-title'] },
  { id: 'AX-017', title: 'Missing main landmark', types: ['automated'], expectedFinding: 'Page has no main landmark element', wcagMapping: ['1.3.1'], wcagName: 'Info and Relationships', severity: 'medium', howToFix: 'Add <main> element or role="main" to primary content area', route: '/automated', selectorHint: 'data-issue-id="AX-017"', checkHints: ['axe:landmark-main-is-top-level', 'axe:landmark-one-main'] },
  { id: 'AX-018', title: 'Duplicate landmarks without labels', types: ['automated'], expectedFinding: 'Multiple nav elements without distinguishing labels', wcagMapping: ['1.3.1'], wcagName: 'Info and Relationships', severity: 'medium', howToFix: 'Add aria-label to distinguish multiple landmarks of same type', route: '/automated', selectorHint: 'data-issue-id="AX-018"', checkHints: ['axe:landmark-unique'] },
  { id: 'AX-019', title: 'List markup misuse', types: ['automated'], expectedFinding: 'List-like content not using ul/ol/li elements', wcagMapping: ['1.3.1'], wcagName: 'Info and Relationships', severity: 'low', howToFix: 'Use proper list markup (ul/ol with li children)', route: '/automated', selectorHint: 'data-issue-id="AX-019"', checkHints: ['manual:list-structure'] },
  { id: 'AX-020', title: 'Table without headers', types: ['automated'], expectedFinding: 'Data table has no th elements or scope attributes', wcagMapping: ['1.3.1'], wcagName: 'Info and Relationships', severity: 'high', howToFix: 'Add th elements for column/row headers with scope attribute', route: '/automated', selectorHint: 'data-issue-id="AX-020"', checkHints: ['axe:td-headers-attr', 'axe:th-has-data-cells'] },
  { id: 'AX-021', title: 'Layout table with role=presentation missing', types: ['automated'], expectedFinding: 'Layout table should have role="presentation" or role="none"', wcagMapping: ['1.3.1'], wcagName: 'Info and Relationships', severity: 'low', howToFix: 'Add role="presentation" to tables used purely for layout', route: '/automated', selectorHint: 'data-issue-id="AX-021"', checkHints: ['axe:table-fake-caption'] },
  { id: 'AX-022', title: 'Content in wrong reading order', types: ['automated', 'manual'], expectedFinding: 'DOM order differs from visual order in ways that affect meaning', wcagMapping: ['1.3.2'], wcagName: 'Meaningful Sequence', severity: 'medium', howToFix: 'Ensure DOM order matches visual reading order', route: '/automated', selectorHint: 'data-issue-id="AX-022"', checkHints: ['manual:reading-order'] },
];

// ============ MEDIA ISSUES ============
const mediaIssues: AccessibilityIssue[] = [
  { id: 'AX-023', title: 'Image missing alt attribute', types: ['automated'], expectedFinding: 'Image element has no alt attribute', wcagMapping: ['1.1.1'], wcagName: 'Non-text Content', severity: 'high', howToFix: 'Add alt attribute with descriptive text or empty alt="" for decorative images', route: '/automated', selectorHint: 'data-issue-id="AX-023"', checkHints: ['axe:image-alt'] },
  { id: 'AX-024', title: 'Image with empty alt but not decorative', types: ['automated', 'manual'], expectedFinding: 'Meaningful image has empty alt attribute', wcagMapping: ['1.1.1'], wcagName: 'Non-text Content', severity: 'high', howToFix: 'Add meaningful alt text describing the image content', route: '/automated', selectorHint: 'data-issue-id="AX-024"', checkHints: ['manual:alt-text-quality'] },
  { id: 'AX-025', title: 'Alt text is filename', types: ['automated'], expectedFinding: 'Alt text contains filename like "IMG_1234.jpg"', wcagMapping: ['1.1.1'], wcagName: 'Non-text Content', severity: 'medium', howToFix: 'Replace filename with meaningful description of image content', route: '/automated', selectorHint: 'data-issue-id="AX-025"', checkHints: ['axe:image-alt', 'manual:alt-text-quality'] },
  { id: 'AX-026', title: 'Decorative image not hidden', types: ['automated'], expectedFinding: 'Decorative image lacks empty alt or role="presentation"', wcagMapping: ['1.1.1'], wcagName: 'Non-text Content', severity: 'low', howToFix: 'Add alt="" or role="presentation" to decorative images', route: '/automated', selectorHint: 'data-issue-id="AX-026"', checkHints: ['axe:image-alt'] },
  { id: 'AX-027', title: 'Image link with no accessible name', types: ['automated'], expectedFinding: 'Link contains only image with no alt text', wcagMapping: ['1.1.1', '2.4.4'], wcagName: 'Non-text Content, Link Purpose', severity: 'high', howToFix: 'Add alt text to image or aria-label to link', route: '/automated', selectorHint: 'data-issue-id="AX-027"', checkHints: ['axe:image-alt', 'axe:link-name'] },
  { id: 'AX-028', title: 'Icon used without text alternative', types: ['automated'], expectedFinding: 'SVG icon has no accessible name', wcagMapping: ['1.1.1', '4.1.2'], wcagName: 'Non-text Content, Name Role Value', severity: 'medium', howToFix: 'Add aria-label or title element to SVG, or include visually hidden text', route: '/automated', selectorHint: 'data-issue-id="AX-028"', checkHints: ['axe:svg-img-alt'] },
  { id: 'AX-029', title: 'Background image with information', types: ['manual'], expectedFinding: 'CSS background image conveys information without text alternative', wcagMapping: ['1.1.1'], wcagName: 'Non-text Content', severity: 'high', howToFix: 'Provide text alternative in content or use actual img element', route: '/automated', selectorHint: 'data-issue-id="AX-029"', checkHints: ['manual:background-image-alt'] },
  { id: 'AX-030', title: 'Alt text too long', types: ['manual'], expectedFinding: 'Alt text is excessively long (over 125 characters)', wcagMapping: ['1.1.1'], wcagName: 'Non-text Content', severity: 'low', howToFix: 'Shorten alt text to be concise. Use longdesc or describedby for complex images', route: '/automated', selectorHint: 'data-issue-id="AX-030"', checkHints: ['manual:alt-text-length'] },
  { id: 'AX-031', title: 'Figure without figcaption', types: ['automated'], expectedFinding: 'Figure element has no figcaption for context', wcagMapping: ['1.1.1'], wcagName: 'Non-text Content', severity: 'low', howToFix: 'Add figcaption element to provide context for the figure', route: '/automated', selectorHint: 'data-issue-id="AX-031"', checkHints: ['manual:figure-caption'] },
  { id: 'AX-032', title: 'Video without captions', types: ['automated', 'manual'], expectedFinding: 'Video element has no captions track', wcagMapping: ['1.2.2'], wcagName: 'Captions (Prerecorded)', severity: 'high', howToFix: 'Add WebVTT captions track to video element', route: '/automated', selectorHint: 'data-issue-id="AX-032"', checkHints: ['axe:video-caption'] },
  { id: 'AX-033', title: 'Audio without transcript', types: ['manual'], expectedFinding: 'Audio content has no text transcript', wcagMapping: ['1.2.1'], wcagName: 'Audio-only and Video-only (Prerecorded)', severity: 'high', howToFix: 'Provide text transcript for audio content', route: '/automated', selectorHint: 'data-issue-id="AX-033"', checkHints: ['manual:audio-transcript'] },
];

// ============ COLOR CONTRAST ISSUES ============
const colorIssues: AccessibilityIssue[] = [
  { id: 'AX-034', title: 'Text contrast ratio too low (normal text)', types: ['automated'], expectedFinding: 'Text has contrast ratio below 4.5:1 for normal text', wcagMapping: ['1.4.3'], wcagName: 'Contrast (Minimum)', severity: 'high', howToFix: 'Increase contrast to at least 4.5:1 for normal text', route: '/automated', selectorHint: 'data-issue-id="AX-034"', checkHints: ['axe:color-contrast'] },
  { id: 'AX-035', title: 'Text contrast ratio too low (large text)', types: ['automated'], expectedFinding: 'Large text has contrast ratio below 3:1', wcagMapping: ['1.4.3'], wcagName: 'Contrast (Minimum)', severity: 'medium', howToFix: 'Increase contrast to at least 3:1 for large text (18pt+ or 14pt bold)', route: '/automated', selectorHint: 'data-issue-id="AX-035"', checkHints: ['axe:color-contrast'] },
  { id: 'AX-036', title: 'Link not distinguishable from text', types: ['automated', 'manual'], expectedFinding: 'Link relies only on color to distinguish from surrounding text', wcagMapping: ['1.4.1'], wcagName: 'Use of Color', severity: 'medium', howToFix: 'Add underline or other non-color visual distinction to links', route: '/automated', selectorHint: 'data-issue-id="AX-036"', checkHints: ['axe:link-in-text-block'] },
  { id: 'AX-037', title: 'Form input border contrast too low', types: ['automated'], expectedFinding: 'Input border has contrast ratio below 3:1 against background', wcagMapping: ['1.4.11'], wcagName: 'Non-text Contrast', severity: 'medium', howToFix: 'Increase input border contrast to at least 3:1', route: '/automated', selectorHint: 'data-issue-id="AX-037"', checkHints: ['manual:non-text-contrast'] },
  { id: 'AX-038', title: 'Button focus indicator contrast too low', types: ['automated', 'guided'], expectedFinding: 'Focus indicator color has insufficient contrast', wcagMapping: ['1.4.11', '2.4.7'], wcagName: 'Non-text Contrast, Focus Visible', severity: 'medium', howToFix: 'Use focus indicator with at least 3:1 contrast ratio', route: '/automated', selectorHint: 'data-issue-id="AX-038"', checkHints: ['manual:focus-contrast'] },
  { id: 'AX-039', title: 'Icon-only button low contrast', types: ['automated'], expectedFinding: 'Icon color has insufficient contrast against background', wcagMapping: ['1.4.11'], wcagName: 'Non-text Contrast', severity: 'medium', howToFix: 'Increase icon color contrast to at least 3:1', route: '/automated', selectorHint: 'data-issue-id="AX-039"', checkHints: ['manual:non-text-contrast'] },
  { id: 'AX-040', title: 'Placeholder text low contrast', types: ['automated'], expectedFinding: 'Placeholder text has insufficient contrast', wcagMapping: ['1.4.3'], wcagName: 'Contrast (Minimum)', severity: 'low', howToFix: 'Increase placeholder text contrast to at least 4.5:1', route: '/automated', selectorHint: 'data-issue-id="AX-040"', checkHints: ['axe:color-contrast'] },
  { id: 'AX-041', title: 'Color-only error indication', types: ['automated', 'manual'], expectedFinding: 'Error state indicated only by color change', wcagMapping: ['1.4.1'], wcagName: 'Use of Color', severity: 'high', howToFix: 'Add icon, text, or other non-color indicator for errors', route: '/automated', selectorHint: 'data-issue-id="AX-041"', checkHints: ['manual:use-of-color'] },
  { id: 'AX-042', title: 'Chart uses color only to distinguish data', types: ['manual'], expectedFinding: 'Chart legend relies solely on color differentiation', wcagMapping: ['1.4.1'], wcagName: 'Use of Color', severity: 'medium', howToFix: 'Add patterns, labels, or other non-color distinctions', route: '/automated', selectorHint: 'data-issue-id="AX-042"', checkHints: ['manual:use-of-color'] },
  { id: 'AX-043', title: 'Disabled button text too low contrast', types: ['automated'], expectedFinding: 'Disabled state text contrast is extremely low', wcagMapping: ['1.4.3'], wcagName: 'Contrast (Minimum)', severity: 'low', howToFix: 'While disabled elements are exempt, consider improving contrast for usability', route: '/automated', selectorHint: 'data-issue-id="AX-043"', checkHints: ['axe:color-contrast'] },
];

// ============ ARIA MISUSE ISSUES ============
const ariaIssues: AccessibilityIssue[] = [
  { id: 'AX-044', title: 'Invalid ARIA role', types: ['automated'], expectedFinding: 'Element has non-existent ARIA role value', wcagMapping: ['4.1.2'], wcagName: 'Name, Role, Value', severity: 'high', howToFix: 'Use valid ARIA role from the WAI-ARIA specification', route: '/automated', selectorHint: 'data-issue-id="AX-044"', checkHints: ['axe:aria-roles'] },
  { id: 'AX-045', title: 'aria-labelledby references non-existent ID', types: ['automated'], expectedFinding: 'aria-labelledby points to ID that does not exist', wcagMapping: ['4.1.2'], wcagName: 'Name, Role, Value', severity: 'high', howToFix: 'Ensure aria-labelledby references an existing element ID', route: '/automated', selectorHint: 'data-issue-id="AX-045"', checkHints: ['axe:aria-valid-attr-value'] },
  { id: 'AX-046', title: 'aria-describedby references non-existent ID', types: ['automated'], expectedFinding: 'aria-describedby points to ID that does not exist', wcagMapping: ['4.1.2'], wcagName: 'Name, Role, Value', severity: 'medium', howToFix: 'Ensure aria-describedby references an existing element ID', route: '/automated', selectorHint: 'data-issue-id="AX-046"', checkHints: ['axe:aria-valid-attr-value'] },
  { id: 'AX-047', title: 'Invalid ARIA attribute value', types: ['automated'], expectedFinding: 'ARIA attribute has invalid value', wcagMapping: ['4.1.2'], wcagName: 'Name, Role, Value', severity: 'medium', howToFix: 'Use correct value type for the ARIA attribute', route: '/automated', selectorHint: 'data-issue-id="AX-047"', checkHints: ['axe:aria-valid-attr-value'] },
  { id: 'AX-048', title: 'ARIA attribute not allowed on element', types: ['automated'], expectedFinding: 'ARIA attribute used on element where it is not valid', wcagMapping: ['4.1.2'], wcagName: 'Name, Role, Value', severity: 'medium', howToFix: 'Use ARIA attributes only on appropriate elements', route: '/automated', selectorHint: 'data-issue-id="AX-048"', checkHints: ['axe:aria-allowed-attr'] },
  { id: 'AX-049', title: 'Required ARIA attribute missing', types: ['automated'], expectedFinding: 'Element with role missing required ARIA attribute', wcagMapping: ['4.1.2'], wcagName: 'Name, Role, Value', severity: 'high', howToFix: 'Add required ARIA attributes for the specified role', route: '/automated', selectorHint: 'data-issue-id="AX-049"', checkHints: ['axe:aria-required-attr'] },
  { id: 'AX-050', title: 'Role conflicts with native semantics', types: ['automated'], expectedFinding: 'ARIA role overrides appropriate native element semantics', wcagMapping: ['4.1.2'], wcagName: 'Name, Role, Value', severity: 'medium', howToFix: 'Use native HTML elements instead of ARIA roles when possible', route: '/automated', selectorHint: 'data-issue-id="AX-050"', checkHints: ['manual:native-semantics'] },
  { id: 'AX-051', title: 'aria-hidden on focusable element', types: ['automated'], expectedFinding: 'Focusable element has aria-hidden="true"', wcagMapping: ['4.1.2'], wcagName: 'Name, Role, Value', severity: 'high', howToFix: 'Remove aria-hidden or make element non-focusable', route: '/automated', selectorHint: 'data-issue-id="AX-051"', checkHints: ['axe:aria-hidden-focus'] },
  { id: 'AX-052', title: 'Empty aria-label', types: ['automated'], expectedFinding: 'Element has aria-label with empty or whitespace-only value', wcagMapping: ['4.1.2'], wcagName: 'Name, Role, Value', severity: 'high', howToFix: 'Provide meaningful text in aria-label', route: '/automated', selectorHint: 'data-issue-id="AX-052"', checkHints: ['axe:aria-valid-attr-value'] },
  { id: 'AX-053', title: 'Nested interactive elements', types: ['automated'], expectedFinding: 'Button or link contains another interactive element', wcagMapping: ['4.1.2'], wcagName: 'Name, Role, Value', severity: 'high', howToFix: 'Flatten interactive structure - no buttons inside links or vice versa', route: '/automated', selectorHint: 'data-issue-id="AX-053"', checkHints: ['axe:nested-interactive'] },
  { id: 'AX-054', title: 'Incorrect tablist structure', types: ['automated'], expectedFinding: 'Tab structure missing required roles or relationships', wcagMapping: ['4.1.2'], wcagName: 'Name, Role, Value', severity: 'medium', howToFix: 'Use tablist, tab, and tabpanel roles with proper aria-controls/labelledby', route: '/automated', selectorHint: 'data-issue-id="AX-054"', checkHints: ['axe:aria-required-children'] },
];

const allIssues = [...formIssues, ...structureIssues, ...mediaIssues, ...colorIssues, ...ariaIssues];

export default function AutomatedIssues() {
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
    <PageWrapper title="Automated Issues" description="All accessibility issues detectable by automated testing tools">
      <div className="space-y-12">
        <header>
          <h1 className="text-3xl font-bold text-foreground mb-4">Automated Accessibility Issues</h1>
          <p className="text-muted-foreground">This page contains {allIssues.length} issues detectable by automated testing tools like axe, WAVE, or Lighthouse.</p>
        </header>

        {/* ========== FORM ISSUES ========== */}
        <section id="forms">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">Form Issues</h2>
          
          <div className="space-y-6">
            {/* AX-001: Input without label */}
            <div id="AX-001">
              <IssueCard issue={formIssues[0]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <input type="text" data-issue-id="AX-001" data-issue-type="automated" data-wcag="1.3.1,3.3.2" className="border border-input rounded px-3 py-2 w-full max-w-xs" />
              </div>
            </div>

            {/* AX-002: Placeholder-only label */}
            <div id="AX-002">
              <IssueCard issue={formIssues[1]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <input type="email" placeholder="Enter your email address" data-issue-id="AX-002" data-issue-type="automated" data-wcag="1.3.1,3.3.2" className="border border-input rounded px-3 py-2 w-full max-w-xs" />
              </div>
            </div>

            {/* AX-003: Label not associated */}
            <div id="AX-003">
              <IssueCard issue={formIssues[2]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <label htmlFor="wrong-id" className="block mb-1 font-medium">Phone Number</label>
                <input type="tel" id="phone-field" data-issue-id="AX-003" data-issue-type="automated" data-wcag="1.3.1" className="border border-input rounded px-3 py-2 w-full max-w-xs" />
              </div>
            </div>

            {/* AX-004: Required field not indicated */}
            <div id="AX-004">
              <IssueCard issue={formIssues[3]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <label htmlFor="username-field" className="block mb-1 font-medium">Username</label>
                <input type="text" id="username-field" required data-issue-id="AX-004" data-issue-type="automated,manual" data-wcag="3.3.2" className="border border-input rounded px-3 py-2 w-full max-w-xs" />
              </div>
            </div>

            {/* AX-005: Duplicate IDs */}
            <div id="AX-005">
              <IssueCard issue={formIssues[4]} />
              <div className="p-4 border border-border rounded-lg bg-card space-y-4">
                <div>
                  <label htmlFor="duplicate-name" className="block mb-1 font-medium">First Name</label>
                  <input type="text" id="duplicate-name" data-issue-id="AX-005" data-issue-type="automated" data-wcag="4.1.1" className="border border-input rounded px-3 py-2 w-full max-w-xs" />
                </div>
                <div>
                  <label htmlFor="duplicate-name" className="block mb-1 font-medium">Last Name</label>
                  <input type="text" id="duplicate-name" data-issue-id="AX-005" data-issue-type="automated" data-wcag="4.1.1" className="border border-input rounded px-3 py-2 w-full max-w-xs" />
                </div>
              </div>
            </div>

            {/* AX-006: Checkbox without label */}
            <div id="AX-006">
              <IssueCard issue={formIssues[5]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <input type="checkbox" data-issue-id="AX-006" data-issue-type="automated" data-wcag="1.3.1,4.1.2" className="mr-2" />
                <span className="text-foreground">Subscribe to updates</span>
              </div>
            </div>

            {/* AX-007: Radio group without group label */}
            <div id="AX-007">
              <IssueCard issue={formIssues[6]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <div className="space-y-2" data-issue-id="AX-007" data-issue-type="automated" data-wcag="1.3.1,3.3.2">
                  <div><input type="radio" name="plan" id="plan-free" className="mr-2" /><label htmlFor="plan-free">Free Plan</label></div>
                  <div><input type="radio" name="plan" id="plan-pro" className="mr-2" /><label htmlFor="plan-pro">Pro Plan</label></div>
                </div>
              </div>
            </div>

            {/* AX-008: Select without label */}
            {/* <div id="AX-008">
              <IssueCard issue={formIssues[7]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <select data-issue-id="AX-008" data-issue-type="automated" data-wcag="1.3.1,3.3.2" className="border border-input rounded px-3 py-2">
                  <option value="">Choose timezone</option>
                  <option value="pst">Pacific Time</option>
                  <option value="est">Eastern Time</option>
                </select>
              </div>
            </div> */}

            {/* AX-009: Textarea without label */}
            <div id="AX-009">
              <IssueCard issue={formIssues[8]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <textarea data-issue-id="AX-009" data-issue-type="automated" data-wcag="1.3.1,3.3.2" rows={3} className="border border-input rounded px-3 py-2 w-full max-w-md" placeholder="Your feedback..." />
              </div>
            </div>

            {/* AX-010: Button with no text */}
            <div id="AX-010">
              <IssueCard issue={formIssues[9]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <button type="submit" data-issue-id="AX-010" data-issue-type="automated" data-wcag="4.1.2,2.5.3" className="px-4 py-2 bg-primary text-primary-foreground rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>

            {/* AX-011: Missing autocomplete */}
            <div id="AX-011">
              <IssueCard issue={formIssues[10]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <label htmlFor="full-name-field" className="block mb-1 font-medium">Full Name</label>
                <input type="text" id="full-name-field" data-issue-id="AX-011" data-issue-type="automated" data-wcag="1.3.5" className="border border-input rounded px-3 py-2 w-full max-w-xs" />
              </div>
            </div>

            {/* AX-012: Wrong autocomplete value */}
            <div id="AX-012">
              <IssueCard issue={formIssues[11]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <label htmlFor="email-field-wrong" className="block mb-1 font-medium">Email Address</label>
                <input type="email" id="email-field-wrong" autoComplete="name" data-issue-id="AX-012" data-issue-type="automated" data-wcag="1.3.5" className="border border-input rounded px-3 py-2 w-full max-w-xs" />
              </div>
            </div>
          </div>
        </section>

        {/* ========== STRUCTURE ISSUES ========== */}
        <section id="structure">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">Structure Issues</h2>
          
          <div className="space-y-6">
            {/* AX-013: Skipped heading level */}
            <div id="AX-013">
              <IssueCard issue={structureIssues[0]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <h2 className="text-xl font-semibold mb-2">Section Title</h2>
                <h4 className="text-lg font-medium" data-issue-id="AX-013" data-issue-type="automated" data-wcag="1.3.1,2.4.6">Subsection That Skipped h3</h4>
              </div>
            </div>

            {/* AX-014: Empty heading */}
            <div id="AX-014">
              <IssueCard issue={structureIssues[1]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <h3 className="text-lg font-semibold mb-2" data-issue-id="AX-014" data-issue-type="automated" data-wcag="1.3.1,2.4.6">{/* Empty heading */}</h3>
                <p className="text-muted-foreground">Content following an empty heading.</p>
              </div>
            </div>

            {/* AX-015: Multiple h1 */}
            <div id="AX-015">
              <IssueCard issue={structureIssues[2]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <h1 className="text-2xl font-bold mb-2" data-issue-id="AX-015" data-issue-type="automated" data-wcag="1.3.1">Another Main Heading (Duplicate H1)</h1>
              </div>
            </div>

            {/* AX-016: Missing page title - note */}
            <div id="AX-016">
              <IssueCard issue={structureIssues[3]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <p data-issue-id="AX-016" data-issue-type="automated" data-wcag="2.4.2" className="text-muted-foreground"><strong>Note:</strong> This issue would require an empty or missing title tag.</p>
              </div>
            </div>

            {/* AX-017: Missing main landmark - note */}
            <div id="AX-017">
              <IssueCard issue={structureIssues[4]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <p data-issue-id="AX-017" data-issue-type="automated" data-wcag="1.3.1" className="text-muted-foreground"><strong>Note:</strong> Content without main landmark.</p>
              </div>
            </div>

            {/* AX-018: Duplicate landmarks */}
            <div id="AX-018">
              <IssueCard issue={structureIssues[5]} />
              <div className="p-4 border border-border rounded-lg bg-card space-y-4">
                <nav data-issue-id="AX-018" data-issue-type="automated" data-wcag="1.3.1" className="flex gap-4 p-2 bg-muted rounded">
                  <a href="#" className="text-primary">Home</a>
                  <a href="#" className="text-primary">Products</a>
                </nav>
                <nav className="flex gap-4 p-2 bg-muted rounded">
                  <a href="#" className="text-primary">Privacy</a>
                  <a href="#" className="text-primary">Terms</a>
                </nav>
              </div>
            </div>

            {/* AX-019: List markup misuse */}
            <div id="AX-019">
              <IssueCard issue={structureIssues[6]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <div data-issue-id="AX-019" data-issue-type="automated" data-wcag="1.3.1" className="space-y-1">
                  <div>• Feature one</div>
                  <div>• Feature two</div>
                  <div>• Feature three</div>
                </div>
              </div>
            </div>

            {/* AX-020: Table without headers */}
            <div id="AX-020">
              <IssueCard issue={structureIssues[7]} />
              <div className="p-4 border border-border rounded-lg bg-card overflow-x-auto">
                <table data-issue-id="AX-020" data-issue-type="automated" data-wcag="1.3.1" className="w-full border-collapse">
                  <tbody>
                    <tr className="bg-muted">
                      <td className="border border-border px-3 py-2 font-semibold">Name</td>
                      <td className="border border-border px-3 py-2 font-semibold">Email</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-3 py-2">John Doe</td>
                      <td className="border border-border px-3 py-2">john@example.com</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* AX-021: Layout table */}
            <div id="AX-021">
              <IssueCard issue={structureIssues[8]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <table data-issue-id="AX-021" data-issue-type="automated" data-wcag="1.3.1" className="w-full">
                  <tbody>
                    <tr>
                      <td className="p-4"><div className="bg-muted p-3 rounded">Sidebar</div></td>
                      <td className="p-4"><div className="bg-muted p-3 rounded">Main</div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* AX-022: Wrong reading order */}
            <div id="AX-022">
              <IssueCard issue={structureIssues[9]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <div className="flex flex-row-reverse gap-4" data-issue-id="AX-022" data-issue-type="automated,manual" data-wcag="1.3.2">
                  <div className="bg-primary text-primary-foreground p-3 rounded">3. Third in DOM</div>
                  <div className="bg-secondary text-secondary-foreground p-3 rounded">2. Second in DOM</div>
                  <div className="bg-muted text-foreground p-3 rounded">1. First in DOM</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== MEDIA ISSUES ========== */}
        <section id="media">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">Media Issues</h2>
          
          <div className="space-y-6">
            {/* AX-023: Image missing alt */}
            <div id="AX-023">
              <IssueCard issue={mediaIssues[0]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <img src="https://via.placeholder.com/200x150?text=Product" data-issue-id="AX-023" data-issue-type="automated" data-wcag="1.1.1" className="rounded" />
              </div>
            </div>

            {/* AX-024: Empty alt but not decorative */}
            <div id="AX-024">
              <IssueCard issue={mediaIssues[1]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <img src="https://via.placeholder.com/200x150?text=Team+Photo" alt="" data-issue-id="AX-024" data-issue-type="automated,manual" data-wcag="1.1.1" className="rounded" />
                <p className="text-sm mt-2">Our amazing team!</p>
              </div>
            </div>

            {/* AX-025: Alt text is filename */}
            <div id="AX-025">
              <IssueCard issue={mediaIssues[2]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <img src="https://via.placeholder.com/200x150?text=Office" alt="IMG_2847_final_v2.jpg" data-issue-id="AX-025" data-issue-type="automated" data-wcag="1.1.1" className="rounded" />
              </div>
            </div>

            {/* AX-026: Decorative image not hidden */}
            <div id="AX-026">
              <IssueCard issue={mediaIssues[3]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <img src="https://via.placeholder.com/400x20?text=---" alt="Decorative horizontal line divider" data-issue-id="AX-026" data-issue-type="automated" data-wcag="1.1.1" className="w-full" />
              </div>
            </div>

            {/* AX-027: Image link no name */}
            <div id="AX-027">
              <IssueCard issue={mediaIssues[4]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <a href="https://twitter.com" data-issue-id="AX-027" data-issue-type="automated" data-wcag="1.1.1,2.4.4">
                  <img src="https://via.placeholder.com/40?text=X" className="rounded" />
                </a>
              </div>
            </div>

            {/* AX-028: Icon without text */}
            <div id="AX-028">
              <IssueCard issue={mediaIssues[5]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <button className="p-2 bg-primary text-primary-foreground rounded" data-issue-id="AX-028" data-issue-type="automated" data-wcag="1.1.1,4.1.2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                </button>
              </div>
            </div>

            {/* AX-029: Background image with info */}
            <div id="AX-029">
              <IssueCard issue={mediaIssues[6]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <div className="h-32 rounded flex items-center justify-center" style={{ backgroundImage: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)' }} data-issue-id="AX-029" data-issue-type="manual" data-wcag="1.1.1">
                  <span className="text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">[50% OFF in background image]</span>
                </div>
              </div>
            </div>

            {/* AX-030: Alt text too long */}
            <div id="AX-030">
              <IssueCard issue={mediaIssues[7]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <img src="https://via.placeholder.com/300x200?text=Diagram" alt="This is an extremely detailed organizational chart showing the complete hierarchy of our company starting from the CEO at the top, moving down through various vice presidents and directors, then to department managers, team leads, and finally individual contributors." data-issue-id="AX-030" data-issue-type="manual" data-wcag="1.1.1" className="rounded" />
              </div>
            </div>

            {/* AX-031: Figure without figcaption */}
            <div id="AX-031">
              <IssueCard issue={mediaIssues[8]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <figure data-issue-id="AX-031" data-issue-type="automated" data-wcag="1.1.1">
                  <img src="https://via.placeholder.com/300x200?text=Chart" alt="Quarterly sales chart" className="rounded" />
                </figure>
              </div>
            </div>

            {/* AX-032: Video without captions */}
            <div id="AX-032">
              <IssueCard issue={mediaIssues[9]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <video controls width="400" data-issue-id="AX-032" data-issue-type="automated,manual" data-wcag="1.2.2" className="rounded bg-muted" poster="https://via.placeholder.com/400x225?text=Video+Demo">
                  <source src="#" type="video/mp4" />
                </video>
              </div>
            </div>

            {/* AX-033: Audio without transcript */}
            <div id="AX-033">
              <IssueCard issue={mediaIssues[10]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <audio controls data-issue-id="AX-033" data-issue-type="manual" data-wcag="1.2.1" className="w-full max-w-md">
                  <source src="#" type="audio/mpeg" />
                </audio>
                <p className="text-sm text-muted-foreground mt-2">No transcript provided</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========== COLOR CONTRAST ISSUES ========== */}
        <section id="color-contrast">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">Color Contrast Issues</h2>
          
          <div className="space-y-6">
            {/* AX-034: Low contrast normal text */}
            <div id="AX-034">
              <IssueCard issue={colorIssues[0]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <p style={{ color: '#aaaaaa' }} data-issue-id="AX-034" data-issue-type="automated" data-wcag="1.4.3">Light gray text (#aaa) fails 4.5:1 contrast.</p>
              </div>
            </div>

            {/* AX-035: Low contrast large text */}
            <div id="AX-035">
              <IssueCard issue={colorIssues[1]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <h2 className="text-2xl font-bold" style={{ color: '#999999' }} data-issue-id="AX-035" data-issue-type="automated" data-wcag="1.4.3">Large Heading with Insufficient Contrast</h2>
              </div>
            </div>

            {/* AX-036: Link not distinguishable */}
            <div id="AX-036">
              <IssueCard issue={colorIssues[2]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <p className="text-foreground">Text with a <a href="#" className="no-underline" style={{ color: 'hsl(var(--primary))' }} data-issue-id="AX-036" data-issue-type="automated,manual" data-wcag="1.4.1">hidden link</a> that only differs by color.</p>
              </div>
            </div>

            {/* AX-037: Input border low contrast */}
            <div id="AX-037">
              <IssueCard issue={colorIssues[3]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <label htmlFor="low-border-input" className="block mb-1 font-medium">Email</label>
                <input type="email" id="low-border-input" style={{ borderColor: '#e8e8e8' }} data-issue-id="AX-037" data-issue-type="automated" data-wcag="1.4.11" className="px-3 py-2 w-full max-w-xs rounded border" />
              </div>
            </div>

            {/* AX-038: Focus indicator low contrast */}
            <div id="AX-038">
              <IssueCard issue={colorIssues[4]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <button data-issue-id="AX-038" data-issue-type="automated,guided" data-wcag="1.4.11,2.4.7" className="px-4 py-2 bg-primary text-primary-foreground rounded" style={{ outline: 'none' }} onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 2px #e0e0e0'; }} onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}>Low Contrast Focus</button>
              </div>
            </div>

            {/* AX-039: Icon low contrast */}
            <div id="AX-039">
              <IssueCard issue={colorIssues[5]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <button data-issue-id="AX-039" data-issue-type="automated" data-wcag="1.4.11" className="p-3 rounded border border-border" aria-label="Settings">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cccccc" strokeWidth="2"><circle cx="12" cy="12" r="3"/></svg>
                </button>
              </div>
            </div>

            {/* AX-040: Placeholder low contrast */}
            <div id="AX-040">
              <IssueCard issue={colorIssues[6]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <label htmlFor="placeholder-input" className="block mb-1 font-medium">Search</label>
                <input type="text" id="placeholder-input" placeholder="Enter search term..." data-issue-id="AX-040" data-issue-type="automated" data-wcag="1.4.3" className="px-3 py-2 w-full max-w-xs rounded border border-input" />
                <style>{`input[data-issue-id="AX-040"]::placeholder { color: #d0d0d0; }`}</style>
              </div>
            </div>

            {/* AX-041: Color-only error */}
            <div id="AX-041">
              <IssueCard issue={colorIssues[7]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <label htmlFor="error-field" className="block mb-1 font-medium">Password</label>
                <input type="password" id="error-field" data-issue-id="AX-041" data-issue-type="automated,manual" data-wcag="1.4.1" className="px-3 py-2 w-full max-w-xs rounded border-2" style={{ borderColor: '#ef4444' }} />
                <p className="text-sm text-muted-foreground mt-1">Red border is only indication of error</p>
              </div>
            </div>

            {/* AX-042: Chart color-only */}
            <div id="AX-042">
              <IssueCard issue={colorIssues[8]} />
              <div className="p-4 border border-border rounded-lg bg-card" data-issue-id="AX-042" data-issue-type="manual" data-wcag="1.4.1">
                <div className="flex gap-4 h-32 items-end">
                  <div className="w-16 bg-blue-500 h-full"></div>
                  <div className="w-16 bg-green-500 h-3/4"></div>
                  <div className="w-16 bg-purple-500 h-1/2"></div>
                </div>
                <div className="flex gap-4 text-sm mt-2">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 rounded"></span> Q1</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded"></span> Q2</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 bg-purple-500 rounded"></span> Q3</span>
                </div>
              </div>
            </div>

            {/* AX-043: Disabled button contrast */}
            <div id="AX-043">
              <IssueCard issue={colorIssues[9]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <button disabled data-issue-id="AX-043" data-issue-type="automated" data-wcag="1.4.3" className="px-4 py-2 rounded" style={{ backgroundColor: '#f5f5f5', color: '#e0e0e0' }}>Disabled Action</button>
              </div>
            </div>
          </div>
        </section>

        {/* ========== ARIA MISUSE ISSUES ========== */}
        <section id="aria-misuse">
          <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">ARIA Misuse Issues</h2>
          
          <div className="space-y-6">
            {/* AX-044: Invalid ARIA role */}
            <div id="AX-044">
              <IssueCard issue={ariaIssues[0]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <div role="superbutton" data-issue-id="AX-044" data-issue-type="automated" data-wcag="4.1.2" className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded cursor-pointer">Invalid Role Element</div>
              </div>
            </div>

            {/* AX-045: aria-labelledby broken reference */}
            <div id="AX-045">
              <IssueCard issue={ariaIssues[1]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <div role="dialog" aria-labelledby="nonexistent-dialog-title" data-issue-id="AX-045" data-issue-type="automated" data-wcag="4.1.2" className="p-4 border border-border rounded bg-muted">
                  <p>Dialog's aria-labelledby points to non-existent ID.</p>
                </div>
              </div>
            </div>

            {/* AX-046: aria-describedby broken reference */}
            <div id="AX-046">
              <IssueCard issue={ariaIssues[2]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <label htmlFor="described-input" className="block mb-1 font-medium">Password</label>
                <input type="password" id="described-input" aria-describedby="password-requirements-that-dont-exist" data-issue-id="AX-046" data-issue-type="automated" data-wcag="4.1.2" className="px-3 py-2 border border-input rounded w-full max-w-xs" />
              </div>
            </div>

            {/* AX-047: Invalid attribute value */}
            <div id="AX-047">
              <IssueCard issue={ariaIssues[3]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <div role="button" aria-expanded={"yes" as unknown as boolean} data-issue-id="AX-047" data-issue-type="automated" data-wcag="4.1.2" className="px-4 py-2 bg-secondary text-secondary-foreground rounded">Toggle (invalid aria-expanded="yes")</div>
              </div>
            </div>

            {/* AX-048: ARIA attribute not allowed */}
            <div id="AX-048">
              <IssueCard issue={ariaIssues[4]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <p aria-checked="true" data-issue-id="AX-048" data-issue-type="automated" data-wcag="4.1.2" className="text-foreground">Paragraph with aria-checked (not valid).</p>
              </div>
            </div>

            {/* AX-049: Required attribute missing */}
            <div id="AX-049">
              <IssueCard issue={ariaIssues[5]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <div role="slider" data-issue-id="AX-049" data-issue-type="automated" data-wcag="4.1.2" className="w-full h-4 bg-muted rounded cursor-pointer" tabIndex={0}>
                  <div className="w-1/3 h-full bg-primary rounded"></div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Missing aria-valuenow, valuemin, valuemax</p>
              </div>
            </div>

            {/* AX-050: Role conflicts with native */}
            <div id="AX-050">
              <IssueCard issue={ariaIssues[6]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <button role="link" data-issue-id="AX-050" data-issue-type="automated" data-wcag="4.1.2" className="px-4 py-2 bg-primary text-primary-foreground rounded">Button with role="link"</button>
              </div>
            </div>

            {/* AX-051: aria-hidden on focusable */}
            <div id="AX-051">
              <IssueCard issue={ariaIssues[7]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <button aria-hidden="true" data-issue-id="AX-051" data-issue-type="automated" data-wcag="4.1.2" className="px-4 py-2 bg-secondary text-secondary-foreground rounded">Hidden but Focusable</button>
              </div>
            </div>

            {/* AX-052: Empty aria-label */}
            <div id="AX-052">
              <IssueCard issue={ariaIssues[8]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <button aria-label="   " data-issue-id="AX-052" data-issue-type="automated" data-wcag="4.1.2" className="p-3 bg-primary text-primary-foreground rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>

            {/* AX-053: Nested interactive */}
            <div id="AX-053">
              <IssueCard issue={ariaIssues[9]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <a href="#" data-issue-id="AX-053" data-issue-type="automated" data-wcag="4.1.2" className="block p-4 border border-border rounded hover:bg-muted">
                  <span className="block font-medium">Product Card Link</span>
                  <button className="mt-2 px-3 py-1 bg-primary text-primary-foreground rounded text-sm">Add to Cart</button>
                </a>
              </div>
            </div>

            {/* AX-054: Incorrect tablist structure */}
            <div id="AX-054">
              <IssueCard issue={ariaIssues[10]} />
              <div className="p-4 border border-border rounded-lg bg-card">
                <div role="tablist" data-issue-id="AX-054" data-issue-type="automated" data-wcag="4.1.2" className="flex gap-2 border-b border-border">
                  <button className="px-4 py-2 border-b-2 border-primary">Tab 1</button>
                  <button className="px-4 py-2">Tab 2</button>
                </div>
                <div className="p-4">Tab content - no tabpanel role</div>
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
