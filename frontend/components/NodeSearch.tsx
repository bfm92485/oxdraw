'use client';

import {
  KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { NodeData } from "../lib/types";
import { rankNodes } from "../lib/nodeSearch";

interface NodeSearchProps {
  open: boolean;
  nodes: NodeData[];
  onClose: () => void;
  onSelect: (nodeId: string) => void;
}

export default function NodeSearch({
  open,
  nodes,
  onClose,
  onSelect,
}: NodeSearchProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      // Focus on next tick so the input exists.
      const id = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  const ranked = useMemo(() => rankNodes(nodes, query), [nodes, query]);

  useEffect(() => {
    if (activeIndex >= ranked.length) {
      setActiveIndex(0);
    }
  }, [ranked.length, activeIndex]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) {
      return;
    }
    const item = list.children[activeIndex] as HTMLElement | undefined;
    if (item && typeof item.scrollIntoView === "function") {
      item.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  if (!open) {
    return null;
  }

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (ranked.length === 0) {
        return;
      }
      setActiveIndex((current) => (current + 1) % ranked.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (ranked.length === 0) {
        return;
      }
      setActiveIndex((current) =>
        current === 0 ? ranked.length - 1 : current - 1
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      const target = ranked[activeIndex];
      if (target) {
        onSelect(target.node.id);
      }
    } else if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  };

  return (
    <div
      className="node-search-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Find node"
      onClick={onClose}
    >
      <div
        className="node-search-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <input
          ref={inputRef}
          className="node-search-input"
          type="text"
          placeholder="Search nodes by ID or label…"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={handleKeyDown}
        />
        {ranked.length === 0 ? (
          <div className="node-search-empty">No matching nodes</div>
        ) : (
          <ul className="node-search-list" ref={listRef}>
            {ranked.map((entry, index) => (
              <li
                key={entry.node.id}
                className={
                  index === activeIndex
                    ? "node-search-item active"
                    : "node-search-item"
                }
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => onSelect(entry.node.id)}
              >
                <span className="node-search-label">
                  {entry.node.label || entry.node.id}
                </span>
                {entry.node.label && entry.node.label !== entry.node.id ? (
                  <span className="node-search-id">{entry.node.id}</span>
                ) : null}
              </li>
            ))}
          </ul>
        )}
        <div className="node-search-hint">
          ↑↓ navigate · Enter to jump · Esc to close
        </div>
      </div>
    </div>
  );
}
