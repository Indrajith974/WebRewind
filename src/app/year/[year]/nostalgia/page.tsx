import { getHistoryByYear, internetHistory } from "@/data/internetHistory";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const { year } = await params;
  const numYear = parseInt(year, 10);
  const data = getHistoryByYear(numYear);

  if (!data) return {};

  const title = `The Internet in ${data.year}`;
  const description = `Top websites: ${data.websites.join(", ")}. Popular memes: ${data.memes.join(", ")}. Tech trends: ${data.tech.join(", ")}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://time-machine.app/year/${year}/nostalgia`,
      images: [
        {
          url: "https://time-machine.app/og-image-default.png", // Fallback generated preview
          width: 1200,
          height: 630,
          alt: `The Internet in ${year}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://time-machine.app/og-image-default.png"],
    },
  };
}

export async function generateStaticParams() {
  return internetHistory.map((entry) => ({
    year: entry.year.toString(),
  }));
}

export default async function NostalgiaSharePage({ params }: Props) {
  const { year } = await params;
  const numYear = parseInt(year, 10);
  const data = getHistoryByYear(numYear);

  if (!data) return notFound();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--retro-bg)] text-[var(--retro-text)] font-sans">
      <div className="max-w-2xl bg-[var(--retro-surface)] p-12 border-4 border-[var(--retro-border)] shadow-[8px_8px_0px_#000]">
        <h1 className="text-5xl font-black text-[var(--retro-primary)] mb-6 text-center uppercase tracking-widest border-b-4 border-dashed border-[var(--retro-border)] pb-4">
          The Internet in {data.year}
        </h1>
        
        <div className="flex flex-col gap-6">
          <div className="bg-blue-50 border border-blue-200 p-4">
            <h3 className="font-bold text-blue-900 mb-2 underline">Top Websites</h3>
            <p className="text-black font-mono">{data.websites.join(" • ")}</p>
          </div>
          
          <div className="bg-green-50 border border-green-200 p-4">
            <h3 className="font-bold text-green-900 mb-2 underline">Tech Trends</h3>
            <p className="text-black font-mono">{data.tech.join(" • ")}</p>
          </div>

          {data.memes.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 p-4">
              <h3 className="font-bold text-orange-900 mb-2 underline">Popular Memes</h3>
              <p className="text-black font-mono">{data.memes.join(" • ")}</p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm opacity-60">
          <p>Created by WebRewind</p>
          <Link href="/" className="text-[var(--retro-primary)] underline">Experience the timeline</Link>
        </div>
      </div>
    </div>
  );
}
