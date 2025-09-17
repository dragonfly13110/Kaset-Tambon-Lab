import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../components/ui/Container';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import { ArrowLeft, ArrowRight, Loader, AlertTriangle } from '../components/Icons';

interface RssArticle {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  description: string;
  categories: string[];
  imageUrl?: string;
  source: string;
}

interface NewsPageProps {
  onNavigateHome: () => void;
}

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: 'easeOut' as const }
  }
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const }
  }
};

const stripHtml = (html: string) => {
  if (!html) return '';
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  const text = tempDiv.textContent || tempDiv.innerText || '';
  return text.replace(/<[^>]*>?/gm, '');
};

const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (e) {
    return dateString;
  }
};

const NewsPage: React.FC<NewsPageProps> = ({ onNavigateHome }) => {
  const [articles, setArticles] = useState<RssArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on page load
    
    const RSS_FEEDS = [
      { name: 'AgFunderNews', url: 'https://agfundernews.com/feed' },
      { name: 'Future Farming', url: 'https://www.futurefarming.com/rss/' },
      { name: 'PrecisionAg', url: 'https://www.precisionag.com/feed/' },
    ];
    const PROXY_URL = 'https://api.codetabs.com/v1/proxy?quest=';

    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const fetchPromises = RSS_FEEDS.map(feed => 
          fetch(`${PROXY_URL}${feed.url}`).then(async (response) => {
            if (!response.ok) {
              throw new Error(`HTTP error for ${feed.name}: ${response.status}`);
            }
            const text = await response.text();
            return { text, sourceName: feed.name };
          })
        );
        
        const results = await Promise.allSettled(fetchPromises);
        
        let allArticles: RssArticle[] = [];
        const parser = new DOMParser();

        results.forEach(result => {
          if (result.status === 'fulfilled') {
            const { text, sourceName } = result.value;
            const xmlDoc = parser.parseFromString(text, "text/xml");
            
            if (xmlDoc.getElementsByTagName("parsererror").length) {
              console.error(`XML Parse Error for feed: ${sourceName}`);
              return;
            }
            
            const items = Array.from(xmlDoc.querySelectorAll("item"));
            const parsedArticles: RssArticle[] = items.map(item => {
              const getElementText = (tagName: string): string => item.querySelector(tagName)?.textContent ?? '';
              
              const descriptionHTML = getElementText('description');
              const imageUrlMatch = descriptionHTML.match(/<img[^>]+src="([^">]+)"/);
              
              let imageUrl = imageUrlMatch ? imageUrlMatch[1] : undefined;
              if (!imageUrl) {
                  const enclosure = item.querySelector('enclosure');
                  if (enclosure && enclosure.getAttribute('type')?.startsWith('image/')) {
                      imageUrl = enclosure.getAttribute('url') ?? undefined;
                  }
              }
              if (!imageUrl) {
                  const mediaContent = item.querySelector('media\\:content, content');
                   if (mediaContent && mediaContent.getAttribute('type')?.startsWith('image/')) {
                      imageUrl = mediaContent.getAttribute('url') ?? undefined;
                  }
              }

              return {
                title: getElementText('title'),
                pubDate: getElementText('pubDate'),
                link: getElementText('link'),
                guid: getElementText('guid'),
                description: descriptionHTML,
                categories: Array.from(item.querySelectorAll('category')).map(cat => cat.textContent ?? ''),
                imageUrl,
                source: sourceName,
              };
            });
            allArticles.push(...parsedArticles);
          } else {
            console.error("A feed failed to load:", result.reason);
          }
        });

        if (allArticles.length === 0) {
            throw new Error('ไม่สามารถดึงข้อมูลข่าวสารจากแหล่งข้อมูลใดๆ ได้');
        }

        const sortedArticles = allArticles
            .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
            .slice(0, 24); // Fetch more articles for this page

        setArticles(sortedArticles);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการดึงข้อมูลข่าวสาร');
        console.error("News fetch/parse error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);
  
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center gap-3 text-center min-h-[50vh]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" as const }}
          >
            <Loader className="h-8 w-8 text-emerald-300" />
          </motion.div>
          <p className="text-sm text-slate-300">กำลังดึงข้อมูลข่าวสารล่าสุด...</p>
        </div>
      );
    }

    if (error) {
       return (
        <div className="flex flex-col items-center justify-center gap-3 text-center min-h-[50vh] rounded-2xl bg-rose-500/10 p-4">
          <AlertTriangle className="h-8 w-8 text-rose-300" />
          <p className="text-sm font-semibold text-rose-300">เกิดข้อผิดพลาด</p>
          <p className="text-xs text-slate-400">{error}</p>
        </div>
      );
    }

    return (
      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        variants={gridVariants}
        initial="hidden"
        animate="visible"
      >
        {articles.map((article) => (
          <motion.div
            key={article.guid}
            variants={cardVariants}
            className="group relative flex h-full flex-col"
          >
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/40 hover:bg-white/10 hover:shadow-lg"
              aria-label={`${article.title}, อ่านเพิ่มเติม`}
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-slate-900/50">
                <img 
                  src={article.imageUrl || 'https://images.unsplash.com/photo-1586766418252-446cf6345997?q=80&w=800&auto=format&fit=crop'} 
                  alt="" 
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1586766418252-446cf6345997?q=80&w=800&auto=format&fit=crop'; }}
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="mb-3 flex items-center justify-between text-[11px]">
                      <span className="inline-block rounded-full bg-cyan-500/10 px-2 py-0.5 font-medium text-cyan-300 ring-1 ring-inset ring-cyan-400/20">
                        {article.source}
                      </span>
                      <span className="text-slate-400">{formatDate(article.pubDate)}</span>
                    </div>
                    <h3 className="text-base font-semibold text-white line-clamp-3">{article.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-300 line-clamp-3">{stripHtml(article.description)}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-300 transition-colors group-hover:text-white">
                    <span>อ่านต้นฉบับ</span>
                    <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
              </div>
            </a>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible">
      <div className="py-8">
        <Container>
            <Button onClick={onNavigateHome} variant="soft">
                <ArrowLeft className="h-4 w-4" />
                <span>กลับหน้าหลัก</span>
            </Button>
        </Container>
      </div>
      <main className="pb-20">
        <Container>
          <SectionTitle
            eyebrow="คลังข่าวสาร"
            title="เทคโนโลยีการเกษตร (AgTech)"
            subtitle="อัปเดตเทรนด์และนวัตกรรมการเกษตรล่าสุดจากทั่วโลก"
            align="left"
          />
          <div className="mt-10">
            {renderContent()}
          </div>
        </Container>
      </main>
    </motion.div>
  );
};

export default NewsPage;
