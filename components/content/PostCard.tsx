import Image from "next/image";
import Link from "next/link";
import { AUTHOR, formatDate, readTime, type Post } from "@/lib/blog";
import s from "./content.module.css";

export function Avatar({ large = false }: { large?: boolean }) {
  return <span className={`${s.avatar} ${large ? s.avatarLg : ""}`} aria-hidden="true">TV</span>;
}

export default function PostCard({ post }: { post: Post }) {
  const href = `/blog/${post.slug}`;
  return (
    <article className={s.card}>
      <Link className={s.cardMedia} href={href} tabIndex={-1} aria-hidden="true">
        <Image src={post.image} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 380px" />
        <span className={s.tag}>{post.category}</span>
      </Link>
      <div className={s.cardBody}>
        <h3><Link href={href}>{post.title}</Link></h3>
        <p>{post.excerpt}</p>
        <div className={s.cardFoot}>
          <span className={s.author}><Avatar /><span className={s.authorName}>{AUTHOR.name}</span></span>
          <span>{formatDate(post.date)} · {readTime(post)} min</span>
        </div>
      </div>
    </article>
  );
}
