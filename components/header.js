import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <Link prefetch href="/">
        <a>Index</a>
      </Link>
      <Link prefetch href="/movies">
        <a>Movies</a>
      </Link>
    </header>
  );
}
