import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Upload, File, Check, Copy, X, FileText, Text } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QRCodeGenerator } from "./QRCodeGenerator";
import { PasswordProtection } from "./PasswordProtection";
import { ExpirationTimer } from "./ExpirationTimer";
import { CustomURL } from "./CustomURL";
import { LinkAnalytics } from "./LinkAnalytics";
import { copyToClipboard } from "@/lib/clipboard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type UploadMode = "file" | "text";

export function UploadCard() {
  const [mode, setMode] = useState<UploadMode>("file");
  const [file, setFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const [passwordEnabled, setPasswordEnabled] = useState(false);
  const [password, setPassword] = useState("");
  const [expirationMinutes, setExpirationMinutes] = useState(30);
  const [customURLEnabled, setCustomURLEnabled] = useState(false);
  const [customSlug, setCustomSlug] = useState("");
  const [analytics, setAnalytics] = useState({ views: 0, downloads: 0 });

  const generateRandomSlug = () => {
    return Math.random().toString(36).substring(2, 10);
  };

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setUploaded(false);
    setProgress(0);
  };

  const handleUpload = async () => {
    if (mode === "file" && !file) return;
    if (mode === "text" && !textContent.trim()) return;

    setUploading(true);
    setProgress(0);

    try {
      const slug = customURLEnabled && customSlug ? customSlug : generateRandomSlug();
      let filePath: string | null = null;
      let filename: string | null = null;

      // Upload file to storage if in file mode
      if (mode === "file" && file) {
        const fileExt = file.name.split('.').pop();
        const uniqueFileName = `${slug}-${Date.now()}.${fileExt}`;
        
        setProgress(20);
        
        const { error: uploadError } = await supabase.storage
          .from('uploads')
          .upload(uniqueFileName, file);

        if (uploadError) {
          throw new Error(`File upload failed: ${uploadError.message}`);
        }

        filePath = uniqueFileName;
        filename = file.name;
        setProgress(60);
      } else {
        setProgress(40);
      }

      // Calculate expiration time
      const expiresAt = new Date(Date.now() + expirationMinutes * 60 * 1000).toISOString();

      // Create the shared link record
      const { error: dbError } = await supabase
        .from('shared_links')
        .insert({
          slug,
          type: mode,
          filename,
          file_path: filePath,
          text_content: mode === "text" ? textContent : null,
          password: passwordEnabled && password ? password : null,
          expires_at: expiresAt,
        });

      if (dbError) {
        throw new Error(`Failed to create link: ${dbError.message}`);
      }

      setProgress(100);
      
      // Build the share link
      const baseUrl = window.location.origin;
      setShareLink(`${baseUrl}/share/${slug}`);
      setAnalytics({ views: 0, downloads: 0 });
      setUploaded(true);
      
      toast.success("Upload successful! Your link is ready to share.");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error instanceof Error ? error.message : "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(shareLink);
    if (success) {
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setFile(null);
    setTextContent("");
    setUploaded(false);
    setProgress(0);
    setShareLink("");
    setPasswordEnabled(false);
    setPassword("");
    setCustomURLEnabled(false);
    setCustomSlug("");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const canUpload = mode === "file" ? file !== null : textContent.trim().length > 0;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="overflow-hidden glass border-2 border-border shadow-large">
        <div className="p-8">
          <AnimatePresence mode="wait">
            {!uploaded ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Tabs value={mode} onValueChange={(v) => setMode(v as UploadMode)} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="file" className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload File
                    </TabsTrigger>
                    <TabsTrigger value="text" className="flex items-center gap-2">
                      <Text className="w-4 h-4" />
                      Share Text
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="file" className="space-y-4">
                    <motion.div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
                        isDragging 
                          ? "border-primary bg-secondary" 
                          : "border-border bg-muted/30 hover:border-primary/50"
                      }`}
                    >
                      <motion.div
                        animate={{ scale: isDragging ? 1.1 : 1 }}
                        className="flex flex-col items-center gap-4"
                      >
                        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
                          <Upload className="w-10 h-10 text-primary" />
                        </div>
                        <div>
                          <h3 className="mb-2">Drop your file here</h3>
                          <p className="text-muted-foreground text-sm">
                            or click to browse from your device
                          </p>
                        </div>
                        <input
                          type="file"
                          id="file-input"
                          className="hidden"
                          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                        />
                        <Button
                          variant="outline"
                          onClick={() => document.getElementById("file-input")?.click()}
                        >
                          Browse Files
                        </Button>
                      </motion.div>
                    </motion.div>

                    {file && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="bg-secondary rounded-xl p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-card flex items-center justify-center shadow-soft">
                              <File className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">{file.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={handleReset}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </TabsContent>

                  <TabsContent value="text" className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="w-4 h-4" />
                        <span>Type or paste your text below</span>
                      </div>
                      <Textarea
                        placeholder="Enter your text here... (assignments, notes, code snippets, etc.)"
                        value={textContent}
                        onChange={(e) => setTextContent(e.target.value)}
                        className="min-h-[200px] resize-none bg-muted/30"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {textContent.length} characters
                        </span>
                        {textContent.length > 0 && (
                          <Button variant="ghost" size="sm" onClick={() => setTextContent("")}>
                            <X className="w-4 h-4 mr-2" />
                            Clear
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  </TabsContent>
                </Tabs>

                {canUpload && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 mt-6"
                  >
                    <PasswordProtection
                      enabled={passwordEnabled}
                      onToggle={setPasswordEnabled}
                      password={password}
                      onPasswordChange={setPassword}
                    />
                    
                    <ExpirationTimer
                      duration={expirationMinutes}
                      onDurationChange={setExpirationMinutes}
                    />
                    
                    <CustomURL
                      enabled={customURLEnabled}
                      onToggle={setCustomURLEnabled}
                      customSlug={customSlug}
                      onSlugChange={setCustomSlug}
                    />

                    {uploading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4"
                      >
                        <Progress value={progress} className="h-2" />
                        <p className="text-sm text-muted-foreground text-center mt-2">
                          {mode === "file" ? "Uploading" : "Processing"}... {progress}%
                        </p>
                      </motion.div>
                    )}

                    {!uploading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4"
                      >
                        <Button
                          className="w-full gradient-primary shadow-primary hover:opacity-90 transition-opacity"
                          size="lg"
                          onClick={handleUpload}
                        >
                          {mode === "file" ? (
                            <>
                              <Upload className="w-5 h-5 mr-2" />
                              Upload File
                            </>
                          ) : (
                            <>
                              <Text className="w-5 h-5 mr-2" />
                              Share Text
                            </>
                          )}
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-6">
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald to-cyan flex items-center justify-center mx-auto mb-6 shadow-lg"
                      >
                        <Check className="w-12 h-12 text-primary-foreground" />
                      </motion.div>

                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-2"
                      >
                        Your {mode === "file" ? "file" : "text"} is ready to share!
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-muted-foreground mb-6"
                      >
                        Copy the link below and share it with anyone
                      </motion.p>
                    </div>

                    {mode === "text" && textContent && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="bg-muted rounded-xl p-4 border border-border"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Text Preview</span>
                        </div>
                        <div className="bg-card rounded-lg p-3 text-sm max-h-32 overflow-y-auto">
                          {textContent.substring(0, 200)}
                          {textContent.length > 200 && "..."}
                        </div>
                      </motion.div>
                    )}

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-secondary rounded-xl p-4"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={shareLink}
                          readOnly
                          className="flex-1 bg-card rounded-lg px-4 py-2 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <Button
                          onClick={handleCopy}
                          className="gradient-primary shadow-primary hover:opacity-90"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 mr-2" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                    </motion.div>

                    <LinkAnalytics views={analytics.views} downloads={analytics.downloads} />

                    <Button variant="outline" onClick={handleReset} className="w-full">
                      Share Another {mode === "file" ? "File" : "Text"}
                    </Button>
                  </div>

                  <div className="flex items-start justify-center">
                    <QRCodeGenerator url={shareLink} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
}
