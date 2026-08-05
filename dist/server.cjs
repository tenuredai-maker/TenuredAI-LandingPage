var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_genai = require("@google/genai");

// src/services/emailDigestService.ts
var EmailDigestService = class {
  static generateWeeklyDigestHtml(data) {
    const { userName, pointsGained, totalPoints, topSkillsProgress, activities } = data;
    const skillsHtml = topSkillsProgress.map((skill) => `
      <div style="margin-bottom: 12px; padding: 12px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
        <h3 style="margin: 0 0 4px 0; font-size: 16px; color: #0f172a;">${skill.name}</h3>
        <p style="margin: 0; font-size: 14px; color: #64748b;">
          Level ${skill.currentLevel} &bull; <span style="color: #059669; font-weight: bold;">+${skill.pointsGained} XP</span>
        </p>
      </div>
    `).join("");
    const activitiesHtml = activities.map((act) => `
      <li style="margin-bottom: 8px; font-size: 14px; color: #475569;">
        <strong>+${act.points} TP</strong>: ${act.title} - <span style="color: #94a3b8;">${act.date}</span>
      </li>
    `).join("");
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your Weekly Reputation Digest</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 0; color: #0f172a; }
    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
    .header { background-color: #0f172a; color: #ffffff; padding: 32px 40px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; }
    .content { padding: 40px; }
    .stat-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 32px; }
    .stat-number { font-size: 48px; font-weight: 900; color: #3b82f6; margin: 0; line-height: 1; }
    .stat-label { font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; font-weight: bold; margin-top: 8px; }
    h2 { font-size: 18px; color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.05em; }
    .footer { background-color: #f8fafc; padding: 24px 40px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Tenured AI</h1>
      <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 14px; letter-spacing: 0.05em;">Weekly Reputation Digest</p>
    </div>
    
    <div class="content">
      <p style="font-size: 16px; margin-top: 0; margin-bottom: 24px;">Greetings, <strong>${userName}</strong>,</p>
      
      <p style="font-size: 16px; color: #475569; line-height: 1.5; margin-bottom: 32px;">
        Here is your sovereign ledger summary for the past 7 days. Your continuous contributions are hardening the network.
      </p>

      <div class="stat-box">
        <p class="stat-number">+${pointsGained}</p>
        <p class="stat-label">Tenured Points Earned</p>
        <p style="margin: 12px 0 0 0; font-size: 14px; color: #475569;">Total Reputation: <strong>${totalPoints} TP</strong></p>
      </div>

      <h2>Skill Progression</h2>
      ${skillsHtml ? skillsHtml : '<p style="color: #64748b; font-size: 14px;">No skill progression recorded this week.</p>'}

      <h2 style="margin-top: 32px;">Key Validations</h2>
      <ul style="padding-left: 20px; margin: 0;">
        ${activitiesHtml ? activitiesHtml : '<li style="color: #64748b; font-size: 14px;">No major validations this week.</li>'}
      </ul>
      
      <div style="margin-top: 40px; text-align: center;">
        <a href="https://tenured-ai.com/profile" style="display: inline-block; background-color: #3b82f6; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; font-size: 14px; letter-spacing: 0.05em; text-transform: uppercase;">View Full Ledger</a>
      </div>
    </div>
    
    <div class="footer">
      <p style="margin: 0;">This transmission was encrypted and signed by the Tenured Architecture.</p>
      <p style="margin: 4px 0 0 0;">CONFIDENTIAL SOVEREIGN DATA</p>
    </div>
  </div>
</body>
</html>
    `;
  }
};

// server.ts
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  app.use((_req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    next();
  });
  app.get("/api/digest/preview", (req, res) => {
    try {
      const mockData = {
        userName: req.query.name || "Pioneer Citizen",
        pointsGained: 450,
        totalPoints: 1250,
        topSkillsProgress: [
          { name: "Engineering", pointsGained: 250, currentLevel: 4 },
          { name: "Strategy", pointsGained: 120, currentLevel: 2 },
          { name: "Design", pointsGained: 80, currentLevel: 3 }
        ],
        activities: [
          { title: "Peer Underwriting Review", date: "2 days ago", points: 150 },
          { title: "Node Validation Payload", date: "4 days ago", points: 200 },
          { title: "Daily Ping Streak", date: "Yesterday", points: 100 }
        ]
      };
      const html = EmailDigestService.generateWeeklyDigestHtml(mockData);
      res.send(html);
    } catch (error) {
      console.error("Digest Generation Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate digest" });
    }
  });
  app.post("/api/gemini", async (req, res) => {
    try {
      const { message, thinking = false } = req.body;
      if (!message) return res.status(400).json({ error: "Message is required" });
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is required");
      }
      const ai = new import_genai.GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });
      const modelName = thinking ? "gemini-3.1-pro-preview" : "gemini-3.5-flash";
      const config = {
        systemInstruction: "You are the Concierge AI for Tenured AI. You assist users with the Sovereign Workforce Ledger protocol. Maintain a professional, enigmatic, and somewhat authoritative tone. You refer to the system using terms like 'Sovereign Architecture', 'Friction Injection', and 'AICI Diagnostics'. Keep responses concise (under 2 sentences) and format them as if it's terminal output."
      };
      if (thinking) {
        config.thinkingConfig = { thinkingLevel: import_genai.ThinkingLevel.HIGH };
      }
      const response = await ai.models.generateContent({
        model: modelName,
        contents: message,
        config
      });
      res.json({ text: response.text });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Failed to communicate with AI" });
    }
  });
  app.post("/api/waitlist/sync", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
      let synced = false;
      const providersUsed = [];
      const convertkitKey = process.env.CONVERTKIT_API_KEY;
      const convertkitForm = process.env.CONVERTKIT_FORM_ID;
      if (convertkitKey && convertkitForm) {
        try {
          const response = await fetch(`https://api.convertkit.com/v3/forms/${convertkitForm}/subscribe`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              api_key: convertkitKey,
              email
            })
          });
          if (response.ok) {
            synced = true;
            providersUsed.push("ConvertKit");
          } else {
            const errBody = await response.text();
            console.error(`ConvertKit API rejection (${response.status}):`, errBody);
          }
        } catch (ckErr) {
          console.error("ConvertKit network/integration error:", ckErr);
        }
      }
      const mailchimpKey = process.env.MAILCHIMP_API_KEY;
      const mailchimpList = process.env.MAILCHIMP_LIST_ID;
      if (mailchimpKey && mailchimpList) {
        try {
          const match = mailchimpKey.match(/-([a-zA-Z0-9]+)$/);
          const dc = match ? match[1] : "us1";
          const authHeader = `Basic ${Buffer.from(`anykey:${mailchimpKey}`).toString("base64")}`;
          const response = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${mailchimpList}/members`, {
            method: "POST",
            headers: {
              "Authorization": authHeader,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email_address: email,
              status: "subscribed"
            })
          });
          if (response.ok || response.status === 400) {
            const resData = await response.json().catch(() => ({}));
            if (response.ok || resData.title === "Member Exists") {
              synced = true;
              providersUsed.push("Mailchimp");
            } else {
              console.error(`Mailchimp API rejection (${response.status}):`, resData);
            }
          } else {
            const errBody = await response.text();
            console.error(`Mailchimp API rejection (${response.status}):`, errBody);
          }
        } catch (mcErr) {
          console.error("Mailchimp network/integration error:", mcErr);
        }
      }
      if (providersUsed.length > 0) {
        return res.json({
          success: true,
          message: `Email synced to external list(s): ${providersUsed.join(", ")}`
        });
      }
      return res.json({
        success: true,
        message: "Waitlist entries processed locally; external marketing provider not configured."
      });
    } catch (error) {
      console.error("Waitlist Sync API error:", error);
      res.status(500).json({ error: error.message || "Failed to process external waitlist sync" });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom"
    });
    app.use(vite.middlewares);
    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const templatePath = import_path.default.resolve(process.cwd(), "index.html");
        if (!import_fs.default.existsSync(templatePath)) {
          return res.status(404).send("index.html not found");
        }
        let template = import_fs.default.readFileSync(templatePath, "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
//# sourceMappingURL=server.cjs.map
