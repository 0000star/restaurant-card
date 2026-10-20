import type { Restaurant } from "@/types/restaurant";

const STORAGE_KEY = "restaurants:v1";
const EMPTY_LIST: Restaurant[] = [];

const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedList: Restaurant[] = EMPTY_LIST;

function parseRestaurants(raw: string | null): Restaurant[] {
  if (!raw) return EMPTY_LIST;
  try {
    const parsed: unknown = JSON.parse(raw);
    // Структуру не валидируем: данные пишет только это приложение, версия схемы — в ключе.
    return Array.isArray(parsed) ? (parsed as Restaurant[]) : EMPTY_LIST;
  } catch {
    return EMPTY_LIST;
  }
}

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

// Возвращает один и тот же массив, пока сырая строка не изменилась (требование useSyncExternalStore).
export function getRestaurantsSnapshot(): Restaurant[] {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedList = parseRestaurants(raw);
  }
  return cachedList;
}

export function getServerRestaurantsSnapshot(): Restaurant[] {
  return EMPTY_LIST;
}

export function subscribeToRestaurants(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function saveRestaurants(restaurants: Restaurant[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(restaurants));
  } catch (error) {
    console.error("Не удалось сохранить данные", error);
    return;
  }
  listeners.forEach((listener) => listener());
}
