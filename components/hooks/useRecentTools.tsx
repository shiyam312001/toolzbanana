import { useState, useCallback } from 'react';

const MAX_RECENT_TOOLS = 5;
const STORAGE_KEY = 'toolzbanana_recent_tools';

export function useRecentTools() {
  const [recentTools, setRecentTools] = useState(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse recent tools:', e);
      return [];
    }
  });

  const addRecentTool = useCallback((toolId) => {
    setRecentTools((prev) => {
      const filtered = prev.filter((tool) => tool.id !== toolId);
      const updated = [{ id: toolId, timestamp: Date.now() }, ...filtered].slice(0, MAX_RECENT_TOOLS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { recentTools, addRecentTool };
}
