// Main application logic
class App {
  private clickCount: number = 0;
  private button: HTMLElement | null = null;
  private counter: HTMLElement | null = null;

  constructor() {
    this.init();
  }

  private init(): void {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  private setup(): void {
    this.button = document.getElementById('clickButton');
    this.counter = document.getElementById('counter');

    if (this.button) {
      this.button.addEventListener('click', () => this.handleClick());
    }

    this.logEnvironment();
  }

  private handleClick(): void {
    this.clickCount++;
    this.updateCounter();
    this.animateButton();
  }

  private updateCounter(): void {
    if (this.counter) {
      this.counter.textContent = `Clicks: ${this.clickCount}`;
    }
  }

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
