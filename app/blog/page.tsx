import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BlogList from "@/components/content/BlogList";
import Btn from "@/components/content/Btn";
import { Avatar } from "@/components/content/PostCard";
import { AUTHOR, CATEGORIES, formatDate, readTime, sortedPosts } from "@/lib/blog";
import { site } from "@/lib/site";
import s from "@/components/content/content.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description: `Buying guides, watch care and the stories behind our watches, from the ${site.displayName} team.`,
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = sortedPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p !== featured);
  const used = CATEGORIES.filter((c) => rest.some((p) => p.category === c));

  return (
    <main id="main" className={s.page}>
      <section className={s.hero}>
        <span className={s.label}>*From the blog</span>
        <h1>The {site.displayName} Journal</h1>
        <p className={s.heroText}>Buying guides, watch care and the engineering inside every movement, written by our watchmakers.</p>
      </section>

      <section className={s.blogSection}>
        <div className={s.container}>
          <article className={s.featured}>
            <Link href={`/blog/${featured.slug}`} className={s.featuredMedia} tabIndex={-1} aria-hidden="true">
              <Image src={featured.image} alt="" fill priority sizes="(max-width: 991px) 100vw, 620px" />
              <span className={s.badge}>Featured article</span>
            </Link>
            <div className={s.featuredBody}>
              <span className={s.label}>*{featured.category}</span>
              <h2><Link href={`/blog/${featured.slug}`}>{featured.title}</Link></h2>
              <p>{featured.excerpt}</p>
              <div className={s.featuredFoot}>
                <div className={s.author}>
                  <Avatar />
                  <div>
                    <div className={s.authorName}>{AUTHOR.name}</div>
                    <div className={s.authorDate}>{formatDate(featured.date)} · {readTime(featured)} min read</div>
                  </div>
                </div>
                <Btn href={`/blog/${featured.slug}`} label="Read article" />
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className={s.blogSection} style={{ paddingTop: 0 }}>
        <div className={s.container}>
          <BlogList posts={rest} categories={used} />
        </div>
      </section>
    </main>
  );
}
