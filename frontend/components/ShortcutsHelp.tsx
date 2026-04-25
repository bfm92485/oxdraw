'use client';

import type { ShortcutDescriptor } from "../lib/exportHelpers";

interface ShortcutsHelpProps {
  open: boolean;
  shortcuts: ShortcutDescriptor[];
  onClose: () => void;
}

export default function ShortcutsHelp({
  open,
  shortcuts,
  onClose,
}: ShortcutsHelpProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="shortcuts-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard shortcuts"
      onClick={onClose}
    >
      <div
        className="shortcuts-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="shortcuts-header">
          <h2>Keyboard shortcuts</h2>
          <button
            type="button"
            onClick={onClose}
            className="shortcuts-close"
            aria-label="Close shortcuts"
          >
            ×
          </button>
        </header>
        <ul className="shortcuts-list">
          {shortcuts.map((shortcut) => (
            <li key={shortcut.combo} className="shortcuts-item">
              <kbd className="shortcuts-combo">{shortcut.combo}</kbd>
              <span className="shortcuts-description">
                {shortcut.description}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
