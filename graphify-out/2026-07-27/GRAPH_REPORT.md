# Graph Report - .  (2026-07-27)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 27 nodes · 19 edges · 8 communities (5 shown, 3 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 305 input · 22 output

## Graph Freshness
- Built from commit: `99c05814`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Invoice Automation Service
- LunaVision Brand Assets
- KI-Content-Agent Slide 1
- LinkedIn Post Caption: KI Bild Kontrolle
- Generative Engine Optimization (GEO)
- Termin-Chat Template
- LinkedIn Post: Haltung vs Corporate
- LinkedIn Post: KI-Erkennung 94 Prozent

## God Nodes (most connected - your core abstractions)
1. `Rechnungsautomatisierung Service` - 4 edges
2. `LunaVision Landingpage` - 3 edges
3. `Generative Engine Optimization (GEO)` - 3 edges
4. `KI-Content-Agent Slide 1` - 2 edges
5. `Rechnungsautomatisierung Slide 1` - 2 edges
6. `LunaVision Brand` - 2 edges
7. `KI-Content-Agent Service` - 2 edges
8. `LinkedIn Post Caption: KI Bild Kontrolle` - 2 edges
9. `LunaVision` - 2 edges
10. `Google Termin Anfrage Seite` - 1 edges

## Surprising Connections (you probably didn't know these)
- `LunaVision Landingpage` --references--> `Landingpage Mockup`  [EXTRACTED]
  index.html → assets/hero-mockup-final.png
- `LunaVision Landingpage` --references--> `LunaVision Logo`  [EXTRACTED]
  index.html → assets/logo.png
- `Termin-Chat Template` --references--> `Barbershop Aso 3 Logo`  [INFERRED]
  shops/1TEMPLATE/index.html → shops/kunden/barbershop-aso3-ludwigshafen/assets/logo.png
- `Google Termin Anfrage Seite` --conceptually_related_to--> `LunaVision Brand`  [EXTRACTED]
  GoogleTerminPage.html → index.html
- `KI-Content-Agent Slide 1` --references--> `Chicago Skyline Night Photo`  [EXTRACTED]
  02 Projekte/LunaVision-Instagram-Content-Preview/2026-08 August/Karussells/02-karussell-ki-content-agent-deep-dive/slide-1-cover.html → 02 Projekte/LunaVision-Instagram-Content-Preview/2026-08 August/Karussells/02-karussell-ki-content-agent-deep-dive/slide-1-cover.png

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **LunaVision Service Portfolio** — index, ki_content_agent_service, rechnungsautomatisierung_service, googleterminpage [INFERRED 0.90]
- **GEO Marketing Campaign** — assets_final_posts_linkedin_post_geo, assets_final_posts_linkedin_post_geo_v2, assets_final_posts_linkedin_post_geo_v3, geo_concept [EXTRACTED 0.90]
- **LunaVision Quality Control Process** — assets_final_posts_ki_bild_kontrolle_caption, assets_final_posts_ki_bild_kontrolle_ki_bild_kontrolle, lunavision_concept [EXTRACTED 0.95]

## Communities (8 total, 3 thin omitted)

### Community 0 - "Invoice Automation Service"
Cohesion: 0.33
Nodes (6): Rechnungsautomatisierung Caption, Rechnungsautomatisierung Konzept A, Rechnungsautomatisierung Konzept B, Rechnungsautomatisierung Slide 1, Circuit Grid Background, Rechnungsautomatisierung Service

### Community 1 - "LunaVision Brand Assets"
Cohesion: 0.40
Nodes (5): Landingpage Mockup, LunaVision Logo, Google Termin Anfrage Seite, LunaVision Landingpage, LunaVision Brand

### Community 2 - "KI-Content-Agent Slide 1"
Cohesion: 0.50
Nodes (4): KI-Content-Agent Caption, KI-Content-Agent Slide 1, Chicago Skyline Night Photo, KI-Content-Agent Service

### Community 3 - "LinkedIn Post Caption: KI Bild Kontrolle"
Cohesion: 0.50
Nodes (4): LinkedIn Post Caption: KI Bild Kontrolle, LinkedIn Post: Lorem Ipsum Bildkontrolle, LinkedIn Post: KI-Content-Agent, LunaVision

### Community 4 - "Generative Engine Optimization (GEO)"
Cohesion: 0.50
Nodes (4): LinkedIn Post: GEO Google Reicht Nicht Mehr, LinkedIn Post: GEO KI-Antwort Existenz, LinkedIn Post: GEO Kunden fragen KI, Generative Engine Optimization (GEO)

## Knowledge Gaps
- **18 isolated node(s):** `Google Termin Anfrage Seite`, `KI-Content-Agent Caption`, `Rechnungsautomatisierung Caption`, `Rechnungsautomatisierung Konzept A`, `Rechnungsautomatisierung Konzept B` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `Google Termin Anfrage Seite`, `KI-Content-Agent Caption`, `Rechnungsautomatisierung Caption` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._