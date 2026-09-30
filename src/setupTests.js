// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// JSDOM does not implement IntersectionObserver, which Framer Motion uses.
class IntersectionObserverMock {
  constructor(callback, options = {}) {
    this.root = options.root || null;
    this.rootMargin = options.rootMargin || '0px';
    this.thresholds = [options.threshold || 0];
  }

  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}

global.IntersectionObserver = IntersectionObserverMock;
