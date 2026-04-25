import type { NodeData } from "./types";

export interface RankedNode {
  node: NodeData;
  score: number;
}

export const NODE_SEARCH_MAX_RESULTS = 50;

export const rankNodes = (
  nodes: NodeData[],
  query: string,
  maxResults: number = NODE_SEARCH_MAX_RESULTS
): RankedNode[] => {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    return nodes.slice(0, maxResults).map((node) => ({ node, score: 0 }));
  }

  const ranked: RankedNode[] = [];
  for (const node of nodes) {
    const id = node.id.toLowerCase();
    const label = (node.label ?? "").toLowerCase();
    let score = 0;
    if (id === trimmed || label === trimmed) {
      score = 1000;
    } else if (id.startsWith(trimmed) || label.startsWith(trimmed)) {
      score = 500;
    } else if (id.includes(trimmed) || label.includes(trimmed)) {
      score = 100;
    } else {
      continue;
    }
    // Tiebreaker: shorter id+label is more specific, so scores higher.
    score -= Math.min(50, id.length + label.length);
    ranked.push({ node, score });
  }

  ranked.sort((a, b) => b.score - a.score);
  return ranked.slice(0, maxResults);
};
