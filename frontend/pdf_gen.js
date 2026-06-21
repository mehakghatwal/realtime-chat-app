import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const ADIR = path.resolve('../assignments');

function img(filename) {
  const fp = path.join(ADIR, filename);
  if (!fs.existsSync(fp)) { console.log(`WARN: ${filename} not found`); return ''; }
  const data = fs.readFileSync(fp).toString('base64');
  return `data:image/png;base64,${data}`;
}

function imgTag(filename, width = '90%') {
  const src = img(filename);
  if (!src) return `<p style="color:red;text-align:center;">[Image not found: ${filename}]</p>`;
  return `<img src="${src}" style="width:${width};height:auto;display:block;margin:5px auto;border:1.5px solid #B45309;" />`;
}

// ===== ASSIGNMENT 6 HTML =====
const assignment6Html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
@page{size:A4;margin:0.5in;}
body{font-family:'Segoe UI',Arial,sans-serif;font-size:9.5pt;line-height:1.45;color:#2D3748;margin:0;padding:0;}
h1{color:#78350F;font-size:18pt;text-align:center;margin-top:2px;margin-bottom:5px;}
h2{color:#92400E;font-size:13pt;margin-top:5px;margin-bottom:5px;border-bottom:1.5px solid #D97706;padding-bottom:3px;}
h3{color:#B45309;font-size:11pt;margin-top:4px;margin-bottom:4px;}
.cover{text-align:center;padding-top:2px;}
.cover-table{width:65%;margin:8px auto;border:none;border-collapse:collapse;}
.cover-table td{border:none;padding:3px 8px;font-size:9.5pt;}
.cover-table .lbl{font-weight:bold;text-align:right;color:#78350F;width:45%;}
.cover-table .val{text-align:left;}
.pb{page-break-after:always;}
table.eval{width:100%;border-collapse:collapse;margin:10px 0;}
table.eval th{background:#B45309;color:white;border:1px solid #FDE68A;padding:8px;text-align:center;font-size:8.5pt;}
table.eval td{border:1px solid #FDE68A;padding:8px;text-align:center;font-size:8.5pt;height:25px;}
table.eval td:first-child{text-align:left;}
ul{padding-left:18px;margin-top:3px;margin-bottom:5px;}
li{margin-bottom:2px;}
.caption{font-size:7.5pt;color:#666;text-align:center;margin-top:2px;}
.brief-header {font-weight:bold;color:#78350F;margin-top:5px;margin-bottom:2px;}
.link-section {margin-bottom:6px;font-size:9pt;}
</style></head><body>

<!-- PAGE 1: COVER -->
<div class="cover">
  ${imgTag('cu_logo.png', '100%')}
  <h1>PROJECT COMPREHENSIVE REPORT</h1>
  <h3 style="color:#92400E;text-align:center;margin-top:2px;">Real-Time Chat Application</h3>
  <p style="text-align:center;font-size:9.5pt;color:#4A5568;margin-top:2px;margin-bottom:4px;"><strong>Subject:</strong> Spring Boot Fundamentals and REST API Development</p>
  <table class="cover-table">
    <tr><td class="lbl">Student Name:</td><td class="val">Mehak</td></tr>
    <tr><td class="lbl">UID:</td><td class="val">24BCS12136</td></tr>
    <tr><td class="lbl">University:</td><td class="val">Chandigarh University</td></tr>
    <tr><td class="lbl">Institution:</td><td class="val">University Institute of Engineering (UIE)</td></tr>
    <tr><td class="lbl">Instructor Name:</td><td class="val">ER. Sumit Malhotra</td></tr>
    <tr><td class="lbl">Type of Report:</td><td class="val">Assignment 6 - Comprehensive System Report</td></tr>
    <tr><td class="lbl">Year / Month:</td><td class="val">2026 / June</td></tr>
  </table>
</div>
<div class="pb"></div>

<!-- PAGE 2: COURSERA CERTIFICATE COPY -->
<h2>PAGE 2 – COURSERA CERTIFICATE COPY</h2>
<div class="link-section">
  <strong>Drive File Link:</strong> https://drive.google.com/file/d/1smsKLNlcjooW_Vv1M983yR0z1foLon1n/view?usp=sharing<br/>
  <strong>Verification Link:</strong> https://coursera.org/verify/AP4QJLA3ENZD
</div>
<h3>Coursera Certificate Record Softcopy</h3>
<ul>
  <li><strong>Course Name:</strong> Spring Boot, Spring Security & Application Finalization</li>
  <li><strong>Verification Status:</strong> Verified & Completed</li>
</ul>

<table style="width: 100%; border: none; border-collapse: collapse; margin-top: 5px;">
  <tr style="background: none;">
    <td style="border: none; width: 50%; padding: 4px; text-align: center; vertical-align: top;">
      <p style="font-weight: bold; color: #78350F; font-size: 8pt; margin: 0 0 3px 0;">Drive Upload Verification:</p>
      ${imgTag('chat_coursera_drive.png', '100%')}
    </td>
    <td style="border: none; width: 50%; padding: 4px; text-align: center; vertical-align: top;">
      <p style="font-weight: bold; color: #78350F; font-size: 8pt; margin: 0 0 3px 0;">Certificate Copy:</p>
      ${imgTag('chat_coursera_cert.png', '100%')}
    </td>
  </tr>
</table>
<div class="pb"></div>

<!-- PAGE 3: ASSIGNMENT 1 -->
<h2>PAGE 3 – WEEKLY ASSIGNMENT 1</h2>
<div class="link-section">
  <strong>Drive Link:</strong> https://drive.google.com/file/d/1xZD2VhyjKd6AA0oeRDx3TltVTXMIwZKr/view?usp=sharing
</div>
<div class="brief-header">Assignment Brief Summary:</div>
<ul>
  <li><strong>Domain Modeling:</strong> Formulated JPA database representations for <code>User</code>, <code>ChatMessage</code>, and <code>ChatRoom</code> objects.</li>
  <li><strong>Data Transfer Objects:</strong> Formulated clean DTOs (e.g. <code>LoginRequest</code>, <code>MessageDto</code>) to keep application core classes insulated from API layers.</li>
  <li><strong>Repository Interfaces:</strong> Created Spring Data JPA interfaces extending <code>JpaRepository</code> to handle database operations out-of-the-box.</li>
  <li><strong>Entity-Relationship Schema:</strong> Drew a clear database relationship graph mapping how users send and receive messages.</li>
</ul>

<table style="width: 100%; border: none; border-collapse: collapse; margin-top: 5px;">
  <tr style="background: none;">
    <td style="border: none; width: 50%; padding: 4px; text-align: center; vertical-align: top;">
      <p style="font-weight: bold; color: #78350F; font-size: 8pt; margin: 0 0 3px 0;">Drive Upload Verification:</p>
      ${imgTag('chat_assignment_1_2_drive.png', '100%')}
    </td>
    <td style="border: none; width: 50%; padding: 4px; text-align: center; vertical-align: top;">
      <p style="font-weight: bold; color: #78350F; font-size: 8pt; margin: 0 0 3px 0;">First Page of Assignment:</p>
      ${imgTag('chat_assignment_1_cover.png', '100%')}
    </td>
  </tr>
</table>
<div class="pb"></div>

<!-- PAGE 4: ASSIGNMENT 2 -->
<h2>PAGE 4 – WEEKLY ASSIGNMENT 2</h2>
<div class="link-section">
  <strong>Drive Link:</strong> https://drive.google.com/file/d/1xmDv0kr55JByNXpvyR3l7rSFDCilM-FS/view?usp=sharing
</div>
<div class="brief-header">Assignment Brief Summary:</div>
<ul>
  <li><strong>REST Security Endpoints:</strong> Created controller actions for stateless user signup, login context creation, and logout routines.</li>
  <li><strong>Catalog Retrieval Operations:</strong> Programmed endpoints to retrieve lists of chat rooms and available messaging users.</li>
  <li><strong>STOMP WebSocket Setup:</strong> Configured a WebSocket handler to map bi-directional message routing channels.</li>
  <li><strong>Interactive Routing Paths:</strong> Set up inbound handlers to route chat packets to specific room topics or user queues.</li>
</ul>

<table style="width: 100%; border: none; border-collapse: collapse; margin-top: 5px;">
  <tr style="background: none;">
    <td style="border: none; width: 50%; padding: 4px; text-align: center; vertical-align: top;">
      <p style="font-weight: bold; color: #78350F; font-size: 8pt; margin: 0 0 3px 0;">Drive Upload Verification:</p>
      ${imgTag('chat_assignment_1_2_drive.png', '100%')}
    </td>
    <td style="border: none; width: 50%; padding: 4px; text-align: center; vertical-align: top;">
      <p style="font-weight: bold; color: #78350F; font-size: 8pt; margin: 0 0 3px 0;">First Page of Assignment:</p>
      ${imgTag('chat_assignment_2_cover.png', '100%')}
    </td>
  </tr>
</table>
<div class="pb"></div>

<!-- PAGE 5: ASSIGNMENT 3 -->
<h2>PAGE 5 – WEEKLY ASSIGNMENT 3</h2>
<div class="link-section">
  <strong>Drive Link:</strong> https://drive.google.com/file/d/1VkXnMNy3-tmAqa19acIjhy9VDjtLfjvI/view?usp=sharing
</div>
<div class="brief-header">Assignment Brief Summary:</div>
<ul>
  <li><strong>Security Filter Chain:</strong> Programmed stateless Spring Security filters permitting authentication endpoints while protecting resource paths.</li>
  <li><strong>HMAC-256 JWT Integration:</strong> Implemented JWT validation rules to verify digital signatures on inbound connections.</li>
  <li><strong>OncePerRequest Authentication Middleware:</strong> Created a servlet interceptor to resolve tokens and inject identity logs into thread environments.</li>
  <li><strong>Security Testing:</strong> Handled verification scenarios using HTTP calls to validate token parsing.</li>
</ul>

<table style="width: 100%; border: none; border-collapse: collapse; margin-top: 5px;">
  <tr style="background: none;">
    <td style="border: none; width: 50%; padding: 4px; text-align: center; vertical-align: top;">
      <p style="font-weight: bold; color: #78350F; font-size: 8pt; margin: 0 0 3px 0;">Drive Upload Verification:</p>
      ${imgTag('chat_assignment_3_4_5_drive.png', '100%')}
    </td>
    <td style="border: none; width: 50%; padding: 4px; text-align: center; vertical-align: top;">
      <p style="font-weight: bold; color: #78350F; font-size: 8pt; margin: 0 0 3px 0;">First Page of Assignment:</p>
      ${imgTag('chat_assignment_3_cover.png', '100%')}
    </td>
  </tr>
</table>
<div class="pb"></div>

<!-- PAGE 6: ASSIGNMENT 4 -->
<h2>PAGE 6 – WEEKLY ASSIGNMENT 4</h2>
<div class="link-section">
  <strong>Drive Link:</strong> https://drive.google.com/file/d/1y-S-tOfr-Nkrk9pnNFcbDYyPAorM20dg/view?usp=sharing
</div>
<div class="brief-header">Assignment Brief Summary:</div>
<ul>
  <li><strong>React Client Scaffolding:</strong> Formulated a Vite client project containing modular UI assets.</li>
  <li><strong>Request Token Injection:</strong> Created an Axios HTTP wrapper resolving JWT bearer tags from client memory storage.</li>
  <li><strong>Login View Interface:</strong> Built a credential validation card with profile gradient selection tools.</li>
  <li><strong>Workspace Panels:</strong> Designed the sidebar catalog listing, target room categories, and chat view fields.</li>
</ul>

<table style="width: 100%; border: none; border-collapse: collapse; margin-top: 5px;">
  <tr style="background: none;">
    <td style="border: none; width: 50%; padding: 4px; text-align: center; vertical-align: top;">
      <p style="font-weight: bold; color: #78350F; font-size: 8pt; margin: 0 0 3px 0;">Drive Upload Verification:</p>
      ${imgTag('chat_assignment_3_4_5_drive.png', '100%')}
    </td>
    <td style="border: none; width: 50%; padding: 4px; text-align: center; vertical-align: top;">
      <p style="font-weight: bold; color: #78350F; font-size: 8pt; margin: 0 0 3px 0;">First Page of Assignment:</p>
      ${imgTag('chat_assignment_4_cover.png', '100%')}
    </td>
  </tr>
</table>
<div class="pb"></div>

<!-- PAGE 7: ASSIGNMENT 5 -->
<h2>PAGE 7 – WEEKLY ASSIGNMENT 5</h2>
<div class="link-section">
  <strong>Drive Link:</strong> https://drive.google.com/file/d/1foAtEePXRt03mJHHoRh9q4JuLCDZPT4M/view?usp=sharing
</div>
<div class="brief-header">Assignment Brief Summary:</div>
<ul>
  <li><strong>Cross-Origin Settings:</strong> Configured backend global CORS policies permitting incoming client operations.</li>
  <li><strong>Full-Stack Live Broker Pipeline:</strong> Structured bi-directional connection channels linking client states to server queues.</li>
  <li><strong>Activity Status Logs:</strong> Registered WebSocket event triggers to detect user login changes and broadcast offline/online logs.</li>
  <li><strong>Persistent Message Storage:</strong> Intercepted client WebSocket packets and committed message logs to the H2 database tables.</li>
</ul>

<table style="width: 100%; border: none; border-collapse: collapse; margin-top: 5px;">
  <tr style="background: none;">
    <td style="border: none; width: 50%; padding: 4px; text-align: center; vertical-align: top;">
      <p style="font-weight: bold; color: #78350F; font-size: 8pt; margin: 0 0 3px 0;">Drive Upload Verification:</p>
      ${imgTag('chat_assignment_3_4_5_drive.png', '100%')}
    </td>
    <td style="border: none; width: 50%; padding: 4px; text-align: center; vertical-align: top;">
      <p style="font-weight: bold; color: #78350F; font-size: 8pt; margin: 0 0 3px 0;">First Page of Assignment:</p>
      ${imgTag('chat_assignment_5_cover.png', '100%')}
    </td>
  </tr>
</table>
<div class="pb"></div>

<!-- PAGE 8: EVALUATION TABLE -->
<h2>PAGE 8 – EVALUATION SHEET</h2>
<h3>EVALUATION RECORD (ASSIGNMENTS 1-6)</h3>
<table class="eval">
  <thead>
    <tr><th style="text-align:left;width:40%;">Assignment Description</th><th style="width:15%;">Max Marks</th><th style="width:20%;">Marks Obtained</th><th style="width:25%;">Faculty Remarks</th></tr>
  </thead>
  <tbody>
    <tr><td>Weekly Assignment 1: Domain Entities & JPA Mappings</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
    <tr><td>Weekly Assignment 2: Controllers & WebSocket Configurations</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
    <tr><td>Weekly Assignment 3: Security Config & JWT Implementation</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
    <tr><td>Weekly Assignment 4: React Frontend Implementation</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
    <tr><td>Weekly Assignment 5: React-SpringBoot Integration</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
    <tr><td>Weekly Assignment 6: Comprehensive Project Report</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
    <tr style="background:#FFFBEB;font-weight:bold;"><td style="text-align:right;">Total Evaluated Marks:</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
  </tbody>
</table>
<div style="margin-top:20px;">
  <p><strong>Faculty Evaluator Remarks:</strong></p>
  <div style="width:100%;height:50px;border:1px solid #FDE68A;background:#FFFBEB;"></div>
</div>
<div class="pb"></div>

<!-- PAGE 9: PROJECT SOFT COPY & FRONTEND OUTPUT -->
<h2>PAGE 9 – PROJECT SOFT COPY & FRONTEND OUTPUT</h2>
<div class="link-section">
  <strong>Drive Link:</strong> https://drive.google.com/file/d/1gfY1ns-cGEZ8rSGF155bgfcdTfjCvOd9/view?usp=sharing
</div>
<h3>Project Soft Copy Record</h3>
<ul>
  <li><strong>Folder Path:</strong> Shared with me &gt; ASSSSIGNMENT 6 &gt; Project soft copy with S...</li>
  <li><strong>File Name:</strong> <code>24BCS12136_Mehak_Project Soft Copy.pdf</code></li>
  <li><strong>Status:</strong> Successfully Uploaded</li>
</ul>

<table style="width: 100%; border: none; border-collapse: collapse; margin-top: 5px;">
  <tr style="background: none;">
    <td style="border: none; width: 50%; padding: 4px; text-align: center; vertical-align: top;">
      <p style="font-weight: bold; color: #78350F; font-size: 8pt; margin: 0 0 3px 0;">Drive Upload Verification:</p>
      ${imgTag('chat_project_summary_drive.png', '100%')}
    </td>
    <td style="border: none; width: 50%; padding: 4px; text-align: center; vertical-align: top;">
      <p style="font-weight: bold; color: #78350F; font-size: 8pt; margin: 0 0 3px 0;">Frontend Output — Login Page:</p>
      ${imgTag('screenshot_login.png', '100%')}
    </td>
  </tr>
</table>
<div class="pb"></div>

<!-- PAGE 10: FRONTEND DASHBOARD -->
<h2>PAGE 10 – FRONTEND DASHBOARD OUTPUT</h2>
<h3>Chat Dashboard & Messaging Interface</h3>
<p>After login, the main dashboard with sidebar showing rooms, online users, and the chat panel:</p>
${imgTag('screenshot_dashboard.png', '90%')}
<p class="caption"><em>Live Frontend Screenshot — Chat Dashboard with Sidebar, Rooms & Messaging</em></p>
<div class="pb"></div>

<!-- PAGE 11: BACKEND OUTPUT -->
<h2>PAGE 11 – BACKEND API OUTPUT</h2>
<h3>Backend REST API Response</h3>
<p>The Spring Boot backend serves data via RESTful endpoints on port 8080:</p>
${imgTag('screenshot_backend_api.png', '90%')}
<p class="caption"><em>Live Backend Screenshot — REST API JSON Response at /api/rooms</em></p>
<div class="pb"></div>

<!-- PAGE 12: GITHUB -->
<h2>PAGE 12 – GITHUB REPOSITORY DETAILS</h2>
<table style="width: 100%; border: none; border-collapse: collapse; margin-top: 5px;">
  <tr style="background: none;">
    <td style="border: none; width: 50%; padding: 4px; vertical-align: top;">
      <h3 style="margin-top:0px;">Project Repositories</h3>
      <ul style="padding-left:14px; margin-top:0px; margin-bottom:5px; font-size:8.5pt;">
        <li><strong>Frontend Repository:</strong><br/><span style="word-break:break-all; color:#B45309;">https://github.com/mehakghatwal/realtime-chat-app/tree/main/frontend</span></li>
        <li style="margin-top:6px;"><strong>Backend Repository:</strong><br/><span style="word-break:break-all; color:#B45309;">https://github.com/mehakghatwal/realtime-chat-app/tree/main/backend</span></li>
      </ul>
      <h3 style="margin-top:6px; margin-bottom:2px;">File Structure:</h3>
      <pre style="font-size:7.2pt; margin:0px; padding:4px; line-height:1.25; background:#FFFBEB; border:1px solid #FDE68A; border-radius:4px;">realtime-chat-app/
├── backend/
│   ├── src/main/java/com/chatapp/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── model/
│   │   ├── repository/
│   │   └── security/
│   └── pom.xml
└── frontend/
    ├── src/
    │   ├── components/
    │   └── App.jsx
    └── package.json</pre>
    </td>
    <td style="border: none; width: 50%; padding: 4px; text-align: center; vertical-align: top;">
      <p style="font-weight: bold; color: #78350F; font-size: 8pt; margin: 0 0 3px 0;">GitHub Repository Page Output:</p>
      ${imgTag('chat_github_repo_screenshot.png', '100%')}
    </td>
  </tr>
</table>
<div class="pb"></div>

<!-- PAGE 13: DAILY TASKS -->
<h2>PAGE 13 – DAILY TASKS LOG</h2>
<div class="link-section">
  <strong>Drive Link:</strong> https://docs.google.com/document/d/1xc8p62pB6rog_ReKvIEg0wW7-h5voPpc/edit?usp=sharing&ouid=115490671178608031604&rtpof=true&sd=true
</div>
<h3>Day-Wise Assignments Log</h3>
<ul>
  <li><strong>Folder Path:</strong> Shared with me &gt; ASSSSIGNMENT 6 &gt; Daily Task</li>
  <li><strong>File Name:</strong> <code>24BCS12136_Daily_assignments.docx</code></li>
  <li><strong>Status:</strong> Successfully Uploaded</li>
</ul>
<table style="width: 100%; border: none; border-collapse: collapse; margin-top: 5px;">
  <tr style="background: none;">
    <td style="border: none; width: 50%; padding: 4px; text-align: center; vertical-align: top;">
      <p style="font-weight: bold; color: #78350F; font-size: 8pt; margin: 0 0 3px 0;">Drive Upload Verification:</p>
      ${imgTag('chat_daily_task_drive.png', '100%')}
    </td>
    <td style="border: none; width: 50%; padding: 4px; text-align: center; vertical-align: top;">
      <p style="font-weight: bold; color: #78350F; font-size: 8pt; margin: 0 0 3px 0;">Document Preview (Page 1):</p>
      ${imgTag('chat_daily_task_cover.png', '100%')}
    </td>
  </tr>
</table>
<div class="pb"></div>

<!-- PAGE 14: DAILY TASKS LOG CONTINUED -->
<h2>PAGE 14 – DAILY TASKS LOG (CONTINUED)</h2>
<p style="font-weight: bold; color: #78350F; font-size: 8pt; margin: 0 0 3px 0;">Document Preview (Page 2):</p>
${imgTag('chat_daily_task_page2.png', '80%')}
<p style="text-align:center;margin-top:20px;"><strong>End of Assignment 6 Report</strong></p>

</body></html>`;

// ===== PROJECT SUMMARY HTML =====
const projectSummaryHtml = `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
@page{size:A4;margin:0.5in;}
body{font-family:'Segoe UI',Arial,sans-serif;font-size:9.5pt;line-height:1.45;color:#2D3748;margin:0;padding:0;}
h1{color:#78350F;font-size:18pt;text-align:center;margin-top:2px;margin-bottom:5px;}
h2{color:#92400E;font-size:13pt;margin-top:5px;margin-bottom:5px;border-bottom:1.5px solid #D97706;padding-bottom:3px;}
h3{color:#B45309;font-size:11pt;margin-top:4px;margin-bottom:4px;}
.cover{text-align:center;padding-top:2px;}
.cover-table{width:65%;margin:8px auto;border:none;border-collapse:collapse;}
.cover-table td{border:none;padding:3px 8px;font-size:9.5pt;}
.cover-table .lbl{font-weight:bold;text-align:right;color:#78350F;width:45%;}
.cover-table .val{text-align:left;}
.pb{page-break-after:always;}
table.tech{width:100%;border-collapse:collapse;margin:10px 0;}
table.tech th{background:#B45309;color:white;border:1px solid #FDE68A;padding:6px;font-size:8.5pt;}
table.tech td{border:1px solid #FDE68A;padding:6px;font-size:8.5pt;}
pre{background:#FFFBEB;border:1px solid #FDE68A;border-radius:4px;padding:6px;font-size:7.5pt;white-space:pre-wrap;}
code{font-family:Consolas,monospace;font-size:8pt;background:#FEF3C7;padding:1px 3px;border-radius:2px;}
pre code{background:none;padding:0;}
ul{padding-left:18px;margin-top:3px;margin-bottom:5px;}
li{margin-bottom:2px;}
.caption{font-size:7.5pt;color:#666;text-align:center;margin-top:2px;}
ol.toc{font-size:10.5pt;line-height:1.8;margin-top:5px;}
</style></head><body>

<!-- COVER PAGE -->
<div class="cover">
  ${imgTag('cu_logo.png', '100%')}
  <h1>PROJECT SOFT COPY & SUMMARY</h1>
  <h3 style="color:#92400E;text-align:center;margin-top:2px;">Real-Time Chat Application</h3>
  <p style="text-align:center;font-size:9.5pt;color:#4A5568;margin-top:2px;margin-bottom:4px;"><strong>Subject:</strong> Spring Boot Fundamentals and REST API Development</p>
  <table class="cover-table">
    <tr><td class="lbl">Student Name:</td><td class="val">Mehak</td></tr>
    <tr><td class="lbl">UID:</td><td class="val">24BCS12136</td></tr>
    <tr><td class="lbl">University:</td><td class="val">Chandigarh University</td></tr>
    <tr><td class="lbl">Institution:</td><td class="val">University Institute of Engineering (UIE)</td></tr>
    <tr><td class="lbl">Instructor Name:</td><td class="val">ER. Sumit Malhotra</td></tr>
    <tr><td class="lbl">Type of Report:</td><td class="val">Project Soft Copy & Summary Page</td></tr>
    <tr><td class="lbl">Year / Month:</td><td class="val">2026 / June</td></tr>
  </table>
</div>
<div class="pb"></div>

<!-- INDEX PAGE -->
<h2>Table of Contents</h2>
<ol class="toc">
  <li>Executive Project Summary</li>
  <li>Technology Stack & Architecture</li>
  <li>Full Project Directory Structure</li>
  <li>Frontend — Login Page Screenshot</li>
  <li>Frontend — Registration Page Screenshot</li>
  <li>Frontend — Chat Dashboard Screenshot</li>
  <li>Backend — REST API Output Screenshot</li>
  <li>Backend — Users API Output Screenshot</li>
  <li>Database — H2 Console Screenshot</li>
  <li>Application Configuration</li>
  <li>Project Conclusion</li>
</ol>
<div class="pb"></div>

<!-- 1. EXECUTIVE SUMMARY -->
<h2>1. Executive Project Summary</h2>
<p>The <strong>Real-Time Chat Application (Pulse Chat)</strong> is a production-ready, full-stack web application enabling instant communication between authenticated users. It supports both <strong>group chat rooms</strong> and <strong>direct peer-to-peer messaging</strong> in real-time.</p>
<h3>Core System Features</h3>
<ul>
  <li><strong>JWT-Based Stateless Authentication:</strong> Secure user registration and login with HMAC-256 signed JSON Web Tokens.</li>
  <li><strong>Real-time Message Streaming:</strong> STOMP WebSocket broker broadcasting live chat messages without page refreshes.</li>
  <li><strong>Group Chat Rooms:</strong> Users can create, join, and chat in multiple public chat rooms.</li>
  <li><strong>Direct Messaging (DM):</strong> One-on-one private conversations between registered users.</li>
  <li><strong>Online Presence Tracking:</strong> Live online/offline status indicators via WebSocket presence events.</li>
  <li><strong>Unread Message Counters:</strong> Automatic tracking and display of unread message counts per conversation.</li>
  <li><strong>Avatar Gradient Selection:</strong> Users can pick a unique profile gradient during registration.</li>
  <li><strong>Responsive UI:</strong> Built with React 19, Vite, and modern CSS for a premium dark-themed experience.</li>
</ul>
<div class="pb"></div>

<!-- 2. TECH STACK -->
<h2>2. Technology Stack & Architecture</h2>
<pre>+-----------------------+      STOMP WebSocket / REST      +-----------------------+
|    React Frontend     | &lt;==============================&gt; |  Spring Boot Backend  |
|   (Vite + React 19)   |                                 | (Stateless REST/WS)   |
+-----------------------+                                  +-----------------------+
                                                                │
                                                                v H2 In-Memory DB
                                                             (User, ChatMessage,
                                                              ChatRoom tables)</pre>
<table class="tech">
  <thead><tr><th>Layer</th><th>Technology</th></tr></thead>
  <tbody>
    <tr><td>Backend Engine</td><td>Spring Boot 3.4.2, Spring Security, Spring Data JPA</td></tr>
    <tr><td>Authentication</td><td>JWT (jjwt-api 0.12.5) with HMAC-256 signing</td></tr>
    <tr><td>Real-Time Layer</td><td>STOMP over WebSocket (SockJS fallback)</td></tr>
    <tr><td>Database</td><td>H2 In-Memory RDBMS (with H2 Console at /h2-console)</td></tr>
    <tr><td>Frontend Framework</td><td>React 19 with Vite 8</td></tr>
    <tr><td>HTTP Client</td><td>Axios with Bearer token interceptors</td></tr>
    <tr><td>WebSocket Client</td><td>@stomp/stompjs 7.3</td></tr>
    <tr><td>UI Icons</td><td>Lucide React</td></tr>
  </tbody>
</table>
<div class="pb"></div>

<!-- 3. DIRECTORY STRUCTURE -->
<h2>3. Full Project Directory Structure</h2>
<pre style="font-size: 7.5pt;">realtime-chat-app/
├── backend/
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/chatapp/
│       │   ├── BackendApplication.java        &lt;-- Main entry + DB seeder
│       │   ├── config/
│       │   │   ├── WebSecurityConfig.java     &lt;-- Spring Security + CORS
│       │   │   └── WebSocketConfig.java       &lt;-- STOMP broker config
│       │   ├── controller/
│       │   │   ├── AuthController.java        &lt;-- Login/Signup/Logout
│       │   │   ├── ChatController.java        &lt;-- WebSocket message handler
│       │   │   ├── ChatRoomController.java    &lt;-- Room CRUD endpoints
│       │   │   ├── MessageController.java     &lt;-- Message history + unread
│       │   │   └── UserController.java        &lt;-- User listing endpoint
│       │   ├── dto/
│       │   │   ├── LoginRequest.java / SignupRequest.java
│       │   │   └── JwtResponse.java
│       │   ├── model/
│       │   │   ├── User.java                  &lt;-- User JPA entity
│       │   │   ├── UserStatus.java            &lt;-- ONLINE/OFFLINE enum
│       │   │   ├── ChatMessage.java           &lt;-- Message entity
│       │   │   └── ChatRoom.java              &lt;-- Room entity
│       │   ├── repository/
│       │   │   ├── UserRepository.java
│       │   │   ├── ChatMessageRepository.java
│       │   │   └── ChatRoomRepository.java
│       │   └── security/
│       │       ├── JwtUtils.java              &lt;-- Token generation/validation
│       │       ├── JwtAuthFilter.java         &lt;-- Request filter
│       │       └── UserDetailsImpl.java       &lt;-- Spring Security adapter
│       └── resources/
│           └── application.properties         &lt;-- DB + JWT config
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── App.jsx                            &lt;-- Router + WebSocket + state
        ├── index.css                          &lt;-- Global dark theme styles
        ├── main.jsx                           &lt;-- React DOM root
        └── components/
            ├── LoginForm.jsx                  &lt;-- Auth UI (login + signup)
            ├── Sidebar.jsx                    &lt;-- Rooms list + Users list
            └── ChatPanel.jsx                  &lt;-- Message display + input</pre>
<div class="pb"></div>

<!-- 4. FRONTEND LOGIN -->
<h2>4. Frontend — Login Page</h2>
<p>The login page features a premium dark-themed authentication card. Users sign in with their existing credentials to access the messaging platform.</p>
${imgTag('screenshot_login.png', '90%')}
<p class="caption"><em>Fig 4.1 — Login Page with JWT Authentication (localhost:5173)</em></p>
<div class="pb"></div>

<!-- 5. FRONTEND REGISTRATION -->
<h2>5. Frontend — Registration Page</h2>
<p>New users create accounts by providing a username, email, password, and selecting a unique profile gradient avatar from the available options.</p>
${imgTag('screenshot_signup.png', '90%')}
<p class="caption"><em>Fig 5.1 — User Registration Form with Avatar Gradient Selection</em></p>
<div class="pb"></div>

<!-- 6. FRONTEND DASHBOARD -->
<h2>6. Frontend — Chat Dashboard</h2>
<p>After authentication, users see the main chat interface with a sidebar listing available chat rooms and online users. The central panel displays the active conversation with real-time message updates via WebSocket.</p>
${imgTag('screenshot_dashboard.png', '90%')}
<p class="caption"><em>Fig 6.1 — Chat Dashboard with Sidebar, Rooms & Direct Messaging Area</em></p>
<div class="pb"></div>

<!-- 7. BACKEND API ROOMS -->
<h2>7. Backend — REST API Output (Rooms)</h2>
<p>The Spring Boot backend serves chat room data as JSON through the <code>/api/rooms</code> RESTful endpoint on port 8080.</p>
${imgTag('screenshot_backend_api.png', '90%')}
<p class="caption"><em>Fig 7.1 — Backend REST API JSON Response at localhost:8080/api/rooms</em></p>
<div class="pb"></div>

<!-- 8. BACKEND API USERS -->
<h2>8. Backend — REST API Output (Users)</h2>
<p>The <code>/api/users</code> endpoint returns the list of all registered users with their online/offline status and avatar information.</p>
${imgTag('screenshot_backend_users.png', '90%')}
<p class="caption"><em>Fig 8.1 — Backend REST API JSON Response at localhost:8080/api/users</em></p>
<div class="pb"></div>

<!-- 9. DATABASE H2 CONSOLE -->
<h2>9. Database — H2 Console</h2>
<p>The application uses H2 in-memory database. The H2 Console at <code>http://localhost:8080/h2-console</code> allows direct SQL queries and schema inspection of the <code>USERS</code>, <code>CHAT_MESSAGE</code>, and <code>CHAT_ROOM</code> tables.</p>
${imgTag('screenshot_h2_console.png', '90%')}
<p class="caption"><em>Fig 9.1 — H2 Database Console at localhost:8080/h2-console</em></p>
<div class="pb"></div>

<!-- 10. APP CONFIG -->
<h2>10. Application Configuration</h2>
<h3>application.properties</h3>
<pre>server.port=8080

# H2 In-Memory Database
spring.datasource.url=jdbc:h2:mem:chatdb;DB_CLOSE_DELAY=-1
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect

# H2 Console (http://localhost:8080/h2-console)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# JPA & Hibernate
spring.jpa.hibernate.ddl-auto=update

# JWT Configuration
chatapp.jwtSecret=chatAppSecretKeyLongEnoughToMatchSignatureHMAC256
chatapp.jwtExpirationMs=86400000</pre>
<div class="pb"></div>

<!-- 11. CONCLUSION -->
<h2>11. Project Conclusion</h2>
<p>The <strong>Real-Time Chat Application (Pulse Chat)</strong> successfully demonstrates the integration of Spring Boot and React in a real-time, event-driven environment. The stateless JWT authentication provides secure access control. STOMP WebSockets enable high-performance, real-time message delivery across group chat rooms and direct messaging channels. Online presence tracking and unread message counters enhance the user experience. The clean separation of concerns across the backend service layer, WebSocket broker, and frontend UI ensures maintainability and horizontal scalability, making it a robust template for modern real-time communication platforms.</p>

</body></html>`;

// ===== GENERATE PDFs =====
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  async function htmlToPdf(html, outPath) {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });
    await new Promise(r => setTimeout(r, 1000));
    await page.pdf({
      path: outPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '0.4in', bottom: '0.4in', left: '0.4in', right: '0.4in' }
    });
    await page.close();
    const size = (fs.statSync(outPath).size / 1024).toFixed(0);
    console.log(`Created ${path.basename(outPath)} (${size} KB)`);
  }

  await htmlToPdf(assignment6Html, path.join(ADIR, 'Weekly_Assignment_6.pdf'));
  await htmlToPdf(projectSummaryHtml, path.join(ADIR, 'Project_Soft_Copy_Summary.pdf'));

  // Copy to frontend/public
  try {
    fs.copyFileSync(
      path.join(ADIR, 'Project_Soft_Copy_Summary.pdf'),
      path.resolve('../frontend/public/Project_Soft_Copy_Summary.pdf')
    );
  } catch(e) {}

  await browser.close();
  console.log('\n=== ALL PDFs GENERATED ===');
})();
