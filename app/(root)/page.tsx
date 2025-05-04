import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Header from "@/components/custom/Header";
import Notifications from "@/components/custom/Notifications";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

interface FeatureSectionProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  reverse: boolean;
}

interface StatItemProps {
  percentage: string;
  description: string;
  textColor: string;
}

interface ArticleCardProps {
  imageSrc: string;
  imageAlt: string;
  label: string;
  title: string;
  linkText: string;
  linkHref: string;
}

const HeroSection = () => (
  <section className="w-full flex flex-col md:flex-row border-b-2 border-black">
    <div className="w-full md:w-1/2 bg-p px-10 xl:px-20 py-20 xl:py-40 space-y-6">
      <h2 className="text-4xl text-white">
        Great teamwork starts <b>with a</b>{" "}
        <span className="text-y">
          <b>digital HQ</b>
        </span>
      </h2>
      <p className="text-white">
        With all your people, tools and communication in one place, you can work{" "}
        <b>faster</b> and <b>more flexibly</b> than ever before.
      </p>
      <div>
        <Button variant={"neutral"}>Google SignUp</Button>
      </div>
    </div>
    <div className="relative w-full md:w-1/2 bg-b flex items-center justify-center border-l-2 border-black p-20 md:p-0">
      <Image
        src="/assets/images/hero-1.png"
        alt="hero-1"
        width={100}
        height={0}
        className="w-28 xl:w-[180px] absolute top-2 left-6 lg:left-16 moving-vertical"
      />
      <Image
        src="/assets/images/hero-2.png"
        alt="hero-2"
        width={100}
        height={0}
        className="w-28 xl:w-[180px] absolute z-20 bottom-10 left-3 lg:left-16 moving-vertical-reverse"
      />
      <Image
        src="/assets/images/hero-3.png"
        alt="hero-3"
        width={100}
        height={0}
        className="w-24 xl:w-[150px] absolute z-20 bottom-8 xl:bottom-12 right-12 lg:right-24 moving-vertical"
      />
      <Image
        src="/assets/images/hero-4.png"
        alt="hero-4"
        width={100}
        height={0}
        className="w-24 xl:w-[150px] absolute top-40 right-4 lg:right-16 xl:right-24 moving-vertical-reverse"
      />
      <Image
        src="/assets/images/hero-5.png"
        alt="hero-5"
        width={100}
        height={0}
        priority
        className="w-[240px] xl:w-[300px] z-10 moving-hero"
      />
    </div>
  </section>
);

const TrustedByCompaniesSection = () => {
  const companies = [
    { src: "/assets/images/comp/airbnb.png", alt: "airbnb" },
    { src: "/assets/images/comp/nasa.png", alt: "nasa" },
    { src: "/assets/images/comp/uber.png", alt: "uber" },
    { src: "/assets/images/comp/nyt.png", alt: "nyt" },
    { src: "/assets/images/comp/etsy.png", alt: "etsy" },
  ];

  return (
    <section className="w-full flex flex-col items-center space-y-10 py-10 md:py-20">
      <div className="text-center">
        <h2 className="text-2xl md:text-4xl">TRUSTED BY COMPANIES</h2>
        <h3 className="text-xl font-extrabold">ALL OVER THE WORLD</h3>
      </div>
      <div className="flex items-center space-x-8 md:space-x-16 px-4 md:px-0">
        {companies.map((company, index) => (
          <Image
            key={index}
            src={company.src}
            alt={company.alt}
            width={74}
            height={74}
          />
        ))}
      </div>
    </section>
  );
};

const FeatureSection = ({
  imageSrc,
  imageAlt,
  title,
  description,
  reverse,
}: FeatureSectionProps) => (
  <div
    className={`relative flex flex-col lg:flex-row ${
      reverse ? "lg:flex-row-reverse" : ""
    } items-stretch justify-center bg-white border-2 border-black px-8 py-4 rounded-lg shadow-light`}
  >
    <div
      className={`w-full lg:w-1/2 flex items-center ${
        reverse ? "justify-end" : "justify-start"
      }`}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={350}
        height={0}
        className={`w-[500px] ${reverse ? "-mr-8" : "-ml-8"}`}
      />
    </div>

    <div className="hidden lg:block w-0.5 mx-8 bg-black"></div>

    <div className="w-full lg:w-1/2 space-y-4 py-10">
      <h5 className="text-xl font-bold">{title}</h5>
      <p>{description}</p>
      <Button variant={"neutral"} className="bg-white">
        More About Channel
      </Button>
    </div>
  </div>
);

const FeaturesSection = () => {
  const features = [
    {
      imageSrc: "/assets/images/feat/team.png",
      imageAlt: "team",
      title: "Bring Your Team Together",
      description:
        "At the heart of Slack are channels: organized spaces for everyone and everything you need for work. In channels, it’s easier to connect across departments, offices, time zones and even other companies.",
      reverse: false,
    },
    {
      imageSrc: "/assets/images/feat/work.png",
      imageAlt: "work",
      title: "Choose how you want to work",
      description:
        "In Slack, you’ve got all the flexibility to work when, where and how it’s best for you. You can easily chat, send audio and video clips, or hop on a huddle to talk things out live.",
      reverse: true,
    },
    {
      imageSrc: "/assets/images/feat/tools.png",
      imageAlt: "tools",
      title: "Move faster with your tools in one place",
      description:
        "With your other work apps connected to Slack, you can work faster by switching tabs less. And with powerful tools like Workflow Builder, you can automate away routine tasks.",
      reverse: false,
    },
  ];

  return (
    <section className="w-full bg-home-pattern flex flex-col items-center py-10 md:py-20">
      <div className="w-full px-4 md:px-10 lg:px-20 z-10 space-y-10">
        {features.map((feature, index) => (
          <FeatureSection key={index} {...feature} />
        ))}
      </div>
      <div className="pattern-overlay"></div>
    </section>
  );
};

const StatItem = ({ percentage, description, textColor }: StatItemProps) => (
  <div className="flex flex-col items-center lg:items-start text-center lg:text-start">
    <div
      className={`text-5xl ${textColor} font-extrabold text-stroke text-shadow`}
    >
      {percentage}
    </div>
    <p className="text-sm mt-4">{description}</p>
  </div>
);

const StatsSection = () => (
  <section className="max-w-3xl px-4 lg:px-0 py-10 md:py-20">
    <div className="px-4 md:px-0">
      <h2 className="text-2xl md:text-4xl text-center font-bold">
        Teams <b>large</b> and small rely on <b>LiveDocs</b>
      </h2>
      <p className="text-center text-lg mt-4">
        Slack securely scales up to support collaboration at the world’s biggest
        companies.
      </p>
    </div>

    <div className="flex items-center justify-center space-x-4 my-8 md:my-12">
      <Button className="bg-darkBg text-white">
        Meet LiveDocs For Enterprise
      </Button>
      <Button variant={"neutral"}>Talk to Sales</Button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <StatItem
        percentage="85%"
        description="of users say Slack has improved communication*"
        textColor="text-y"
      />
      <StatItem
        percentage="86%"
        description="feel their ability to work remotely has improved*"
        textColor="text-g"
      />
      <StatItem
        percentage="88%"
        description="feel more connected to their teams*"
        textColor="text-b"
      />
    </div>
  </section>
);

const ArticleCard = ({
  imageSrc,
  imageAlt,
  label,
  title,
  linkText,
  linkHref,
}: ArticleCardProps) => (
  <div
    className={`flex flex-col space-y-2 bg-white border-4 border-black shadow-light p-4`}
  >
    <Image
      src={imageSrc}
      alt={imageAlt}
      width={200}
      height={0}
      className="w-full h-auto"
    />

    <div className="w-full">
      <span className="text-xs">{label}</span>
      <p className="text-sm font-bold">{title}</p>
    </div>

    <div className="w-full h-full flex items-end justify-end">
      <Link href={linkHref} className="text-sm font-bold">
        {linkText} {">"}
      </Link>
    </div>
  </div>
);

const ArticlesSection = () => {
  const articles = [
    {
      imageSrc: "/assets/images/article/article-1.png",
      imageAlt: "article-1",
      label: "Resource",
      title: "See how others are building their digital HQ",
      linkText: "Read More",
      linkHref: "#",
    },
    {
      imageSrc: "/assets/images/article/article-2.png",
      imageAlt: "article-2",
      label: "Webinar",
      title: "Win the battle for talent with a digital HQ",
      linkText: "Read More",
      linkHref: "#",
    },
    {
      imageSrc: "/assets/images/article/article-3.png",
      imageAlt: "article-3",
      label: "E-Book",
      title: "Reinventing work: New imperatives for the future of working",
      linkText: "Read More",
      linkHref: "#",
    },
  ];

  return (
    <section className="w-full bg-article flex flex-col items-center py-10 md:py-20">
      <div className="relative px-4">
        <h2 className="relative z-10 text-2xl md:text-4xl text-white text-center text-stroke font-bold">
          Take a <span className="text-y">deeper dive</span> into a new way to
          work
        </h2>
        <h2 className="absolute top-1 text-2xl md:text-4xl text-black text-center text-stroke font-bold">
          Take a deeper dive into a new way to work
        </h2>
      </div>

      <div className="w-full mt-10 md:mt-20 px-4 md:px-10 lg:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
          <div className="flex flex-col items-center space-y-2 bg-y border-4 border-black shadow-light p-4">
            <div className="w-full">
              <span className="text-xs">Collection</span>
              <p className="text-sm font-bold">Slack as you Digital HQ</p>
            </div>

            <Image
              src="/assets/images/article/mediating.png"
              alt="1"
              width={200}
              height={0}
              className="w-[200px] h-auto"
            />

            <div className="w-full flex items-center justify-end">
              <Link href="#" className="text-sm font-bold">
                See All {">"}
              </Link>
            </div>
          </div>
          {articles.map((article, index) => (
            <ArticleCard key={index} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default async function Home() {
  const clerkUser = await currentUser();

  return (
    <main className="home-container relative">
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          {clerkUser && (
            <>
              <Notifications />

              <Link href="/editor">
                <Button>My Documents</Button>
              </Link>
            </>
          )}

          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button>Sign In / Sign Up</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </Header>

      <HeroSection />

      <TrustedByCompaniesSection />

      <FeaturesSection />

      <StatsSection />

      <ArticlesSection />

      <footer className="w-full">
        <div className="bg-p px-4 md:px-10 lg:px-20 py-10">
          <div className="flex flex-col md:flex-row md:space-x-10">
            <div className="w-full md:w-4/12">
              <div className="w-max bg-white flex items-center border-2 border-black shadow-light rounded-lg p-4 space-x-4">
                <Image
                  src="/assets/images/logo.png"
                  alt="logo"
                  width={100}
                  height={0}
                  className="w-16 h-auto"
                />

                <div className="text-2xl font-bold">LiveDocs</div>
              </div>

              <p className="text-sm text-white text-justify mt-4">
                <b>LiveDocs</b> is a collaborative editor that allows you to
                create and edit documents in real-time with your team. It offers
                a range of features to enhance productivity and collaboration,
                making it the perfect tool for teams of all sizes.
              </p>
            </div>

            <hr className="mt-10 block md:hidden" />

            <div className="w-full md:w-8/12 text-white mt-10 md:mt-0">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex flex-col space-y-2">
                  <h5 className="text-lg font-bold">Product</h5>
                  <Link href="#" className="font-normal">
                    Features
                  </Link>
                  <Link href="#" className="font-normal">
                    Pricing
                  </Link>
                  <Link href="#" className="font-normal">
                    Integrations
                  </Link>
                </div>

                <div className="flex flex-col space-y-2">
                  <h5 className="text-lg font-bold">Resources</h5>
                  <Link href="#" className="font-normal">
                    Blog
                  </Link>
                  <Link href="#" className="font-normal">
                    Help Center
                  </Link>
                  <Link href="#" className="font-normal">
                    API Documentation
                  </Link>
                </div>

                <div className="flex flex-col space-y-2">
                  <h5 className="text-lg font-bold">Company</h5>
                  <Link href="#" className="font-normal">
                    About Us
                  </Link>
                  <Link href="#" className="font-normal">
                    Careers
                  </Link>
                  <Link href="#" className="font-normal">
                    Contact Us
                  </Link>
                </div>

                <div className="flex flex-col space-y-2">
                  <h5 className="text-lg font-bold">Legal</h5>
                  <Link href="#" className="font-normal">
                    Privacy Policy
                  </Link>
                  <Link href="#" className="font-normal">
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-y text-center text-sm font-semibold py-4">
          © 2024 LiveDocs. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
