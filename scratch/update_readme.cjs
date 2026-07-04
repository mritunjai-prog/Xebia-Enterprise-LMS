const fs = require('fs');
const path = require('path');

const readmePath = path.join(process.cwd(), 'README.md');
let content = fs.readFileSync(readmePath, 'utf8');

// Update line 53
content = content.replace('and a 7-page enterprise analytics suite', 'and a 15-page enterprise analytics suite');

// Update the Analytics Suite list section
const oldAnalyticsSection = `### Analytics Suite
Accessible from the Admin sidebar under "Analytics", this 7-page suite provides:
- **Executive**: Top-level KPI cards — completions, certifications, NPS, hours.
- **Coverage**: Heatmap-style view of content coverage across the organization.
- **Hours**: Learning hours tracked by team, role, and time range.
- **AI Transformation**: Metrics on AI-generated vs. manual content.
- **Flagship Programs**: Key program enrolment and performance summaries.
- **Certifications**: Certification completion trends over time.
- **Pillars**: Learning content organised by enterprise learning pillars.`;

const newAnalyticsSection = `### Analytics Suite
Accessible from the Admin sidebar under "Analytics Hub", this 15-page suite provides:
- **Executive Overview**: Top-level KPI cards — completions, certifications, NPS, hours.
- **Learning Coverage**: Heatmap-style view of content coverage across the organization.
- **Learning Hours**: Learning hours tracked by team, role, and time range.
- **Learning Pillars**: Content organised by enterprise learning pillars.
- **AI Transformation**: Metrics on AI-generated vs. manual content.
- **Certifications**: Certification completion trends over time.
- **Flagship Programs**: Key program enrolment and performance summaries.
- **Learning Trends**: Time-series analysis of platform engagement.
- **Effectiveness**: NPS, feedback scores, and completion rate impact.
- **Learning Champions**: Leaderboards for top learners and AI adopters.
- **Project Investment**: Budget vs. spent analysis on learning by business unit.
- **Apprentice Journey**: Trainee cohort tracking and progress analysis.
**Future Enhancements**
- **Skill Gap**: Analysis of required vs. current skills by department.
- **Recommendations**: AI-driven suggested career paths and courses.
- **Predictive Analytics**: Forecasting AI readiness and completion risks.`;

content = content.replace(oldAnalyticsSection, newAnalyticsSection);

// Wait, the user also pasted this bullet list in the prompt:
// Analytics Suite
// 7-Page Enterprise Dashboard
// AI Transformation & Certifications
// Coverage Maps & Flagship Programs
// Learning Hours Tracking
// Let's see if this exact block exists in README.
const oldSummaryBlock = `Analytics Suite
7-Page Enterprise Dashboard
AI Transformation & Certifications
Coverage Maps & Flagship Programs
Learning Hours Tracking`;

const newSummaryBlock = `Analytics Suite
15-Page Predictive Analytics Suite
AI Transformation & Skill Gaps
Coverage Maps & Learning Pillars
Learning Recommendations & Tracking`;

if (content.includes('7-Page Enterprise Dashboard')) {
  content = content.replace('7-Page Enterprise Dashboard', '15-Page Predictive Analytics Dashboard');
  content = content.replace('Coverage Maps & Flagship Programs', 'Coverage Maps, Skill Gaps & AI Readiness');
}

fs.writeFileSync(readmePath, content);
console.log('README.md updated with 15-page analytics data.');
