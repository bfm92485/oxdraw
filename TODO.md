# Oxdraw Development Roadmap

**Last Updated**: 2025-11-04
**Status**: Planning Phase
**Version**: 0.1.1

---

## Table of Contents

- [Phase 1: Foundation](#phase-1-foundation)
- [Phase 2: UX Improvements](#phase-2-ux-improvements)
- [Phase 3: Feature Expansion](#phase-3-feature-expansion)
- [Phase 4: Advanced Features](#phase-4-advanced-features)
- [Phase 5: Enterprise & Polish](#phase-5-enterprise--polish)

---

## Legend

- **Effort**: `S` (Small: <4h) | `M` (Medium: 4-16h) | `L` (Large: 16-40h) | `XL` (Extra Large: 40+h)
- **Priority**: `P0` (Critical) | `P1` (High) | `P2` (Medium) | `P3` (Low)
- **Status**: `🔴 Not Started` | `🟡 In Progress` | `🟢 Complete` | `⏸️ Blocked`

---

# Phase 1: Foundation
**Goal**: Improve code quality, documentation, and maintainability
**Timeline**: 1-2 weeks
**Status**: 🔴 Not Started

## 1.1 Documentation Improvements

### 1.1.1 Algorithm Documentation
**Priority**: P1 | **Effort**: M | **Status**: 🔴

- [ ] **Document layout algorithm** (diagram.rs:compute_auto_layout)
  - [ ] Add module-level doc comment explaining overall approach
  - [ ] Document grid-based positioning strategy
  - [ ] Explain collision detection with examples
  - [ ] Document the 6-iteration refinement process
  - [ ] Add diagrams showing layout flow
  - [ ] Document spacing constants and rationale
  - **Acceptance**: Each major function has doc comments with examples

- [ ] **Document routing algorithm** (diagram.rs:compute_routes)
  - [ ] Explain bidirectional edge pair resolution logic
  - [ ] Document path finding algorithm
  - [ ] Explain collision avoidance strategy
  - [ ] Document edge label placement
  - [ ] Add visual examples of edge routing scenarios
  - **Acceptance**: Algorithm is understandable without reading code

- [ ] **Document shape rendering** (diagram.rs:render_shape)
  - [ ] Document SVG path generation for each shape type
  - [ ] Explain coordinate system and transforms
  - [ ] Document text positioning calculations
  - **Acceptance**: Each shape type has clear documentation

### 1.1.2 API Documentation
**Priority**: P1 | **Effort**: S | **Status**: 🔴

- [ ] **Create API.md reference document**
  - [ ] Document all REST endpoints with examples
  - [ ] Include request/response schemas
  - [ ] Add curl examples for each endpoint
  - [ ] Document error codes and responses
  - [ ] Add authentication notes (if applicable)
  - **File**: `/docs/API.md`
  - **Acceptance**: Someone can integrate without reading code

- [ ] **Document API client** (frontend/lib/api.ts)
  - [ ] Add JSDoc comments to all functions
  - [ ] Document error handling strategy
  - [ ] Add usage examples
  - **Acceptance**: TypeScript shows helpful tooltips

### 1.1.3 Deployment & Installation Guide
**Priority**: P1 | **Effort**: S | **Status**: 🔴

- [ ] **Create INSTALL.md**
  - [ ] Document installation via cargo install
  - [ ] Add building from source instructions
  - [ ] Document frontend build requirements
  - [ ] Add troubleshooting section
  - [ ] Document system requirements
  - **File**: `/docs/INSTALL.md`
  - **Acceptance**: New user can install without issues

- [ ] **Create DEPLOYMENT.md**
  - [ ] Document server deployment options
  - [ ] Add systemd service example
  - [ ] Document environment variables
  - [ ] Add Docker instructions (future)
  - [ ] Document reverse proxy setup (nginx/caddy)
  - **File**: `/docs/DEPLOYMENT.md`
  - **Acceptance**: Can deploy to production server

### 1.1.4 Architecture Documentation
**Priority**: P2 | **Effort**: M | **Status**: 🔴

- [ ] **Create ARCHITECTURE.md**
  - [ ] Document overall system architecture
  - [ ] Explain backend components (CLI, server, renderer)
  - [ ] Explain frontend architecture
  - [ ] Document state synchronization strategy
  - [ ] Add architecture diagrams (use oxdraw!)
  - [ ] Document data flow from source → render
  - [ ] Explain override persistence mechanism
  - **File**: `/docs/ARCHITECTURE.md`
  - **Acceptance**: New contributor understands system design

- [ ] **Create CONTRIBUTING.md**
  - [ ] Document development setup
  - [ ] Explain code organization
  - [ ] Add coding standards
  - [ ] Document testing requirements
  - [ ] Add PR process guidelines
  - **File**: `/CONTRIBUTING.md`
  - **Acceptance**: Contributors know how to submit PRs

---

## 1.2 Test Coverage Expansion

### 1.2.1 Unit Test Suite
**Priority**: P1 | **Effort**: L | **Status**: 🔴

- [ ] **Parser unit tests** (diagram.rs parsing functions)
  - [ ] Test valid flowchart syntax parsing
  - [ ] Test invalid syntax error handling
  - [ ] Test edge cases (empty nodes, special chars)
  - [ ] Test subgraph parsing
  - [ ] Test style override parsing
  - **File**: `/tests/parser_tests.rs`
  - **Acceptance**: >80% coverage of parsing logic

- [ ] **Layout algorithm unit tests**
  - [ ] Test simple 2-node layout
  - [ ] Test complex multi-node layout
  - [ ] Test collision detection
  - [ ] Test subgraph boundary computation
  - [ ] Test different graph directions (TB, LR, BT, RL)
  - **File**: `/tests/layout_tests.rs`
  - **Acceptance**: >70% coverage of layout logic

- [ ] **Routing algorithm unit tests**
  - [ ] Test simple edge routing
  - [ ] Test bidirectional edge handling
  - [ ] Test edge collision avoidance
  - [ ] Test label placement
  - [ ] Test self-loops (if supported)
  - **File**: `/tests/routing_tests.rs`
  - **Acceptance**: >70% coverage of routing logic

- [ ] **Shape rendering unit tests**
  - [ ] Test SVG generation for each shape type
  - [ ] Test color override application
  - [ ] Test text wrapping
  - [ ] Test invalid shape handling
  - **File**: `/tests/rendering_tests.rs`
  - **Acceptance**: All 12 shapes tested

### 1.2.2 Integration Tests
**Priority**: P2 | **Effort**: M | **Status**: 🔴

- [ ] **API endpoint integration tests**
  - [ ] Test GET /api/diagram
  - [ ] Test PUT /api/diagram/layout
  - [ ] Test PUT /api/diagram/source
  - [ ] Test PUT /api/diagram/style
  - [ ] Test DELETE /api/diagram/nodes/{id}
  - [ ] Test DELETE /api/diagram/edges/{id}
  - [ ] Test concurrent request handling
  - **File**: `/tests/api_integration_tests.rs`
  - **Acceptance**: All endpoints have happy + error path tests

- [ ] **File persistence tests**
  - [ ] Test override writing to file
  - [ ] Test override reading from file
  - [ ] Test corrupted override recovery
  - [ ] Test concurrent file writes
  - [ ] Test file locking
  - **File**: `/tests/persistence_tests.rs`
  - **Acceptance**: No data loss scenarios

### 1.2.3 Property-Based Tests
**Priority**: P2 | **Effort**: M | **Status**: 🔴

- [ ] **Add proptest dependency**
  - [ ] Add proptest to Cargo.toml
  - [ ] Create test utilities for random diagram generation
  - **Acceptance**: proptest integrated

- [ ] **Layout invariant tests**
  - [ ] Test: Nodes never overlap
  - [ ] Test: Edges connect to node boundaries
  - [ ] Test: Subgraph boundaries contain all nodes
  - [ ] Test: Layout is deterministic (same input → same output)
  - **File**: `/tests/property_tests.rs`
  - **Acceptance**: Key invariants verified with 1000+ random inputs

### 1.2.4 Performance Benchmarks
**Priority**: P2 | **Effort**: M | **Status**: 🔴

- [ ] **Create benchmark suite** (using criterion)
  - [ ] Add criterion to dev-dependencies
  - [ ] Create benches/ directory
  - [ ] Set up criterion configuration
  - **Acceptance**: Benchmarking infrastructure ready

- [ ] **Layout performance benchmarks**
  - [ ] Benchmark 10-node diagram layout
  - [ ] Benchmark 50-node diagram layout
  - [ ] Benchmark 100-node diagram layout
  - [ ] Benchmark 500-node diagram layout
  - [ ] Benchmark nested subgraph layout
  - **File**: `/benches/layout_bench.rs`
  - **Acceptance**: Baseline metrics established

- [ ] **Rendering performance benchmarks**
  - [ ] Benchmark SVG generation
  - [ ] Benchmark PNG rasterization
  - [ ] Benchmark different image sizes
  - **File**: `/benches/rendering_bench.rs`
  - **Acceptance**: Know performance characteristics

### 1.2.5 Frontend Tests
**Priority**: P2 | **Effort**: M | **Status**: 🔴

- [ ] **Add Jest + React Testing Library**
  - [ ] Install dependencies
  - [ ] Configure jest.config.js
  - [ ] Set up test utilities
  - **Acceptance**: Test infrastructure ready

- [ ] **Component unit tests**
  - [ ] Test DiagramCanvas rendering
  - [ ] Test node dragging logic
  - [ ] Test edge manipulation
  - [ ] Test style panel controls
  - **File**: `/frontend/__tests__/DiagramCanvas.test.tsx`
  - **Acceptance**: >60% component coverage

- [ ] **API client tests**
  - [ ] Mock fetch calls
  - [ ] Test error handling
  - [ ] Test retry logic
  - **File**: `/frontend/__tests__/api.test.ts`
  - **Acceptance**: All API functions tested

---

## 1.3 Architecture Refactoring

### 1.3.1 Split diagram.rs Module
**Priority**: P1 | **Effort**: L | **Status**: 🔴

- [ ] **Create module structure**
  - [ ] Create `src/diagram/` directory
  - [ ] Create `src/diagram/mod.rs`
  - [ ] Update `src/lib.rs` to use new module structure
  - **Acceptance**: Module compiles with new structure

- [ ] **Extract parser** → `src/diagram/parser.rs`
  - [ ] Move parsing functions to parser.rs
  - [ ] Create `DiagramParser` struct
  - [ ] Move parse_flowchart, parse_node, parse_edge functions
  - [ ] Add comprehensive tests
  - [ ] Update imports in other modules
  - **Acceptance**: Parsing isolated, all tests pass

- [ ] **Extract layout** → `src/diagram/layout.rs`
  - [ ] Move compute_auto_layout function
  - [ ] Move collision detection logic
  - [ ] Create `LayoutEngine` struct with configuration
  - [ ] Extract constants to `LayoutConfig` struct
  - [ ] Add unit tests
  - **Acceptance**: Layout logic isolated, configurable

- [ ] **Extract routing** → `src/diagram/routing.rs`
  - [ ] Move compute_routes function
  - [ ] Move edge path computation
  - [ ] Create `EdgeRouter` struct
  - [ ] Extract routing constants
  - [ ] Add unit tests
  - **Acceptance**: Routing logic isolated

- [ ] **Extract rendering** → `src/diagram/renderer.rs`
  - [ ] Move SVG generation to `SvgRenderer` struct
  - [ ] Move PNG generation to `PngRenderer` struct
  - [ ] Create `Renderer` trait
  - [ ] Move shape-specific rendering functions
  - [ ] Add rendering tests
  - **Acceptance**: Rendering abstracted behind trait

- [ ] **Extract types** → `src/diagram/types.rs`
  - [ ] Move Diagram, Node, Edge, Subgraph structs
  - [ ] Move NodeShape, EdgeStyle enums
  - [ ] Move Position, Size, Color types
  - [ ] Add type documentation
  - **Acceptance**: Clean type definitions

- [ ] **Extract constants** → `src/diagram/config.rs`
  - [ ] Create DiagramConfig struct
  - [ ] Move all layout constants (NODE_WIDTH, etc.)
  - [ ] Move rendering constants
  - [ ] Make constants configurable
  - [ ] Add validation
  - **Acceptance**: All magic numbers eliminated

- [ ] **Update diagram/mod.rs**
  - [ ] Re-export public types
  - [ ] Create builder pattern for Diagram creation
  - [ ] Maintain backward compatibility
  - [ ] Update documentation
  - **Acceptance**: Clean public API, no breaking changes

### 1.3.2 Extract Styling System
**Priority**: P2 | **Effort**: M | **Status**: 🔴

- [ ] **Create styling module** → `src/diagram/style.rs`
  - [ ] Create `Style` struct (fill, stroke, text colors)
  - [ ] Create `Theme` struct (default colors)
  - [ ] Create `StyleSheet` for diagram-wide styles
  - [ ] Move color parsing logic
  - [ ] Add style validation
  - **Acceptance**: Centralized styling system

- [ ] **Extract color utilities** → `src/diagram/color.rs`
  - [ ] Move hex color parsing
  - [ ] Add RGB/HSL conversions
  - [ ] Add color validation
  - [ ] Add color manipulation (lighten, darken)
  - **Acceptance**: Reusable color utilities

### 1.3.3 Improve Type Safety
**Priority**: P2 | **Effort**: M | **Status**: 🔴

- [ ] **Create strong ID types**
  - [ ] Replace String node IDs with `NodeId` newtype
  - [ ] Replace String edge IDs with `EdgeId` newtype
  - [ ] Replace String subgraph IDs with `SubgraphId` newtype
  - [ ] Implement Display, Debug, Serialize for ID types
  - [ ] Update all code to use strong types
  - **Acceptance**: Compile-time prevention of ID confusion

- [ ] **Add builder patterns**
  - [ ] Create `NodeBuilder` for node construction
  - [ ] Create `EdgeBuilder` for edge construction
  - [ ] Create `DiagramBuilder` for diagram construction
  - [ ] Add validation in builders
  - **Acceptance**: Impossible to create invalid diagrams

---

# Phase 2: UX Improvements
**Goal**: Enhance user experience and editor usability
**Timeline**: 1 week
**Status**: 🔴 Not Started

## 2.1 Keyboard Shortcuts

### 2.1.1 Core Editing Shortcuts
**Priority**: P0 | **Effort**: S | **Status**: 🔴

- [ ] **Implement undo/redo system** (frontend)
  - [ ] Create `useHistory` hook for state management
  - [ ] Track diagram state snapshots
  - [ ] Implement Ctrl+Z for undo
  - [ ] Implement Ctrl+Shift+Z / Ctrl+Y for redo
  - [ ] Add history limit (50 states)
  - [ ] Update UI with undo/redo buttons
  - **File**: `/frontend/lib/hooks/useHistory.ts`
  - **Acceptance**: Can undo/redo all canvas operations

- [ ] **Selection shortcuts**
  - [ ] Implement Ctrl+A for select all
  - [ ] Implement Escape to deselect
  - [ ] Implement Tab to cycle selection
  - **Acceptance**: Keyboard-only selection works

- [ ] **Copy/paste shortcuts** (future - depends on clipboard API)
  - [ ] Implement Ctrl+C to copy selected nodes
  - [ ] Implement Ctrl+V to paste nodes
  - [ ] Implement Ctrl+X for cut
  - [ ] Handle edge copying with nodes
  - **Acceptance**: Can duplicate diagram sections

### 2.1.2 Navigation Shortcuts
**Priority**: P1 | **Effort**: S | **Status**: 🔴

- [ ] **Arrow key navigation**
  - [ ] Move selected node with arrow keys (10px steps)
  - [ ] Shift+Arrow for 1px micro-adjustments
  - [ ] Ctrl+Arrow for 50px jumps
  - **Acceptance**: Precise keyboard positioning

- [ ] **Zoom shortcuts**
  - [ ] Ctrl+Plus for zoom in
  - [ ] Ctrl+Minus for zoom out
  - [ ] Ctrl+0 for reset zoom
  - [ ] Ctrl+Scroll for zoom at cursor
  - **Acceptance**: Keyboard zoom works smoothly

### 2.1.3 Editing Shortcuts
**Priority**: P1 | **Effort**: S | **Status**: 🔴

- [ ] **Delete shortcuts** (already implemented, verify)
  - [ ] Delete/Backspace to remove selected element
  - [ ] Add confirmation modal for node deletion
  - **Acceptance**: Safe deletion workflow

- [ ] **Quick actions**
  - [ ] Ctrl+S to manually save (show toast)
  - [ ] Ctrl+R to reset selected element styles
  - [ ] Ctrl+D to duplicate selected node
  - **Acceptance**: Common actions accessible via keyboard

### 2.1.4 Shortcut Documentation
**Priority**: P1 | **Effort**: S | **Status**: 🔴

- [ ] **Add shortcuts help overlay**
  - [ ] Create keyboard shortcut modal
  - [ ] Trigger with ? or Ctrl+/
  - [ ] List all shortcuts with descriptions
  - [ ] Group by category
  - **File**: `/frontend/components/ShortcutsHelp.tsx`
  - **Acceptance**: User can discover shortcuts

- [ ] **Add shortcuts to README**
  - [ ] Document all keyboard shortcuts
  - [ ] Add to Quick Start section
  - **Acceptance**: Documented in main README

---

## 2.2 Zoom & Pan Controls

### 2.2.1 Zoom Implementation
**Priority**: P0 | **Effort**: M | **Status**: 🔴

- [ ] **Add zoom state management**
  - [ ] Create `useZoom` hook
  - [ ] Track zoom level (0.1x - 5.0x)
  - [ ] Track pan offset (x, y)
  - [ ] Persist zoom/pan in localStorage
  - **File**: `/frontend/lib/hooks/useZoom.ts`
  - **Acceptance**: Zoom state managed cleanly

- [ ] **Implement zoom transform**
  - [ ] Apply CSS transform to canvas
  - [ ] Update mouse coordinate calculations
  - [ ] Handle zoom at cursor position
  - [ ] Add smooth zoom transitions
  - **File**: `/frontend/components/DiagramCanvas.tsx`
  - **Acceptance**: Zoom works smoothly without artifacts

- [ ] **Add zoom UI controls**
  - [ ] Add zoom in/out buttons
  - [ ] Add zoom level indicator (e.g., "75%")
  - [ ] Add fit-to-screen button
  - [ ] Add 1:1 zoom button
  - **File**: `/frontend/components/ZoomControls.tsx`
  - **Acceptance**: Visual zoom controls work

### 2.2.2 Pan Implementation
**Priority**: P0 | **Effort**: M | **Status**: 🔴

- [ ] **Implement pan drag**
  - [ ] Detect middle-mouse drag for pan
  - [ ] Detect Space+drag for pan
  - [ ] Update pan offset state
  - [ ] Add pan cursor (grabbing hand)
  - **Acceptance**: Can pan canvas smoothly

- [ ] **Add pan constraints**
  - [ ] Limit pan to diagram bounds
  - [ ] Add buffer zone around diagram
  - [ ] Prevent panning to empty space
  - **Acceptance**: Can't pan infinitely

- [ ] **Add minimap** (optional enhancement)
  - [ ] Render small diagram overview
  - [ ] Show viewport rectangle
  - [ ] Click minimap to pan
  - **File**: `/frontend/components/Minimap.tsx`
  - **Acceptance**: Minimap aids navigation

### 2.2.3 Coordinate System Updates
**Priority**: P0 | **Effort**: M | **Status**: 🔴

- [ ] **Update mouse event handlers**
  - [ ] Transform screen coords to canvas coords
  - [ ] Account for zoom in all calculations
  - [ ] Account for pan offset
  - [ ] Update drag operations
  - **Acceptance**: Dragging works at any zoom level

- [ ] **Update grid snapping**
  - [ ] Scale grid with zoom
  - [ ] Maintain snapping accuracy
  - **Acceptance**: Snapping works when zoomed

---

## 2.3 Grid Visualization

### 2.3.1 Grid Rendering
**Priority**: P1 | **Effort**: S | **Status**: 🔴

- [ ] **Render background grid**
  - [ ] Draw grid dots or lines
  - [ ] Use SVG pattern for efficiency
  - [ ] Match NODE_SPACING (160px)
  - [ ] Make grid color configurable
  - **File**: `/frontend/components/DiagramCanvas.tsx`
  - **Acceptance**: Grid visible in editor

- [ ] **Add grid toggle**
  - [ ] Add "Show Grid" checkbox
  - [ ] Persist preference in localStorage
  - [ ] Update grid visibility dynamically
  - **Acceptance**: User can hide/show grid

- [ ] **Grid styling options**
  - [ ] Allow dots vs lines toggle
  - [ ] Adjust grid opacity
  - [ ] Color customization
  - **Acceptance**: Customizable grid appearance

---

## 2.4 Enhanced UI/UX

### 2.4.1 Status & Feedback
**Priority**: P1 | **Effort**: S | **Status**: 🔴

- [ ] **Improve status indicator**
  - [ ] Add colored status badges (green/yellow/red)
  - [ ] Add last saved timestamp
  - [ ] Add connection status indicator
  - [ ] Show save errors prominently
  - **File**: `/frontend/app/page.tsx`
  - **Acceptance**: User always knows save state

- [ ] **Add toast notifications**
  - [ ] Install react-hot-toast or similar
  - [ ] Show success toasts for saves
  - [ ] Show error toasts for failures
  - [ ] Show undo/redo toasts
  - **Acceptance**: Clear action feedback

### 2.4.2 Selection & Highlighting
**Priority**: P1 | **Effort**: S | **Status**: 🔴

- [ ] **Improve selection visuals**
  - [ ] Add selection outline to nodes
  - [ ] Add selection outline to edges
  - [ ] Show selection handles on nodes
  - [ ] Add multi-select with Ctrl+Click
  - **Acceptance**: Clear selection state

- [ ] **Add hover effects**
  - [ ] Highlight nodes on hover
  - [ ] Highlight edges on hover
  - [ ] Show tooltips with node/edge IDs
  - [ ] Change cursor on hover
  - **Acceptance**: Interactive feedback on hover

### 2.4.3 Responsive Design
**Priority**: P2 | **Effort**: M | **Status**: 🔴

- [ ] **Mobile layout**
  - [ ] Stack style panel below canvas on mobile
  - [ ] Make touch-friendly controls
  - [ ] Add pinch-to-zoom gesture
  - [ ] Optimize for smaller screens
  - **Acceptance**: Usable on tablets

- [ ] **Accessibility improvements**
  - [ ] Add ARIA labels to all controls
  - [ ] Ensure keyboard navigation
  - [ ] Add screen reader support
  - [ ] Test with accessibility tools
  - **Acceptance**: Passes WCAG AA

---

# Phase 3: Feature Expansion
**Goal**: Add new features and enhance existing functionality
**Timeline**: 2-4 weeks
**Status**: 🔴 Not Started

## 3.1 Enhanced Styling Options

### 3.1.1 Font Customization
**Priority**: P1 | **Effort**: M | **Status**: 🔴

- [ ] **Backend: Add font fields to Node struct**
  - [ ] Add font_family: Option<String>
  - [ ] Add font_size: Option<f64>
  - [ ] Add font_weight: Option<String>
  - [ ] Update serialization
  - **File**: `/src/diagram/types.rs`
  - **Acceptance**: Font properties stored

- [ ] **Backend: Update SVG rendering**
  - [ ] Apply font-family to text elements
  - [ ] Apply font-size with scaling
  - [ ] Apply font-weight (bold, normal)
  - [ ] Recalculate text bounds with new fonts
  - **File**: `/src/diagram/renderer.rs`
  - **Acceptance**: Fonts render correctly

- [ ] **Frontend: Add font controls**
  - [ ] Add font family dropdown (Arial, Times, Courier, etc.)
  - [ ] Add font size slider (8-32px)
  - [ ] Add font weight toggle (normal/bold)
  - [ ] Update style API calls
  - **File**: `/frontend/components/StylePanel.tsx`
  - **Acceptance**: User can customize fonts

### 3.1.2 Node Size Customization
**Priority**: P1 | **Effort**: M | **Status**: 🔴

- [ ] **Backend: Add size fields to Node struct**
  - [ ] Change width, height from fixed to Option<f64>
  - [ ] Add size validation (min/max)
  - [ ] Update layout algorithm to respect custom sizes
  - **File**: `/src/diagram/types.rs`
  - **Acceptance**: Custom node sizes supported

- [ ] **Frontend: Add size controls**
  - [ ] Add width slider
  - [ ] Add height slider
  - [ ] Add lock aspect ratio toggle
  - [ ] Add resize handles on canvas
  - [ ] Update drag logic to handle resize
  - **File**: `/frontend/components/DiagramCanvas.tsx`
  - **Acceptance**: User can resize nodes

### 3.1.3 Edge Styling
**Priority**: P1 | **Effort**: M | **Status**: 🔴

- [ ] **Backend: Add edge styling fields**
  - [ ] Add line_thickness: Option<f64>
  - [ ] Add line_style: Option<LineStyle> (solid, dashed, dotted)
  - [ ] Add arrow_size: Option<f64>
  - [ ] Update EdgeStyle enum
  - **File**: `/src/diagram/types.rs`
  - **Acceptance**: Edge styles configurable

- [ ] **Backend: Update edge rendering**
  - [ ] Apply stroke-width from line_thickness
  - [ ] Render dotted lines
  - [ ] Scale arrow markers
  - **File**: `/src/diagram/renderer.rs`
  - **Acceptance**: Edge styles render correctly

- [ ] **Frontend: Add edge style controls**
  - [ ] Add thickness slider (1-10px)
  - [ ] Add line style dropdown
  - [ ] Add arrow size control
  - **File**: `/frontend/components/StylePanel.tsx`
  - **Acceptance**: User can style edges

### 3.1.4 Theme System
**Priority**: P2 | **Effort**: L | **Status**: 🔴

- [ ] **Backend: Create theme system**
  - [ ] Create Theme struct with default colors
  - [ ] Add predefined themes (light, dark, colorblind-friendly)
  - [ ] Add theme serialization
  - [ ] Add theme API endpoint
  - **File**: `/src/diagram/theme.rs`
  - **Acceptance**: Multiple themes available

- [ ] **Frontend: Add theme selector**
  - [ ] Create theme picker UI
  - [ ] Apply theme to new nodes
  - [ ] Add "Apply theme to all" button
  - [ ] Persist theme preference
  - **File**: `/frontend/components/ThemePicker.tsx`
  - **Acceptance**: User can switch themes

---

## 3.2 Export Enhancements

### 3.2.1 PDF Export
**Priority**: P1 | **Effort**: M | **Status**: 🔴

- [ ] **Backend: Add PDF rendering**
  - [ ] Add printpdf or pdf-canvas dependency
  - [ ] Implement render_pdf function
  - [ ] Convert SVG to PDF (via rasterization or vector)
  - [ ] Add PDF export CLI flag
  - **File**: `/src/diagram/renderer.rs`
  - **Acceptance**: Can export diagrams to PDF

- [ ] **API: Add PDF endpoint**
  - [ ] Add GET /api/diagram/export/pdf
  - [ ] Return PDF with proper Content-Type
  - [ ] Add custom page size support
  - **File**: `/src/serve.rs`
  - **Acceptance**: Frontend can download PDFs

- [ ] **Frontend: Add PDF export button**
  - [ ] Add "Export PDF" button
  - [ ] Trigger download
  - [ ] Add page size options
  - **File**: `/frontend/app/page.tsx`
  - **Acceptance**: User can export PDF

### 3.2.2 High-DPI PNG Export
**Priority**: P1 | **Effort**: S | **Status**: 🔴

- [ ] **Backend: Add DPI parameter**
  - [ ] Add scale parameter to render_png
  - [ ] Add dpi field to CLI (default 300)
  - [ ] Calculate pixel dimensions from DPI
  - **File**: `/src/diagram/renderer.rs`
  - **Acceptance**: High-res PNGs exportable

- [ ] **Frontend: Add DPI selector**
  - [ ] Add DPI dropdown (72, 150, 300, 600)
  - [ ] Show estimated file size
  - [ ] Update export API call
  - **Acceptance**: User can export high-res images

### 3.2.3 Additional Export Formats
**Priority**: P2 | **Effort**: M | **Status**: 🔴

- [ ] **Add JPEG export**
  - [ ] Add image crate with JPEG encoder
  - [ ] Implement render_jpeg
  - [ ] Add quality parameter
  - **Acceptance**: JPEG export works

- [ ] **Add WebP export**
  - [ ] Add webp encoder
  - [ ] Implement render_webp
  - **Acceptance**: WebP export works

- [ ] **Add PlantUML export** (advanced)
  - [ ] Reverse-engineer diagram to PlantUML
  - [ ] Implement converter
  - **Acceptance**: Can export to PlantUML format

---

## 3.3 Layout Algorithm Improvements

### 3.3.1 Alternative Layout Algorithms
**Priority**: P2 | **Effort**: L | **Status**: 🔴

- [ ] **Implement Sugiyama algorithm**
  - [ ] Research layered graph drawing
  - [ ] Implement node layering
  - [ ] Implement crossing minimization
  - [ ] Implement coordinate assignment
  - **File**: `/src/diagram/layout/sugiyama.rs`
  - **Acceptance**: Better layouts for complex graphs

- [ ] **Implement force-directed layout**
  - [ ] Research spring-embedder algorithm
  - [ ] Implement attraction/repulsion forces
  - [ ] Add simulation loop
  - [ ] Add stabilization detection
  - **File**: `/src/diagram/layout/force_directed.rs`
  - **Acceptance**: Organic-looking layouts

- [ ] **Add layout algorithm selector**
  - [ ] Add --layout CLI flag (auto, sugiyama, force)
  - [ ] Add layout API parameter
  - [ ] Create LayoutStrategy enum
  - **Acceptance**: User can choose algorithm

### 3.3.2 Layout Constraints
**Priority**: P2 | **Effort**: M | **Status**: 🔴

- [ ] **Add alignment constraints**
  - [ ] Align nodes horizontally
  - [ ] Align nodes vertically
  - [ ] Distribute nodes evenly
  - **File**: `/src/diagram/layout/constraints.rs`
  - **Acceptance**: Can specify alignment rules

- [ ] **Add fixed node positions**
  - [ ] Respect locked node positions
  - [ ] Layout around fixed nodes
  - [ ] Add "Lock position" UI toggle
  - **Acceptance**: Can pin nodes in place

---

## 3.4 Diagram Type Support

### 3.4.1 Sequence Diagram Support
**Priority**: P1 | **Effort**: XL | **Status**: 🔴

- [ ] **Research Mermaid sequence syntax**
  - [ ] Document sequence diagram grammar
  - [ ] Identify key elements (participants, messages, activations)
  - **Acceptance**: Syntax understood

- [ ] **Backend: Parse sequence diagrams**
  - [ ] Create SequenceDiagram struct
  - [ ] Implement parser for sequence syntax
  - [ ] Add to DiagramType enum
  - **File**: `/src/diagram/parser.rs`
  - **Acceptance**: Can parse sequence diagrams

- [ ] **Backend: Layout sequence diagrams**
  - [ ] Implement vertical timeline layout
  - [ ] Calculate participant spacing
  - [ ] Calculate message routing
  - [ ] Handle activation boxes
  - **File**: `/src/diagram/layout/sequence.rs`
  - **Acceptance**: Sequence diagrams layout correctly

- [ ] **Backend: Render sequence diagrams**
  - [ ] Render participant boxes
  - [ ] Render lifelines
  - [ ] Render messages with arrows
  - [ ] Render activation boxes
  - [ ] Render notes
  - **File**: `/src/diagram/renderer.rs`
  - **Acceptance**: Sequence diagrams render correctly

- [ ] **Frontend: Sequence diagram editing**
  - [ ] Detect sequence diagram type
  - [ ] Add participant reordering
  - [ ] Add message editing
  - [ ] Update style panel for sequence elements
  - **Acceptance**: Can edit sequence diagrams interactively

### 3.4.2 State Diagram Support
**Priority**: P2 | **Effort**: L | **Status**: 🔴

- [ ] **Backend: Parse state diagrams**
  - [ ] Create StateDiagram struct
  - [ ] Implement state diagram parser
  - [ ] Handle state transitions
  - **File**: `/src/diagram/parser.rs`
  - **Acceptance**: Can parse state diagrams

- [ ] **Backend: Layout state diagrams**
  - [ ] Implement state positioning
  - [ ] Calculate transition curves
  - **File**: `/src/diagram/layout/state.rs`
  - **Acceptance**: State diagrams layout well

- [ ] **Backend: Render state diagrams**
  - [ ] Render state boxes with rounded corners
  - [ ] Render transitions with labels
  - [ ] Render start/end states
  - **Acceptance**: State diagrams render correctly

### 3.4.3 Class Diagram Support
**Priority**: P2 | **Effort**: XL | **Status**: 🔴

- [ ] **Backend: Parse class diagrams**
  - [ ] Create ClassDiagram struct
  - [ ] Parse classes with attributes/methods
  - [ ] Parse relationships (inheritance, composition, etc.)
  - **File**: `/src/diagram/parser.rs`
  - **Acceptance**: Can parse class diagrams

- [ ] **Backend: Layout class diagrams**
  - [ ] Position classes hierarchically
  - [ ] Route relationship lines
  - **File**: `/src/diagram/layout/class.rs`
  - **Acceptance**: Class diagrams layout clearly

- [ ] **Backend: Render class diagrams**
  - [ ] Render class boxes with sections
  - [ ] Render relationship lines
  - [ ] Render multiplicity labels
  - **Acceptance**: Class diagrams render correctly

---

## 3.5 Performance Optimizations

### 3.5.1 Incremental Layout
**Priority**: P1 | **Effort**: L | **Status**: 🔴

- [ ] **Implement dirty tracking**
  - [ ] Track which nodes moved
  - [ ] Track which edges changed
  - [ ] Only recompute affected regions
  - **File**: `/src/diagram/layout.rs`
  - **Acceptance**: Layout faster for small changes

- [ ] **Implement layout caching**
  - [ ] Cache computed positions
  - [ ] Cache edge routes
  - [ ] Invalidate on source changes
  - **File**: `/src/diagram/cache.rs`
  - **Acceptance**: Subsequent renders are fast

### 3.5.2 Rendering Optimizations
**Priority**: P1 | **Effort**: M | **Status**: 🔴

- [ ] **Optimize SVG generation**
  - [ ] Use DOM builder instead of string concatenation
  - [ ] Minimize SVG size (remove whitespace)
  - [ ] Use CSS classes for repeated styles
  - **File**: `/src/diagram/renderer.rs`
  - **Acceptance**: SVG generation 2x faster

- [ ] **Add rendering memoization**
  - [ ] Cache rendered SVG for unchanged diagrams
  - [ ] Use content-based cache key
  - **Acceptance**: Skip rendering when possible

### 3.5.3 Frontend Performance
**Priority**: P1 | **Effort**: M | **Status**: 🔴

- [ ] **Optimize canvas rendering**
  - [ ] Use React.memo for components
  - [ ] Virtualize large diagrams
  - [ ] Throttle drag events
  - **File**: `/frontend/components/DiagramCanvas.tsx`
  - **Acceptance**: Smooth 60fps dragging

- [ ] **Optimize API calls**
  - [ ] Debounce API requests
  - [ ] Batch multiple changes
  - [ ] Add request deduplication
  - **File**: `/frontend/lib/api.ts`
  - **Acceptance**: Fewer network requests

---

# Phase 4: Advanced Features
**Goal**: Add advanced capabilities for power users
**Timeline**: 4+ weeks
**Status**: 🔴 Not Started

## 4.1 WASM Integration

### 4.1.1 Client-Side Rendering
**Priority**: P1 | **Effort**: L | **Status**: 🔴

- [ ] **Package WASM module**
  - [ ] Build oxdraw.wasm with wasm-pack
  - [ ] Create npm package
  - [ ] Add TypeScript definitions
  - **File**: `/pkg/`
  - **Acceptance**: WASM module usable from JS

- [ ] **Frontend: Import WASM module**
  - [ ] Add WASM to frontend dependencies
  - [ ] Initialize WASM on load
  - [ ] Handle loading states
  - **File**: `/frontend/lib/wasm.ts`
  - **Acceptance**: WASM loads in browser

- [ ] **Move rendering to client**
  - [ ] Call WASM render functions
  - [ ] Handle layout computation in browser
  - [ ] Only sync source/overrides to server
  - **Acceptance**: Layout happens client-side

- [ ] **Add offline mode**
  - [ ] Detect network connectivity
  - [ ] Queue changes when offline
  - [ ] Sync when back online
  - **Acceptance**: Works without server connection

### 4.1.2 Performance Comparison
**Priority**: P2 | **Effort**: S | **Status**: 🔴

- [ ] **Benchmark WASM vs Server**
  - [ ] Measure layout time (WASM vs HTTP)
  - [ ] Measure total roundtrip time
  - [ ] Test with various diagram sizes
  - **Acceptance**: Know when to use WASM vs server

---

## 4.2 Collaborative Features

### 4.2.1 Real-Time Collaboration
**Priority**: P2 | **Effort**: XL | **Status**: 🔴

- [ ] **Backend: Add WebSocket support**
  - [ ] Add tokio-tungstenite dependency
  - [ ] Create WebSocket endpoint
  - [ ] Implement broadcast mechanism
  - **File**: `/src/serve.rs`
  - **Acceptance**: WebSocket connections work

- [ ] **Backend: Implement operational transform (OT)**
  - [ ] Research OT algorithms
  - [ ] Implement position conflict resolution
  - [ ] Handle concurrent edits
  - **File**: `/src/collaboration/ot.rs`
  - **Acceptance**: Concurrent edits merge correctly

- [ ] **Frontend: Add WebSocket client**
  - [ ] Connect to WebSocket on load
  - [ ] Send changes to server
  - [ ] Receive and apply changes from others
  - [ ] Show other users' cursors
  - **File**: `/frontend/lib/collaboration.ts`
  - **Acceptance**: See changes in real-time

- [ ] **Add presence system**
  - [ ] Show active users list
  - [ ] Show user cursors on canvas
  - [ ] Show who's editing what
  - **Acceptance**: Collaborative awareness

### 4.2.2 Comments & Annotations
**Priority**: P2 | **Effort**: L | **Status**: 🔴

- [ ] **Backend: Add comment system**
  - [ ] Create Comment struct with position
  - [ ] Add comments to diagram storage
  - [ ] Create comment API endpoints
  - **File**: `/src/diagram/types.rs`
  - **Acceptance**: Comments persist

- [ ] **Frontend: Add comment UI**
  - [ ] Right-click to add comment
  - [ ] Render comment markers on canvas
  - [ ] Show comment threads
  - [ ] Add resolve/unresolve
  - **File**: `/frontend/components/Comments.tsx`
  - **Acceptance**: Can discuss diagrams in context

### 4.2.3 Version History
**Priority**: P2 | **Effort**: XL | **Status**: 🔴

- [ ] **Backend: Add versioning**
  - [ ] Store diagram versions in database
  - [ ] Add version API endpoints
  - [ ] Implement diff calculation
  - **File**: `/src/versioning/mod.rs`
  - **Acceptance**: All versions stored

- [ ] **Frontend: Add version browser**
  - [ ] Show version timeline
  - [ ] Preview previous versions
  - [ ] Add restore functionality
  - [ ] Show visual diffs
  - **File**: `/frontend/components/VersionHistory.tsx`
  - **Acceptance**: Can browse and restore versions

---

## 4.3 Plugin System

### 4.3.1 Plugin Architecture
**Priority**: P3 | **Effort**: XL | **Status**: 🔴

- [ ] **Design plugin API**
  - [ ] Define plugin interface
  - [ ] Create plugin lifecycle hooks
  - [ ] Design plugin manifest format
  - **File**: `/docs/PLUGIN_API.md`
  - **Acceptance**: Plugin architecture designed

- [ ] **Backend: Implement plugin loader**
  - [ ] Add dynamic library loading
  - [ ] Sandbox plugin execution
  - [ ] Create plugin registry
  - **File**: `/src/plugins/mod.rs`
  - **Acceptance**: Can load plugins

- [ ] **Create example plugins**
  - [ ] Custom shape plugin
  - [ ] Custom layout algorithm plugin
  - [ ] Export format plugin
  - **File**: `/examples/plugins/`
  - **Acceptance**: Plugins work

---

## 4.4 Advanced Editor Features

### 4.4.1 Layers & Grouping
**Priority**: P2 | **Effort**: L | **Status**: 🔴

- [ ] **Backend: Add layer support**
  - [ ] Add layer field to nodes/edges
  - [ ] Add layer visibility
  - [ ] Add layer locking
  - **File**: `/src/diagram/types.rs`
  - **Acceptance**: Elements can be layered

- [ ] **Frontend: Add layers panel**
  - [ ] Show layer list
  - [ ] Toggle layer visibility
  - [ ] Reorder layers
  - [ ] Lock/unlock layers
  - **File**: `/frontend/components/LayersPanel.tsx`
  - **Acceptance**: Can manage layers

### 4.4.2 Smart Guides
**Priority**: P2 | **Effort**: M | **Status**: 🔴

- [ ] **Implement alignment guides**
  - [ ] Detect alignment while dragging
  - [ ] Show guide lines
  - [ ] Snap to guides
  - **File**: `/frontend/components/DiagramCanvas.tsx`
  - **Acceptance**: Easier precise alignment

- [ ] **Implement spacing guides**
  - [ ] Detect equal spacing
  - [ ] Show spacing indicators
  - **Acceptance**: Distribute nodes evenly

### 4.4.3 Search & Replace
**Priority**: P2 | **Effort**: M | **Status**: 🔴

- [ ] **Add search functionality**
  - [ ] Search node labels
  - [ ] Search edge labels
  - [ ] Highlight matches
  - [ ] Navigate between results
  - **File**: `/frontend/components/SearchPanel.tsx`
  - **Acceptance**: Can find elements quickly

- [ ] **Add replace functionality**
  - [ ] Replace node text
  - [ ] Replace all matches
  - [ ] Show preview before replace
  - **Acceptance**: Bulk text updates easy

---

# Phase 5: Enterprise & Polish
**Goal**: Production readiness for teams and organizations
**Timeline**: Ongoing
**Status**: 🔴 Not Started

## 5.1 Deployment & Operations

### 5.1.1 Docker Support
**Priority**: P1 | **Effort**: M | **Status**: 🔴

- [ ] **Create Dockerfile**
  - [ ] Multi-stage build (frontend + backend)
  - [ ] Minimize image size
  - [ ] Add healthcheck
  - **File**: `/Dockerfile`
  - **Acceptance**: Docker image builds

- [ ] **Create docker-compose.yml**
  - [ ] Configure oxdraw service
  - [ ] Add volume mounts
  - [ ] Configure ports
  - **File**: `/docker-compose.yml`
  - **Acceptance**: One-command deployment

- [ ] **Publish to Docker Hub**
  - [ ] Set up automated builds
  - [ ] Tag versions
  - [ ] Add documentation
  - **Acceptance**: `docker pull oxdraw/oxdraw` works

### 5.1.2 Monitoring & Observability
**Priority**: P2 | **Effort**: L | **Status**: 🔴

- [ ] **Add structured logging**
  - [ ] Replace println! with tracing
  - [ ] Add log levels
  - [ ] Log important events
  - **File**: `/src/**/*.rs`
  - **Acceptance**: JSON-structured logs

- [ ] **Add metrics**
  - [ ] Add prometheus metrics
  - [ ] Track request latency
  - [ ] Track diagram render time
  - [ ] Track active connections
  - **File**: `/src/metrics.rs`
  - **Acceptance**: Metrics endpoint available

- [ ] **Add health check endpoint**
  - [ ] Implement GET /health
  - [ ] Check database connection (if added)
  - [ ] Check disk space
  - **Acceptance**: Health monitoring works

### 5.1.3 Configuration Management
**Priority**: P2 | **Effort**: M | **Status**: 🔴

- [ ] **Add configuration file support**
  - [ ] Create config.toml format
  - [ ] Support environment variables
  - [ ] Add config validation
  - **File**: `/src/config.rs`
  - **Acceptance**: Configurable via file

- [ ] **Add feature flags**
  - [ ] Runtime feature toggles
  - [ ] Per-user features (if auth added)
  - **Acceptance**: Can enable/disable features

---

## 5.2 Security & Authentication

### 5.2.1 Authentication System
**Priority**: P2 | **Effort**: XL | **Status**: 🔴

- [ ] **Add user authentication**
  - [ ] Choose auth strategy (JWT, sessions)
  - [ ] Implement login/logout
  - [ ] Add password hashing
  - [ ] Add user database
  - **File**: `/src/auth/mod.rs`
  - **Acceptance**: Users can authenticate

- [ ] **Add authorization**
  - [ ] Implement role-based access control
  - [ ] Add diagram permissions
  - [ ] Protect API endpoints
  - **Acceptance**: Authorized access only

### 5.2.2 Security Hardening
**Priority**: P1 | **Effort**: M | **Status**: 🔴

- [ ] **Add rate limiting**
  - [ ] Implement per-IP rate limits
  - [ ] Add API key support
  - [ ] Add abuse prevention
  - **File**: `/src/middleware/rate_limit.rs`
  - **Acceptance**: Protected from abuse

- [ ] **Add input validation**
  - [ ] Validate all API inputs
  - [ ] Sanitize file paths
  - [ ] Prevent path traversal
  - [ ] Add request size limits
  - **Acceptance**: No injection vulnerabilities

- [ ] **Add HTTPS support**
  - [ ] Add TLS configuration
  - [ ] Support Let's Encrypt
  - [ ] Force HTTPS redirects
  - **Acceptance**: Secure connections

---

## 5.3 Database Integration

### 5.3.1 Database Backend
**Priority**: P2 | **Effort**: XL | **Status**: 🔴

- [ ] **Choose database** (SQLite, PostgreSQL)
  - [ ] Research options
  - [ ] Evaluate for use case
  - **Acceptance**: Database selected

- [ ] **Add database layer**
  - [ ] Add sqlx or diesel dependency
  - [ ] Create schema migrations
  - [ ] Implement repository pattern
  - **File**: `/src/db/mod.rs`
  - **Acceptance**: Database integrated

- [ ] **Migrate from file storage**
  - [ ] Store diagrams in database
  - [ ] Add migration tool
  - [ ] Keep file export option
  - **Acceptance**: Database storage works

---

## 5.4 API Improvements

### 5.4.1 REST API Enhancements
**Priority**: P2 | **Effort**: M | **Status**: 🔴

- [ ] **Add pagination**
  - [ ] Paginate diagram lists
  - [ ] Add cursor-based pagination
  - **Acceptance**: Scalable API

- [ ] **Add filtering & sorting**
  - [ ] Filter diagrams by type
  - [ ] Sort by date, name
  - **Acceptance**: Discoverable diagrams

- [ ] **Add bulk operations**
  - [ ] Bulk delete
  - [ ] Bulk export
  - **Acceptance**: Efficient operations

### 5.4.2 GraphQL API (Optional)
**Priority**: P3 | **Effort**: XL | **Status**: 🔴

- [ ] **Add GraphQL endpoint**
  - [ ] Add async-graphql dependency
  - [ ] Define schema
  - [ ] Implement resolvers
  - **File**: `/src/graphql/mod.rs`
  - **Acceptance**: GraphQL API works

---

## 5.5 Developer Experience

### 5.5.1 Developer Tools
**Priority**: P2 | **Effort**: M | **Status**: 🔴

- [ ] **Add debug mode**
  - [ ] Show layout boxes
  - [ ] Show collision areas
  - [ ] Show routing paths
  - **Acceptance**: Easier debugging

- [ ] **Add development server**
  - [ ] Hot reload for frontend
  - [ ] Auto-restart backend on changes
  - **Acceptance**: Faster development

### 5.5.2 CLI Improvements
**Priority**: P2 | **Effort**: M | **Status**: 🔴

- [ ] **Add interactive mode**
  - [ ] REPL for diagram manipulation
  - [ ] Tab completion
  - **Acceptance**: Interactive CLI

- [ ] **Add batch processing**
  - [ ] Process multiple files
  - [ ] Parallel rendering
  - **Acceptance**: Efficient bulk operations

---

## 5.6 Community & Ecosystem

### 5.6.1 Documentation Site
**Priority**: P2 | **Effort**: L | **Status**: 🔴

- [ ] **Create documentation site**
  - [ ] Use mdBook or Docusaurus
  - [ ] Add tutorials
  - [ ] Add API reference
  - [ ] Add examples gallery
  - **File**: `/docs-site/`
  - **Acceptance**: Comprehensive documentation

- [ ] **Add playground**
  - [ ] Web-based live editor
  - [ ] Share diagrams via URL
  - **Acceptance**: Try without installing

### 5.6.2 Package Distribution
**Priority**: P1 | **Effort**: M | **Status**: 🔴

- [ ] **Publish to crates.io**
  - [ ] Prepare package metadata
  - [ ] Add keywords, categories
  - [ ] Publish release
  - **Acceptance**: `cargo install oxdraw` works

- [ ] **Add to package managers**
  - [ ] Homebrew formula (macOS)
  - [ ] AUR package (Arch Linux)
  - [ ] Snap package (Ubuntu)
  - [ ] Chocolatey package (Windows)
  - **Acceptance**: Easy installation on all platforms

### 5.6.3 VS Code Extension
**Priority**: P2 | **Effort**: L | **Status**: 🔴

- [ ] **Create VS Code extension**
  - [ ] Preview .mmd files
  - [ ] Syntax highlighting
  - [ ] Live preview on save
  - [ ] Quick edit button
  - **File**: `/vscode-extension/`
  - **Acceptance**: VS Code integration works

---

# Appendix

## A. Quick Win Checklist
These tasks provide maximum impact with minimal effort:

- [ ] Add undo/redo (2.1.1) - **3-4 hours**
- [ ] Implement keyboard shortcuts (2.1.2-2.1.3) - **2-3 hours**
- [ ] Add shortcuts help modal (2.1.4) - **1 hour**
- [ ] Show background grid (2.3.1) - **1-2 hours**
- [ ] Improve status indicators (2.4.1) - **2 hours**
- [ ] Add selection visuals (2.4.2) - **2 hours**
- [ ] Document layout algorithm (1.1.1) - **4-6 hours**
- [ ] Split diagram.rs module (1.3.1) - **6-8 hours**

**Total Quick Wins**: ~25-35 hours of work, huge UX improvement

---

## B. Dependencies Between Tasks

**Critical Path**:
1. Module refactoring (1.3.1) should come before most backend features
2. Undo/redo (2.1.1) should come before copy/paste (2.1.1)
3. Zoom/pan (2.2) should come before minimap (2.2.2)
4. WASM packaging (4.1.1) needed before offline mode (4.1.1)
5. Authentication (5.2.1) needed before collaboration (4.2)

---

## C. Estimated Total Effort

| Phase | Estimated Effort |
|-------|------------------|
| Phase 1: Foundation | 80-120 hours |
| Phase 2: UX Improvements | 40-60 hours |
| Phase 3: Feature Expansion | 120-180 hours |
| Phase 4: Advanced Features | 200-300 hours |
| Phase 5: Enterprise & Polish | 150-250 hours |
| **Total** | **590-910 hours** |

---

## D. Maintenance Tasks (Ongoing)

- [ ] Update dependencies monthly
- [ ] Review and merge community PRs
- [ ] Triage GitHub issues
- [ ] Update documentation for new features
- [ ] Monitor performance metrics
- [ ] Address security vulnerabilities
- [ ] Improve test coverage incrementally
- [ ] Refactor code as needed

---

**End of TODO.md**
