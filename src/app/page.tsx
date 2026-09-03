import homeContent from "@/data/home.json";

export default function AboutPage() {
  return (
    <article className="prose-page">
      <h1 className="title">{homeContent.name}</h1>

      <p>
        Hi, I&apos;m Hao! My online handles tend to follow the regex{" "}
        <code>/hao[\.-]?cuii/</code>. I&apos;m currently a high school senior in
        Vancouver, BC. I&apos;m currently interested in AI interpretability and
        safety, understanding the black-boxy nature of models to make AI safer
        to use.
      </p>

      <p>
        I was a software engineer intern at{" "}
        <a href="https://www.magichour.ai/" target="_blank" rel="noreferrer">
          Magic Hour
        </a>{" "}
        (YC W24), working on high-speed image and video generation. I am also
        the CTO and founding member of{" "}
        <a href="https://smashspeed.ca/" target="_blank" rel="noreferrer">
          Smashspeed
        </a>
        , an AI badminton tracker that has passed 50,000 downloads across more
        than 100 countries. Before that I built ball tracking and autonomous
        systems for{" "}
        <a
          href="https://www.furiousfrogs.org/"
          target="_blank"
          rel="noreferrer"
        >
          Furious Frogs
        </a>
        , a community FTC robotics team ranked first in Canada.
      </p>

      <p>
        Things that make me happy (in alphabetical order): badminton,
        basketball, books, Brawl Stars, cats, family, friends, movies, piano,
        Pokémon, seven, sushi, volleyball
      </p>
    </article>
  );
}
