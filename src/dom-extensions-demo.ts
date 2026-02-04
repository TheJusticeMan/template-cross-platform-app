/**
 * @fileoverview Demonstration of DOM extension utilities.
 * Shows practical examples of Obsidian-style element creation and styling methods.
 * This file is for reference and can be imported to test the extensions.
 *
 * @remarks
 * - Version: 1.0.0
 * - Author: Justice Vellacott
 */

import './dom-extensions';

/**
 * Demonstrates element creation with options.
 * Creates a card component with title, content, and button.
 *
 * @returns {HTMLDivElement} The created card element
 *
 * @example
 * const card = createCardExample();
 * document.body.appendChild(card);
 */
export function createCardExample(): HTMLDivElement {
  // Create card container
  const card = document.createDiv({
    cls: 'card',
    attr: { 'data-component': 'card' },
  });

  // Style the card using setCssStyles
  card.setCssStyles({
    padding: '1.5rem',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
  });

  // Add title using createEl with callback
  card.createEl('h2', (title) => {
    title.textContent = 'Card Title';
    title.setCssStyles({
      marginTop: '0',
      marginBottom: '1rem',
      fontSize: '1.5rem',
      fontWeight: '600',
    });
  });

  // Add content paragraph
  card.createEl('p', {
    text: 'This card was created using DOM extensions with a clean, declarative API.',
    cls: 'card-content',
  });

  // Add button with both options and callback
  card.createEl(
    'button',
    {
      text: 'Click Me',
      cls: 'card-button',
      attr: { type: 'button' },
    },
    (btn) => {
      btn.addEventListener('click', () => {
        alert('Button clicked!');
      });
      btn.setCssStyles({
        padding: '0.5rem 1rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      });
    }
  );

  return card;
}

/**
 * Demonstrates SVG creation.
 * Creates a simple icon using createSvg.
 *
 * @returns {SVGSVGElement} The created SVG icon
 *
 * @example
 * const icon = createIconExample();
 * document.body.appendChild(icon);
 */
export function createIconExample(): SVGSVGElement {
  const icon = document.createSvg('svg', {
    attr: {
      viewBox: '0 0 24 24',
      width: '24',
      height: '24',
      fill: 'currentColor',
    },
  });

  // Add path for checkmark icon
  icon.createSvg('path', {
    attr: {
      d: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
    },
  });

  return icon;
}

/**
 * Demonstrates CSS custom properties (CSS variables).
 * Creates a themed component using setCssProps.
 *
 * @returns {HTMLDivElement} The themed component
 *
 * @example
 * const themed = createThemedComponentExample();
 * document.body.appendChild(themed);
 */
export function createThemedComponentExample(): HTMLDivElement {
  const container = document.createDiv({ cls: 'themed-component' });

  // Set CSS custom properties for theming
  container.setCssProps({
    'primary-color': '#6200ea',
    'secondary-color': '#03dac6',
    background: '#f5f5f5',
    'text-color': '#212121',
    'border-radius': '8px',
    spacing: '1rem',
  });

  // Style using the custom properties
  container.setCssStyles({
    backgroundColor: 'var(--background)',
    color: 'var(--text-color)',
    padding: 'var(--spacing)',
    borderRadius: 'var(--border-radius)',
    border: '2px solid var(--primary-color)',
  });

  container
    .createEl('h3', {
      text: 'Themed Component',
    })
    .setCssStyles({
      color: 'var(--primary-color)',
      marginTop: '0',
    });

  container.createEl('p', {
    text: 'This component uses CSS custom properties for easy theming.',
  });

  return container;
}

/**
 * Demonstrates method chaining and setText.
 * Creates a status indicator with chained methods.
 *
 * @returns {HTMLDivElement} The status indicator
 *
 * @example
 * const status = createStatusIndicatorExample();
 * document.body.appendChild(status);
 */
export function createStatusIndicatorExample(): HTMLDivElement {
  const status = document
    .createDiv({ cls: 'status-indicator' })
    .setCssStyles({
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#e8f5e9',
      borderRadius: '20px',
      border: '1px solid #4caf50',
    })
    .setCssProps({
      'status-color': '#4caf50',
    });

  // Create indicator dot
  status.createSpan({ cls: 'status-dot' }).setCssStyles({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'var(--status-color)',
  });

  // Create status text (demonstrates setText)
  const statusText = status.createSpan({ cls: 'status-text' });
  statusText.setText('Active'); // Can also use getText() to retrieve
  statusText.setCssStyles({
    fontWeight: '500',
    color: 'var(--status-color)',
  });

  return status;
}

/**
 * Demonstrates complex nested structure.
 * Creates a form with multiple input types using DOM extensions.
 *
 * @returns {HTMLFormElement} The created form
 *
 * @example
 * const form = createFormExample();
 * document.body.appendChild(form);
 */
export function createFormExample(): HTMLFormElement {
  const form = document.createEl('form', {
    cls: 'demo-form',
    attr: { novalidate: 'true' },
  });

  form.setCssStyles({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '400px',
    padding: '1.5rem',
    backgroundColor: '#fafafa',
    borderRadius: '8px',
  });

  // Name input field
  const nameGroup = form.createDiv({ cls: 'form-group' });
  nameGroup
    .createEl('label', {
      text: 'Name',
      attr: { for: 'name-input' },
    })
    .setCssStyles({
      fontWeight: '500',
      marginBottom: '0.25rem',
    });

  nameGroup
    .createEl('input', {
      type: 'text',
      placeholder: 'Enter your name',
      attr: { id: 'name-input', name: 'name' },
    })
    .setCssStyles({
      padding: '0.5rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '1rem',
    });

  // Email input field
  const emailGroup = form.createDiv({ cls: 'form-group' });
  emailGroup
    .createEl('label', {
      text: 'Email',
      attr: { for: 'email-input' },
    })
    .setCssStyles({
      fontWeight: '500',
      marginBottom: '0.25rem',
    });

  emailGroup
    .createEl('input', {
      type: 'email',
      placeholder: 'your@email.com',
      attr: { id: 'email-input', name: 'email' },
    })
    .setCssStyles({
      padding: '0.5rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '1rem',
    });

  // Submit button
  form.createEl(
    'button',
    {
      text: 'Submit',
      cls: 'submit-btn',
      attr: { type: 'submit' },
    },
    (btn) => {
      btn.setCssStyles({
        padding: '0.75rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        cursor: 'pointer',
        fontWeight: '500',
      });

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Form submitted (demo)');
      });
    }
  );

  return form;
}

/**
 * Demonstrates parent option for automatic appending.
 * Creates elements that are automatically appended to a parent.
 *
 * @param {HTMLElement} parentElement - The parent to append to
 * @returns {void}
 *
 * @example
 * const container = document.getElementById('container');
 * if (container) {
 *   createWithParentExample(container);
 * }
 */
export function createWithParentExample(parentElement: HTMLElement): void {
  // These elements are automatically appended to parentElement
  document
    .createDiv({
      text: 'This div was auto-appended',
      cls: 'auto-appended',
      parent: parentElement,
    })
    .setCssStyles({
      padding: '1rem',
      backgroundColor: '#e3f2fd',
      marginBottom: '0.5rem',
    });

  document.createEl(
    'button',
    {
      text: 'Auto-appended Button',
      parent: parentElement,
    },
    (btn) => {
      btn.setCssStyles({
        padding: '0.5rem 1rem',
        backgroundColor: '#00796b',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
      });
    }
  );
}

/**
 * Main demo function that creates all examples.
 * Call this to see all DOM extension features in action.
 *
 * @returns {void}
 *
 * @example
 * // Run all demos when page loads
 * if (document.readyState === 'loading') {
 *   document.addEventListener('DOMContentLoaded', runAllDemos);
 * } else {
 *   runAllDemos();
 * }
 */
export function runAllDemos(): void {
  // Create a container for all demos
  const demoContainer = document.body.createDiv({
    cls: 'demo-container',
  });

  demoContainer.setCssStyles({
    maxWidth: '1200px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#f9f9f9',
  });

  // Add title
  demoContainer.createEl('h1', { text: 'DOM Extensions Demo' }).setCssStyles({
    marginTop: '0',
    marginBottom: '2rem',
    textAlign: 'center',
  });

  // Create a grid for examples
  const grid = demoContainer.createDiv({ cls: 'demo-grid' });
  grid.setCssStyles({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  });

  // Add all examples
  grid.appendChild(createCardExample());
  grid.appendChild(createThemedComponentExample());
  grid.appendChild(createStatusIndicatorExample());
  grid.appendChild(createFormExample());

  // Add icon example separately
  const iconSection = demoContainer.createDiv({ cls: 'icon-section' });
  iconSection.setCssStyles({
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '8px',
  });

  iconSection.createEl('h2', { text: 'SVG Icon Example' });
  const iconContainer = iconSection.createDiv();
  iconContainer.setCssStyles({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  });

  iconContainer.appendChild(createIconExample());
  iconContainer.createSpan({ text: 'Checkmark icon created with createSvg' });
}
