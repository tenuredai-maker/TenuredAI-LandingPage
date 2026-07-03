export interface DigestData {
  userName: string;
  pointsGained: number;
  totalPoints: number;
  topSkillsProgress: Array<{
    name: string;
    pointsGained: number;
    currentLevel: number;
  }>;
  activities: Array<{
    title: string;
    date: string;
    points: number;
  }>;
}

export class EmailDigestService {
  public static generateWeeklyDigestHtml(data: DigestData): string {
    const { userName, pointsGained, totalPoints, topSkillsProgress, activities } = data;

    const skillsHtml = topSkillsProgress.map(skill => `
      <div style="margin-bottom: 12px; padding: 12px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
        <h3 style="margin: 0 0 4px 0; font-size: 16px; color: #0f172a;">${skill.name}</h3>
        <p style="margin: 0; font-size: 14px; color: #64748b;">
          Level ${skill.currentLevel} &bull; <span style="color: #059669; font-weight: bold;">+${skill.pointsGained} XP</span>
        </p>
      </div>
    `).join('');

    const activitiesHtml = activities.map(act => `
      <li style="margin-bottom: 8px; font-size: 14px; color: #475569;">
        <strong>+${act.points} TP</strong>: ${act.title} - <span style="color: #94a3b8;">${act.date}</span>
      </li>
    `).join('');

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
}
