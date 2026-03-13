export type HistoryEntry = {
  year: number;
  websites: string[];
  tech: string[];
  memes: string[];
  description: string;
};

export const internetHistory: HistoryEntry[] = [
  {
    year: 1990,
    websites: ["CERN", "Usenet"],
    tech: ["World Wide Web invented", "HTML created"],
    memes: [],
    description: "The World Wide Web was invented by Tim Berners-Lee at CERN."
  },
  {
    year: 1995,
    websites: ["Yahoo", "AOL", "GeoCities"],
    tech: ["Dial-up internet", "Netscape browser", "Windows 95"],
    memes: ["Dancing Baby"],
    description: "Early consumer internet era. The web starts getting visual."
  },
  {
    year: 2000,
    websites: ["Yahoo", "MSN", "eBay", "Amazon"],
    tech: ["Napster", "MP3 sharing", "Broadband expansion"],
    memes: ["All Your Base Are Belong to Us"],
    description: "Dot-com boom era and the rise of peer-to-peer sharing."
  },
  {
    year: 2005,
    websites: ["MySpace", "Yahoo", "MSN", "YouTube (launched)"],
    tech: ["Flash games", "iPod", "Web 2.0"],
    memes: ["Star Wars Kid", "Chuck Norris Facts"],
    description: "The golden era of MySpace and the birth of modern video sharing."
  },
  {
    year: 2010,
    websites: ["Facebook", "YouTube", "Google", "Twitter"],
    tech: ["iPhone apps", "4G networks"],
    memes: ["Trollface", "Double Rainbow", "Nyan Cat"],
    description: "Social media dominance and the smartphone revolution."
  },
  {
    year: 2015,
    websites: ["Instagram", "Reddit", "Facebook"],
    tech: ["Mobile internet dominance", "Cloud computing"],
    memes: ["Pepe the Frog", "Left Shark", "The Dress"],
    description: "Visual social media era."
  },
  {
    year: 2020,
    websites: ["TikTok", "Zoom", "YouTube"],
    tech: ["Remote work tools", "5G expansion"],
    memes: ["Among Us", "Tiger King"],
    description: "Pandemic internet. Life moves completely online."
  },
  {
    year: 2024,
    websites: ["TikTok", "YouTube", "Reddit", "ChatGPT"],
    tech: ["Generative AI", "Spatial Computing"],
    memes: ["AI generated memes"],
    description: "AI tools dominate the internet landscape."
  }
];

export function getHistoryByYear(year: number): HistoryEntry | undefined {
  return internetHistory.find(entry => entry.year === year);
}
