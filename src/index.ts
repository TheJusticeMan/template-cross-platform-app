/**
 * @class App
 * Main application class managing UI state, event handlers, and cross-platform environment detection.
 * Implements a simple click counter with visual feedback, demonstrating vanilla TypeScript patterns.
 * 
 * @example
 * // Application auto-initializes on script load
 * new App();
 * // User clicks button → counter increments → animation plays
 * 
 * @remarks
 * - Accessibility: Uses native button elements (keyboard-accessible by default), clear labels, semantic HTML.
 * - Ethics: Transparent state management—no hidden tracking, no manipulation. User sees what they get.
 * - Edge Cases: Handles missing DOM elements gracefully (null checks), waits for DOM ready before setup.
 * - Performance: Animation uses GPU-accelerated transform, <1ms execution. Hot reload in dev: <1ms change detection.
 * - Thematic Tie: Like Polaroid truth—captures immutable state (click count) with clear, immediate feedback. No deepfake UI.
 * - Version: 1.0.0
 * - Author: Justice Vellacott
 */
class App {
  private clickCount: number = 0;
  private button: HTMLElement | null = null;
  private counter: HTMLElement | null = null;

  /**
   * Constructs App instance and initializes application.
   * Automatically calls init() to set up event listeners and DOM references.
   */
  constructor() {
    this.init();
  }

  /**
   * Initializes the application by waiting for DOM ready, then calling setup.
   * Handles both pre-loaded and loading states to ensure DOM availability.
   * 
   * @returns {void}
   * 
   * @remarks
   * - Like patience before truth—waits for foundation (DOM) before building.
   */
  private init(): void {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  /**
   * Sets up DOM references and event listeners after DOM is ready.
   * Grabs button and counter elements, attaches click handler, logs environment.
   * 
   * @returns {void}
   * 
   * @remarks
   * - Accessibility: Native button element ensures keyboard navigation (Tab, Enter/Space).
   * - Edge Cases: Null checks prevent errors if DOM structure changes.
   */
  private setup(): void {
    this.button = document.getElementById('clickButton');
    this.counter = document.getElementById('counter');

    if (this.button) {
      this.button.addEventListener('click', () => this.handleClick());
    }

    this.logEnvironment();
  }

  /**
   * Handles button click events by incrementing counter, updating display, and triggering animation.
   * Pure cause-effect—no side effects beyond intended UI updates.
   * 
   * @returns {void}
   * 
   * @remarks
   * - Thematic Tie: Like Hack by Will—context-aware action (click → state change → visual response).
   */
  private handleClick(): void {
    this.clickCount++;
    this.updateCounter();
    this.animateButton();
  }

  /**
   * Updates the counter display with current click count.
   * Safely handles missing counter element (no-op if null).
   * 
   * @returns {void}
   * 
   * @remarks
   * - Pure display logic—state to view, no hidden mutations.
   */
  private updateCounter(): void {
    if (this.counter) {
      this.counter.textContent = `Clicks: ${this.clickCount}`;
    }
  }

  /**
   * Animates button with scale-down effect for tactile feedback.
   * Scales to 0.95 for 100ms, then resets. Uses GPU-accelerated transform for performance.
   * 
   * @returns {void}
   * 
   * @remarks
   * - Performance: Transform is GPU-accelerated (no layout thrashing), <1ms execution.
   * - Accessibility: Visual feedback complements click, doesn't replace semantic button role.
   */
  private animateButton(): void {
    if (this.button) {
      this.button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        if (this.button) {
          this.button.style.transform = '';
        }
      }, 100);
    }
  }

  /**
   * Detects and logs the runtime environment (browser, Electron, or Capacitor).
   * Uses user-agent and global object detection for cross-platform awareness.
   * 
   * @returns {void}
   * 
   * @remarks
   * - Ethics: Transparent logging—no hidden tracking, just environment awareness for debugging.
   * - Cross-Platform: Works in web (Chrome/Firefox/Safari), Electron desktop, Capacitor mobile.
   * - Thematic Tie: Like identity detection after Amnesia—know your context to adapt properly.
   */
  private logEnvironment(): void {
    console.log('Application started!');
    console.log('User Agent:', navigator.userAgent);
    
    // Detect environment
    const isElectron = navigator.userAgent.toLowerCase().includes('electron');
    const isCapacitor = !!(window as Window & { Capacitor?: unknown }).Capacitor;
    
    if (isElectron) {
      console.log('Running in Electron');
    } else if (isCapacitor) {
      console.log('Running in Capacitor');
    } else {
      console.log('Running in Browser');
    }
  }
}

// Initialize the application
new App();
