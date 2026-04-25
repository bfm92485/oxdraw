import { strict as assert } from "node:assert";
import { describe, it } from "node:test";

import { rankNodes } from "../lib/nodeSearch";
import { toExportFilename, buildShortcutList } from "../lib/exportHelpers";
import type { NodeData } from "../lib/types";

const makeNode = (id: string, label: string): NodeData => ({
  id,
  label,
  shape: "rectangle",
  autoPosition: { x: 0, y: 0 },
  renderedPosition: { x: 0, y: 0 },
  width: 100,
  height: 50,
});

describe("rankNodes", () => {
  const nodes = [
    makeNode("login", "User Login"),
    makeNode("logout", "User Logout"),
    makeNode("dashboard", "Dashboard"),
    makeNode("admin_login", "Admin Login Flow"),
    makeNode("misc", "Other"),
  ];

  it("returns all nodes (up to limit) when query is empty", () => {
    const result = rankNodes(nodes, "");
    assert.equal(result.length, nodes.length);
  });

  it("filters out nodes that do not match", () => {
    const ids = rankNodes(nodes, "login").map((entry) => entry.node.id);
    assert.deepEqual(new Set(ids), new Set(["login", "admin_login"]));
  });

  it("ranks exact matches highest", () => {
    const result = rankNodes(nodes, "login");
    assert.equal(result[0]?.node.id, "login");
  });

  it("is case-insensitive", () => {
    const result = rankNodes(nodes, "LOGIN");
    assert.equal(result[0]?.node.id, "login");
  });

  it("matches against label as well as id", () => {
    const result = rankNodes(nodes, "Dashboard");
    assert.equal(result[0]?.node.id, "dashboard");
  });

  it("ranks prefix matches above substring matches", () => {
    const result = rankNodes(nodes, "log");
    const ids = result.map((entry) => entry.node.id);
    // login & logout start with "log"; admin_login only contains it.
    const loginIdx = ids.indexOf("login");
    const adminIdx = ids.indexOf("admin_login");
    assert.ok(loginIdx >= 0, "login should be present");
    assert.ok(adminIdx >= 0, "admin_login should be present");
    assert.ok(
      loginIdx < adminIdx,
      "prefix match should rank above substring-only match"
    );
  });

  it("respects the maxResults parameter", () => {
    const result = rankNodes(nodes, "", 2);
    assert.equal(result.length, 2);
  });
});

describe("toExportFilename", () => {
  it("replaces a known extension with png", () => {
    assert.equal(toExportFilename("/tmp/flow.mmd", "png"), "flow.png");
  });

  it("replaces a known extension with svg", () => {
    assert.equal(toExportFilename("/tmp/flow.mmd", "svg"), "flow.svg");
  });

  it("uses the basename when given a nested path", () => {
    assert.equal(
      toExportFilename("a/b/c/diagram.mmd", "svg"),
      "diagram.svg"
    );
  });

  it("falls back to 'diagram' when path is empty", () => {
    assert.equal(toExportFilename("", "png"), "diagram.png");
  });

  it("preserves stems without extensions", () => {
    assert.equal(toExportFilename("flow", "png"), "flow.png");
  });
});

describe("buildShortcutList", () => {
  it("uses ⌘ for mac platforms", () => {
    const list = buildShortcutList(true);
    assert.ok(list.some((item) => item.combo.includes("⌘")));
  });

  it("uses Ctrl for non-mac platforms", () => {
    const list = buildShortcutList(false);
    assert.ok(list.some((item) => item.combo.includes("Ctrl")));
    assert.ok(list.every((item) => !item.combo.includes("⌘")));
  });

  it("includes the canonical UX bundle entries", () => {
    const list = buildShortcutList(false);
    const descriptions = list.map((item) => item.description.toLowerCase());
    assert.ok(descriptions.some((d) => d.includes("png")));
    assert.ok(descriptions.some((d) => d.includes("svg")));
    assert.ok(descriptions.some((d) => d.includes("find")));
    assert.ok(descriptions.some((d) => d.includes("reset")));
    assert.ok(descriptions.some((d) => d.includes("delete")));
  });
});
