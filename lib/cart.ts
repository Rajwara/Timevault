import { useSyncExternalStore } from "react";

/** Bag + wishlist shared across pages and saved in the browser. */
type State = { bag: string[]; wish: string[] };

const KEY = "vanta-store-v1";
const empty: State = { bag: [], wish: [] };
let state: State = empty;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw);
      state = { bag: Array.isArray(p.bag) ? p.bag : [], wish: Array.isArray(p.wish) ? p.wish : [] };
    }
  } catch { /* storage unavailable */ }
}

function set(next: State) {
  state = next;
  try { window.localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
  listeners.forEach((l) => l());
}

const toggleIn = (list: string[], id: string) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

function subscribe(l: () => void) {
  listeners.add(l);
  if (!loaded) {
    load();
    queueMicrotask(() => listeners.forEach((fn) => fn()));
  }
  return () => listeners.delete(l);
}

export function useStore() {
  const s = useSyncExternalStore(subscribe, () => state, () => empty);
  return {
    bag: s.bag,
    wish: s.wish,
    inBag: (id: string) => s.bag.includes(id),
    inWish: (id: string) => s.wish.includes(id),
    toggleBag: (id: string) => set({ ...state, bag: toggleIn(state.bag, id) }),
    toggleWish: (id: string) => set({ ...state, wish: toggleIn(state.wish, id) }),
  };
}
