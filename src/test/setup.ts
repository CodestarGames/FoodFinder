import { vi } from "vitest";

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
})

/**
 * Utility function that mocks the `IntersectionObserver` API. Necessary for components that rely
 * on it, otherwise the tests will crash. Recommended to execute inside `beforeEach`.
 * @param intersectionObserverMock - Parameter that is sent to the `Object.defineProperty`
 * overwrite method. `jest.fn()` mock functions can be passed here if the goal is to not only
 * mock the intersection observer, but its methods.
 */
export function setupIntersectionObserverMock({
                                                  root = null,
                                                  rootMargin = '',
                                                  thresholds = [],
                                                  disconnect = () => null,
                                                  observe = () => null,
                                                  takeRecords = () => [],
                                                  unobserve = () => null,
                                              } = {}): void {
    class MockIntersectionObserver implements IntersectionObserver {
        readonly root: Element | null = root;
        readonly rootMargin: string = rootMargin;
        readonly thresholds: ReadonlyArray < number > = thresholds;
        disconnect: () => void = disconnect;
        observe: (target: Element) => void = observe;
        takeRecords: () => IntersectionObserverEntry[] = takeRecords;
        unobserve: (target: Element) => void = unobserve;
    }

    Object.defineProperty(
        window,
        'IntersectionObserver', {
            writable: true,
            configurable: true,
            value: MockIntersectionObserver
        }
    );

    Object.defineProperty(
        global,
        'IntersectionObserver', {
            writable: true,
            configurable: true,
            value: MockIntersectionObserver
        }
    );
}