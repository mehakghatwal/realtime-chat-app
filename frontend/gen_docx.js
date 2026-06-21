import HTMLtoDOCX from 'html-to-docx';
import fs from 'fs';
import path from 'path';

const assignDir = path.resolve('../assignments');
const logoPath = path.join(assignDir, 'cu_logo.png');
let logoBase64 = '';
if (fs.existsSync(logoPath)) {
  logoBase64 = fs.readFileSync(logoPath).toString('base64');
}

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 11pt;
      line-height: 1.5;
      color: #000000;
    }
    h1 {
      font-size: 22pt;
      text-align: center;
      margin-top: 20px;
      color: #78350F;
    }
    h2 {
      font-size: 16pt;
      text-align: center;
      margin-top: 10px;
      color: #92400E;
    }
    h3 {
      font-size: 13pt;
      color: #B45309;
      margin-top: 15px;
      margin-bottom: 5px;
    }
    .cover-info {
      width: 70%;
      margin: 30px auto;
      border-collapse: collapse;
    }
    .cover-info td {
      padding: 6px;
      font-size: 11pt;
    }
    .lbl {
      font-weight: bold;
      text-align: right;
      width: 45%;
      color: #78350F;
    }
    .val {
      text-align: left;
      padding-left: 15px;
    }
    .day-title {
      font-size: 13pt;
      font-weight: bold;
      color: #78350F;
      margin-top: 25px;
      margin-bottom: 5px;
    }
    .sec-lbl {
      font-weight: bold;
      color: #92400E;
      margin-top: 8px;
      margin-bottom: 3px;
      font-size: 11pt;
    }
    ul {
      margin-top: 2px;
      margin-bottom: 8px;
      padding-left: 20px;
    }
    li {
      margin-bottom: 3px;
    }
    .intro {
      text-align: justify;
      margin-bottom: 20px;
      font-size: 11pt;
    }
  </style>
</head>
<body>

  <!-- COVER PAGE -->
  <div style="text-align: center;">
    ${logoBase64 ? `<img src="data:image/png;base64,${logoBase64}" style="width: 500px; height: auto;" />` : ''}
    <h1>DAILY TASK REPORT</h1>
    <h2>Spring Boot Fundamentals and REST API Development</h2>
    <p style="text-align: center; font-size: 11pt; color: #4A5568; margin-top: 5px;">
      <strong>29-Day Industrial Training Program Log</strong>
    </p>
    
    <table class="cover-info">
      <tr>
        <td class="lbl">Student Name:</td>
        <td class="val">Mehak</td>
      </tr>
      <tr>
        <td class="lbl">UID:</td>
        <td class="val">24BCS12136</td>
      </tr>
      <tr>
        <td class="lbl">University:</td>
        <td class="val">Chandigarh University</td>
      </tr>
      <tr>
        <td class="lbl">Institution:</td>
        <td class="val">University Institute of Engineering (UIE)</td>
      </tr>
      <tr>
        <td class="lbl">Instructor Name:</td>
        <td class="val">ER. Sumit Malhotra</td>
      </tr>
      <tr>
        <td class="lbl">Type of Report:</td>
        <td class="val">Daily Task Log Book</td>
      </tr>
      <tr>
        <td class="lbl">Year / Month:</td>
        <td class="val">2026 / June</td>
      </tr>
    </table>
  </div>

  <br clear="all" style="page-break-before: always;" />

  <!-- INTRO -->
  <div class="intro">
    <strong>Introduction:</strong><br/>
    The following is a comprehensive day-by-day record of the tasks performed and skills acquired by the student during the 29-day industrial training program focusing on Spring Boot Fundamentals and REST API Development. Each day represents specific modules designed to build competencies in backend development, relational mapping databases, RESTful integration APIs, security filters (JWT), and frontend interface bindings (React client).
  </div>

  <!-- DAY 1 -->
  <div class="day-title">Day 1: Spring Boot Starters</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Initialized a Spring Boot microservice environment using Spring Initializr, packaging Web, Validation, and Actuator dependencies.</li>
    <li>Developed a basic CRUD employee directory repository layout with starter dependencies.</li>
    <li>Analyzed and compared resource footprints and startup latencies between a lean starter configuration and an over-provisioned stack.</li>
    <li>Exposed system health monitoring parameters with readiness and liveness check indicators.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Acquired a deep understanding of dependency management using Spring Boot Starter POM files.</li>
    <li>Mastered configuration patterns of readiness/liveness indicator check settings.</li>
    <li>Understood the core resource costs associated with loading unnecessary autoconfig files.</li>
  </ul>

  <!-- DAY 2 -->
  <div class="day-title">Day 2: Auto-configuration, Dependency Injection</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Built a payment selector component where UPI, Card, and NetBanking providers are dynamically resolved at startup.</li>
    <li>Created a profile-based communication module selecting SMS or Email senders depending on active environment configs.</li>
    <li>Refactored legacy services into constructor-based injection formats to eliminate field coupling.</li>
    <li>Designed a configurable logger module using <code>@ConditionalOnProperty</code> annotations to enable conditional logging.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Understood Spring’s auto-configuration engine, profile overrides, and conditional bean loading triggers.</li>
    <li>Learned how to construct unit tests for services using constructor injections without booting the application context.</li>
  </ul>

  <!-- DAY 3 -->
  <div class="day-title">Day 3: REST APIs: Controller-Service-Repository architecture, DTOs</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Constructed a customer support ticketing system utilizing the three-tier Spring architecture pattern.</li>
    <li>Implemented data mapping wrappers (DTOs) for incoming and outgoing request payloads.</li>
    <li>Created validation structures checking that product catalog entries do not contain negative values.</li>
    <li>Developed departmental search filters returning lists of employees from repositories.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Understood the separation of concerns in Controller-Service-Repository layers.</li>
    <li>Learned data mapping strategies (Entity to DTO conversion) to protect schema metadata.</li>
  </ul>

  <!-- DAY 4 -->
  <div class="day-title">Day 4: Validation, Global Exception Handling</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Applied input validations on user signup registration endpoints (checks on email format, passwords, mobile formats).</li>
    <li>Designed a global exception handler class extending <code>@ControllerAdvice</code>.</li>
    <li>Constructed validation handlers for salary thresholds and KYC requirements in a loan workflow.</li>
    <li>Created custom domain exceptions (e.g. <code>InventoryShortageException</code>) returning standard JSON responses.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Understood JSR-380 validation annotations (e.g., <code>@Email</code>, <code>@Pattern</code>, <code>@Size</code>).</li>
    <li>Mastered centralized REST error handling returning structured error models.</li>
  </ul>

  <!-- DAY 5 -->
  <div class="day-title">Day 5: Creating Mini Project with Service Layer</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Built a leaves allocation module with custom approval, cancellation, and rejection workflows.</li>
    <li>Programmed verification logic preventing reservation scheduling overlaps within the service layer.</li>
    <li>Developed doctor scheduling algorithms checking daily availabilities.</li>
    <li>Implemented coupon qualification rules validating expirations and order thresholds.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Mastered the design of complex transactional workflows in the service layer.</li>
    <li>Learned logic isolation techniques separating calculations from data fetching.</li>
  </ul>

  <!-- DAY 6 -->
  <div class="day-title">Day 6: Testing Mini Project with Service Layer</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Wrote JUnit 5 unit tests verifying leave workflow states using Mockito repository doubles.</li>
    <li>Simulated overlapping calendars to verify reservation scheduling conflict validations.</li>
    <li>Conducted edge-case test validations on expired coupons and duplicate promotions.</li>
    <li>Achieved code coverage targets on branching conditions in service operations.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Mastered mocking dependencies with Mockito's <code>@Mock</code> and <code>@InjectMocks</code>.</li>
    <li>Learned validation patterns for verifying negative paths and business constraints.</li>
  </ul>

  <!-- DAY 7 -->
  <div class="day-title">Day 7: Entity Mapping</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Mapped relational entities (Employee, Department, Address) using JPA annotations.</li>
    <li>Configured custom physical table attributes for an Order tracking entity.</li>
    <li>Defined unique columns and indices on database fields in user profile entities.</li>
    <li>Configured enum field mapping conversions using <code>@Enumerated(EnumType.STRING)</code>.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Learned fundamental Hibernate annotations for object-relational mapping (ORM).</li>
    <li>Evaluated performance benefits of String vs Ordinal enum mappings.</li>
  </ul>

  <!-- DAY 8 -->
  <div class="day-title">Day 8: Relationships</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Modeled a many-to-many relationship linking Student and Course tables using intermediate mapping configurations.</li>
    <li>Set up one-to-many and one-to-one relationships between Order, Customer, and ShippingAddress tables.</li>
    <li>Built a comment thread database schema for blogs mapping Post, Comment, and Tag entities.</li>
    <li>Designed mapping relationships for a theater scheduling module linking Screen, Show, and Seat tables.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Understood collection properties and join table specifications.</li>
    <li>Learned performance configurations for direct entity mappings.</li>
  </ul>

  <!-- DAY 9 -->
  <div class="day-title">Day 9: Cascade Types, JPQL, Native Queries, Criteria API</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Integrated cascading actions (PERSIST, REMOVE) across parent order containers.</li>
    <li>Authored JPQL statements to query active employees filtered by creation thresholds.</li>
    <li>Formulated SQL native statements generating monthly sales statistics.</li>
    <li>Built a dynamic catalog filter using JPA Criteria API to support compound queries.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Mastered cascade types to coordinate operations across related tables.</li>
    <li>Understood trade-offs between JPQL, Native SQL queries, and Criteria API execution.</li>
  </ul>

  <!-- DAY 10 -->
  <div class="day-title">Day 10: Pagination, Sorting, Fetch Strategies</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Developed paginated queries sorting employee catalogs by target fields.</li>
    <li>Configured pagination request variables on search APIs to handle offset limits.</li>
    <li>Identified N+1 select statement performance defects and resolved them with JOIN FETCH queries.</li>
    <li>Engineered lazy loading properties to defer secondary collection loads.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Mastered Pageable and Sort properties in Spring Data JPA.</li>
    <li>Learned to recognize, diagnose, and resolve N+1 database queries.</li>
  </ul>

  <!-- DAY 11 -->
  <div class="day-title">Day 11: Creating Mini Project with Database</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Built a task tracking manager committing records into persistent databases.</li>
    <li>Developed a library registration service tracking book inventories and borrowers.</li>
    <li>Created a warehouse inventory manager generating alerts when stock levels fall below thresholds.</li>
    <li>Structured normalized relational tables to log school course outcomes.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Formulated schema definition scripts (schema.sql) and initial test seed sets.</li>
    <li>Learned data normalization patterns to maintain data consistency.</li>
  </ul>

  <!-- DAY 12 -->
  <div class="day-title">Day 12: Testing Mini Project with Database</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Wrote integration test cases using H2 in-memory databases to verify repository operations.</li>
    <li>Tested transactional rollback rules in inventory workflow test environments.</li>
    <li>Verified cascading properties during library entity persistence operations.</li>
    <li>Checked execution paths of native SQL statements using test database parameters.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Understood integration testing principles using <code>@DataJpaTest</code> and H2 databases.</li>
    <li>Mastered transactions handling and rollback rules in tests.</li>
  </ul>

  <!-- DAY 13 -->
  <div class="day-title">Day 13: Authentication vs Authorization</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Configured stateless security boundaries classifying public vs protected paths.</li>
    <li>Mapped role authorizations restricting administrative controller operations to manager permissions.</li>
    <li>Built custom access evaluators enforcing document ownership security guidelines.</li>
    <li>Developed audit recorders logging auth attempts and client details.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Distinguished authentication processes from role/privilege-based authorization.</li>
    <li>Implemented domain-level access restrictions.</li>
  </ul>

  <!-- DAY 14 -->
  <div class="day-title">Day 14: JWT: Token generation, Signing, Validation Filters</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Integrated JWT security layers signing user identity packets with HMAC-256 keys.</li>
    <li>Programmed access token lifespans and refresh token rotations.</li>
    <li>Formulated servlet filters validating authorization headers.</li>
    <li>Designed token blacklist databases to securely invalidate tokens on user logout.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Understood JWT architecture, payload structures, and signatures.</li>
    <li>Mastered stateless auth request parsing inside filter chains.</li>
  </ul>

  <!-- DAY 15 -->
  <div class="day-title">Day 15: RBAC & OAuth2</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Formulated role-based access rules restricting administration dashboard views.</li>
    <li>Integrated OAuth2 workflows permitting authentication handshakes with third-party providers.</li>
    <li>Applied method-level security protections using <code>@PreAuthorize</code> assertions.</li>
    <li>Programmed authorization hierarchies for educational platforms.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Learned how to implement method-level security in Spring Boot.</li>
    <li>Understood OAuth2 flows and resource server implementations.</li>
  </ul>

  <!-- DAY 16 -->
  <div class="day-title">Day 16: CORS Configuration</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Integrated global CORS settings allowing frontend React client operations.</li>
    <li>Restricted HTTP cross-origin requests to permitted list metrics in production configurations.</li>
    <li>Diagnosed preflight option request blockages involving custom authorization headers.</li>
    <li>Configured profile-specific CORS properties supporting local and staging environments.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Mastered preflight handshakes and cross-origin header requirements.</li>
    <li>Configured secure environment-based CORS restrictions.</li>
  </ul>

  <!-- DAY 17 -->
  <div class="day-title">Day 17: Axios/Fetch Setup with Interceptors</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Configured Axios request interceptors to attach JWT headers automatically.</li>
    <li>Implemented response handlers routing users to login screens on 401 statuses.</li>
    <li>Programmed network request retry and timeout configurations in client modules.</li>
    <li>Coded automatic access token refreshes when token expiration events occur.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Mastered client-side interceptor pipelines.</li>
    <li>Designed smooth authentication transitions without interrupting active users.</li>
  </ul>

  <!-- DAY 18 -->
  <div class="day-title">Day 18: GitHub Actions CI/CD</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Wrote workflow files executing build checks on GitHub pull requests.</li>
    <li>Organized separate testing jobs for frontend linter verification and backend validation.</li>
    <li>Set up environment deployment gates mapping branch merges to target servers.</li>
    <li>Configured GitHub Secrets variables to insulate production credentials.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Learned continuous integration patterns using GitHub Actions.</li>
    <li>Understood secret management guidelines inside repository configuration pipelines.</li>
  </ul>

  <!-- DAY 19 -->
  <div class="day-title">Day 19: Netlify Hosting</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Deployed the React single-page frontend application package to Netlify environments.</li>
    <li>Configured dynamic site settings to map API destinations.</li>
    <li>Fixed client routing redirects to route SPA assets correctly.</li>
    <li>Deployed dev and production deployments matching corresponding repository branches.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Mastered static application deployment pipelines on Netlify.</li>
    <li>Understood router path resolution requirements in SPA environments.</li>
  </ul>

  <!-- DAY 20 -->
  <div class="day-title">Day 20: Mini Project - Security</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Built a secure file portal checking request ownership before transferring files.</li>
    <li>Created ledger database tables to audit transaction activities.</li>
    <li>Configured API rate limit protections and password hashing tools.</li>
    <li>Implemented restricted dashboard report modules using JWT role check validations.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Understood API protection strategies including rate limits.</li>
    <li>Mastered secure password storage rules using password encoders.</li>
  </ul>

  <!-- DAY 21 -->
  <div class="day-title">Day 21: Testing Mini Project</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Formulated full testing runs confirming registration, authentication, and CRUD operations.</li>
    <li>Wrote negative security test cases verifying page blocks for unauthorized access.</li>
    <li>Coded API schema validation checks ensuring response payloads match schemas.</li>
    <li>Structured automated test suites verifying all layers from database to controllers.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Understood integration testing principles using MockMvc testing environments.</li>
    <li>Learned validation check methods ensuring response formats do not break contract standards.</li>
  </ul>

  <!-- DAY 22 -->
  <div class="day-title">Day 22: React Application</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Scaffolded React clients setting up router configurations and paths.</li>
    <li>Formulated dashboard view cards retrieving statistics from backend APIs.</li>
    <li>Designed workspace grids containing navigation sidebars and headers.</li>
    <li>Structured project folders separating component libraries from custom service hooks.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Mastered SPA routing configurations.</li>
    <li>Understood application design strategies in modern web applications.</li>
  </ul>

  <!-- DAY 23 -->
  <div class="day-title">Day 23: UI for React Application</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Built login forms applying validation checks to fields.</li>
    <li>Created grid views for inventory lists displaying page changes and sorts.</li>
    <li>Developed popup confirmation dialog layouts to secure deletion options.</li>
    <li>Coded summary layout grids displaying project status chips.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Designed visually appealing, accessible user interfaces.</li>
    <li>Managed UI states including loading processes and form errors.</li>
  </ul>

  <!-- DAY 24 -->
  <div class="day-title">Day 24: Running React Application</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Prepared environmental parameters configuration files mapping endpoint URLs.</li>
    <li>Resolved build package errors matching dependency versions.</li>
    <li>Organized command definitions inside manifest files to streamline startup commands.</li>
    <li>Documented performance variations between development engines and production bundles.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Managed environment-specific configurations.</li>
    <li>Mastered package manager dependency resolution procedures.</li>
  </ul>

  <!-- DAY 25 -->
  <div class="day-title">Day 25: Applying Frontend to Backend</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Linked client components to corresponding Spring Boot REST controllers.</li>
    <li>Programmed login pipelines forwarding form parameters and caching token values.</li>
    <li>Implemented multi-part data submission endpoints to upload file attachments.</li>
    <li>Connected client navigation filters to backend page parameters.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Mastered asynchronous API integration patterns.</li>
    <li>Handled token cache storage and access rules across site changes.</li>
  </ul>

  <!-- DAY 26 -->
  <div class="day-title">Day 26: Testing Frontend</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Wrote React component tests verifying authentication validation states.</li>
    <li>Mocked backend response payloads checking table updates and error states.</li>
    <li>Created form tests validating inputs and submission behaviors.</li>
    <li>Checked visual restrictions showing or hiding elements based on user roles.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Learned to write frontend unit tests using React Testing Library.</li>
    <li>Mastered API simulation techniques.</li>
  </ul>

  <!-- DAY 27 -->
  <div class="day-title">Day 27: Guiding Major Project</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Created full system architectures mapping out-of-the-box system layers.</li>
    <li>Divided project deliverables into individual milestones.</li>
    <li>Developed database schema models and API routes.</li>
    <li>Configured non-functional design guidelines verifying scalability and security.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Understood system planning processes for enterprise-level applications.</li>
    <li>Mastered sprint configuration and agile task delegation mechanisms.</li>
  </ul>

  <!-- DAY 28 -->
  <div class="day-title">Day 28: Presentation Major Project</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Formulated technical project presentations outlining system architecture and patterns.</li>
    <li>Designed product walkthrough scripts demonstrating core user operations.</li>
    <li>Authored slides presenting architecture trade-offs.</li>
    <li>Prepared detailed diagrams mapping network architectures.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Acquired communication skills for presenting complex systems.</li>
    <li>Understood execution flow analysis patterns.</li>
  </ul>

  <!-- DAY 29 -->
  <div class="day-title">Day 29: Deploying Project to GitHub</div>
  <div class="sec-lbl">Tasks Performed:</div>
  <ul>
    <li>Pushed codebase packages into target repositories attaching descriptive README files.</li>
    <li>Defined branches protection guidelines requiring pull request approvals.</li>
    <li>Attached automated build status labels to main descriptions.</li>
    <li>Reorganized commit logs to maintain clean histories.</li>
  </ul>
  <div class="sec-lbl">Learning Outcomes:</div>
  <ul>
    <li>Mastered Git workflows and team integration procedures.</li>
    <li>Understood repository management guidelines.</li>
  </ul>

</body>
</html>`;

(async () => {
  try {
    console.log('Generating DOCX buffer...');
    const docxBuffer = await HTMLtoDOCX(html, null, {
      table: { row: { cantSplit: true } },
      footer: true,
      header: true,
      pageNumber: true
    });
    
    const outputPath = path.join(assignDir, '24BCS12136_Daily_assignments.docx');
    fs.writeFileSync(outputPath, docxBuffer);
    console.log(`Successfully generated DOCX file at: ${outputPath}`);
  } catch (error) {
    console.error('Error generating DOCX:', error);
  }
})();
