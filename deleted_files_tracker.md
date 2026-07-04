# Deleted Files Tracker

This document tracks files and directories that were intentionally removed from the project to clean up unused or deprecated features (like the Organiser, Trainer, and Manager portals).

## Deletions on July 4, 2026

**Routes:**
- `src/routes/admin/organiser.jsx` - Unused Organiser portal route
- `src/routes/admin/trainer.js` - Unused Trainer portal route

**Components:**
- `src/components/organiser-sidebar.jsx` - Sidebar for the deleted Organiser portal
- `src/components/trainer-sidebar.js` (and `.jsx`) - Sidebar for the deleted Trainer portal
- `src/components/manager/` (Entire Directory) - Unused components for the deprecated Manager portal

**Mock Data:**
- `src/lib/mock-data/manager-data.js` - Mock data tied to the deleted Manager portal

*(Note: Earlier, routes for `/organiser`, `/trainer`, and `/manager` were also completely removed from `src/routes/` to streamline the platform into just Admin and Student portals.)*

**Root Directory Cleanup (Temporary/Stray Files):**
- `*.java` (e.g. `CategoryEntity.java`, `CourseEntity.java`, etc.) - Stray backend files that were mistakenly left in the root frontend directory.
- `*.pdf` (`LMS.pdf`, `LMS Architecture BRD.pdf`) - Old documentation files.
- `*.js`/`*.cjs`/`*.mjs`/`*.py` (e.g. `migrate.cjs`, `test_api.js`, `refactor_builder.py`, etc.) - Temporary one-off utility/refactoring scripts.
- `scratch/` (Entire Directory) - Contained 25+ temporary CommonJS automation scripts used for past refactoring tasks.
- `*.log`/`*.txt`/`*.md` (`frontend-dev.log`, `lint_output.txt`, `engineering_audit_report.md`, `final_cleanup_report.md`) - Temporary console logs and generated audit reports.
- `ui design/` and `Brand colours .png` - Stray UI design references.
