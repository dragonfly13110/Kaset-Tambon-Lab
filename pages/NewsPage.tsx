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
        <div className="flex flex-col items-center justify-center gap-3 text-center min-h-[50vh] rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl p-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" as const }}
          >
            <Loader className="h-8 w-8 text-emerald-500" />
          </motion.div>
          <p className="text-sm text-slate-200 font-medium">กำลังดึงข้อมูลข่าวสารล่าสุด...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center gap-3 text-center min-h-[50vh] rounded-3xl bg-white/60 backdrop-blur-xl border border-rose-200/40 shadow-xl p-8">
          <AlertTriangle className="h-8 w-8 text-rose-600" />
          <p className="text-sm font-semibold text-rose-600">เกิดข้อผิดพลาด</p>
          <p className="text-xs text-slate-600">{error}</p>
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
              className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/20 bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-500 hover:shadow-[0_16px_48px_rgba(16,185,129,0.2)] hover:border-emerald-400/30 hover:-translate-y-2 hover:bg-white/95"
              aria-label={`${article.title}, อ่านเพิ่มเติม`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent z-10" />
                <img
                  src={article.imageUrl || 'https://images.unsplash.com/photo-1586766418252-446cf6345997?q=80&w=800&auto=format&fit=crop'}
                  alt=""
                  className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1586766418252-446cf6345997?q=80&w=800&auto=format&fit=crop'; }}
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-5 relative z-10">
                <div>
                  <div className="mb-3 flex items-center justify-between text-[11px]">
                    <span className="inline-block rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 px-2 py-0.5 font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 shadow-sm">
                      {article.source}
                    </span>
                    <span className="text-slate-400 font-medium">{formatDate(article.pubDate)}</span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 line-clamp-3 group-hover:text-emerald-700 transition-colors duration-300">{article.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-3">{stripHtml(article.description)}</p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-600 transition-all duration-300 group-hover:gap-3">
                  <span>อ่านต้นฉบับ</span>
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </motion.div>
    );
  };


  return (
    <div className="min-h-screen bg-surface-50 text-slate-900 relative overflow-hidden">
      {/* Clean Gradient Background - Same as Homepage */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Modern Gradient Background */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-agri-200/30 rounded-full blur-3xl opacity-60 mix-blend-multiply filter animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tech-200/30 rounded-full blur-3xl opacity-60 mix-blend-multiply filter animate-float" style={{ animationDelay: '2s' }} />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <motion.div variants={pageVariants} initial="hidden" animate="visible" className="relative min-h-screen z-10">
        <div className="relative py-8">
          <Container>
            <div className="inline-block rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-white/30 p-1">
              <Button onClick={onNavigateHome} variant="soft">
                <ArrowLeft className="h-4 w-4" />
                <span>กลับหน้าหลัก</span>
              </Button>
            </div>
          </Container>
        </div>
        <main className="relative pb-20">
          <Container>
            <div className="rounded-3xl bg-white/70 backdrop-blur-xl shadow-2xl border border-white/40 p-8 mb-10">
              <SectionTitle
                eyebrow="คลังข่าวสาร"
                title="เทคโนโลยีการเกษตร (AgTech)"
                subtitle="อัปเดตเทรนด์และนวัตกรรมการเกษตรล่าสุดจากทั่วโลก"
                align="left"
              />
            </div>
            <div className="mt-10">
              {renderContent()}
            </div>
          </Container>
        </main>
      </motion.div>
    </div>
  );
};

export default NewsPage;

