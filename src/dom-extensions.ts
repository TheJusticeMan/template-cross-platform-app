/**
 * @fileoverview Comprehensive DOM utility extensions inspired by Obsidian API.
 * Extends native DOM prototypes, constructors, and globals with convenience methods.
 * Provides type-safe, chainable API for element creation, manipulation, styling, and events.
 *
 * @remarks
 * - Accessibility: All methods support semantic HTML and ARIA attributes.
 * - Ethics: Transparent extensions that augment (not replace) standard APIs.
 * - Performance: Direct prototype extensions avoid wrapper overhead (<1ms operations).
 * - Edge Cases: Comprehensive null checks and defensive programming.
 * - Version: 2.0.0 (Comprehensive Obsidian API)
 * - Author: Justice Vellacott
 */

/**
 * Options for creating DOM elements with createEl and related methods.
 *
 * @interface DomElementInfo
 */
interface DomElementInfo {
  /** CSS class(es) to add. Can be space-separated string or array. */
  cls?: string | string[];
  /** Text content to set on the element. */
  text?: string | DocumentFragment;
  /** HTML attributes to set as key-value pairs. */
  attr?: { [key: string]: string | number | boolean | null };
  /** Title attribute (hover tooltip). */
  title?: string;
  /** Parent element to append this element to. */
  parent?: Node;
  /** Initial value (for input/textarea elements). */
  value?: string;
  /** Input type (for input elements). */
  type?: string;
  /** Whether to prepend instead of append. */
  prepend?: boolean;
  /** Placeholder text (for input elements). */
  placeholder?: string;
  /** href attribute (for anchor elements). */
  href?: string;
}

/**
 * Options for creating SVG elements.
 *
 * @interface SvgElementInfo
 */
interface SvgElementInfo {
  /** CSS class(es) to add. Can be space-separated string or array. */
  cls?: string | string[];
  /** HTML attributes to set as key-value pairs. */
  attr?: { [key: string]: string | number | boolean | null };
  /** Parent element to append this element to. */
  parent?: Node;
  /** Whether to prepend instead of append. */
  prepend?: boolean;
}

/**
 * Event listener information for delegated events.
 *
 * @interface EventListenerInfo
 */
interface EventListenerInfo {
  selector: string;
  listener: (this: unknown, ev: Event, delegateTarget: HTMLElement) => unknown;
  options?: boolean | AddEventListenerOptions;
  callback: EventListener;
}

/**
 * Options for AJAX requests.
 *
 * @interface AjaxOptions
 */
interface AjaxOptions {
  method?: 'GET' | 'POST';
  url: string;
  success?: (response: unknown, req: XMLHttpRequest) => unknown;
  error?: (error: unknown, req: XMLHttpRequest) => unknown;
  data?: object | string | ArrayBuffer;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  req?: XMLHttpRequest;
}

// ============================================================================
// Global Type Declarations
// ============================================================================

declare global {
  // Object extensions
  interface ObjectConstructor {
    isEmpty(object: Record<string, unknown>): boolean;
    each<T>(
      object: { [key: string]: T },
      callback: (value: T, key?: string) => boolean | void,
      context?: unknown
    ): boolean;
  }

  // Array Constructor extensions
  interface ArrayConstructor {
    combine<T>(arrays: T[][]): T[];
  }

  // Array prototype extensions
  interface Array<T> {
    first(): T | undefined;
    last(): T | undefined;
    contains(target: T): boolean;
    remove(target: T): void;
    shuffle(): this;
    unique(): T[];
    findLastIndex(predicate: (value: T) => boolean): number;
  }

  // Math extensions
  interface Math {
    clamp(value: number, min: number, max: number): number;
    square(value: number): number;
  }

  // String Constructor extensions
  interface StringConstructor {
    isString(obj: unknown): obj is string;
  }

  // String prototype extensions
  interface String {
    contains(target: string): boolean;
    startsWith(searchString: string, position?: number): boolean;
    endsWith(target: string, length?: number): boolean;
    format(...args: string[]): string;
  }

  // Number Constructor extensions
  interface NumberConstructor {
    isNumber(obj: unknown): obj is number;
  }

  // Node extensions
  interface Node {
    detach(): void;
    empty(): void;
    insertAfter<T extends Node>(node: T, child: Node | null): T;
    indexOf(other: Node): number;
    setChildrenInPlace(children: Node[]): void;
    appendText(val: string): void;
    instanceOf<T>(type: { new (): T }): this is T;
    doc: Document;
    win: Window;
    constructorWin: Window;

    // Element creation methods
    createEl<K extends keyof HTMLElementTagNameMap>(
      tag: K,
      o?: DomElementInfo | string,
      callback?: (el: HTMLElementTagNameMap[K]) => void
    ): HTMLElementTagNameMap[K];
    createDiv(o?: DomElementInfo | string, callback?: (el: HTMLDivElement) => void): HTMLDivElement;
    createSpan(
      o?: DomElementInfo | string,
      callback?: (el: HTMLSpanElement) => void
    ): HTMLSpanElement;
    createSvg<K extends keyof SVGElementTagNameMap>(
      tag: K,
      o?: SvgElementInfo | string,
      callback?: (el: SVGElementTagNameMap[K]) => void
    ): SVGElementTagNameMap[K];
  }

  // Element extensions
  interface Element extends Node {
    getText(): string;
    setText(val: string | DocumentFragment): void;
    addClass(...classes: string[]): void;
    addClasses(classes: string[]): void;
    removeClass(...classes: string[]): void;
    removeClasses(classes: string[]): void;
    toggleClass(classes: string | string[], value: boolean): void;
    hasClass(cls: string): boolean;
    setAttr(qualifiedName: string, value: string | number | boolean | null): void;
    setAttrs(obj: { [key: string]: string | number | boolean | null }): void;
    getAttr(qualifiedName: string): string | null;
    matchParent(selector: string, lastParent?: Element): Element | null;
    getCssPropertyValue(property: string, pseudoElement?: string): string;
    isActiveElement(): boolean;

    // Selector methods
    find(selector: string): Element | null;
    findAll(selector: string): HTMLElement[];
    findAllSelf(selector: string): HTMLElement[];
  }

  // HTMLElement extensions
  interface HTMLElement extends Element {
    show(): void;
    hide(): void;
    toggle(show: boolean): void;
    toggleVisibility(visible: boolean): void;
    isShown(): boolean;
    setCssStyles(styles: Partial<CSSStyleDeclaration>): void;
    setCssProps(props: Record<string, string>): void;
    readonly innerWidth: number;
    readonly innerHeight: number;

    // Override selector methods with HTMLElement return types
    find(selector: string): HTMLElement;
    findAll(selector: string): HTMLElement[];
    findAllSelf(selector: string): HTMLElement[];

    // Event delegation
    _EVENTS?: { [K in keyof HTMLElementEventMap]?: EventListenerInfo[] };
    on<K extends keyof HTMLElementEventMap>(
      this: HTMLElement,
      type: K,
      selector: string,
      listener: (this: HTMLElement, ev: HTMLElementEventMap[K], delegateTarget: HTMLElement) => any,
      options?: boolean | AddEventListenerOptions
    ): void;
    off<K extends keyof HTMLElementEventMap>(
      this: HTMLElement,
      type: K,
      selector: string,
      listener: (this: HTMLElement, ev: HTMLElementEventMap[K], delegateTarget: HTMLElement) => any,
      options?: boolean | AddEventListenerOptions
    ): void;
    onClickEvent(
      this: HTMLElement,
      listener: (this: HTMLElement, ev: MouseEvent) => any,
      options?: boolean | AddEventListenerOptions
    ): void;
    onNodeInserted(this: HTMLElement, listener: () => any, once?: boolean): () => void;
    onWindowMigrated(this: HTMLElement, listener: (win: Window) => any): () => void;
    trigger(eventType: string): void;
  }

  // SVGElement extensions
  interface SVGElement extends Element {
    setCssStyles(styles: Partial<CSSStyleDeclaration>): void;
    setCssProps(props: Record<string, string>): void;
  }

  // DocumentFragment extensions
  interface DocumentFragment extends Node, NonElementParentNode, ParentNode {
    find(selector: string): HTMLElement;
    findAll(selector: string): HTMLElement[];
  }

  // Document extensions
  interface Document {
    _EVENTS?: { [K in keyof DocumentEventMap]?: EventListenerInfo[] };
    on<K extends keyof DocumentEventMap>(
      this: Document,
      type: K,
      selector: string,
      listener: (this: Document, ev: DocumentEventMap[K], delegateTarget: HTMLElement) => any,
      options?: boolean | AddEventListenerOptions
    ): void;
    off<K extends keyof DocumentEventMap>(
      this: Document,
      type: K,
      selector: string,
      listener: (this: Document, ev: DocumentEventMap[K], delegateTarget: HTMLElement) => any,
      options?: boolean | AddEventListenerOptions
    ): void;
  }

  // UIEvent extensions
  interface UIEvent extends Event {
    targetNode: Node | null;
    win: Window;
    doc: Document;
    instanceOf<T>(type: { new (...data: unknown[]): T }): this is T;
  }

  // Touch extensions
  interface Touch {
    touchType: 'stylus' | 'direct';
  }

  // Window extensions
  interface Window {
    activeWindow: Window;
    activeDocument: Document;
    sleep(ms: number): Promise<void>;
    nextFrame(): Promise<void>;
  }

  // Global functions
  function isBoolean(obj: unknown): obj is boolean;
  function fish(selector: string): HTMLElement | null;
  function fishAll(selector: string): HTMLElement[];
  function createEl<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    o?: DomElementInfo | string,
    callback?: (el: HTMLElementTagNameMap[K]) => void
  ): HTMLElementTagNameMap[K];
  function createDiv(
    o?: DomElementInfo | string,
    callback?: (el: HTMLDivElement) => void
  ): HTMLDivElement;
  function createSpan(
    o?: DomElementInfo | string,
    callback?: (el: HTMLSpanElement) => void
  ): HTMLSpanElement;
  function createSvg<K extends keyof SVGElementTagNameMap>(
    tag: K,
    o?: SvgElementInfo | string,
    callback?: (el: SVGElementTagNameMap[K]) => void
  ): SVGElementTagNameMap[K];
  function createFragment(callback?: (el: DocumentFragment) => void): DocumentFragment;
  function ajax(options: AjaxOptions): void;
  function ajaxPromise(options: AjaxOptions): Promise<unknown>;
  function ready(fn: () => unknown): void;
  function sleep(ms: number): Promise<void>;
  function nextFrame(): Promise<void>;

  let activeWindow: Window;
  let activeDocument: Document;
}

// ============================================================================
// Object Extensions
// ============================================================================

/**
 * Check if an object is empty (has no own properties).
 *
 * @param {Record<string, unknown>} object - Object to check
 * @returns {boolean} True if object has no own properties
 */
Object.isEmpty = function (object: Record<string, unknown>): boolean {
  return Object.keys(object).length === 0;
};

/**
 * Iterate over object properties with callback.
 *
 * @param {Object} object - Object to iterate
 * @param {Function} callback - Called for each property (value, key)
 * @param {unknown} context - Optional this context for callback
 * @returns {boolean} False if callback returned false, true otherwise
 */
Object.each = function <T>(
  object: { [key: string]: T },
  callback: (value: T, key?: string) => boolean | void,
  context?: unknown
): boolean {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const result = callback.call(context, object[key], key);
      if (result === false) return false;
    }
  }
  return true;
};

// ============================================================================
// Array Extensions
// ============================================================================

/**
 * Combine multiple arrays into one.
 *
 * @param {T[][]} arrays - Arrays to combine
 * @returns {T[]} Combined array
 */
Array.combine = function <T>(arrays: T[][]): T[] {
  return ([] as T[]).concat(...arrays);
};

/**
 * Get the first element of the array.
 *
 * @returns {T | undefined} First element or undefined
 */
Array.prototype.first = function <T>(this: T[]): T | undefined {
  return this[0];
};

/**
 * Get the last element of the array.
 *
 * @returns {T | undefined} Last element or undefined
 */
Array.prototype.last = function <T>(this: T[]): T | undefined {
  return this[this.length - 1];
};

/**
 * Check if array contains a value.
 *
 * @param {T} target - Value to search for
 * @returns {boolean} True if value is in array
 */
Array.prototype.contains = function <T>(this: T[], target: T): boolean {
  return this.indexOf(target) !== -1;
};

/**
 * Remove a value from the array (mutates array).
 *
 * @param {T} target - Value to remove
 */
Array.prototype.remove = function <T>(this: T[], target: T): void {
  const index = this.indexOf(target);
  if (index !== -1) {
    this.splice(index, 1);
  }
};

/**
 * Shuffle array in place (Fisher-Yates algorithm).
 *
 * @returns {this} The shuffled array
 */
Array.prototype.shuffle = function <T>(this: T[]): T[] {
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this[i], this[j]] = [this[j], this[i]];
  }
  return this;
};

/**
 * Get array with unique values (preserves order).
 *
 * @returns {T[]} Array with duplicates removed
 */
Array.prototype.unique = function <T>(this: T[]): T[] {
  return Array.from(new Set(this));
};

/**
 * Find last index matching predicate.
 *
 * @param {Function} predicate - Function to test each element
 * @returns {number} Last matching index or -1
 */
Array.prototype.findLastIndex = function <T>(this: T[], predicate: (value: T) => boolean): number {
  for (let i = this.length - 1; i >= 0; i--) {
    if (predicate(this[i])) {
      return i;
    }
  }
  return -1;
};

// ============================================================================
// Math Extensions
// ============================================================================

/**
 * Clamp a value between min and max.
 *
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
Math.clamp = function (value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
};

/**
 * Square a number.
 *
 * @param {number} value - Value to square
 * @returns {number} Value squared
 */
Math.square = function (value: number): number {
  return value * value;
};

// ============================================================================
// String Extensions
// ============================================================================

/**
 * Type guard to check if value is a string.
 *
 * @param {unknown} obj - Value to check
 * @returns {boolean} True if value is a string
 */
String.isString = function (obj: unknown): obj is string {
  return typeof obj === 'string';
};

/**
 * Check if string contains a substring.
 *
 * @param {string} target - Substring to search for
 * @returns {boolean} True if substring is found
 */
String.prototype.contains = function (target: string): boolean {
  return this.indexOf(target) !== -1;
};

/**
 * Format string with arguments (replaces {0}, {1}, etc.).
 *
 * @param {...string} args - Values to substitute
 * @returns {string} Formatted string
 */
String.prototype.format = function (...args: string[]): string {
  const self = String(this);
  let result = self;
  for (let i = 0; i < args.length; i++) {
    result = result.replace(new RegExp(`\\{${i}\\}`, 'g'), args[i]);
  }
  return result;
};

// ============================================================================
// Number Extensions
// ============================================================================

/**
 * Type guard to check if value is a number.
 *
 * @param {unknown} obj - Value to check
 * @returns {boolean} True if value is a number
 */
Number.isNumber = function (obj: unknown): obj is number {
  return typeof obj === 'number' && !isNaN(obj);
};

// ============================================================================
// Global Helper Functions
// ============================================================================

/**
 * Type guard to check if value is a boolean.
 *
 * @param {unknown} obj - Value to check
 * @returns {boolean} True if value is a boolean
 */
(window as unknown as Record<string, unknown>).isBoolean = function (obj: unknown): obj is boolean {
  return typeof obj === 'boolean';
};

/**
 * Short alias for document.querySelector.
 *
 * @param {string} selector - CSS selector
 * @returns {HTMLElement | null} First matching element or null
 */
(window as any).fish = function (selector: string): HTMLElement | null {
  return document.querySelector(selector);
};

/**
 * Short alias for document.querySelectorAll.
 *
 * @param {string} selector - CSS selector
 * @returns {HTMLElement[]} Array of matching elements
 */
(window as any).fishAll = function (selector: string): HTMLElement[] {
  return Array.from(document.querySelectorAll(selector));
};

/**
 * Active window reference (updated when using popout windows).
 */
(window as any).activeWindow = window;

/**
 * Active document reference (updated when using popout windows).
 */
(window as any).activeDocument = document;

/**
 * Create an element without parent (global function).
 *
 * @param {string} tag - Element tag name
 * @param {DomElementInfo | string} o - Options or class name
 * @param {Function} callback - Optional setup callback
 * @returns {HTMLElement} Created element
 */
(window as unknown as Record<string, unknown>).createEl = function <
  K extends keyof HTMLElementTagNameMap,
>(
  tag: K,
  o?: DomElementInfo | string,
  callback?: (el: HTMLElementTagNameMap[K]) => void
): HTMLElementTagNameMap[K] {
  const tempDiv = document.createElement('div');
  return tempDiv.createEl(tag, o, callback);
};

/**
 * Create a div element without parent (global function).
 *
 * @param {DomElementInfo | string} o - Options or class name
 * @param {Function} callback - Optional setup callback
 * @returns {HTMLDivElement} Created div element
 */
(window as unknown as Record<string, unknown>).createDiv = function (
  o?: DomElementInfo | string,
  callback?: (el: HTMLDivElement) => void
): HTMLDivElement {
  return (
    (window as unknown as Record<string, unknown>).createEl as (
      tag: string,
      o?: DomElementInfo | string,
      callback?: (el: HTMLDivElement) => void
    ) => HTMLDivElement
  )('div', o, callback);
};

/**
 * Create a span element without parent (global function).
 *
 * @param {DomElementInfo | string} o - Options or class name
 * @param {Function} callback - Optional setup callback
 * @returns {HTMLSpanElement} Created span element
 */
(window as unknown as Record<string, unknown>).createSpan = function (
  o?: DomElementInfo | string,
  callback?: (el: HTMLSpanElement) => void
): HTMLSpanElement {
  return (
    (window as unknown as Record<string, unknown>).createEl as (
      tag: string,
      o?: DomElementInfo | string,
      callback?: (el: HTMLSpanElement) => void
    ) => HTMLSpanElement
  )('span', o, callback);
};

/**
 * Create an SVG element without parent (global function).
 *
 * @param {string} tag - SVG element tag name
 * @param {SvgElementInfo | string} o - Options or class name
 * @param {Function} callback - Optional setup callback
 * @returns {SVGElement} Created SVG element
 */
(window as unknown as Record<string, unknown>).createSvg = function <
  K extends keyof SVGElementTagNameMap,
>(
  tag: K,
  o?: SvgElementInfo | string,
  callback?: (el: SVGElementTagNameMap[K]) => void
): SVGElementTagNameMap[K] {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  if (o) {
    if (typeof o === 'string') {
      el.classList.add(o);
    } else {
      if (o.cls) {
        const classes = Array.isArray(o.cls) ? o.cls : o.cls.split(' ');
        el.classList.add(...classes);
      }
      if (o.attr) {
        for (const key in o.attr) {
          const value = o.attr[key];
          if (value !== null && value !== undefined) {
            el.setAttribute(key, String(value));
          }
        }
      }
      if (o.parent) {
        if (o.prepend && 'prepend' in o.parent) {
          (o.parent as Element).prepend(el);
        } else {
          o.parent.appendChild(el);
        }
      }
    }
  }
  if (callback) callback(el);
  return el;
};

/**
 * Create a document fragment with optional callback.
 *
 * @param {Function} callback - Optional setup callback
 * @returns {DocumentFragment} Created fragment
 */
(window as any).createFragment = function (
  callback?: (el: DocumentFragment) => void
): DocumentFragment {
  const fragment = document.createDocumentFragment();
  if (callback) callback(fragment);
  return fragment;
};

/**
 * Execute callback when DOM is ready.
 *
 * @param {Function} fn - Callback to execute
 */
(window as any).ready = function (fn: () => any): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    fn();
  }
};

/**
 * Sleep for specified milliseconds.
 *
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>} Promise that resolves after sleep
 */
(window as any).sleep = function (ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Wait for next animation frame.
 *
 * @returns {Promise<void>} Promise that resolves on next frame
 */
(window as any).nextFrame = function (): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
};

// Add sleep and nextFrame to Window prototype
Window.prototype.sleep = function (ms: number): Promise<void> {
  return (window as any).sleep(ms);
};

Window.prototype.nextFrame = function (): Promise<void> {
  return (window as any).nextFrame();
};

Object.defineProperty(Window.prototype, 'activeWindow', {
  get() {
    return (window as any).activeWindow;
  },
});

Object.defineProperty(Window.prototype, 'activeDocument', {
  get() {
    return (window as any).activeDocument;
  },
});

/**
 * Make an AJAX request (callback-based).
 *
 * @param {AjaxOptions} options - Request options
 */
(window as any).ajax = function (options: AjaxOptions): void {
  const req = options.req || new XMLHttpRequest();
  req.open(options.method || 'GET', options.url, true);

  if (options.headers) {
    for (const key in options.headers) {
      req.setRequestHeader(key, options.headers[key]);
    }
  }

  if (options.withCredentials) {
    req.withCredentials = true;
  }

  req.onload = function () {
    if (req.status >= 200 && req.status < 300) {
      if (options.success) {
        try {
          const response = JSON.parse(req.responseText);
          options.success(response, req);
        } catch {
          options.success(req.responseText, req);
        }
      }
    } else {
      if (options.error) {
        options.error(new Error(`HTTP ${req.status}`), req);
      }
    }
  };

  req.onerror = function () {
    if (options.error) {
      options.error(new Error('Network error'), req);
    }
  };

  req.send(options.data as any);
};

/**
 * Make an AJAX request (Promise-based).
 *
 * @param {AjaxOptions} options - Request options
 * @returns {Promise<any>} Promise resolving to response
 */
(window as any).ajaxPromise = function (options: AjaxOptions): Promise<any> {
  return new Promise((resolve, reject) => {
    (window as any).ajax({
      ...options,
      success: (response: any) => resolve(response),
      error: (error: any) => reject(error),
    });
  });
};

// ============================================================================
// Node Extensions
// ============================================================================

/**
 * Remove this node from its parent.
 */
Node.prototype.detach = function (): void {
  if (this.parentNode) {
    this.parentNode.removeChild(this);
  }
};

/**
 * Remove all child nodes.
 */
Node.prototype.empty = function (): void {
  while (this.firstChild) {
    this.removeChild(this.firstChild);
  }
};

/**
 * Insert a node after a reference child.
 *
 * @param {Node} node - Node to insert
 * @param {Node | null} child - Reference child (null = append at end)
 * @returns {Node} The inserted node
 */
Node.prototype.insertAfter = function <T extends Node>(node: T, child: Node | null): T {
  if (child && child.nextSibling) {
    this.insertBefore(node, child.nextSibling);
  } else {
    this.appendChild(node);
  }
  return node;
};

/**
 * Get the index of a child node.
 *
 * @param {Node} other - Child node to find
 * @returns {number} Index of child or -1
 */
Node.prototype.indexOf = function (other: Node): number {
  const children = Array.from(this.childNodes);
  for (let i = 0; i < children.length; i++) {
    if (children[i] === other) return i;
  }
  return -1;
};

/**
 * Replace all children with new array of nodes.
 *
 * @param {Node[]} children - New children
 */
Node.prototype.setChildrenInPlace = function (children: Node[]): void {
  this.empty();
  children.forEach((child) => this.appendChild(child));
};

/**
 * Append a text node with the given content.
 *
 * @param {string} val - Text content
 */
Node.prototype.appendText = function (val: string): void {
  this.appendChild(document.createTextNode(val));
};

/**
 * Cross-window instanceof check for nodes.
 *
 * @param {Function} type - Constructor to check against
 * @returns {boolean} True if node is instance of type
 */
Node.prototype.instanceOf = function <T>(type: { new (): T }): this is T {
  return this.constructor.name === type.name;
};

/**
 * Get the document this node belongs to.
 */
Object.defineProperty(Node.prototype, 'doc', {
  get() {
    return this.ownerDocument || document;
  },
});

/**
 * Get the window this node belongs to.
 */
Object.defineProperty(Node.prototype, 'win', {
  get() {
    return (this.ownerDocument?.defaultView as Window) || window;
  },
});

/**
 * Get the constructor window for this node.
 */
Object.defineProperty(Node.prototype, 'constructorWin', {
  get() {
    return (this.ownerDocument?.defaultView as Window) || window;
  },
});

/**
 * Create an HTML element as a child of this node.
 *
 * @param {string} tag - Element tag name
 * @param {DomElementInfo | string} o - Options or class name
 * @param {Function} callback - Optional setup callback
 * @returns {HTMLElement} Created element
 */
Node.prototype.createEl = function <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  o?: DomElementInfo | string,
  callback?: (el: HTMLElementTagNameMap[K]) => void
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);

  // Handle string shorthand for class
  if (typeof o === 'string') {
    el.className = o;
  } else if (o) {
    // Handle class
    if (o.cls) {
      if (Array.isArray(o.cls)) {
        el.classList.add(...o.cls);
      } else {
        el.className = o.cls;
      }
    }

    // Handle text
    if (o.text !== undefined) {
      if (typeof o.text === 'string') {
        el.textContent = o.text;
      } else {
        el.appendChild(o.text);
      }
    }

    // Handle attributes
    if (o.attr) {
      for (const key in o.attr) {
        const value = o.attr[key];
        if (value !== null && value !== undefined) {
          el.setAttribute(key, String(value));
        }
      }
    }

    // Handle specific attributes
    if (o.title) el.setAttribute('title', o.title);
    if (o.placeholder) el.setAttribute('placeholder', o.placeholder);
    if (o.type) el.setAttribute('type', o.type);
    if (o.value) (el as any).value = o.value;
    if (o.href) el.setAttribute('href', o.href);
  }

  // Append to parent (this node or specified parent)
  const parent = (o as DomElementInfo)?.parent || this;
  if ((o as DomElementInfo)?.prepend && 'prepend' in parent) {
    (parent as Element).prepend(el);
  } else {
    parent.appendChild(el);
  }

  // Execute callback
  if (callback) callback(el);

  return el;
};

/**
 * Create a div element as a child of this node.
 *
 * @param {DomElementInfo | string} o - Options or class name
 * @param {Function} callback - Optional setup callback
 * @returns {HTMLDivElement} Created div element
 */
Node.prototype.createDiv = function (
  o?: DomElementInfo | string,
  callback?: (el: HTMLDivElement) => void
): HTMLDivElement {
  return this.createEl('div', o, callback);
};

/**
 * Create a span element as a child of this node.
 *
 * @param {DomElementInfo | string} o - Options or class name
 * @param {Function} callback - Optional setup callback
 * @returns {HTMLSpanElement} Created span element
 */
Node.prototype.createSpan = function (
  o?: DomElementInfo | string,
  callback?: (el: HTMLSpanElement) => void
): HTMLSpanElement {
  return this.createEl('span', o, callback);
};

/**
 * Create an SVG element as a child of this node.
 *
 * @param {string} tag - SVG element tag name
 * @param {SvgElementInfo | string} o - Options or class name
 * @param {Function} callback - Optional setup callback
 * @returns {SVGElement} Created SVG element
 */
Node.prototype.createSvg = function <K extends keyof SVGElementTagNameMap>(
  tag: K,
  o?: SvgElementInfo | string,
  callback?: (el: SVGElementTagNameMap[K]) => void
): SVGElementTagNameMap[K] {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);

  if (typeof o === 'string') {
    el.classList.add(o);
  } else if (o) {
    if (o.cls) {
      const classes = Array.isArray(o.cls) ? o.cls : o.cls.split(' ');
      el.classList.add(...classes);
    }
    if (o.attr) {
      for (const key in o.attr) {
        const value = o.attr[key];
        if (value !== null && value !== undefined) {
          el.setAttribute(key, String(value));
        }
      }
    }
  }

  const parent = (o as SvgElementInfo)?.parent || this;
  if ((o as SvgElementInfo)?.prepend && 'prepend' in parent) {
    (parent as Element).prepend(el);
  } else {
    parent.appendChild(el);
  }

  if (callback) callback(el);
  return el;
};

// ============================================================================
// Element Extensions
// ============================================================================

/**
 * Get the text content of an element.
 *
 * @returns {string} Text content
 */
Element.prototype.getText = function (): string {
  return this.textContent || '';
};

/**
 * Set the text content of an element.
 *
 * @param {string | DocumentFragment} val - Text or fragment to set
 */
Element.prototype.setText = function (val: string | DocumentFragment): void {
  if (typeof val === 'string') {
    this.textContent = val;
  } else {
    this.empty();
    this.appendChild(val);
  }
};

/**
 * Add one or more CSS classes.
 *
 * @param {...string} classes - Classes to add
 */
Element.prototype.addClass = function (...classes: string[]): void {
  this.classList.add(...classes);
};

/**
 * Add CSS classes from array.
 *
 * @param {string[]} classes - Classes to add
 */
Element.prototype.addClasses = function (classes: string[]): void {
  this.classList.add(...classes);
};

/**
 * Remove one or more CSS classes.
 *
 * @param {...string} classes - Classes to remove
 */
Element.prototype.removeClass = function (...classes: string[]): void {
  this.classList.remove(...classes);
};

/**
 * Remove CSS classes from array.
 *
 * @param {string[]} classes - Classes to remove
 */
Element.prototype.removeClasses = function (classes: string[]): void {
  this.classList.remove(...classes);
};

/**
 * Toggle CSS classes.
 *
 * @param {string | string[]} classes - Classes to toggle
 * @param {boolean} value - Force add (true) or remove (false)
 */
Element.prototype.toggleClass = function (classes: string | string[], value: boolean): void {
  const classList = Array.isArray(classes) ? classes : classes.split(' ');
  classList.forEach((cls) => this.classList.toggle(cls, value));
};

/**
 * Check if element has a CSS class.
 *
 * @param {string} cls - Class to check
 * @returns {boolean} True if class exists
 */
Element.prototype.hasClass = function (cls: string): boolean {
  return this.classList.contains(cls);
};

/**
 * Set an HTML attribute.
 *
 * @param {string} qualifiedName - Attribute name
 * @param {string | number | boolean | null} value - Attribute value
 */
Element.prototype.setAttr = function (
  qualifiedName: string,
  value: string | number | boolean | null
): void {
  if (value === null) {
    this.removeAttribute(qualifiedName);
  } else {
    this.setAttribute(qualifiedName, String(value));
  }
};

/**
 * Set multiple HTML attributes.
 *
 * @param {Object} obj - Object with attribute key-value pairs
 */
Element.prototype.setAttrs = function (obj: {
  [key: string]: string | number | boolean | null;
}): void {
  for (const key in obj) {
    this.setAttr(key, obj[key]);
  }
};

/**
 * Get an HTML attribute value.
 *
 * @param {string} qualifiedName - Attribute name
 * @returns {string | null} Attribute value or null
 */
Element.prototype.getAttr = function (qualifiedName: string): string | null {
  return this.getAttribute(qualifiedName);
};

/**
 * Find closest ancestor matching selector.
 *
 * @param {string} selector - CSS selector
 * @param {Element} lastParent - Stop searching at this parent
 * @returns {Element | null} Matching ancestor or null
 */
Element.prototype.matchParent = function (selector: string, lastParent?: Element): Element | null {
  let el: Element | null = this.parentElement;
  while (el) {
    if (el.matches(selector)) return el;
    if (el === lastParent) break;
    el = el.parentElement;
  }
  return null;
};

/**
 * Get computed CSS property value.
 *
 * @param {string} property - CSS property name
 * @param {string} pseudoElement - Optional pseudo-element
 * @returns {string} Property value
 */
Element.prototype.getCssPropertyValue = function (
  property: string,
  pseudoElement?: string
): string {
  return window.getComputedStyle(this, pseudoElement).getPropertyValue(property);
};

/**
 * Check if this element is the active (focused) element.
 *
 * @returns {boolean} True if element has focus
 */
Element.prototype.isActiveElement = function (): boolean {
  return document.activeElement === this;
};

/**
 * Find first descendant matching selector.
 *
 * @param {string} selector - CSS selector
 * @returns {HTMLElement | null} First matching element or null
 */
Element.prototype.find = function (selector: string): HTMLElement | null {
  return this.querySelector(selector);
};

/**
 * Find all descendants matching selector.
 *
 * @param {string} selector - CSS selector
 * @returns {HTMLElement[]} Array of matching elements
 */
Element.prototype.findAll = function (selector: string): HTMLElement[] {
  return Array.from(this.querySelectorAll(selector));
};

/**
 * Find all descendants matching selector, including this element.
 *
 * @param {string} selector - CSS selector
 * @returns {HTMLElement[]} Array of matching elements
 */
Element.prototype.findAllSelf = function (selector: string): HTMLElement[] {
  const results: HTMLElement[] = [];
  if (this.matches(selector)) {
    results.push(this as HTMLElement);
  }
  results.push(...this.findAll(selector));
  return results;
};

// ============================================================================
// HTMLElement Extensions
// ============================================================================

/**
 * Show element by removing 'display: none' style.
 */
HTMLElement.prototype.show = function (): void {
  this.style.display = '';
};

/**
 * Hide element by setting 'display: none'.
 */
HTMLElement.prototype.hide = function (): void {
  this.style.display = 'none';
};

/**
 * Toggle element visibility.
 *
 * @param {boolean} show - True to show, false to hide
 */
HTMLElement.prototype.toggle = function (show: boolean): void {
  if (show) {
    this.show();
  } else {
    this.hide();
  }
};

/**
 * Toggle visibility (alias for toggle).
 *
 * @param {boolean} visible - True to show, false to hide
 */
HTMLElement.prototype.toggleVisibility = function (visible: boolean): void {
  this.toggle(visible);
};

/**
 * Check if element is currently shown (not hidden with display: none).
 *
 * @returns {boolean} True if element is shown
 */
HTMLElement.prototype.isShown = function (): boolean {
  return this.offsetParent !== null;
};

/**
 * Set multiple CSS styles via object.
 *
 * @param {Partial<CSSStyleDeclaration>} styles - Style properties to set
 */
HTMLElement.prototype.setCssStyles = function (styles: Partial<CSSStyleDeclaration>): void {
  Object.assign(this.style, styles);
};

/**
 * Set CSS custom properties (variables).
 *
 * @param {Record<string, string>} props - Custom properties to set
 */
HTMLElement.prototype.setCssProps = function (props: Record<string, string>): void {
  for (const key in props) {
    this.style.setProperty(key, props[key]);
  }
};

/**
 * Get inner width without padding.
 */
Object.defineProperty(HTMLElement.prototype, 'innerWidth', {
  get() {
    const styles = window.getComputedStyle(this);
    const paddingLeft = parseFloat(styles.paddingLeft);
    const paddingRight = parseFloat(styles.paddingRight);
    return this.clientWidth - paddingLeft - paddingRight;
  },
});

/**
 * Get inner height without padding.
 */
Object.defineProperty(HTMLElement.prototype, 'innerHeight', {
  get() {
    const styles = window.getComputedStyle(this);
    const paddingTop = parseFloat(styles.paddingTop);
    const paddingBottom = parseFloat(styles.paddingBottom);
    return this.clientHeight - paddingTop - paddingBottom;
  },
});

/**
 * Add delegated event listener.
 *
 * @param {string} type - Event type
 * @param {string} selector - CSS selector for delegation
 * @param {Function} listener - Event handler
 * @param {Object} options - Event options
 */
HTMLElement.prototype.on = function <K extends keyof HTMLElementEventMap>(
  this: HTMLElement,
  type: K,
  selector: string,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K], delegateTarget: HTMLElement) => any,
  options?: boolean | AddEventListenerOptions
): void {
  if (!this._EVENTS) {
    this._EVENTS = {};
  }
  if (!this._EVENTS[type]) {
    this._EVENTS[type] = [];
  }

  const callback = (ev: Event) => {
    const target = ev.target as HTMLElement;
    const delegateTarget = target.closest(selector) as HTMLElement;
    if (delegateTarget && this.contains(delegateTarget)) {
      listener.call(this, ev as HTMLElementEventMap[K], delegateTarget);
    }
  };

  this._EVENTS[type]!.push({
    selector,
    listener: listener as (this: unknown, ev: Event, delegateTarget: HTMLElement) => unknown,
    options,
    callback: callback as EventListener,
  });
  this.addEventListener(type, callback as EventListener, options);
};

/**
 * Remove delegated event listener.
 *
 * @param {string} type - Event type
 * @param {string} selector - CSS selector for delegation
 * @param {Function} listener - Event handler
 * @param {Object} options - Event options
 */
HTMLElement.prototype.off = function <K extends keyof HTMLElementEventMap>(
  this: HTMLElement,
  type: K,
  selector: string,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K], delegateTarget: HTMLElement) => any,
  options?: boolean | AddEventListenerOptions
): void {
  if (!this._EVENTS || !this._EVENTS[type]) return;

  const events = this._EVENTS[type]!;
  for (let i = events.length - 1; i >= 0; i--) {
    const event = events[i];
    if (event.selector === selector && event.listener === listener) {
      this.removeEventListener(type, event.callback as EventListener, options);
      events.splice(i, 1);
    }
  }
};

/**
 * Add click event listener.
 *
 * @param {Function} listener - Click handler
 * @param {Object} options - Event options
 */
HTMLElement.prototype.onClickEvent = function (
  this: HTMLElement,
  listener: (this: HTMLElement, ev: MouseEvent) => any,
  options?: boolean | AddEventListenerOptions
): void {
  this.addEventListener('click', listener as EventListener, options);
};

/**
 * Register callback for when element is inserted into DOM.
 *
 * @param {Function} listener - Callback function
 * @param {boolean} once - If true, fire only once
 * @returns {Function} Cleanup function
 */
HTMLElement.prototype.onNodeInserted = function (
  this: HTMLElement,
  listener: () => any,
  once?: boolean
): () => void {
  const observer = new MutationObserver(() => {
    if (document.contains(this)) {
      listener();
      if (once) {
        observer.disconnect();
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  return () => observer.disconnect();
};

/**
 * Register callback for when element migrates to new window.
 *
 * @param {Function} listener - Callback receiving new window
 * @returns {Function} Cleanup function
 */
HTMLElement.prototype.onWindowMigrated = function (
  this: HTMLElement,
  listener: (win: Window) => any
): () => void {
  const originalWin = this.win;
  const check = setInterval(() => {
    if (this.win !== originalWin) {
      listener(this.win);
      clearInterval(check);
    }
  }, 100);

  return () => clearInterval(check);
};

/**
 * Trigger a custom event.
 *
 * @param {string} eventType - Event type name
 */
HTMLElement.prototype.trigger = function (eventType: string): void {
  const event = new Event(eventType, { bubbles: true, cancelable: true });
  this.dispatchEvent(event);
};

// ============================================================================
// SVGElement Extensions
// ============================================================================

/**
 * Set multiple CSS styles on SVG element.
 *
 * @param {Partial<CSSStyleDeclaration>} styles - Style properties to set
 */
SVGElement.prototype.setCssStyles = function (styles: Partial<CSSStyleDeclaration>): void {
  Object.assign(this.style, styles);
};

/**
 * Set CSS custom properties on SVG element.
 *
 * @param {Record<string, string>} props - Custom properties to set
 */
SVGElement.prototype.setCssProps = function (props: Record<string, string>): void {
  for (const key in props) {
    this.style.setProperty(key, props[key]);
  }
};

// ============================================================================
// DocumentFragment Extensions
// ============================================================================

/**
 * Find first element in fragment matching selector.
 *
 * @param {string} selector - CSS selector
 * @returns {HTMLElement} First matching element
 */
DocumentFragment.prototype.find = function (selector: string): HTMLElement {
  return this.querySelector(selector) as HTMLElement;
};

/**
 * Find all elements in fragment matching selector.
 *
 * @param {string} selector - CSS selector
 * @returns {HTMLElement[]} Array of matching elements
 */
DocumentFragment.prototype.findAll = function (selector: string): HTMLElement[] {
  return Array.from(this.querySelectorAll(selector));
};

// ============================================================================
// Document Extensions
// ============================================================================

/**
 * Add delegated event listener to document.
 *
 * @param {string} type - Event type
 * @param {string} selector - CSS selector for delegation
 * @param {Function} listener - Event handler
 * @param {Object} options - Event options
 */
Document.prototype.on = function <K extends keyof DocumentEventMap>(
  this: Document,
  type: K,
  selector: string,
  listener: (this: Document, ev: DocumentEventMap[K], delegateTarget: HTMLElement) => any,
  options?: boolean | AddEventListenerOptions
): void {
  if (!this._EVENTS) {
    this._EVENTS = {};
  }
  if (!this._EVENTS[type]) {
    this._EVENTS[type] = [];
  }

  const callback = (ev: Event) => {
    const target = ev.target as HTMLElement;
    const delegateTarget = target.closest(selector) as HTMLElement;
    if (delegateTarget) {
      listener.call(this, ev as DocumentEventMap[K], delegateTarget);
    }
  };

  this._EVENTS[type]!.push({
    selector,
    listener: listener as (this: unknown, ev: Event, delegateTarget: HTMLElement) => unknown,
    options,
    callback: callback as EventListener,
  });
  this.addEventListener(type, callback as EventListener, options);
};

/**
 * Remove delegated event listener from document.
 *
 * @param {string} type - Event type
 * @param {string} selector - CSS selector for delegation
 * @param {Function} listener - Event handler
 * @param {Object} options - Event options
 */
Document.prototype.off = function <K extends keyof DocumentEventMap>(
  this: Document,
  type: K,
  selector: string,
  listener: (this: Document, ev: DocumentEventMap[K], delegateTarget: HTMLElement) => any,
  options?: boolean | AddEventListenerOptions
): void {
  if (!this._EVENTS || !this._EVENTS[type]) return;

  const events = this._EVENTS[type]!;
  for (let i = events.length - 1; i >= 0; i--) {
    const event = events[i];
    if (event.selector === selector && event.listener === listener) {
      this.removeEventListener(type, event.callback as EventListener, options);
      events.splice(i, 1);
    }
  }
};

// ============================================================================
// UIEvent Extensions
// ============================================================================

/**
 * Cross-window instanceof check for UIEvents.
 */
Object.defineProperty(UIEvent.prototype, 'instanceOf', {
  value: function <T>(type: { new (...data: any[]): T }): this is T {
    return this.constructor.name === type.name;
  },
});

/**
 * Get target node from event.
 */
Object.defineProperty(UIEvent.prototype, 'targetNode', {
  get() {
    return (this.target as Node) || null;
  },
});

/**
 * Get window from event.
 */
Object.defineProperty(UIEvent.prototype, 'win', {
  get() {
    return ((this.target as any)?.ownerDocument?.defaultView as Window) || window;
  },
});

/**
 * Get document from event.
 */
Object.defineProperty(UIEvent.prototype, 'doc', {
  get() {
    return ((this.target as any)?.ownerDocument as Document) || document;
  },
});

// Export for TypeScript module compatibility
export {};
