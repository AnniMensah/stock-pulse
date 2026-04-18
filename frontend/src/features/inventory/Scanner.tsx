import { useState, useEffect, useRef, useCallback } from 'react'
import Quagga, { QuaggaJSResultObject } from '@ericblade/quagga2'
import { Product } from '../../types'

interface ScannerProps {
  onScanSuccess?: (product: Product) => void;
}

const Scanner = ({ onScanSuccess }: ScannerProps) => {
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)
  const scannerRef = useRef<HTMLDivElement>(null)

  const stopScanner = useCallback(() => {
    try {
      Quagga.offDetected(handleDetected)
      Quagga.stop()
    } catch (e) {
      console.error("Failed to stop Quagga:", e)
    }
    setScanning(false)
  }, [])

  const handleDetected = useCallback((data: QuaggaJSResultObject) => {
    if (data?.codeResult?.code) {
      const newProduct: Product = {
        id: Math.random().toString(36).substr(2, 9),
        name: `Scanned Item`,
        barcode: data.codeResult.code,
        stock: 1,
        threshold: 5,
        price: 0,
        status: 'yellow'
      }

      setResult(newProduct)
      if (onScanSuccess) onScanSuccess(newProduct)

      stopScanner()
    }
  }, [stopScanner, onScanSuccess])

  const startScanner = useCallback(() => {
    if (scanning) return;
    
    setResult(null)
    setError(null)

    if (scannerRef.current) {
      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            width: 480,
            height: 320,
            facingMode: "environment"
          }
        },
        decoder: {
          readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader"]
        }
      }, (err) => {
        if (err) {
          setError("Camera access denied or not found.")
          console.error(err)
        } else {
          Quagga.onDetected(handleDetected)
          Quagga.start()
          setScanning(true)
        }
      })
    }
  }, [handleDetected, scanning])

  useEffect(() => {
    return () => {
      if (scanning) {
        Quagga.offDetected(handleDetected)
        Quagga.stop()
      }
    }
  }, [scanning, handleDetected])

  return (
    <div className="p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {scanning ? '🔍 Scanning...' : '📷 Scan Barcode'}
        </h2>
        
        <div ref={scannerRef} className="w-full rounded-xl shadow-lg mb-4 overflow-hidden relative" />
        
        {error && (
          <p className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 text-center">{error}</p>
        )}
        
        <div className="flex gap-4 justify-center">
          <button 
            onClick={scanning ? stopScanner : startScanner}
            className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:bg-emerald-700"
          >
            {scanning ? 'Stop' : 'Start Scan'}
          </button>
        </div>
        
        {result && (
          <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
            <p className="font-bold text-lg">{result.name}</p>
            <p className="text-sm text-green-700">Barcode: {result.barcode}</p>
          </div>
        )}
      </div>
    </div>
  )
}
export default Scanner
