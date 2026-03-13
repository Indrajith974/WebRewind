import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShareButtons } from "@/components/ShareButtons";
import { ArrowLeft, ExternalLink, Cpu } from "lucide-react";
import Link from "next/link";
import { getArchiveUrl } from "@/lib/wayback";

export default async function WebsiteViewerPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ site: string }>,
  searchParams: Promise<{ year?: string }>
}) {
  const { site } = await params;
  const decodedSite = decodeURIComponent(site);
  const { year } = await searchParams;
  const viewYear = year || "1999";
  
  // Use heuristic to guess domain if it's just a name
  const domain = decodedSite.includes(".") ? decodedSite : `${decodedSite}.com`;
  const archiveUrl = getArchiveUrl(domain, viewYear);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--retro-bg)]">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <Link href={`/year/${viewYear}`} className="inline-flex items-center gap-2 mb-8 text-[var(--retro-primary)] font-bold hover:underline bg-[var(--retro-surface)] px-4 py-2 border border-[var(--retro-border)] shadow-sm">
          <ArrowLeft className="h-4 w-4" /> Back to {viewYear}
        </Link>

        <section className="bg-[var(--retro-surface)] p-8 border-4 border-[var(--retro-border)] shadow-2xl">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            
            {/* Visual Header / Icon */}
            <div className="w-32 h-32 flex-shrink-0 bg-blue-100 border-2 border-blue-300 flex items-center justify-center rounded-lg shadow-inner">
              <Cpu className="h-16 w-16 text-blue-500" />
            </div>

            {/* Context & Info */}
            <div className="flex-grow flex flex-col gap-4">
              <h1 className="text-4xl font-black capitalize flex items-center gap-3">
                {decodedSite.replace("-", " ")} <span className="text-lg font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">({viewYear})</span>
              </h1>
              
              <p className="text-lg font-medium leading-relaxed border-l-4 border-gray-300 pl-4">
                {decodedSite.capitalize()} launched near this era and revolutionized internet interactions. This is a historic preservation of its digital footprint.
              </p>
              
              <div className="bg-[var(--retro-bg)] p-4 border border-[var(--retro-border)] mt-4">
                <h3 className="font-bold text-sm uppercase mb-2">Historical Context</h3>
                <p className="text-sm">
                  During this period in online history, dial-up speeds heavily dictated website design, keeping layouts table-based and image sizes low. The Wayback Machine provides a digital snapshot of what users experienced.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-4 items-center">
                <a 
                  href={archiveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[var(--retro-primary)] text-white font-bold py-3 px-6 hover:shadow-lg transition-transform hover:-translate-y-1"
                >
                  <ExternalLink className="h-5 w-5" /> View Archived Version
                </a>
                <Link
                  href={`/browser/${viewYear}?url=${domain}`}
                  className="inline-flex items-center gap-2 border-2 border-[var(--retro-primary)] text-[var(--retro-primary)] font-bold py-3 px-6 hover:bg-[var(--retro-primary)] hover:text-white transition-colors"
                >
                  🌐 Open in Old Browser Emulator
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-12 border-t-2 border-dashed border-[var(--retro-border)] pt-8">
            <ShareButtons title={`Explore ${decodedSite} in ${viewYear}`} url={`https://time-machine.app/site/${encodeURIComponent(decodedSite)}?year=${viewYear}`} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Extends string for quick capitalize helper used above
declare global {
  interface String {
    capitalize(): string;
  }
}
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
