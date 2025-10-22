import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Lock, CheckCircle, Film, Music, Gamepad2, Link, BookOpen, Plus, FileText, Edit, Trash2, ExternalLink } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Personal content sections - empty for your private use
  const [movies, setMovies] = useState([]);
  const [dramas, setDramas] = useState([]);
  const [music, setMusic] = useState([]);
  const [links, setLinks] = useState([]);
  const [gaming, setGaming] = useState([]);
  const [books, setBooks] = useState([]);
  const [notes, setNotes] = useState([]);

  // Link preview states
  const [linkPreviews, setLinkPreviews] = useState({});
  const [previewLoading, setPreviewLoading] = useState({});

  // Form states for adding/editing items
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [currentSection, setCurrentSection] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: ''
  });

  // Check if user is already authenticated on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simple password check - in a real app, this would be more secure
    const correctPassword = "Asdf-/:;1234"; // You should change this to a secure password

    if (password === correctPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuthenticated", "true");
    } else {
      setError("Incorrect password. Please try again.");
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuthenticated");
    setPassword("");
    navigate("/");
  };

  // Helper functions to manage items
  const openAddDialog = (section) => {
    setCurrentSection(section);
    setEditingItem(null);
    setFormData({ title: '', description: '', link: '' });
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (section, item) => {
    setCurrentSection(section);
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      description: item.description || '',
      link: item.link || ''
    });
    setIsAddDialogOpen(true);
  };

  const closeDialog = () => {
    setIsAddDialogOpen(false);
    setEditingItem(null);
    setFormData({ title: '', description: '', link: '' });
  };

  const saveItem = async () => {
    if (!formData.title.trim()) return;

    const itemData = {
      id: editingItem ? editingItem.id : Date.now(),
      title: formData.title,
      description: formData.description,
      link: formData.link,
      createdAt: editingItem ? editingItem.createdAt : new Date().toISOString()
    };

    const setters = {
      movies: setMovies,
      dramas: setDramas,
      music: setMusic,
      links: setLinks,
      gaming: setGaming,
      books: setBooks,
      notes: setNotes
    };

    const setter = setters[currentSection];
    if (!setter) return;

    if (editingItem) {
      // Update existing item
      setter(prev => prev.map(item =>
        item.id === editingItem.id ? itemData : item
      ));
    } else {
      // Add new item
      setter(prev => [...prev, itemData]);
    }

    // Fetch link preview if link is provided and it's for links or gaming sections
    if (formData.link && (currentSection === 'links' || currentSection === 'gaming') && !linkPreviews[formData.link]) {
      fetchLinkPreview(formData.link);
    }

    closeDialog();
  };

  const removeItem = (section, itemId) => {
    const setters = {
      movies: setMovies,
      dramas: setDramas,
      music: setMusic,
      links: setLinks,
      gaming: setGaming,
      books: setBooks,
      notes: setNotes
    };

    const setter = setters[section];
    if (setter) {
      setter(prev => prev.filter(item => item.id !== itemId));
    }
  };

  // Link preview functionality
  const fetchLinkPreview = async (url) => {
    if (!url || !url.startsWith('http')) return null;

    try {
      setPreviewLoading(prev => ({ ...prev, [url]: true }));

      // Use a CORS proxy or direct fetch with no-cors mode
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (data.contents) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, 'text/html');

        // Extract Open Graph metadata
        const getMeta = (property) => {
          const element = doc.querySelector(`meta[property="${property}"]`) ||
                         doc.querySelector(`meta[name="${property}"]`);
          return element ? element.getAttribute('content') : null;
        };

        const title = getMeta('og:title') || getMeta('title') || doc.title;
        const description = getMeta('og:description') || getMeta('description');
        const image = getMeta('og:image');
        const siteName = getMeta('og:site_name');

        const preview = {
          title: title || 'No title available',
          description: description || 'No description available',
          image,
          siteName,
          url
        };

        setLinkPreviews(prev => ({ ...prev, [url]: preview }));
        return preview;
      }
    } catch (error) {
      console.error('Error fetching link preview:', error);
      // Fallback preview
      const fallbackPreview = {
        title: 'Link Preview',
        description: 'Could not load preview',
        image: null,
        siteName: null,
        url
      };
      setLinkPreviews(prev => ({ ...prev, [url]: fallbackPreview }));
      return fallbackPreview;
    } finally {
      setPreviewLoading(prev => ({ ...prev, [url]: false }));
    }

    return null;
  };

  // Load link previews for existing links
  useEffect(() => {
    const loadExistingPreviews = async () => {
      const allLinks = [...links, ...gaming];
      for (const item of allLinks) {
        if (item.link && !linkPreviews[item.link]) {
          await fetchLinkPreview(item.link);
        }
      }
    };

    if (isAuthenticated) {
      loadExistingPreviews();
    }
  }, [links, gaming, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>
              Enter the admin password to access this page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                  disabled={isLoading}
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Checking..." : "Access Admin"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <Tabs defaultValue="movies" className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="movies" className="flex items-center gap-2">
              <Film className="w-4 h-4" />
              Movies
            </TabsTrigger>
            <TabsTrigger value="dramas" className="flex items-center gap-2">
              <Film className="w-4 h-4" />
              Dramas
            </TabsTrigger>
            <TabsTrigger value="music" className="flex items-center gap-2">
              <Music className="w-4 h-4" />
              Music
            </TabsTrigger>
            <TabsTrigger value="links" className="flex items-center gap-2">
              <Link className="w-4 h-4" />
              Links
            </TabsTrigger>
            <TabsTrigger value="gaming" className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4" />
              Gaming
            </TabsTrigger>
            <TabsTrigger value="books" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Books
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Notes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="movies">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Film className="w-5 h-5" />
                      My Movie Collection
                    </CardTitle>
                    <CardDescription>Your personal movie collection</CardDescription>
                  </div>
                  <Button onClick={() => openAddDialog('movies')} size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Movie
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {movies.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Film className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No movies added yet. Click "Add Movie" to get started.</p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {movies.map((movie) => (
                      <Card key={movie.id} className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-sm">{movie.title}</h3>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => openEditDialog('movies', movie)}
                              className="h-6 w-6 p-0"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeItem('movies', movie.id)}
                              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        {movie.description && (
                          <p className="text-sm text-muted-foreground mb-2">{movie.description}</p>
                        )}
                        {movie.link && (
                          <a
                            href={movie.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View Link
                          </a>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dramas">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Film className="w-5 h-5" />
                      Drama Series
                    </CardTitle>
                    <CardDescription>Your drama series collection</CardDescription>
                  </div>
                  <Button onClick={() => openAddDialog('dramas')} size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Drama
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {dramas.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Film className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No dramas added yet. Click "Add Drama" to get started.</p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {dramas.map((drama) => (
                      <Card key={drama.id} className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-sm">{drama.title}</h3>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => openEditDialog('dramas', drama)}
                              className="h-6 w-6 p-0"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeItem('dramas', drama.id)}
                              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        {drama.description && (
                          <p className="text-sm text-muted-foreground mb-2">{drama.description}</p>
                        )}
                        {drama.link && (
                          <a
                            href={drama.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View Link
                          </a>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="music">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Music className="w-5 h-5" />
                      Music Collection
                    </CardTitle>
                    <CardDescription>Your music collection</CardDescription>
                  </div>
                  <Button onClick={() => openAddDialog('music')} size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Music
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {music.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Music className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No music added yet. Click "Add Music" to get started.</p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {music.map((item) => (
                      <Card key={item.id} className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-sm">{item.title}</h3>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => openEditDialog('music', item)}
                              className="h-6 w-6 p-0"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeItem('music', item.id)}
                              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        {item.description && (
                          <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                        )}
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View Link
                          </a>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="links">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Link className="w-5 h-5" />
                      Useful Links
                    </CardTitle>
                    <CardDescription>Your collection of useful links</CardDescription>
                  </div>
                  <Button onClick={() => openAddDialog('links')} size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Link
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {links.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Link className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No links added yet. Click "Add Link" to get started.</p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {links.map((link) => {
                      const preview = linkPreviews[link.link];
                      const isLoading = previewLoading[link.link];

                      return (
                        <Card key={link.id} className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-sm">{link.title}</h3>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => openEditDialog('links', link)}
                                className="h-6 w-6 p-0"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeItem('links', link.id)}
                                className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          {link.description && (
                            <p className="text-sm text-muted-foreground mb-2">{link.description}</p>
                          )}
                          {link.link && (
                            <div className="mt-3">
                              {isLoading ? (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                  Loading preview...
                                </div>
                              ) : preview ? (
                                <div className="border rounded-lg p-3 bg-muted/30 hover:bg-muted/50 transition-colors">
                                  <div className="flex gap-3">
                                    {preview.image && (
                                      <img
                                        src={preview.image}
                                        alt={preview.title}
                                        className="w-16 h-16 object-cover rounded"
                                        onError={(e) => {
                                          (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                      />
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-medium text-sm line-clamp-2">{preview.title}</h4>
                                      {preview.description && (
                                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                          {preview.description}
                                        </p>
                                      )}
                                      {preview.siteName && (
                                        <p className="text-xs text-muted-foreground mt-1">
                                          {preview.siteName}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <a
                                    href={link.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                    Visit Link
                                  </a>
                                </div>
                              ) : (
                                <a
                                  href={link.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  View Link
                                </a>
                              )}
                            </div>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gaming">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Gamepad2 className="w-5 h-5" />
                      Gaming Links
                    </CardTitle>
                    <CardDescription>Gaming websites and resources</CardDescription>
                  </div>
                  <Button onClick={() => openAddDialog('gaming')} size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Game Link
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {gaming.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Gamepad2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No gaming links added yet. Click "Add Game Link" to get started.</p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {gaming.map((game) => {
                      const preview = linkPreviews[game.link];
                      const isLoading = previewLoading[game.link];

                      return (
                        <Card key={game.id} className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-sm">{game.title}</h3>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => openEditDialog('gaming', game)}
                                className="h-6 w-6 p-0"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeItem('gaming', game.id)}
                                className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          {game.description && (
                            <p className="text-sm text-muted-foreground mb-2">{game.description}</p>
                          )}
                          {game.link && (
                            <div className="mt-3">
                              {isLoading ? (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                  Loading preview...
                                </div>
                              ) : preview ? (
                                <div className="border rounded-lg p-3 bg-muted/30 hover:bg-muted/50 transition-colors">
                                  <div className="flex gap-3">
                                    {preview.image && (
                                      <img
                                        src={preview.image}
                                        alt={preview.title}
                                        className="w-16 h-16 object-cover rounded"
                                        onError={(e) => {
                                          (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                      />
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-medium text-sm line-clamp-2">{preview.title}</h4>
                                      {preview.description && (
                                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                          {preview.description}
                                        </p>
                                      )}
                                      {preview.siteName && (
                                        <p className="text-xs text-muted-foreground mt-1">
                                          {preview.siteName}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <a
                                    href={game.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                    Visit Link
                                  </a>
                                </div>
                              ) : (
                                <a
                                  href={game.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  View Link
                                </a>
                              )}
                            </div>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="books">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Reading List
                    </CardTitle>
                    <CardDescription>Your reading list and book notes</CardDescription>
                  </div>
                  <Button onClick={() => openAddDialog('books')} size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Book
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {books.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No books added yet. Click "Add Book" to get started.</p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {books.map((book) => (
                      <Card key={book.id} className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-sm">{book.title}</h3>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => openEditDialog('books', book)}
                              className="h-6 w-6 p-0"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeItem('books', book.id)}
                              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        {book.description && (
                          <p className="text-sm text-muted-foreground mb-2">{book.description}</p>
                        )}
                        {book.link && (
                          <a
                            href={book.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View Link
                          </a>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Personal Notes
                    </CardTitle>
                    <CardDescription>Your private notes and thoughts</CardDescription>
                  </div>
                  <Button onClick={() => openAddDialog('notes')} size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Note
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {notes.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No notes added yet. Click "Add Note" to get started.</p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {notes.map((note) => (
                      <Card key={note.id} className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-sm">{note.title}</h3>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => openEditDialog('notes', note)}
                              className="h-6 w-6 p-0"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeItem('notes', note.id)}
                              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        {note.description && (
                          <p className="text-sm text-muted-foreground mb-2">{note.description}</p>
                        )}
                        {note.link && (
                          <a
                            href={note.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View Link
                          </a>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add/Edit Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </DialogTitle>
              <DialogDescription>
                {editingItem ? 'Update the item details below.' : 'Fill in the details for your new item.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="col-span-3"
                  placeholder="Enter title..."
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="col-span-3"
                  placeholder="Enter description..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="link" className="text-right">
                  Link
                </Label>
                <Input
                  id="link"
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                  className="col-span-3"
                  placeholder="https://example.com"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="button" onClick={saveItem} disabled={!formData.title.trim()}>
                {editingItem ? 'Update' : 'Add'} Item
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Admin;