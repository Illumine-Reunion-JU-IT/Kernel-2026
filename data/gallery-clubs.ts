export interface GalleryClub {
  id: string;
  name: string;
  descriptor: string;
  archiveUrl: string;
  accent: "signal" | "volt" | "sand";
}

export const galleryClubs: GalleryClub[] = [
  {
    id: "jugs",
    name: "JUGS",
    descriptor: "Games, good noise, and one more round.",
    archiveUrl: "https://drive.google.com/drive/folders/1G38qkdrels6QYQLcF6JxTekll4nobago",
    accent: "signal",
  },
  {
    id: "ccjusl",
    name: "CCJUSL",
    descriptor: "From first idea to something shared.",
    archiveUrl: "https://drive.google.com/drive/folders/1Y9uKiAX548Jae-H2-xbhO06e-4eVYSe5?usp=sharing",
    accent: "volt",
  },
  {
    id: "acm",
    name: "ACM",
    descriptor: "Learn together. Make the next thing.",
    archiveUrl: "https://drive.google.com/drive/folders/1UzkVrecVVSXC2Ct88QL5oGi6wFbGxBVH?usp=sharing",
    accent: "sand",
  },
];
