const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'routes', 'analytics', 'ai.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// The best way to cleanly fix the Quick Metrics is to manually replace the whole block since it got messy.
const quickMetricsRegex = /\{\/\* Core Quick Metrics \*\/\}([\s\S]*?)\{\/\* Adoption & Funnel Bento \*\/\}/;

const newQuickMetrics = `{/* Core Quick Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 flex-[1.5]">
          <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] group flex flex-col justify-between">
            <div className="flex items-start mb-6">
              <div className="p-3 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#FFACE8]/10 dark:text-[#FFACE8] rounded-xl">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Employees Trained on AI</p>
              <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">4,280</h4>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#01AC9F] dark:hover:border-[#01AC9F] group flex flex-col justify-between">
            <div className="flex items-start mb-6">
              <div className="p-3 bg-[#01AC9F]/10 text-[#01AC9F] dark:bg-[#01AC9F]/10 dark:text-[#01AC9F] rounded-xl">
                <Award className="w-6 h-6" />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Employees Certified on AI</p>
              <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">1,150</h4>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6200] dark:hover:border-[#FF6200] group flex flex-col justify-between">
            <div className="flex items-start mb-6">
              <div className="p-3 bg-[#FF6200]/10 text-[#FF6200] dark:bg-[#FF6200]/10 dark:text-[#FF6200] rounded-xl">
                <Clock className="w-6 h-6" />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">AI Learning Hours</p>
              <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">18.4K</h4>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#01AC9F] dark:hover:border-[#01AC9F] group flex flex-col justify-between">
            <div className="flex items-start mb-6">
              <div className="p-3 bg-[#01AC9F]/10 text-[#01AC9F] dark:bg-[#01AC9F]/10 dark:text-[#01AC9F] rounded-xl">
                <Video className="w-6 h-6" />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">AI Sessions Conducted</p>
              <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">245</h4>
            </div>
          </div>

          <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6200] dark:hover:border-[#FF6200] group flex flex-col justify-between md:col-span-2 lg:col-span-1 xl:col-span-2">
            <div className="flex items-start mb-6">
              <div className="p-3 bg-[#FF6200]/10 text-[#FF6200] dark:bg-[#FF6200]/10 dark:text-[#FF6200] rounded-xl">
                <LineChart className="w-6 h-6" />
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">AI Training Attendance %</p>
                <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">94.2%</h4>
              </div>
              <div className="text-sm font-bold text-[#FF6200]">+4.1% vs last month</div>
            </div>
          </div>
        </div>
      </div>

      {/* Adoption & Funnel Bento */}
`;

content = content.replace(quickMetricsRegex, newQuickMetrics);


// Remove all instances of `border-b-4 border-b-[#...]` from all other components to match the "Pillar" standard which just uses standard borders and hover borders.
content = content.replace(/ border-b-4 border-b-\[#[0-9a-fA-F]+\] dark:border-b-\[#[0-9a-fA-F]+\]/g, '');
content = content.replace(/ border-b-4 border-b-\[#[0-9a-fA-F]+\]/g, '');

// Heatmap row colors are fine as is since user asked "heatmapkacolor change" in previous prompt. Let's make sure it's intact.

fs.writeFileSync(filePath, content);
console.log("ai.jsx visuals synced to pillars exactly.");
