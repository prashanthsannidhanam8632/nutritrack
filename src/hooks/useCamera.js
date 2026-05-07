import { useState, useRef, useCallback } from 'react';

/**
 * useCamera
 * Handles camera permission, stream management, and scan lifecycle.
 */
export function useCamera() {
  const [cameraState, setCameraState] = useState('idle'); // idle | requesting | active | denied | no_device
  const [stream, setStream] = useState(null);
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef(null);

  const requestCamera = useCallback(async () => {
    setCameraState('requesting');
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      setStream(mediaStream);
      setCameraState('active');
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch(() => {});
        }
      }, 100);
      return true;
    } catch (err) {
      const state = err.name === 'NotFoundError' ? 'no_device' : 'denied';
      setCameraState(state);
      return false;
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setCameraState('idle');
    setScanning(false);
  }, [stream]);

  const triggerScan = useCallback((onScanComplete) => {
    setScanning(true);
    // Simulated scan — replace with real ML/barcode SDK in production
    setTimeout(() => {
      setScanning(false);
      stopCamera();
      onScanComplete();
    }, 2200);
  }, [stopCamera]);

  return {
    cameraState,
    videoRef,
    scanning,
    requestCamera,
    stopCamera,
    triggerScan,
  };
}
