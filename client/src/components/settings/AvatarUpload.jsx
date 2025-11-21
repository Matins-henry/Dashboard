import { useState, useRef } from 'react';
import { Camera, Upload, X, Check } from 'lucide-react';

/**
 * Avatar Upload Component
 * Premium avatar upload with preview and drag-drop
 */
export default function AvatarUpload({ currentAvatar, onSave, onClose }) {
  const [preview, setPreview] = useState(currentAvatar);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleSave = async () => {
    setIsUploading(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSave(preview);
    setIsUploading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#18181b] border border-white/[0.1] rounded-2xl p-6 w-full max-w-md mx-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">
            Upload Avatar
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors duration-200"
          >
            <X size={20} className="text-zinc-400" />
          </button>
        </div>

        {/* Preview */}
        <div className="mb-6">
          <div className="flex justify-center">
            <img
              src={preview}
              alt="Avatar preview"
              className="w-32 h-32 rounded-full border-4 border-white/[0.06]"
            />
          </div>
        </div>

        {/* Upload Area */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
            ${isDragging
              ? 'border-emerald-500 bg-emerald-500/10'
              : 'border-white/[0.1] hover:border-white/[0.2] bg-white/[0.02]'
            }
          `}
        >
          <Upload size={32} className="mx-auto mb-3 text-zinc-400" />
          <p className="text-sm text-white mb-1">
            Drag and drop your image here
          </p>
          <p className="text-xs text-zinc-500 mb-4">
            or click to browse
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="
              px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20
              text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/30
              rounded-lg text-sm font-medium transition-all duration-300
            "
          >
            Choose File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>

        {/* Info */}
        <p className="text-xs text-zinc-600 mt-4 text-center">
          Supported formats: JPG, PNG, GIF • Max size: 5MB
        </p>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="
              flex-1 px-4 py-3 bg-white/[0.03] hover:bg-white/[0.05]
              text-zinc-300 border border-white/[0.06] hover:border-white/[0.08]
              rounded-xl font-medium transition-all duration-300
            "
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isUploading || preview === currentAvatar}
            className={`
              flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300
              flex items-center justify-center gap-2
              ${isUploading || preview === currentAvatar
                ? 'bg-white/[0.03] text-zinc-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shadow-lg shadow-emerald-500/20'
              }
            `}
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Check size={18} />
                Save Avatar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
