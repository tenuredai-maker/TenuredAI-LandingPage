export default function Ticker() {
  const items = [
    "SYSTEM_PULSE: OPTIMAL (0.8MS LATENCY)",
    "HARD_GATE_SUCCESS: NODE_HOU_421 (AICI: 0.98)",
    "DIVIDEND_SETTLEMENT: $14,202.44 DISBURSED (40/40/20)",
    "SOVEREIGN_PASSPORT: MINTED #882,104 (VERIFIED)",
    "ADVERSARIAL_STRESS: EU-WEST-1 (RESILIENCE: 99.4%)",
    "LEDGER_SYNC: HOUSTON // NEW_YORK // LONDON",
    "GRIT_INDEX: GLOBAL_AVG 76.4 (+1.2)",
    "ACTIVE_SESSIONS: 12,402 NODES ONLINE",
    "THROUGHPUT: 2.4 PB/S (ENCRYPTED_AES256)",
    "IDENTITY_SCAR: PROTOCOL_ACTIVE (ZERO_KNOWLEDGE)",
    "MINTING_BOND: $50.00 SEED_CAPITAL (EPOCH_14)",
    "NODE_STATUS: NYC-04 (LOAD: 14%)",
    "ALMA_MATER_FUND: $4.2M ACCRUED (Q2_FORECAST)",
    "THREAT_LEVEL: MINIMAL (SHIELD_ACTIVE)"
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-stone-950 py-2.5 overflow-hidden z-50 border-t border-white/10 backdrop-blur-md">
      <div className="flex whitespace-nowrap gap-16 items-center animate-[scroll_40s_linear_infinite]">
        {[...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center gap-3 text-stone-400 font-mono text-[9px] uppercase tracking-[0.2em]">
            <span className="w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"></span>
            <span className="text-stone-500">{item.split(':')[0]}:</span>
            <span className="text-stone-200">{item.split(':')[1]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
