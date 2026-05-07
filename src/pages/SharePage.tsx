import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, FileText, Lock, Clock, AlertCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Navbar } from "@/components/quickdrop/Navbar";
import { Footer } from "@/components/quickdrop/Footer";

interface SharedLink {
  id: string;
  slug: string;
  type: "file" | "text";
  filename: string | null;
  file_path: string | null;
  text_content: string | null;
  password: string | null;
  expires_at: string | null;
  views: number;
  downloads: number;
  created_at: string;
}

export default function SharePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [link, setLink] = useState<SharedLink | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState("share");

  useEffect(() => {
    if (slug) {
      fetchLink();
    }
  }, [slug]);

  const fetchLink = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('shared_links')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (!data) {
        setError("Link not found");
        setLoading(false);
        return;
      }

      // Check if expired
      if (data.expires_at && new Date(data.expires_at) < new Date()) {
        setError("This link has expired");
        setLoading(false);
        return;
      }

      setLink(data as SharedLink);
      setIsPasswordProtected(!!data.password);
      setIsUnlocked(!data.password);

      // Increment views
      await supabase
        .from('shared_links')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', data.id);

    } catch (err) {
      console.error("Error fetching link:", err);
      setError("Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = () => {
    if (link && passwordInput === link.password) {
      setIsUnlocked(true);
      toast.success("Access granted!");
    } else {
      toast.error("Incorrect password");
    }
  };

  const handleDownload = async () => {
    if (!link) return;

    try {
      if (link.type === "file" && link.file_path) {
        const { data, error } = await supabase.storage
          .from('uploads')
          .download(link.file_path);

        if (error) throw error;

        // Create download link
        const url = URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = link.filename || 'download';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Increment downloads
        await supabase
          .from('shared_links')
          .update({ downloads: (link.downloads || 0) + 1 })
          .eq('id', link.id);

        toast.success("Download started!");
      } else if (link.type === "text" && link.text_content) {
        // Download text as file
        const blob = new Blob([link.text_content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'shared-text.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Increment downloads
        await supabase
          .from('shared_links')
          .update({ downloads: (link.downloads || 0) + 1 })
          .eq('id', link.id);

        toast.success("Text downloaded!");
      }
    } catch (err) {
      console.error("Download error:", err);
      toast.error("Download failed");
    }
  };

  const copyTextToClipboard = async () => {
    if (link?.text_content) {
      await navigator.clipboard.writeText(link.text_content);
      toast.success("Text copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar activeTab={activeTab} onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === "landing") navigate("/");
          if (tab === "upload") navigate("/");
        }} />
        <main className="pt-24 pb-20 px-4">
          <div className="max-w-md mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6"
            >
              <AlertCircle className="w-10 h-10 text-destructive" />
            </motion.div>
            <h1 className="text-2xl font-display mb-4">{error}</h1>
            <p className="text-muted-foreground mb-6">
              The content you're looking for is no longer available.
            </p>
            <Button onClick={() => navigate("/")} className="gradient-primary">
              Go Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeTab={activeTab} onTabChange={(tab) => {
        setActiveTab(tab);
        if (tab === "landing") navigate("/");
        if (tab === "upload") navigate("/");
      }} />
      
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          {isPasswordProtected && !isUnlocked ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-8 glass border-2 border-border shadow-large">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-amber-500" />
                  </div>
                  <h2 className="text-xl font-display mb-2">Password Protected</h2>
                  <p className="text-muted-foreground">
                    Enter the password to access this content
                  </p>
                </div>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
                  />
                  <Button onClick={handlePasswordSubmit} className="gradient-primary">
                    Unlock
                  </Button>
                </div>
              </Card>
            </motion.div>
          ) : link && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-8 glass border-2 border-border shadow-large">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 shadow-primary">
                    {link.type === "file" ? (
                      <Download className="w-10 h-10 text-primary-foreground" />
                    ) : (
                      <FileText className="w-10 h-10 text-primary-foreground" />
                    )}
                  </div>
                  <h1 className="text-2xl font-display mb-2">
                    {link.type === "file" ? link.filename : "Shared Text"}
                  </h1>
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {link.views} views
                    </span>
                    {link.expires_at && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Expires {new Date(link.expires_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                {link.type === "text" && link.text_content && (
                  <div className="mb-6">
                    <div className="bg-muted rounded-xl p-4 border border-border max-h-64 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm">{link.text_content}</pre>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleDownload}
                    className="flex-1 gradient-primary shadow-primary hover:opacity-90"
                    size="lg"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    {link.type === "file" ? "Download File" : "Download as Text"}
                  </Button>
                  {link.type === "text" && (
                    <Button
                      onClick={copyTextToClipboard}
                      variant="outline"
                      size="lg"
                    >
                      Copy Text
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
