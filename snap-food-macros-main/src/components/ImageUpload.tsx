import { useState, useRef } from "react";
import { Camera, Upload, X } from "lucide-react";
import { Button } from "./ui/button";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  onClear: () => void;
  previewUrl: string | null;
}

export const ImageUpload = ({ onImageSelect, onClear, previewUrl }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {!previewUrl ? (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-card hover:bg-muted/50 transition-colors">
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-4">
              Upload a photo of your meal to analyze its nutritional content
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="hero"
                size="lg"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-5 h-5" />
                Choose Photo
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => cameraInputRef.current?.click()}
              >
                <Camera className="w-5 h-5" />
                Take Photo
              </Button>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden shadow-card animate-fade-in">
          <img
            src={previewUrl}
            alt="Meal preview"
            className="w-full h-64 object-cover"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={onClear}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
};
