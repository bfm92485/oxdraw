const loadImageFromUrl = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () =>
      reject(new Error("Unable to render diagram for export."));
    image.src = url;
  });

export const svgMarkupToPngBlob = async (svgMarkup: string): Promise<Blob> => {
  const svgBlob = new Blob([svgMarkup], {
    type: "image/svg+xml;charset=utf-8",
  });
  const svgUrl = URL.createObjectURL(svgBlob);
  try {
    const image = await loadImageFromUrl(svgUrl);
    const width = image.naturalWidth || image.width;
    const height = image.naturalHeight || image.height;
    if (!width || !height) {
      throw new Error("Diagram has no renderable size.");
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Canvas support is required for PNG export.");
    }

    context.clearRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);

    const pngBlob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );
    if (!pngBlob) {
      throw new Error("Failed to encode PNG.");
    }
    return pngBlob;
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
};

export const svgMarkupToBlob = (svgMarkup: string): Blob =>
  new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });

export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const stripExtension = (basename: string): string =>
  basename.replace(/\.[^.]+$/, "");

export const toExportFilename = (
  sourcePath: string,
  extension: "png" | "svg"
): string => {
  const basename = sourcePath.split("/").pop() ?? "diagram";
  const stem = stripExtension(basename) || "diagram";
  return `${stem}.${extension}`;
};

export const copyTextToClipboard = async (text: string): Promise<void> => {
  if (
    typeof navigator !== "undefined" &&
    navigator.clipboard?.writeText
  ) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    const copied = document.execCommand("copy");
    if (!copied) {
      throw new Error("Clipboard copy failed.");
    }
  } finally {
    textarea.remove();
  }
};

export const copyBlobToClipboard = async (blob: Blob): Promise<void> => {
  if (
    typeof navigator === "undefined" ||
    !navigator.clipboard ||
    typeof window === "undefined" ||
    typeof window.ClipboardItem === "undefined"
  ) {
    throw new Error(
      "Clipboard image support is not available in this browser."
    );
  }
  const item = new window.ClipboardItem({ [blob.type]: blob });
  await navigator.clipboard.write([item]);
};

export const isMacPlatform = (): boolean => {
  if (typeof navigator === "undefined") {
    return false;
  }
  const platform = navigator.platform || "";
  const userAgent = navigator.userAgent || "";
  return /Mac|iPhone|iPad|iPod/i.test(platform) || /Mac OS X/i.test(userAgent);
};

export interface ShortcutDescriptor {
  combo: string;
  description: string;
}

export const buildShortcutList = (isMac: boolean): ShortcutDescriptor[] => {
  const mod = isMac ? "⌘" : "Ctrl";
  const shift = isMac ? "⇧" : "Shift";
  return [
    { combo: `${mod}+E`, description: "Download diagram as PNG" },
    { combo: `${mod}+${shift}+E`, description: "Download diagram as SVG" },
    { combo: `${mod}+C`, description: "Copy SVG markup to clipboard" },
    {
      combo: `${mod}+${shift}+C`,
      description: "Copy diagram as PNG image to clipboard",
    },
    { combo: `${mod}+F`, description: "Find / jump to a node" },
    { combo: `${mod}+${shift}+R`, description: "Reset manual layout overrides" },
    { combo: "Esc", description: "Clear current selection or close dialogs" },
    { combo: "Delete / Backspace", description: "Delete the selected element" },
    { combo: "Arrow keys", description: "Nudge the selected node" },
    { combo: "?", description: "Show this shortcut help" },
  ];
};
