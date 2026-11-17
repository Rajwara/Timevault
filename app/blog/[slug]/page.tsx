import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Btn from "@/components/content/Btn";
import PostCard, { Avatar } from "@/components/content/PostCard";
import { AUTHOR, POSTS, formatDate, getPost, readTime, sortedPosts, type Block } from "@/lib/blog";
import { site, siteUrl } from "@/lib/site";
import s from "@/components/content/content.module.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug);
  return p
    ? {
        title: p.title,
        description: p.excerpt,
        alternates: { canonical: `/blog/${p.slug}` },
        openGraph: { type: "article", title: p.title, description: p.excerpt, url: `/blog/${p.slug}`, images: [{ url: p.image }], publishedTime: p.date },
      }
    : {};
}

function Content({ block }: { block: Block }) {
  switch (block.type) {
    case "p": return <p>{block.text}</p>;
    case "h2": return <h2>{block.text}</h2>;
    case "quote": return <blockquote>{block.text}</blockquote>;
    case "list": return <ul>{block.items.map((i) => <li key={i}>{i}</li>)}</ul>;
    case "figure":
      return (
        <figure>
          <div className={s.figImage}><Image src={block.image} alt={block.caption} fill sizes="(max-width: 767px) 100vw, 760px" /></div>
          <figcaption>{block.caption}</figcaption>
        </figure>
      );
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const related = sortedPosts()
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${siteUrl()}${post.image}`,
    datePublished: post.date,
    author: { "@type": "Organization", name: AUTHOR.name },
    publisher: { "@type": "Organization", name: site.displayName },
  };

  return (
    <main id="main" className={s.page}>
      <section className={s.postHero}>
        <span className={s.label}>*{post.category}</span>
        <h1>{post.title}</h1>
        <div className={s.postMeta}>
          <span className={s.chip} style={{ marginTop: 0 }}>{formatDate(post.date)}</span>
          <span className={s.chip} style={{ marginTop: 0 }}>{readTime(post)} min read</span>
        </div>
      </section>

      <section className={s.blogSection}>
        <div className={s.container}>
          <div className={s.postImage}><Image src={post.image} alt="" fill priority sizes="(max-width: 1224px) 100vw, 1200px" /></div>
          <article className={s.article}>
            {post.body.map((b, i) => <Content key={i} block={b} />)}

            <aside className={s.authorCard} aria-label="About the author">
              <Avatar large />
              <div>
                <span className={s.label} style={{ marginBottom: 0 }}>*Written by</span>
                <h2>{AUTHOR.name}</h2>
                <p>{AUTHOR.bio}</p>
              </div>
              <dl className={s.authorStats}>
                <div><dd>{formatDate(post.date)}</dd><dt>Published</dt></div>
                <div><dd>{readTime(post)} min</dd><dt>Read</dt></div>
              </dl>
            </aside>
            <div className={s.backBtn}><Btn href="/blog" label="All articles" back variant="line" /></div>
          </article>
        </div>
      </section>

      <section className={s.related}>
        <div className={s.container}>
          <div className={s.relatedHead}>
            <div>
              <span className={s.label}>*Keep reading</span>
              <h2>More from the Journal</h2>
            </div>
            <Btn href="/blog" label="View all articles" />
          </div>
          <div className={s.grid}>{related.map((p) => <PostCard key={p.slug} post={p} />)}</div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
