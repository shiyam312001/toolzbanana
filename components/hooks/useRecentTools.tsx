import { useState, useEffect, useCallback } from 'react';

const MAX_RECENT_TOOLS = 5;
const STORAGE_KEY = 'toolzbanana_recent_tools';

export function useRecentTools() {
  const [recentTools, setRecentTools] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRecentTools(parsed);
      } catch (e) {
        console.error('Failed to parse recent tools:', e);
      }
    }
  }, []);

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
