const mockGlobal = {};
export function getGlobal() {
    if(typeof window !== undefined) {
        return window;
    }
    return mockGlobal;
}