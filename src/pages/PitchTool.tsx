import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const PitchTool = () => {
  const { logout } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    genre: "",
    theme: "",
    lyrics: "",
    production: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">DSTRO7 Pitch Tool</h1>
          <Button variant="ghost" onClick={logout}>Logout</Button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Create Your Pitch</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Song Title</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter song title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Artist Name</label>
                <Input
                  name="artist"
                  value={formData.artist}
                  onChange={handleChange}
                  placeholder="Enter artist name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Genre</label>
                <Input
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  placeholder="Enter genre"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Theme</label>
                <Textarea
                  name="theme"
                  value={formData.theme}
                  onChange={handleChange}
                  placeholder="Describe the theme of your song"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Key Lyrics</label>
                <Textarea
                  name="lyrics"
                  value={formData.lyrics}
                  onChange={handleChange}
                  placeholder="Share some key lyrics"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Production Details</label>
                <Textarea
                  name="production"
                  value={formData.production}
                  onChange={handleChange}
                  placeholder="Describe the production style"
                />
              </div>

              <Button className="w-full">Generate Pitch</Button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Preview</h2>
            <div className="prose">
              {formData.title && <p><strong>Title:</strong> {formData.title}</p>}
              {formData.artist && <p><strong>Artist:</strong> {formData.artist}</p>}
              {formData.genre && <p><strong>Genre:</strong> {formData.genre}</p>}
              {formData.theme && <p><strong>Theme:</strong> {formData.theme}</p>}
              {formData.lyrics && <p><strong>Key Lyrics:</strong> {formData.lyrics}</p>}
              {formData.production && <p><strong>Production:</strong> {formData.production}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchTool;