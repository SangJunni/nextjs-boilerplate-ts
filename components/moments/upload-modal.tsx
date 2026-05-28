"use client"

import { useState } from "react"

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
}

export function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [step, setStep] = useState<1 | 2>(1)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleUpload = () => {
    // Simulate upload
    setPreviewUrl("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop")
    setStep(2)
  }

  const handleReset = () => {
    setStep(1)
    setPreviewUrl(null)
  }

  const handleClose = () => {
    handleReset()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-surface-bright rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-sans text-xl font-medium text-primary">Post a Moment</h2>
            <button
              className="text-secondary hover:text-primary transition-colors"
              onClick={handleClose}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Step 1: Upload */}
          {step === 1 && (
            <div
              onClick={handleUpload}
              className="group cursor-pointer border-2 border-dashed border-outline-variant hover:border-primary rounded-xl p-12 transition-all flex flex-col items-center justify-center gap-4 bg-surface-container-low"
            >
              <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-secondary group-hover:text-primary group-hover:scale-110 transition-all">
                <span className="material-symbols-outlined text-4xl">photo_camera</span>
              </div>
              <div className="text-center">
                <p className="font-sans text-base text-primary font-medium">
                  Click to upload or drag a photo
                </p>
                <p className="font-mono text-xs text-secondary">
                  SVG, PNG, JPG (max. 800x400px)
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && previewUrl && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="relative group">
                <img
                  alt="Preview"
                  className="w-full aspect-video object-cover rounded-xl shadow-sm"
                  src={previewUrl}
                />
                <button
                  onClick={handleReset}
                  className="absolute top-2 right-2 p-1 bg-surface-bright/80 backdrop-blur-md rounded-full text-secondary hover:text-error transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block font-mono text-xs font-medium text-secondary mb-1">
                    Message
                  </label>
                  <textarea
                    className="w-full bg-surface-container-low border-none rounded-xl focus:ring-1 focus:ring-primary placeholder:text-secondary/50 font-sans text-base p-3"
                    placeholder="Write a message..."
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs font-medium text-secondary mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-lg">
                      location_on
                    </span>
                    <input
                      className="w-full bg-surface-container-low border-none rounded-xl pl-10 focus:ring-1 focus:ring-primary placeholder:text-secondary/50 font-sans text-base p-3"
                      placeholder="Add location"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-8">
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-lg font-mono text-sm text-secondary hover:bg-surface-container-high transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={step === 1}
              className="px-8 py-2.5 bg-primary text-on-primary rounded-lg font-mono text-sm hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post Moment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
