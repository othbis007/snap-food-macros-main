import { useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { NutritionResults } from "@/components/NutritionResults";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-meal.jpg";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ChatbotButton } from "@/components/NutritionChatbot";

interface FoodItem {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface AnalysisResponse {
  status: string;
  food: FoodItem[];
}

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResponse | null>(null);
  const { toast } = useToast();

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setResults(null);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setResults(null);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload or capture a photo of your meal first.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await fetch('http://localhost:5678/webhook-test/fffaa6cf-0a08-4fbd-aa54-5392f5deafff', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      const analysisResult = Array.isArray(data) ? data[0].output : data.output;
      
      setResults(analysisResult);
      
      toast({
        title: "Analysis complete!",
        description: "Your meal's nutritional information is ready.",
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Unable to analyze the image. Please try again.",
        variant: "destructive",
      });
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden py-20 md:py-28 px-4">
        <div className="absolute right-4 top-4 z-10">
          <ThemeToggle />
        </div>
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Vibrant healthy meal with fresh ingredients"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 animate-fade-in">
            <Sparkles className="w-10 h-10 text-white drop-shadow-lg" />
            <h1 className="text-6xl md:text-7xl font-bold text-white drop-shadow-lg">
              NutriLens
            </h1>
          </div>
          <p className="text-2xl md:text-3xl text-white font-semibold mb-5 drop-shadow-md">
            Snap your meal. Know your macros.
          </p>
          <p className="mt-4 text-lg text-white/95 max-w-2xl mx-auto drop-shadow-md">
            AI-powered nutrition analysis in seconds. Upload any meal photo and get instant
            insights into calories, protein, carbs, and fats.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Upload Section */}
          <section>
            <ImageUpload
              onImageSelect={handleImageSelect}
              onClear={handleClearImage}
              previewUrl={previewUrl}
            />
          </section>

          {/* Analyze Button */}
          {selectedImage && !results && (
            <div className="flex justify-center animate-fade-in">
              <Button
                variant="accent"
                size="lg"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="px-12"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Analyze Nutrition
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Results Section */}
          {results && (
            <section>
              <NutritionResults data={results} />
              <div className="mt-6 flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={handleClearImage}
                >
                  Analyze Another Meal
                </Button>
              </div>
            </section>
          )}

          {/* Info Section */}
          {!selectedImage && (
            <section className="text-center space-y-4 animate-fade-in">
              <div className="max-w-2xl mx-auto bg-card rounded-lg p-8 shadow-soft border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  How It Works
                </h2>
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <span className="text-2xl font-bold text-primary">1</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Upload Photo</h3>
                    <p className="text-sm text-muted-foreground">
                      Take or upload a clear photo of your meal
                    </p>
                  </div>
                  <div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <span className="text-2xl font-bold text-primary">2</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">AI Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI instantly analyzes the nutritional content
                    </p>
                  </div>
                  <div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <span className="text-2xl font-bold text-primary">3</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Get Results</h3>
                    <p className="text-sm text-muted-foreground">
                      View detailed macro breakdown in seconds
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            © NutriLens 2025. All rights reserved.
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="text-sm text-primary hover:text-primary-glow transition-colors"
            >
              Learn More
            </a>
            <a
              href="#"
              className="text-sm text-primary hover:text-primary-glow transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-primary hover:text-primary-glow transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Chatbot Button */}
      <ChatbotButton />
    </div>
  );
};

export default Index;
