import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderOpen,
  Plus,
  Search,
  FileText,
  Video,
  FileSpreadsheet,
  Download,
  Trash2,
  Table as TableIcon,
  X,
  Check,
  CheckCircle,
  Eye,
  Columns,
  Grid,
} from "lucide-react";
import { toast } from "sonner";
import { ModuleHeroBanner } from "@/components/module-hero-banner";

export const Route = createFileRoute("/organiser/content-library/")({
  component: ContentLibraryView,
});

const initialAssets = [
  { id: "a1", type: "pdf", title: "Domain Driven Design Guide", size: "4.2 MB", course: "Enterprise Architecture", scope: "University of Tech", date: "2026-06-18" },
  { id: "a2", type: "video", title: "Monolith to Microservices Journey", duration: "18:40", course: "Microservices Boot", scope: "All", date: "2026-06-20" },
  { id: "a3", type: "ppt", title: "Event Sourcing Architecture Layout", slides: 32, course: "Enterprise Architecture", scope: "University of Tech", date: "2026-06-12" },
  { id: "a4", type: "table", title: "gRPC vs REST Benchmarks", rows: 6, course: "Microservices Boot", scope: "All", date: "2026-06-22" },
  { id: "a5", type: "notes", title: "Sagas Orchestration Checklist", words: 850, course: "Microservices Boot", scope: "Central Academy", date: "2026-06-15" },
];

// Reference comparison table data
const mockComparisons = {
  title: "SQL vs NoSQL Databases",
  headers: ["Feature", "SQL Databases", "NoSQL Databases"],
  rows: [
    ["Data Model", "Relational (Tables with Rows & Columns)", "Non-relational (Document, Key-Value, Graph)"],
    ["Schema", "Static / Pre-defined schema required", "Dynamic / Flexible schema support"],
    ["Scaling", "Vertically scaled (larger servers)", "Horizontally scaled (more servers/sharding)"],
    ["Transactions", "ACID compliant (strong consistency)", "BASE properties (eventual consistency)"],
  ],
};

function ContentLibraryView() {
  const [assets, setAssets] = useState(initialAssets);
  const [activeTab, setActiveTab] = useState("all"); // all, notes, pdf, ppt, table, video
  const [search, setSearch] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadType, setUploadType] = useState("pdf");
  const [uploadDetail, setUploadDetail] = useState("");
  const [uploadScope, setUploadScope] = useState("All");

  // Comparison Generator State
  const [tableName, setTableName] = useState("Technology Comparison");
  const [headers, setHeaders] = useState(["Feature", "Option A", "Option B"]);
  const [rows, setRows] = useState([
    ["Performance", "Fast execution, moderate memory", "Extremely fast, high memory footprint"],
    ["Ease of Use", "Steep learning curve, rich guides", "Simple configuration, plug-and-play"],
  ]);
  const [newRowData, setNewRowData] = useState(["", "", ""]);
  const [generatorLoading, setGeneratorLoading] = useState(false);

  const handleUpload = (e) => {
    e.preventDefault();
    if (!uploadTitle) return;
    setUploadLoading(true);

    setTimeout(() => {
      const newAsset = {
        id: `a${Date.now()}`,
        type: uploadType,
        title: uploadTitle,
        scope: uploadScope,
        course: "General Library",
        date: new Date().toISOString().split("T")[0],
      };
      if (uploadType === "pdf") newAsset.size = uploadDetail || "2.1 MB";
      if (uploadType === "video") newAsset.duration = uploadDetail || "12:30";
      if (uploadType === "ppt") newAsset.slides = parseInt(uploadDetail) || 18;
      if (uploadType === "notes") newAsset.words = parseInt(uploadDetail) || 500;
      if (uploadType === "table") newAsset.rows = parseInt(uploadDetail) || 5;

      setAssets([newAsset, ...assets]);
      setUploadLoading(false);
      setIsUploadOpen(false);

      // Reset
      setUploadTitle("");
      setUploadDetail("");
      toast.success("Material asset synced to Content Library!");
    }, 1200);
  };

  const deleteAsset = (id) => {
    setAssets(assets.filter(a => a.id !== id));
    toast.error("Asset deleted from library");
  };

  const handleAddRow = () => {
    if (newRowData.some(cell => cell.trim() === "")) {
      toast.warning("Please fill all cells in the row before adding");
      return;
    }
    setRows([...rows, newRowData]);
    setNewRowData(["", "", ""]);
  };

  const handleSaveTable = () => {
    setGeneratorLoading(true);
    setTimeout(() => {
      const newTableAsset = {
        id: `a${Date.now()}`,
        type: "table",
        title: tableName,
        rows: rows.length,
        scope: "All",
        course: "Comparison Library",
        date: new Date().toISOString().split("T")[0],
      };
      setAssets([newTableAsset, ...assets]);
      setGeneratorLoading(false);
      setIsGeneratorOpen(false);
      
      // Reset
      setRows([
        ["Performance", "Fast execution, moderate memory", "Extremely fast, high memory footprint"],
        ["Ease of Use", "Steep learning curve, rich guides", "Simple configuration, plug-and-play"],
      ]);
      setTableName("Technology Comparison");
      toast.success("Comparison table generated and added to library!");
    }, 1200);
  };

  const filteredAssets = assets.filter(a => {
    const matchesTab = activeTab === "all" || a.type === activeTab;
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || 
                          a.course.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Hero Banner */}
      <ModuleHeroBanner
        breadcrumb="Dashboard / Content Library"
        title="Content Library"
        subtitle="Upload lecture notes, slides, PDFs, comparison sheets, and organize learning materials."
        actions={
          <>
            <button
              onClick={() => setIsGeneratorOpen(true)}
              className="border hover:bg-secondary flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold cursor-pointer transition-colors"
            >
              <TableIcon className="w-4 h-4 text-accent" /> Matrix Table Generator
            </button>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="btn-hero flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Upload Material
            </button>
          </>
        }
      />

      {/* Tabs and search bar */}
      <div className="glass rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-secondary/60 border border-border/40 w-full md:w-auto">
          {[
            { id: "all", label: "All Items", icon: FolderOpen },
            { id: "pdf", label: "PDF Documents", icon: FileText },
            { id: "ppt", label: "Slides PPT", icon: FileSpreadsheet },
            { id: "video", label: "Videos", icon: Video },
            { id: "table", label: "Matrix Tables", icon: TableIcon },
            { id: "notes", label: "Notes", icon: FileText },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/30"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search assets by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Library Assets Catalog */}
      {filteredAssets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-xl p-5 border-border/40 flex flex-col justify-between hover:border-primary/20 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border border-border/40 bg-card ${
                    asset.type === "pdf" ? "text-blue-500" :
                    asset.type === "video" ? "text-pink-500" :
                    asset.type === "ppt" ? "text-amber-500" :
                    asset.type === "table" ? "text-accent" : "text-purple-500"
                  }`}>
                    {asset.type === "pdf" && <FileText className="w-5 h-5" />}
                    {asset.type === "video" && <Video className="w-5 h-5" />}
                    {asset.type === "ppt" && <FileSpreadsheet className="w-5 h-5" />}
                    {asset.type === "table" && <TableIcon className="w-5 h-5" />}
                    {asset.type === "notes" && <FileText className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                      {asset.title}
                    </h3>
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                      {asset.type} • {asset.size || asset.duration || `${asset.slides} slides` || `${asset.words} words` || `${asset.rows} rows`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-4 pt-3 border-t border-border/30">
                <div className="flex justify-between items-center text-[10px] text-muted-foreground font-semibold">
                  <span>Scope: {asset.scope}</span>
                  <span>Uploaded {asset.date}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toast.success("Asset attached to course outline!")}
                    className="flex-1 bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Attach to Course
                  </button>
                  <button
                    onClick={() => toast.success("Simulated downloading file...")}
                    className="h-8 w-8 rounded-lg border hover:bg-secondary text-muted-foreground hover:text-foreground grid place-items-center cursor-pointer transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteAsset(asset.id)}
                    className="h-8 w-8 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 grid place-items-center cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl p-12 text-center flex flex-col items-center justify-center border-dashed">
          <FolderOpen className="w-12 h-12 text-muted-foreground/60 mb-3" />
          <h3 className="text-lg font-bold text-foreground">No Materials Found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mt-1">
            There are no documents or videos inside this category matching your query.
          </p>
          <button
            onClick={() => setIsUploadOpen(true)}
            className="btn-hero px-4 py-2 rounded-xl text-xs font-bold mt-4 cursor-pointer"
          >
            Upload First Asset
          </button>
        </div>
      )}

      {/* Upload Asset Modal */}
      <AnimatePresence>
        {isUploadOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-lg glass rounded-2xl p-6 relative"
            >
              <button
                onClick={() => setIsUploadOpen(false)}
                className="absolute top-4 right-4 h-8 w-8 rounded-full border hover:bg-secondary grid place-items-center cursor-pointer"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              <h2 className="text-xl font-bold font-display mb-4">Upload Study Material</h2>
              <form onSubmit={handleUpload}>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Asset Title</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Sagas Patterns Design Layout"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Asset Type</label>
                      <select
                        value={uploadType}
                        onChange={(e) => setUploadType(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary"
                      >
                        <option value="pdf">PDF Ebook</option>
                        <option value="ppt">PPT Slide Deck</option>
                        <option value="video">Video Lecture</option>
                        <option value="notes">Notes / Text</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Metric Detail</label>
                      <input
                        required
                        type="text"
                        placeholder={
                          uploadType === "pdf" ? "e.g. 2.4 MB" :
                          uploadType === "video" ? "e.g. 15:45" :
                          uploadType === "ppt" ? "e.g. 24 slides" : "e.g. 800 words"
                        }
                        value={uploadDetail}
                        onChange={(e) => setUploadDetail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">University Compatibility</label>
                    <select
                      value={uploadScope}
                      onChange={(e) => setUploadScope(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary"
                    >
                      <option value="All">All Scopes</option>
                      <option value="University of Tech">University of Tech</option>
                      <option value="Central Academy">Central Academy</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">File Target</label>
                    <div className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center hover:bg-secondary/20 transition-all cursor-pointer">
                      <FolderOpen className="w-8 h-8 text-primary mx-auto mb-2 animate-bounce" />
                      <span className="text-xs font-bold">Select PDF, PPTX or MP4</span>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Files are automatically virus scanned & encrypted</p>
                    </div>
                  </div>
                  <button type="submit" disabled={uploadLoading} className="w-full btn-hero py-2.5 rounded-xl text-sm font-semibold mt-2 cursor-pointer">
                    {uploadLoading ? "Uploading to Cloud Library..." : "Sync Asset Material"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Tables Generator Modal */}
      <AnimatePresence>
        {isGeneratorOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-2xl glass rounded-2xl p-6 relative overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setIsGeneratorOpen(false)}
                className="absolute top-4 right-4 h-8 w-8 rounded-full border hover:bg-secondary grid place-items-center cursor-pointer"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              <h2 className="text-xl font-bold font-display mb-2 flex items-center gap-2">
                <TableIcon className="w-5 h-5 text-accent" /> Comparison Matrix Constructor
              </h2>
              <p className="text-xs text-muted-foreground mb-4">Create side-by-side matrices comparing technologies or theories.</p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Matrix Title</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. gRPC vs REST API Models"
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary font-bold"
                  />
                </div>

                {/* Headers configuration */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Col 1 Header (Feature)</label>
                    <input
                      required
                      type="text"
                      value={headers[0]}
                      onChange={(e) => setHeaders([e.target.value, headers[1], headers[2]])}
                      className="w-full px-3 py-1.5 border rounded-lg bg-background outline-none text-xs focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Col 2 Header (Option A)</label>
                    <input
                      required
                      type="text"
                      value={headers[1]}
                      onChange={(e) => setHeaders([headers[0], e.target.value, headers[2]])}
                      className="w-full px-3 py-1.5 border rounded-lg bg-background outline-none text-xs focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Col 3 Header (Option B)</label>
                    <input
                      required
                      type="text"
                      value={headers[2]}
                      onChange={(e) => setHeaders([headers[0], headers[1], e.target.value])}
                      className="w-full px-3 py-1.5 border rounded-lg bg-background outline-none text-xs focus:border-primary"
                    />
                  </div>
                </div>

                {/* Rows Editor */}
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Row Points</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {rows.map((row, rIdx) => (
                      <div key={rIdx} className="grid grid-cols-12 gap-2 items-center bg-secondary/35 p-2 rounded-lg border border-border/30">
                        <span className="col-span-3 text-xs font-bold text-foreground line-clamp-1">{row[0]}</span>
                        <span className="col-span-4 text-xs text-muted-foreground line-clamp-1">{row[1]}</span>
                        <span className="col-span-4 text-xs text-muted-foreground line-clamp-1">{row[2]}</span>
                        <button
                          onClick={() => setRows(rows.filter((_, i) => i !== rIdx))}
                          className="col-span-1 h-6 w-6 rounded bg-card hover:bg-red-500/10 hover:text-red-500 grid place-items-center text-muted-foreground cursor-pointer transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add Row inputs */}
                <div className="border border-dashed p-3.5 rounded-xl space-y-2 bg-background/40">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Append Row Data</span>
                  <div className="grid grid-cols-12 gap-2">
                    <input
                      type="text"
                      placeholder="Comparison Point"
                      value={newRowData[0]}
                      onChange={(e) => setNewRowData([e.target.value, newRowData[1], newRowData[2]])}
                      className="col-span-3 px-2 py-1.5 border rounded bg-background outline-none text-xs focus:border-primary"
                    />
                    <input
                      type="text"
                      placeholder={`Detail for ${headers[1]}`}
                      value={newRowData[1]}
                      onChange={(e) => setNewRowData([newRowData[0], e.target.value, newRowData[2]])}
                      className="col-span-4 px-2 py-1.5 border rounded bg-background outline-none text-xs focus:border-primary"
                    />
                    <input
                      type="text"
                      placeholder={`Detail for ${headers[2]}`}
                      value={newRowData[2]}
                      onChange={(e) => setNewRowData([newRowData[0], newRowData[1], e.target.value])}
                      className="col-span-4 px-2 py-1.5 border rounded bg-background outline-none text-xs focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={handleAddRow}
                      className="col-span-1 h-7.5 w-full bg-primary text-primary-foreground rounded grid place-items-center cursor-pointer hover:opacity-90"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Preview Table */}
                <div className="border border-border/50 rounded-xl overflow-hidden bg-card/45">
                  <div className="bg-secondary/40 border-b border-border/30 p-2.5 text-center font-bold text-xs">
                    LIVE PREVIEW: {tableName}
                  </div>
                  <table className="w-full text-[11px] text-left">
                    <thead className="bg-secondary/20 text-muted-foreground border-b border-border/30">
                      <tr>
                        {headers.map((h, idx) => (
                          <th key={idx} className="px-3 py-2 font-bold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30 font-medium">
                      {rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-secondary/10">
                          <td className="px-3 py-2 text-foreground font-bold">{row[0]}</td>
                          <td className="px-3 py-2 text-muted-foreground">{row[1]}</td>
                          <td className="px-3 py-2 text-muted-foreground">{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  type="button"
                  onClick={handleSaveTable}
                  disabled={generatorLoading || rows.length === 0}
                  className="w-full btn-hero py-2.5 rounded-xl text-sm font-semibold mt-2 cursor-pointer flex items-center justify-center"
                >
                  {generatorLoading ? "Saving table in library..." : "Compile & Save Comparison Matrix"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
