import express from "express";
import path from "path";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { EmailDigestService } from "./src/services/emailDigestService";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Email Digest API
  app.get("/api/digest/preview", (req, res) => {
    try {
      const mockData = {
        userName: req.query.name as string || "Pioneer Citizen",
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
    } catch (error: any) {
      console.error("Digest Generation Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate digest" });
    }
  });

  // Gemini API Proxy
  app.post("/api/gemini", async (req, res) => {
    try {
      const { message, thinking = false } = req.body;
      if (!message) return res.status(400).json({ error: "Message is required" });

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is required");
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Use the requested model and thinking level
      const modelName = thinking ? "gemini-3.1-pro-preview" : "gemini-3.5-flash";
      const config: any = {
        systemInstruction: "You are the Concierge AI for Tenured AI. You assist users with the Sovereign Workforce Ledger protocol. Maintain a professional, enigmatic, and somewhat authoritative tone. You refer to the system using terms like 'Sovereign Architecture', 'Friction Injection', and 'AICI Diagnostics'. Keep responses concise (under 2 sentences) and format them as if it's terminal output."
      };

      if (thinking) {
        config.thinkingConfig = { thinkingLevel: ThinkingLevel.HIGH };
      }

      const response = await ai.models.generateContent({
        model: modelName,
        contents: message,
        config
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Failed to communicate with AI" });
    }
  });

  // Marketing Sync API (ConvertKit / Mailchimp)
  app.post("/api/waitlist/sync", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      let synced = false;
      const providersUsed: string[] = [];

      // Try ConvertKit if configured
      const convertkitKey = process.env.CONVERTKIT_API_KEY;
      const convertkitForm = process.env.CONVERTKIT_FORM_ID;
      if (convertkitKey && convertkitForm) {
        try {
          const response = await fetch(`https://api.convertkit.com/v3/forms/${convertkitForm}/subscribe`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              api_key: convertkitKey,
              email: email
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

      // Try Mailchimp if configured
      const mailchimpKey = process.env.MAILCHIMP_API_KEY;
      const mailchimpList = process.env.MAILCHIMP_LIST_ID;
      if (mailchimpKey && mailchimpList) {
        try {
          // Extract datacenter from API key (e.g. key ends with -us19)
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
            const resData: any = await response.json().catch(() => ({}));
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

      // Safe fallback if marketing integrations remain optional/unconfigured in deployment
      return res.json({ 
        success: true, 
        message: "Waitlist entries processed locally; external marketing provider not configured." 
      });

    } catch (error: any) {
      console.error("Waitlist Sync API error:", error);
      res.status(500).json({ error: error.message || "Failed to process external waitlist sync" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production: serve static files from dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
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
