import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon, ShieldCheck, Activity, Cpu } from "lucide-react";

export const SolarTelemetryTerminal: React.FC = () => {
  const [text, setText] = useState("");
  const fullText = `[INIT] Handshaking with SolarEdge RS-485 Modbus telemetry...
[SUCCESS] Inverter Serial #INV-SP-3K-88492 Verified
[TELEMETRY] 14x 550W N-Type Bifacial TOPCon modules online
[OPTIMIZER] S500B DC Optimizers harvesting individual MPPT
[STORAGE] 10 kWh High-Voltage LiFePO4 battery connected (97% RTT)
[SAFETY] SafeDC™ touch-safe 1V per module active
[DISCOM] Net-metering synchrony: 240V AC, 50.02 Hz (3-Phase)
[WARRANTY] 20-Year Cryptographic Ledger Initialized

> system.status: OPTIMAL_GRID_TIED
> system.mode: SELF_CONSUMPTION_MAXIMIZED
> discom.subsidy: PM_SURYA_GHAR_₹78000_APPROVED
> _`;

  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(intervalId);
      }
    }, 20);
    return () => clearInterval(intervalId);
  }, [fullText]);

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border border-white/10 bg-[#0F1420] shadow-2xl text-left font-mono">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-black/60 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <TerminalIcon className="w-3.5 h-3.5 text-[#ED1C24]" />
          <span>solaredge@field-console:~</span>
        </div>
        <div className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          LIVE TELEMETRY
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-5 text-xs sm:text-sm text-slate-200 whitespace-pre-wrap min-h-[220px] leading-relaxed">
        {text}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-2 h-4 bg-[#ED1C24] ml-1 align-middle"
        />
      </div>
    </div>
  );
};
export default SolarTelemetryTerminal;
