import React, { useEffect, useRef, useState } from 'react';
import { Camera, X, ScanLine, AlertCircle, RefreshCw, CheckCircle2, Sparkles } from 'lucide-react';

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (decodedText: string) => void;
  title?: string;
  description?: string;
}

// Sample presets for instant testing of serial numbers & barcodes
const QUICK_PRESETS = [
  { code: 'INV-3KW-9941', label: '3kW Hybrid Inverter', type: 'Inverter' },
  { code: 'BAT-LFP-0821', label: '100Ah LFP Battery', type: 'Battery' },
  { code: 'SP-540W-0021', label: '540W Mono PERC Panel', type: 'Panel' },
  { code: 'CC-60A-1102', label: '60A MPPT Controller', type: 'Controller' },
  { code: 'SKU-SOL-1049', label: 'Safety AC/DC DB Box', type: 'Switchgear' },
];

export const BarcodeScannerModal: React.FC<BarcodeScannerModalProps> = ({
  isOpen,
  onClose,
  onScan,
  title = 'Scan Barcode or QR Code',
  description = 'Align the hardware serial barcode or QR code within the frame, or select a preset below.',
}) => {
  const [manualSku, setManualSku] = useState('');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return;
    }

    let isMounted = true;

    const startCamera = async (deviceId?: string) => {
      try {
        setCameraError(null);
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
        }

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const constraints: MediaStreamConstraints = {
            video: deviceId ? { deviceId: { exact: deviceId } } : { facingMode: 'environment' },
          };

          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          if (!isMounted) {
            stream.getTracks().forEach((t) => t.stop());
            return;
          }

          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch(() => {});
          }
          setIsScanning(true);

          // Get device list
          try {
            const allDevices = await navigator.mediaDevices.enumerateDevices();
            const videoDevs = allDevices.filter((d) => d.kind === 'videoinput');
            if (isMounted) setDevices(videoDevs);
          } catch {
            // ignore
          }

          // Check if native BarcodeDetector is available
          if ('BarcodeDetector' in window) {
            try {
              // @ts-expect-error Native BarcodeDetector
              const detector = new window.BarcodeDetector({
                formats: ['qr_code', 'code_128', 'code_39', 'ean_13', 'ean_8'],
              });

              const scanInterval = setInterval(async () => {
                if (!videoRef.current || !isMounted || !streamRef.current) {
                  clearInterval(scanInterval);
                  return;
                }
                try {
                  const barcodes = await detector.detect(videoRef.current);
                  if (barcodes.length > 0 && barcodes[0].rawValue) {
                    clearInterval(scanInterval);
                    handleSuccessfulScan(barcodes[0].rawValue);
                  }
                } catch {
                  // frame decode skip
                }
              }, 400);
            } catch {
              // fallback
            }
          }
        } else {
          setCameraError('Camera access API is not supported in this browser environment.');
        }
      } catch (err: unknown) {
        if (!isMounted) return;
        const msg = err instanceof Error ? err.message : 'Camera access permission denied or unavailable.';
        setCameraError(msg);
        setIsScanning(false);
      }
    };

    startCamera(selectedDeviceId || undefined);

    return () => {
      isMounted = false;
      stopCamera();
    };
  }, [isOpen, selectedDeviceId]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setIsScanning(false);
  };

  const handleSuccessfulScan = (code: string) => {
    stopCamera();
    onScan(code.trim());
    onClose();
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualSku.trim()) {
      handleSuccessfulScan(manualSku.trim());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-800/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{title}</h3>
              <p className="text-xs text-slate-400">{description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewport Area */}
        <div className="p-5 flex flex-col items-center">
          {cameraError ? (
            <div className="w-full p-4 mb-3 rounded-xl bg-amber-950/40 border border-amber-800/40 flex items-start gap-3 text-amber-300">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-semibold text-amber-200">Camera Feed Notice</p>
                <p className="text-amber-300/90">{cameraError}</p>
                <p className="text-slate-400">You can select a quick hardware preset or type the serial number manually below.</p>
              </div>
            </div>
          ) : (
            <div className="relative w-full aspect-4/3 max-w-[340px] bg-black rounded-xl overflow-hidden shadow-inner flex items-center justify-center border border-slate-800">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Viewfinder Overlay with Animated Laser */}
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6">
                <div className="relative w-52 h-36 border-2 border-amber-400/90 rounded-lg shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-400 -mt-1 -ml-1" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-400 -mt-1 -mr-1" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber-400 -mb-1 -ml-1" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber-400 -mb-1 -mr-1" />
                  
                  {/* Laser line */}
                  <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse" />
                </div>
                <span className="mt-3 text-[11px] font-medium tracking-wide text-amber-200 bg-black/75 px-3 py-1 rounded-full backdrop-blur-sm border border-amber-500/30">
                  Align Barcode / QR / Serial Label
                </span>
              </div>
            </div>
          )}

          {/* Switch Camera if multiple */}
          {devices.length > 1 && (
            <div className="w-full mt-3 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-slate-400" />
              <select
                value={selectedDeviceId}
                onChange={(e) => setSelectedDeviceId(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-200"
              >
                {devices.map((d) => (
                  <option key={d.deviceId} value={d.deviceId}>
                    {d.label || `Camera (${d.deviceId.slice(0, 6)}...)`}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Quick Hardware Presets */}
          <div className="w-full mt-4 pt-3 border-t border-slate-800">
            <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Simulated Scan / Quick Serial Select:</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_PRESETS.map((p) => (
                <button
                  key={p.code}
                  type="button"
                  onClick={() => handleSuccessfulScan(p.code)}
                  className="p-2 text-left rounded-lg bg-slate-800/80 hover:bg-amber-500/10 hover:border-amber-500/40 border border-slate-700 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400 group-hover:text-amber-300">
                      {p.code}
                    </span>
                    <CheckCircle2 className="w-3 h-3 text-slate-500 group-hover:text-amber-400" />
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{p.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Manual Input Fallback */}
          <div className="w-full mt-4 pt-4 border-t border-slate-800">
            <form onSubmit={handleManualSubmit} className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                Manual Serial Number / Barcode Entry:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. INV-3KW-9941 or SKU-SOL-101"
                  value={manualSku}
                  onChange={(e) => setManualSku(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-700 bg-slate-800 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
                <button
                  type="submit"
                  disabled={!manualSku.trim()}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold rounded-lg text-sm transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <ScanLine className="w-4 h-4" />
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
