import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const WikiView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState("main");

  const wikiData = {
    1: {
      title: "Star Wars Encyclopedia",
      description: "Полная энциклопедия вселенной Звёздных войн",
      category: "Фильмы и ТВ",
      image: "🌟",
      sections: [
        {
          id: "main",
          title: "Главная страница",
          icon: "Home",
          articles: [
            { id: "main", title: "О Вики", icon: "Info" }
          ]
        },
        {
          id: "characters",
          title: "Персонажи",
          icon: "Users",
          articles: [
            { id: "luke", title: "Люк Скайуокер", icon: "User" },
            { id: "vader", title: "Дарт Вейдер", icon: "User" },
            { id: "leia", title: "Принцесса Лея", icon: "User" },
            { id: "yoda", title: "Йода", icon: "User" }
          ]
        },
        {
          id: "locations",
          title: "Локации",
          icon: "MapPin",
          articles: [
            { id: "tatooine", title: "Татуин", icon: "Map" },
            { id: "death-star", title: "Звезда Смерти", icon: "Map" },
            { id: "hoth", title: "Хот", icon: "Map" }
          ]
        },
        {
          id: "technology",
          title: "Технологии",
          icon: "Rocket",
          articles: [
            { id: "lightsaber", title: "Световой меч", icon: "Zap" },
            { id: "x-wing", title: "X-Wing", icon: "Plane" }
          ]
        }
      ]
    }
  };

  const wiki = wikiData[id as keyof typeof wikiData] || wikiData[1];

  const articleContent: Record<string, { title: string; content: string }> = {
    main: {
      title: "О Star Wars Encyclopedia",
      content: `
        <h2>Добро пожаловать в энциклопедию Star Wars!</h2>
        <p>Эта Вики содержит подробную информацию о вселенной Звёздных войн, включая персонажей, локации, технологии и события.</p>
        
        <h3>Что вы найдёте здесь:</h3>
        <ul>
          <li><strong>Персонажи</strong> — биографии и истории героев и злодеев</li>
          <li><strong>Локации</strong> — описания планет и мест действия</li>
          <li><strong>Технологии</strong> — информация о кораблях, оружии и устройствах</li>
          <li><strong>События</strong> — хронология важнейших событий</li>
        </ul>

        <h3>Статистика</h3>
        <p>Наша энциклопедия содержит более 45,000 статей, написанных фанатами со всего мира.</p>
      `
    },
    luke: {
      title: "Люк Скайуокер",
      content: `
        <h2>Люк Скайуокер</h2>
        <p><strong>Люк Скайуокер</strong> — легендарный джедай, сын Энакина Скайуокера (Дарта Вейдера) и Падме Амидалы.</p>
        
        <h3>Биография</h3>
        <p>Люк родился на астероиде Полис Масса и был отправлен на планету Татуин к своему дяде Оуэну Ларсу. Вырос на ферме влагосборщиков, не зная о своём истинном происхождении.</p>

        <h3>Путь джедая</h3>
        <p>Обучение начал под руководством Оби-Вана Кеноби, позже продолжил у мастера Йоды на планете Дагоба. Стал последним джедаем старого ордена и первым джедаем нового поколения.</p>

        <h3>Основные достижения</h3>
        <ul>
          <li>Уничтожение первой Звезды Смерти</li>
          <li>Спасение Хана Соло от Джаббы Хатта</li>
          <li>Противостояние Императору Палпатину</li>
          <li>Возвращение Энакина Скайуокера на светлую сторону</li>
        </ul>
      `
    },
    vader: {
      title: "Дарт Вейдер",
      content: `
        <h2>Дарт Вейдер</h2>
        <p><strong>Дарт Вейдер</strong> (Энакин Скайуокер) — один из самых могущественных ситхов в истории галактики.</p>
        
        <h3>История падения</h3>
        <p>Энакин был обещанным избранным, который должен был принести равновесие Силе. Однако страх потерять близких привёл его на тёмную сторону.</p>

        <h3>Служение Империи</h3>
        <p>Как Дарт Вейдер, он стал правой рукой Императора Палпатина и лидером имперских сил. Руководил строительством Звезды Смерти и охотой на последних джедаев.</p>

        <h3>Искупление</h3>
        <p>В финальной битве выбрал спасение сына вместо служения тёмной стороне, уничтожив Императора и вернувшись на светлую сторону Силы.</p>
      `
    }
  };

  const [expandedSections, setExpandedSections] = useState<string[]>(["main", "characters"]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const currentArticle = articleContent[selectedArticle] || articleContent.main;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-2xl">
                  {wiki.image}
                </div>
                <div>
                  <h1 className="text-xl font-bold">{wiki.title}</h1>
                  <Badge variant="secondary" className="text-xs">{wiki.category}</Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2 max-md:hidden">
                <Icon name="Edit" size={16} />
                Редактировать
              </Button>
              <Button variant="outline" size="icon">
                <Icon name="Share2" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        <aside className="w-72 border-r bg-card max-lg:hidden">
          <ScrollArea className="h-[calc(100vh-73px)]">
            <div className="p-4">
              <div className="relative mb-4">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Поиск статей..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <nav className="space-y-1">
                {wiki.sections.map((section) => (
                  <div key={section.id}>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-accent text-sm font-medium transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Icon name={section.icon as any} size={18} />
                        <span>{section.title}</span>
                      </div>
                      <Icon
                        name={expandedSections.includes(section.id) ? "ChevronDown" : "ChevronRight"}
                        size={16}
                      />
                    </button>

                    {expandedSections.includes(section.id) && (
                      <div className="ml-4 mt-1 space-y-1">
                        {section.articles.map((article) => (
                          <button
                            key={article.id}
                            onClick={() => setSelectedArticle(article.id)}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                              selectedArticle === article.id
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-accent"
                            }`}
                          >
                            <Icon name={article.icon as any} size={16} />
                            <span>{article.title}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                  <Icon name="Clock" size={16} />
                  История изменений
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                  <Icon name="Users" size={16} />
                  Участники
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                  <Icon name="Settings" size={16} />
                  Настройки Вики
                </Button>
              </div>
            </div>
          </ScrollArea>
        </aside>

        <main className="flex-1 overflow-y-auto">
          <div className="container max-w-4xl mx-auto px-4 py-8">
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => navigate("/")}>
                  <Icon name="Menu" size={20} />
                </Button>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{currentArticle.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Eye" size={14} />
                      1,234 просмотров
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      Обновлено 2 дня назад
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="wiki-content prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: currentArticle.content }}
                style={{
                  fontSize: "16px",
                  lineHeight: "1.7"
                }}
              />

              <Separator className="my-8" />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Категории</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Персонажи</Badge>
                  <Badge variant="outline">Джедаи</Badge>
                  <Badge variant="outline">Герои</Badge>
                  <Badge variant="outline">Оригинальная трилогия</Badge>
                </div>
              </div>
            </Card>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Icon name="FileText" size={18} />
                  Связанные статьи
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="text-primary hover:underline cursor-pointer">→ Оби-Ван Кеноби</li>
                  <li className="text-primary hover:underline cursor-pointer">→ Принцесса Лея</li>
                  <li className="text-primary hover:underline cursor-pointer">→ Хан Соло</li>
                </ul>
              </Card>

              <Card className="p-4 hover:shadow-lg transition-shadow">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Icon name="TrendingUp" size={18} />
                  Популярное сейчас
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="text-primary hover:underline cursor-pointer">→ Световой меч</li>
                  <li className="text-primary hover:underline cursor-pointer">→ Сила</li>
                  <li className="text-primary hover:underline cursor-pointer">→ Йода</li>
                </ul>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WikiView;
