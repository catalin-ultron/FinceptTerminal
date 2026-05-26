# Ultron Audit Report — FinceptTerminal

**Repository:** `Fincept-Corporation/FinceptTerminal`  
**Branch:** `feat/ultron-audit-deploy`  
**Date:** Auto-generated during audit  
**Auditor:** Ultron (automated audit + sub-agent exploration)

---

## 1. Project Identity

| Attribute | Value |
|-----------|-------|
| **Name** | Fincept Terminal v4 |
| **Type** | Native C++20 / Qt6 Desktop Application |
| **License** | AGPL-3.0 (with Commercial License alternative) |
| **Lines of Code** | ~342,000 lines of C++ |
| **Primary UI** | Qt6 Widgets (not web-based) |
| **Embedded Runtime** | Python 3.11+ (analytics, ML, LLM agents) |

This is a Bloomberg-style multi-window financial workstation. It is **not** a web application, SPA, or static site. It is a single native binary.

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Language | C++20 | — |
| UI Framework | Qt6 | 6.8.3 (pinned exact) |
| Build System | CMake | >= 3.27 |
| Generator | Ninja | — |
| Compiler | GCC | >= 12.3 |
| Embedded Analytics | Python | >= 3.11 |
| Key Qt Modules | Widgets, Charts, WebSockets, Multimedia, TextToSpeech | — |

---

## 3. Build Requirements

### 3.1 System Dependencies
- `cmake` >= 3.27
- `ninja-build`
- `g++` >= 12.3
- `python3` >= 3.11, `python3-pip`
- Mesa / X11 / XCB development libraries
- `libssl-dev`, `libsecret-1-dev`
- `libpulse-dev`, `libgstreamer1.0-dev`, `libasound2-dev` (multimedia)
- OpenGL / EGL development headers

### 3.2 Qt Installation
Qt 6.8.3 must be installed via `aqtinstall` or the Qt Online Installer. System Qt packages may work but the minor version must match.

### 3.3 Python Environment
The application bootstraps a Python venv on first run using `resources/requirements-numpy2.txt` (or `requirements-numpy1.txt`). This includes:
- NumPy 2.x, pandas, PyTorch, scikit-learn
- CCXT, yfinance, vnpy
- OpenAI, Anthropic, Google LLM SDKs
- LangChain, Agno, Selenium

Installing this environment in a fresh container is slow and often fails due to missing BLAS/LAPACK/OpenSSL headers.

### 3.4 FetchContent Dependencies (auto-downloaded at configure time)
- QXlsx
- md4c
- QGeoView
- QtADS (Advanced Docking System)
- ed25519

---

## 4. Build Steps (from upstream docs)

```bash
cd fincept-qt
cmake --preset linux-release -DCMAKE_PREFIX_PATH=<qt-install-path>
cmake --build --preset linux-release
```

Or use the automated `setup.sh`:
```bash
./setup.sh --ci
```

---

## 5. Audit Findings

### 5.1 What Works
- Repository cloned successfully to user's GitHub fork (`catalin-ultron/FinceptTerminal`)
- Git branch `feat/ultron-audit-deploy` created and pushed
- Explore agents successfully mapped the full architecture

### 5.2 What Is Stubbed / Not Deployable
- **No web UI exists.** This is a native Qt desktop app. It cannot be deployed to Workers for Platforms, Vercel, or any static hosting platform.
- **No headless build option.** The CMakeLists.txt defines exactly one executable target (`FinceptTerminal`) with unconditional Qt Widgets linkage. There is no `NO_GUI`, `CLI_ONLY`, or `CONSOLE` mode.
- **No tests directory.** `FINCEPT_BUILD_TESTS` option exists but the referenced `tests/` subdirectory is missing from the repository.
- **No docs static site.** The `docs/` folder contains plain Markdown only (no MkDocs, Docusaurus, etc.).
- **No Docker daemon available** in the Ultron container to attempt `docker build`.

### 5.3 Concrete Blockers in Ultron Sandbox

| Blocker | Evidence | Severity |
|---------|----------|----------|
| **No Qt 6.8.3 installed** | `ls /usr/lib/x86_64-linux-gnu/ \| grep -i qt` returns nothing | CRITICAL |
| **No CMake / Ninja** initially| `which cmake` / `which ninja` returned nothing | RESOLVED — installed cmake 3.31.6 and ninja via apt |
| **No display server (X11/Wayland)** | Headless container; Qt apps need `QT_QPA_PLATFORM=offscreen` or Xvfb | CRITICAL |
| **No Docker daemon** | `docker --version` returned nothing | HIGH — cannot run upstream Dockerfile |
| **Heavy Python bootstrap** | 1300+ Python scripts; requirements include PyTorch/ML stack | MEDIUM — would fail on missing system headers |
| **Native-only target** | `src/app/main.cpp` hardcodes `QApplication` | CRITICAL — no alternative entry point |

### 5.4 CMake Configure Result
> *Note: A background job attempted `cmake --preset linux-release`. The output will be appended below once complete.*

---

## 6. Architecture Summary (from sub-agent exploration)

```
FinceptTerminal (single native binary)
├── Presentation Layer
│   ├── 54 screens (lazy instantiation)
│   ├── ADS dock manager (QtADS)
│   └── Dashboard widgets
├── Application Layer (~50 bounded-context services)
│   ├── Markets, News, Economics, Geopolitics
│   ├── Trading (16 broker adapters, crypto exchanges)
│   ├── AI Agents (37 local + cloud LLM agents)
│   ├── Wallet, Staking, Backtesting
│   └── QuantLib integration (18 modules)
├── Data Plane
│   └── DataHub (pub/sub topics + CacheManager)
├── Integration Layer
│   ├── HTTP client, WebSocket client
│   ├── MCP tools (40+ tools, local HTTP bridge)
│   └── Python runner (QProcess bridge)
└── Infrastructure
    ├── SQLite databases + 31 migrations
    ├── SecureStorage (AES-256-GCM)
    ├── Session management, i18n, telemetry
    └── Logging, crash handling
```

---

## 7. Deployment Assessment

| Target | Feasibility | Notes |
|--------|-------------|-------|
| **Workers for Platforms** | NOT POSSIBLE | Not a static site or SPA |
| **Vercel / Netlify** | NOT POSSIBLE | No web frontend |
| **Container (Docker)** | POSSIBLE on host with Docker | Dockerfile exists but needs display at runtime |
| **Native Linux binary** | POSSIBLE with full toolchain | Requires Qt 6.8.3 + system deps + Python venv |
| **Web port / rewrite** | MAJOR PROJECT | Would require rebuilding the entire UI in a web framework |

---

## 8. Recommendations

1. **Accept that this is a desktop app.** The upstream project is explicitly a native Qt6 financial terminal. It is not designed for web deployment and a port would be a multi-month engineering effort.
2. **Use Docker on a Linux host with X11 forwarding** if you need to run it headlessly in a cloud environment:
   ```bash
   docker run --rm -it --net=host \
     -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix \
     fincept/terminal:4.0.3
   ```
3. **Build natively for local use** following `docs/GETTING_STARTED.md` on a Linux workstation with Qt 6.8.3 installed.
4. **If a web dashboard is needed**, consider building a separate lightweight web app that consumes the same data APIs (Polygon, FRED, Yahoo Finance, etc.) rather than porting this codebase.

---

## 9. Audit Artifacts

- Fork: `https://github.com/catalin-ultron/FinceptTerminal`
- Branch: `feat/ultron-audit-deploy`
- This report: `ULTRON_AUDIT_REPORT.md` (committed to branch)
- CMake configure log: appended to this report after background job completion
