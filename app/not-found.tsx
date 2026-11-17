import Link from "next/link";

export default function NotFound() {
  return (
    <main className="notfound" id="main">
      <p className="eyebrow">404</p>
      <h1 className="big-title">This page is out of time.</h1>
      <Link href="/" className="nav__contact">Back to home</Link>
    </main>
  );
}
