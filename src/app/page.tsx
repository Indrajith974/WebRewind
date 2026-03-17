import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Timeline } from "@/components/Timeline";
import { WebsiteCard } from "@/components/WebsiteCard";
import { MemeCard } from "@/components/MemeCard";
import { TrendCard } from "@/components/TrendCard";
import { RandomizerButton } from "@/components/RandomizerButton";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--retro-bg)]">
      <Navbar />

      <main className="flex-grow flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full py-24 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-[var(--retro-primary)] drop-shadow-md uppercase tracking-tighter">
            NetNostalgia
          </h1>
          <p className="text-xl md:text-2xl opacity-80 max-w-2xl mx-auto font-bold bg-[var(--retro-surface)] p-2 border border-[var(--retro-border)] shadow-sm mb-8">
            Explore the Internet Through the Years (1990 - 2024)
          </p>
          <div className="flex flex-col gap-6 justify-center items-center mt-6">
            <RandomizerButton />
            <Link 
              href="/birthday-internet"
              className="bg-[#008080] w-full max-w-[320px] text-center text-white font-bold px-6 py-4 border-b-4 border-r-4 border-black hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              🎂 TRY THE BIRTHDAY SIMULATOR
            </Link>
            
            {/* Quick Links */}
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              <Link 
                href="/quiz" 
                className="bg-yellow-400 text-black font-bold px-4 py-2 border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-yellow-300 transition-colors flex items-center gap-2"
              >
                <span>❓</span> Take the Internet Era Quiz
              </Link>
              <Link 
                href="/browser/1998" 
                className="bg-blue-600 text-white font-bold px-4 py-2 border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-blue-500 transition-colors flex items-center gap-2"
              >
                <span>🌐</span> Launch Netscape (1998)
              </Link>
              <Link 
                href="/year/2005/nostalgia" 
                className="bg-pink-500 text-white font-bold px-4 py-2 border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-pink-400 transition-colors flex items-center gap-2"
              >
                <span>✨</span> 2005 Nostalgia
              </Link>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <Timeline />

        {/* Featured Content Preview */}
        <section className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 flex flex-col gap-6">
            <h2 className="text-2xl font-bold border-b-2 border-dashed border-[var(--retro-border)] pb-2 flex items-center gap-2">
              Classic Websites
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <WebsiteCard 
                name="Yahoo!"
                domain="yahoo.com"
                year={1996}
                description="The ultimate guide to the World Wide Web in the 90s."
              />
              <WebsiteCard 
                name="MySpace"
                domain="myspace.com"
                year={2005}
                description="A place for friends. Top 8 and custom CSS profiling."
              />
              <WebsiteCard 
                name="GeoCities"
                domain="geocities.com"
                year={1998}
                description="Build your own free home page and join our community."
              />
              <WebsiteCard 
                name="YouTube"
                domain="youtube.com"
                year={2006}
                description="Broadcast Yourself. The dawn of viral videos."
              />
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold border-b-2 border-dashed border-[var(--retro-border)] pb-2">
                Popular Memes
              </h2>
              <div className="flex flex-wrap gap-4 justify-center">
                <MemeCard name="Dancing Baby" year={1996} />
                <MemeCard name="Trollface" year={2008} />
                <MemeCard name="Doge" year={2013} />
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-[var(--retro-surface)] p-6 border-2 border-[var(--retro-border)] shadow-lg">
              <h2 className="text-xl font-bold text-[var(--retro-primary)]">Featured Internet Moments</h2>
              <div className="flex flex-col gap-3">
                <TrendCard title="Netscape Browser Released" category="Tech" />
                <TrendCard title="Napster Changes Music Sharing" category="Culture" />
                <TrendCard title="Web 2.0 Phenomenon" category="Tech" />
                <TrendCard title="The Dress (Black/Blue or White/Gold?)" category="Meme" />
              </div>
            </div>
          </div>
          
        </section>
      </main>

      <Footer />
    </div>
  );
}
