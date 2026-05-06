'use client';
import { useEffect, useState } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="header-inner">
        <a href="/" className="header-logo">
          <span className="header-logo-mark">FK</span>
          <span className="header-logo-name">Фин Кровля</span>
        </a>
        <nav className="header-nav" aria-label="Основная навигация">
          <a href="#configurator" className="header-link">Конфигуратор</a>
          <a href="#footer-contacts" className="header-link">Контакты</a>
          <a
            href="https://fin-krovlya.ru"
            className="header-link header-link-ext"
            target="_blank"
            rel="noopener noreferrer"
          >
            fin-krovlya.ru
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <path d="M3 1h7m0 0v7M10 1 1 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#configurator" className="button button-primary header-cta">
            Получить расчет
          </a>
        </nav>
      </div>
    </header>
  );
}
