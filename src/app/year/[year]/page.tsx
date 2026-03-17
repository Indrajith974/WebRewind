import { getHistoryByYear, internetHistory } from "@/data/internetHistory";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TrendCard } from "@/components/TrendCard";
import { MemeCard } from "@/components/MemeCard";
import { ShareButtons } from "@/components/ShareButtons";
import { InfiniteWebsites } from "@/components/InfiniteWebsites";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return internetHistory.map((entry) => ({
    year: entry.year.toString(),
  }));
}

export default async function YearPage({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  const numYear = parseInt(year, 10);
  const data = getHistoryByYear(numYear);

  if (!data) return notFound();

  const shareUrl = `https://time-machine.app/year/${year}`;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--retro-bg)]">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 text-[var(--retro-primary)] font-bold hover:underline bg-[var(--retro-surface)] px-4 py-2 border border-[var(--retro-border)] shadow-sm">
          <ArrowLeft className="h-4 w-4" /> Back to Timeline
        </Link>

        {/* Header */}
        <section className="bg-[var(--retro-surface)] p-8 border-4 border-[var(--retro-border)] shadow-xl mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-9xl">{data.year}</div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 text-[var(--retro-primary)] relative z-10">
            Internet in {data.year}
          </h1>
          <p className="text-xl font-medium relative z-10 border-l-4 border-[var(--retro-primary)] pl-4">
            {data.description}
          </p>
          <ShareButtons title={`The Internet in ${data.year} - NetNostalgia`} url={shareUrl} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Websites */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h2 className="text-3xl font-bold border-b-2 border-dashed border-[var(--retro-border)] pb-2">
              Top Websites & Platforms
            </h2>
            <div className="mt-4">
              <InfiniteWebsites initialStaticSites={data.websites} year={data.year} />
            </div>
          </div>

          {/* Sidebar - Trends and Memes */}
          <div className="flex flex-col gap-8">
            <div className="bg-[var(--retro-surface)] p-6 border-2 border-[var(--retro-border)] shadow-md">
              <h2 className="text-2xl font-bold border-b-2 border-dashed border-[var(--retro-border)] pb-2 mb-4">
                Tech Innovations
              </h2>
              <div className="flex flex-col gap-3">
                {data.tech.map((techItem) => (
                  <TrendCard key={techItem} title={techItem} category="Tech" />
                ))}
              </div>
            </div>

            {data.memes.length > 0 && (
              <div className="bg-[var(--retro-surface)] p-6 border-2 border-[var(--retro-border)] shadow-md text-center">
                <h2 className="text-2xl font-bold border-b-2 border-dashed border-[var(--retro-border)] pb-2 mb-4">
                  Viral Memes
                </h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {data.memes.map((meme) => (
                    <MemeCard key={meme} name={meme} year={data.year} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
