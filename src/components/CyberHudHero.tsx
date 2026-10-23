import React, { useState, useEffect } from 'react';
import { Cpu, Activity, Wifi, Shield, Radio, Layers, Database, Sparkles } from 'lucide-react';

interface TelemetryNode {
  id: string;
  name: string;
  location: string;
  type: string;
  status: 'online' | 'syncing';
  latency: string;
  coords: { x: number; y: number }; // Percentage in radar circle
  description: string;
  lead: string;
}

const NODES: TelemetryNode[] = [
  {
    id: 'node-htcs',
    name: 'HTCS Robotics Lab',
    location: 'Holy Trinity Cathedral School',
    type: 'Hardware & Embedded',
    status: 'online',
    latency: '4ms',
    coords: { x: 50, y: 46 },
    description: 'Autonomous micro-rovers, ESP32 telemetry, and student robotics curriculum foundry.',
    lead: 'Amen Daod',
  },
  {
    id: 'node-aau',
    name: 'AAU AI Research Node',
    location: 'Addis Ababa University (4 Kilo)',
    type: 'Deep Learning & NLP',
    status: 'online',
    latency: '11ms',
    coords: { x: 72, y: 32 },
    description: 'EthioLinguistic NLP tokenization models and Guzo AI transit graph neural networks.',
    lead: 'Eskinder Tilahun',
  },
  {
    id: 'node-agri',
    name: 'Rift Valley AgriTech Hub',
    location: 'Bishoftu / Oromia Regional Farm',
    type: 'Edge Computer Vision',
    status: 'online',
    latency: '18ms',
    coords: { x: 30, y: 68 },
    description: 'Field-deployed INT8 quantized vision models detecting teff leaf rust and coffee disease.',
    lead: 'Bethlehem Haile',
  },
  {
    id: 'node-lora',
    name: 'EthioTelematics Mesh Grid',
    location: 'Meskel Square & LRT Corridor',
    type: 'LoRa Mesh & IoT',
    status: 'syncing',
    latency: '24ms',
    coords: { x: 68, y: 74 },
    description: 'Solar-powered ambient sensor nodes monitoring transit microclimate and vehicular flow.',
    lead: 'Yared Mengistu',
  },
];

export const CyberHudHero: React.FC = () => {
  const [activeNode, setActiveNode] = useState<TelemetryNode>(NODES[0]);
  const [activeTab, setActiveTab] = useState<'radar' | 'nodes' | 'stream'>('radar');
  const [packetCount, setPacketCount] = useState<number>(48219);
  const [timeStr, setTimeStr] = useState<string>('12:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      setPacketCount((prev) => prev + Math.floor(Math.random() * 4) + 1);
      const now = new Date();
      setTimeStr(now.toTimeString().split(' ')[0]);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full relative rounded-3xl bg-[#080d1a]/95 border border-slate-800/90 shadow-2xl p-4 sm:p-6 overflow-hidden">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#10b981]" />
          <div>
            <div className="text-xs font-bold text-white tracking-wider uppercase font-mono flex items-center gap-2">
              <span>ETHIOTECH SYSTEM ARCHITECTURE</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                ACTIVE
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              ADDIS ABABA 9.0192°N, 38.7525°E · ELEV 2,355M
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-[#050811] p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('radar')}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeTab === 'radar'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Radar
          </button>
          <button
            onClick={() => setActiveTab('nodes')}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeTab === 'nodes'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Nodes
          </button>
          <button
            onClick={() => setActiveTab('stream')}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              activeTab === 'stream'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Telemetry
          </button>
        </div>
      </div>

      {/* Main Content by Tab */}
      {activeTab === 'radar' && (
        <div className="space-y-4">
          {/* Radar Visualization Area */}
          <div className="relative w-full h-[320px] sm:h-[350px] rounded-2xl bg-[#050811] border border-slate-800/90 flex items-center justify-center overflow-hidden">
            
            {/* Concentric Radar Rings */}
            <div className="absolute w-[90%] h-[90%] rounded-full border border-emerald-500/10 pointer-events-none" />
            <div className="absolute w-[70%] h-[70%] rounded-full border border-emerald-500/20 pointer-events-none" />
            <div className="absolute w-[45%] h-[45%] rounded-full border border-emerald-500/30 pointer-events-none" />
            <div className="absolute w-[20%] h-[20%] rounded-full border border-emerald-500/40 pointer-events-none" />
            
            {/* Radar Crosshairs */}
            <div className="absolute w-full h-[1px] bg-emerald-500/15 pointer-events-none" />
            <div className="absolute h-full w-[1px] bg-emerald-500/15 pointer-events-none" />

            {/* Axum Stele Silhouette Vector Centerpiece */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <svg width="180" height="180" viewBox="0 0 100 100" fill="none">
                <polygon points="50,10 65,35 60,90 40,90 35,35" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2" />
                <circle cx="50" cy="25" r="4" fill="#f59e0b" />
                <circle cx="50" cy="50" r="3" fill="#10b981" />
                <circle cx="50" cy="75" r="3" fill="#10b981" />
                <line x1="38" y1="35" x2="62" y2="35" stroke="#10b981" strokeWidth="0.8" />
                <line x1="40" y1="55" x2="60" y2="55" stroke="#10b981" strokeWidth="0.8" />
                <line x1="41" y1="75" x2="59" y2="75" stroke="#10b981" strokeWidth="0.8" />
              </svg>
            </div>

            {/* Rotating Radar Sweep Beam */}
            <div 
              className="absolute w-[340px] h-[340px] rounded-full pointer-events-none animate-spin"
              style={{
                animationDuration: '8s',
                background: 'conic-gradient(from 0deg, transparent 0deg, transparent 310deg, rgba(16, 185, 129, 0.25) 360deg)',
              }}
            />

            {/* Interactive Telemetry Node Pins */}
            {NODES.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  onMouseEnter={() => setActiveNode(node)}
                  style={{
                    left: `${node.coords.x}%`,
                    top: `${node.coords.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20 focus:outline-none"
                >
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing ring */}
                    <div 
                      className={`absolute rounded-full transition-all duration-300 ${
                        isSelected 
                          ? 'w-9 h-9 bg-emerald-400/20 animate-ping border border-emerald-400' 
                          : 'w-6 h-6 bg-emerald-500/10 group-hover:bg-emerald-500/20'
                      }`} 
                    />
                    
                    {/* Node Core Dot */}
                    <div 
                      className={`relative w-4 h-4 rounded-full flex items-center justify-center transition-transform duration-200 ${
                        isSelected 
                          ? 'bg-emerald-400 text-slate-950 scale-125 shadow-[0_0_15px_#10b981]' 
                          : 'bg-[#0a1220] border-2 border-emerald-400 group-hover:scale-110'
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-slate-950' : 'bg-emerald-400'}`} />
                    </div>

                    {/* Node Label Tooltip */}
                    <div 
                      className={`absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-tight pointer-events-none transition-all duration-200 ${
                        isSelected 
                          ? 'bg-emerald-500 text-slate-950 shadow-md translate-y-0 opacity-100' 
                          : 'bg-[#070b14]/90 text-slate-300 border border-slate-700 opacity-80 group-hover:opacity-100'
                      }`}
                    >
                      {node.name.split(' ')[0]}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Node Detail Card with Hover Glow */}
          <div className="bg-[#050811] border border-slate-800 rounded-2xl p-4 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_4px_20px_rgba(16,185,129,0.1)]">
            <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                <span>{activeNode.name}</span>
              </span>
              <span className="font-mono text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                {activeNode.latency} Latency
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-2">
              {activeNode.description}
            </p>

            <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 font-mono">
              <span>Origin: {activeNode.location}</span>
              <span className="text-amber-400 font-medium">Lead: {activeNode.lead}</span>
            </div>
          </div>
        </div>
      )}

      {/* Nodes List Tab */}
      {activeTab === 'nodes' && (
        <div className="space-y-2.5">
          {NODES.map((node) => (
            <div
              key={node.id}
              onClick={() => setActiveNode(node)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                activeNode.id === node.id
                  ? 'bg-emerald-500/10 border-emerald-500/50 shadow-md'
                  : 'bg-[#050811] border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-white">{node.name}</span>
                <span className="font-mono text-[11px] text-emerald-400">{node.latency}</span>
              </div>
              <div className="text-[11px] text-slate-400 mb-1 font-mono">{node.location}</div>
              <p className="text-xs text-slate-300 leading-relaxed">{node.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Telemetry Stream Tab */}
      {activeTab === 'stream' && (
        <div className="bg-[#050811] rounded-2xl p-4 border border-slate-800 font-mono text-xs space-y-2.5">
          <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
            <span>PACKET COUNTER: {packetCount}</span>
            <span className="text-emerald-400">TIME: {timeStr}</span>
          </div>
          <div className="space-y-1.5 text-[11px] text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">[200 OK]</span>
              <span>Guzo AI graph topology synced with Anbessa route cache.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">[200 OK]</span>
              <span>AgriTech Vision YOLO-Nano INT8 weight matrix verified.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400">[STREAM]</span>
              <span>EthioLinguistic token stream test: 1,420 Amharic subwords.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400">[TELEMETRY]</span>
              <span>Holy Trinity Cathedral School hardware bus operational.</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Live Footer Metrics */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span>REAL-TIME TELEMETRY</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-300">4 Active Hubs</span>
          <span className="text-emerald-400 font-semibold">99.98% Uptime</span>
        </div>
      </div>
    </div>
  );
};
