import { useState, useEffect, useRef, useCallback } from 'react'
import Quagga from 'quagga'
import { Product } from '../../types'

const Scanner = () => {
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<Product | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const startScanner = useCallback(() => {
    if (videoRef.current) {
      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: videoRef.current,
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
        if (err) console.error(err)
        else {
          Quagga.start()
          setScanning(true)
        }
      })
    }
  }, [])

  const stopScanner = () => {
    Quagga.stop()
    setScanning(false)
  }

  useEffect(() => {
    return () => Quagga.stop()
  }, [])

  return (
    <div className="scanner-overlay">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {scanning ? '🔍 Scanning...' : '📷 Scan Barcode'}
        </h2>
        
        <video ref={videoRef} className="w-full rounded-xl shadow-lg mb-4" />
        
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
            <p className="text-sm text-green-700">Stock: {result.stock}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Scanner
