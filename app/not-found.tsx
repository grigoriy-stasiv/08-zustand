import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 — Сторінку не знайдено | NoteHub',
  description: 'На жаль, такої сторінки не існує.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: '404 — Сторінку не знайдено | NoteHub',
    description: 'На жаль, такої сторінки не існує.',
    url: 'https://notehub.com/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <section>
      <h1>404 — Сторінку не знайдено</h1>
      <p>На жаль, такої сторінки не існує.</p>
      <Link href="/notes/filter/all">Повернутися до нотаток</Link>
    </section>
  );
}
