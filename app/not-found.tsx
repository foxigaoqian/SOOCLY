import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="saved-page shell">
      <header className="saved-page__header">
        <p className="eyebrow">Frame not found</p>
        <h1>This Look isn’t here.</h1>
        <p>The prototype only contains a small set of cameras and Looks. Return to discovery and choose one that exists.</p>
      </header>
      <Link className="camera-picker__action" href="/">
        Back to Looks
      </Link>
    </main>
  );
}
