"use client";

import { useState } from "react";
import PostCard from "./PostCard";
import type { Post } from "@/lib/blog";
import s from "./content.module.css";

/** Category filter for the blog grid. */
export default function BlogList({ posts, categories }: { posts: Post[]; categories: string[] }) {
  const [category, setCategory] = useState("all");
  const shown = posts.filter((p) => category === "all" || p.category === category);
  return (
    <>
      <div className={s.filters} role="group" aria-label="Filter articles by category">
        {["all", ...categories].map((c) => (
          <button key={c} type="button" className={s.filter} aria-pressed={category === c} onClick={() => setCategory(c)}>
            {c === "all" ? "All articles" : c}
          </button>
        ))}
      </div>
      {shown.length > 0 ? (
        <div className={s.grid}>{shown.map((p) => <PostCard key={p.slug} post={p} />)}</div>
      ) : (
        <p className={s.empty}>No articles in this category yet.</p>
      )}
    </>
  );
}
