import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newWiki, setNewWiki] = useState({ title: "", description: "", category: "" });

  const featuredWikis = [
    {
      id: 1,
      title: "Star Wars Encyclopedia",
      description: "Полная энциклопедия вселенной Звёздных войн",
      category: "Фильмы и ТВ",
      articles: 45230,
      image: "🌟",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Marvel Universe",
      description: "Всё о супергероях Marvel",
      category: "Комиксы",
      articles: 38950,
      image: "🦸",
      color: "bg-red-500"
    },
    {
      id: 3,
      title: "Game of Thrones",
      description: "Мир Песни Льда и Пламени",
      category: "Фильмы и ТВ",
      articles: 28430,
      image: "🐉",
      color: "bg-purple-500"
    },
    {
      id: 4,
      title: "Minecraft Wiki",
      description: "Всё о блоках, мобах и крафтинге",
      category: "Игры",
      articles: 52100,
      image: "⛏️",
      color: "bg-green-500"
    },
    {
      id: 5,
      title: "The Witcher",
      description: "Энциклопедия мира Ведьмака",
      category: "Игры",
      articles: 19340,
      image: "⚔️",
      color: "bg-amber-500"
    },
    {
      id: 6,
      title: "Pokemon Database",
      description: "Все покемоны и их эволюции",
      category: "Игры",
      articles: 33200,
      image: "🔴",
      color: "bg-yellow-500"
    }
  ];

  const categories = ["Все", "Игры", "Фильмы и ТВ", "Комиксы", "Аниме", "Книги"];
  const [selectedCategory, setSelectedCategory] = useState("Все");

  const filteredWikis = featuredWikis.filter(wiki => {
    const matchesSearch = wiki.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          wiki.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Все" || wiki.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateWiki = () => {
    console.log("Creating wiki:", newWiki);
    setIsCreateOpen(false);
    setNewWiki({ title: "", description: "", category: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-2xl">
                📚
              </div>
              <h1 className="text-2xl font-bold">RememBer</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative w-96 max-md:hidden">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Поиск Вики..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Icon name="Plus" size={20} />
                    Создать Вики
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Создать новую Вики</DialogTitle>
                    <DialogDescription>
                      Заполните информацию о вашей Вики. Вы сможете добавить статьи после создания.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Название Вики</Label>
                      <Input
                        id="title"
                        placeholder="Например: Мир Толкина"
                        value={newWiki.title}
                        onChange={(e) => setNewWiki({ ...newWiki, title: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Описание</Label>
                      <Textarea
                        id="description"
                        placeholder="Краткое описание вашей Вики..."
                        value={newWiki.description}
                        onChange={(e) => setNewWiki({ ...newWiki, description: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Категория</Label>
                      <Input
                        id="category"
                        placeholder="Игры, Фильмы, Книги..."
                        value={newWiki.category}
                        onChange={(e) => setNewWiki({ ...newWiki, category: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                      Отмена
                    </Button>
                    <Button onClick={handleCreateWiki} disabled={!newWiki.title || !newWiki.description}>
                      Создать
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" size="icon">
                <Icon name="User" size={20} />
              </Button>
            </div>
          </div>

          <div className="mt-4 md:hidden">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Поиск Вики..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Создавайте и делитесь знаниями
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              RememBer — платформа для создания Вики. Просматривайте тысячи Вики от других создателей или создайте свою собственную.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="gap-2" onClick={() => setIsCreateOpen(true)}>
                <Icon name="PlusCircle" size={20} />
                Начать создание
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Icon name="BookOpen" size={20} />
                Обзор Вики
              </Button>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">
              {selectedCategory === "Все" ? "Популярные Вики" : selectedCategory}
            </h3>
            <div className="text-sm text-muted-foreground">
              {filteredWikis.length} {filteredWikis.length === 1 ? 'результат' : 'результатов'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWikis.map((wiki) => (
              <Card 
                key={wiki.id} 
                className="hover:shadow-lg transition-all cursor-pointer hover-scale"
                onClick={() => navigate(`/wiki/${wiki.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 ${wiki.color} rounded-lg flex items-center justify-center text-3xl shrink-0`}>
                      {wiki.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-xl mb-2">{wiki.title}</CardTitle>
                      <Badge variant="secondary">{wiki.category}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{wiki.description}</CardDescription>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="FileText" size={16} />
                    <span>{wiki.articles.toLocaleString()} статей</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredWikis.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
              <p className="text-muted-foreground">
                Попробуйте изменить поисковый запрос или категорию
              </p>
            </div>
          )}
        </section>
      </main>

      <footer className="border-t mt-16 py-8 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-xl">
                  📚
                </div>
                <span className="font-bold">RememBer</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Платформа для создания и обмена знаниями
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Сообщество</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer">О проекте</li>
                <li className="hover:text-foreground cursor-pointer">Блог</li>
                <li className="hover:text-foreground cursor-pointer">Помощь</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Создателям</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer">Гайд по созданию</li>
                <li className="hover:text-foreground cursor-pointer">Лучшие практики</li>
                <li className="hover:text-foreground cursor-pointer">API</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Правовая информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer">Условия использования</li>
                <li className="hover:text-foreground cursor-pointer">Конфиденциальность</li>
                <li className="hover:text-foreground cursor-pointer">Контакты</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 RememBer. Защищено от ботов.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
