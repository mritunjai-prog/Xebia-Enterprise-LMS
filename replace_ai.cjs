const fs = require('fs');

const buttonComponent = `
function AIGenerateButton({ isGenerating, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-[#845EC2] to-[#D65DB1] text-white shadow-[0_4px_12px_-4px_rgba(214,93,177,0.4)] hover:shadow-[0_8px_20px_-6px_rgba(214,93,177,0.6)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group shrink-0"
      title="Generate with AI"
    >
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      <div className={clsx("relative z-10 transition-transform duration-500", !disabled && !isGenerating && "group-hover:rotate-12 group-hover:scale-110")}>
        {isGenerating ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Wand2 className="w-4 h-4" />
        )}
      </div>
      {!disabled && !isGenerating && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="absolute top-1 left-1.5 w-1 h-1 bg-white/80 rounded-full animate-ping" style={{ animationDuration: '1s' }} />
          <span className="absolute bottom-1 right-1.5 w-1 h-1 bg-white/80 rounded-full animate-ping" style={{ animationDuration: '1.2s', animationDelay: '0.2s' }} />
          <span className="absolute top-1.5 right-1 w-0.5 h-0.5 bg-white/80 rounded-full animate-ping" style={{ animationDuration: '0.8s', animationDelay: '0.4s' }} />
        </div>
      )}
    </button>
  );
}
`;

function replaceCategory() {
  const file = 'd:\\\\Xebia LMS\\\\src\\\\admin\\\\pages\\\\Categories\\\\CreateCategory.jsx';
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('function AIGenerateButton')) {
    content = content.replace('export default function CreateCategory', buttonComponent + '\nexport default function CreateCategory');
  }
  
  const btnRegex = /<button\s+type="button"\s+onClick=\{([^}]+)\}\s+disabled=\{([^}]+)\}\s+className="flex items-center gap-[^>]+>\s*\{\s*isGenerating[^}]+\}[^}]+Wand2[^}]+\}\s*(?:\{" "\}\s*)?Generate with AI\s*<\/button>/g;
  
  content = content.replace(btnRegex, '<AIGenerateButton onClick={$1} disabled={$2} isGenerating={isGenerating} />');
  fs.writeFileSync(file, content);
}

function replaceCourse() {
  const file = 'd:\\\\Xebia LMS\\\\src\\\\admin\\\\pages\\\\Courses\\\\CreateCourse.jsx';
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('function AIGenerateButton')) {
    content = content.replace('function BasicDetailsStep', buttonComponent + '\nfunction BasicDetailsStep');
  }
  
  const btnRegex = /<button\s+type="button"\s+onClick=\{([^}]+)\}\s+disabled=\{([^}]+)\}\s+className="flex items-center gap-[^>]+>\s*\{\s*(generatingField === "[^"]+")\s*\?[^}]+\}\s*Generate with AI\s*<\/button>/g;
  
  content = content.replace(btnRegex, '<AIGenerateButton onClick={$1} disabled={$2} isGenerating={$3} />');
  fs.writeFileSync(file, content);
}

replaceCategory();
replaceCourse();
console.log('Replaced successfully!');
