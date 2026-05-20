import Header from "@/components/Header";
import { Configurator3D } from "@/components/configurator/Configurator3D";

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="page-shell">

        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Кровельная компания</p>
            <h1 suppressHydrationWarning>
              3D‑конфигуратор<br />крыши для<br />быстрого расчёта
            </h1>
            <p className="hero-text">
              Выберите форму, материал и цвет покрытия — менеджер подготовит
              расчёт по готовой конфигурации.
            </p>
            <div className="hero-actions">
              <a href="#configurator" className="button button-primary">
                Открыть конфигуратор
              </a>
              <a href="/configurator" className="button button-secondary">
                Полная страница
              </a>
            </div>
          </div>

          <div className="hero-stats" aria-label="Ключевые показатели">
            <div className="hero-stat">
              <span>4</span>
              <p>формы крыши</p>
            </div>
            <div className="hero-stat">
              <span>3</span>
              <p>типа покрытия</p>
            </div>
            <div className="hero-stat">
              <span>7</span>
              <p>цветов</p>
            </div>
            <div className="hero-stat">
              <span>1</span>
              <p>минута на заявку</p>
            </div>
          </div>
        </section>

        {/* ── Stats strip ── */}
        <div className="stats-strip" aria-label="Преимущества">
          <div className="stat-card">
            <div className="stat-card-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <strong>Несколько форм крыши</strong>
            <p>Двускатная, вальмовая, четырёхскатная, шатровая — каждая в 3D</p>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <strong>3D прямо в браузере</strong>
            <p>Вращение, масштаб и смена конфигурации без перезагрузки</p>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <strong>Ссылка с параметрами</strong>
            <p>Конфигурация сохраняется в URL и браузере автоматически</p>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <strong>Заявка за 1 минуту</strong>
            <p>Менеджер получает конфигурацию вместе с вашими контактами</p>
          </div>
        </div>

        {/* ── Configurator ── */}
        <section id="configurator" className="configurator-section">
          <Configurator3D />
        </section>

      </main>

      <footer className="site-footer" aria-label="Подвал сайта">
        <div className="footer-gradient-sep" aria-hidden="true" />
        <div className="footer-watermark" aria-hidden="true">ФИН КРОВЛЯ</div>

        <div className="footer-container">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-brand-top">
                <span className="footer-logo-mark">FK</span>
                <p className="eyebrow footer-eyebrow">Фин Кровля</p>
              </div>
              <h2 className="footer-title">Кровельный инжиниринг</h2>
              <p className="footer-description">
                3D-конфигуратор кровли для быстрого расчёта и подбора материалов.
              </p>
              <div className="footer-social" aria-label="Социальные сети">
                <a href="#" className="footer-social-btn" aria-label="ВКонтакте">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.5h-1.6c-.6 0-.79-.48-1.87-1.57-1-.97-1.43-.83-1.43.05v1.43c0 .37-.12.59-1.12.59-1.66 0-3.5-.98-4.79-2.85C5.7 11 5.4 9.5 5.4 9.5c0-.18.09-.34.27-.34h1.6c.2 0 .27.09.34.3.37 1.08 1 2.03 1.25 2.03.1 0 .14-.04.14-.26V9.16c-.05-.91-.53-1-.53-1.33 0-.16.13-.32.34-.32h2.52c.17 0 .23.09.23.29v3.1c0 .2.09.27.15.27.1 0 .18-.07.37-.26 1.15-1.28 1.96-3.26 1.96-3.26.06-.13.18-.25.37-.25h1.6c.48 0 .59.25.48.59-.2.9-2.1 3.58-2.1 3.58-.16.27-.22.39 0 .69.17.23.71.71 1.07 1.14.67.76 1.18 1.4 1.31 1.84.15.44-.07.66-.47.66z" />
                  </svg>
                </a>
                <a href="#" className="footer-social-btn" aria-label="Telegram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8-1.7 8.02c-.12.57-.46.7-.93.44l-2.57-1.9-1.24 1.2c-.14.13-.26.24-.53.24l.19-2.66 4.84-4.37c.21-.19-.05-.29-.32-.1L7.41 14.3l-2.52-.79c-.55-.17-.56-.55.12-.81l9.85-3.8c.46-.17.86.11.78.9z" />
                  </svg>
                </a>
                <a href="#" className="footer-social-btn" aria-label="WhatsApp">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.48-.5-.67-.51-.17 0-.37-.02-.57-.02-.2 0-.52.07-.8.37-.27.3-1.04 1.01-1.04 2.47s1.07 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.3.17-1.41-.07-.12-.27-.2-.57-.35zm-5.48 7.48h-.02a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.73.98 1-3.64-.24-.37A9.86 9.86 0 0 1 2.1 12C2.1 6.55 6.55 2.1 12 2.1A9.9 9.9 0 0 1 21.9 12c0 5.45-4.45 9.86-9.9 9.86zm8.42-18.27A11.82 11.82 0 0 0 12 .1C5.44.1.1 5.44.1 12c0 2.12.56 4.19 1.61 6.01L.1 23.9l6.05-1.59A11.9 11.9 0 0 0 12 23.9h.01c6.56 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.49-8.41z" />
                  </svg>
                </a>
                <a href="#" className="footer-social-btn" aria-label="YouTube">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M23.49 6.2a3.02 3.02 0 0 0-2.12-2.14C19.46 3.6 12 3.6 12 3.6s-7.46 0-9.37.5A3.02 3.02 0 0 0 .51 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .51 5.8 3.02 3.02 0 0 0 2.12 2.14C4.54 20.4 12 20.4 12 20.4s7.46 0 9.37-.46a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.51-5.8zM9.6 15.6V8.4l6.27 3.6-6.27 3.6z" />
                  </svg>
                </a>
              </div>
            </div>

            <nav className="footer-nav" aria-label="Навигация">
              <p className="footer-label">Навигация</p>
              <div className="footer-links">
                <a href="#configurator" className="footer-link">Конфигуратор</a>
                <a href="#configurator" className="footer-link">Материалы</a>
                <a href="#footer-contacts" className="footer-link">Контакты</a>
                <a
                  href="https://fin-krovlya.ru"
                  className="footer-link footer-link-ext"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  fin-krovlya.ru
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M2.5 1H9m0 0v6.5M9 1 1 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </nav>

            <div className="footer-contact" id="footer-contacts">
              <p className="footer-label">Контакты</p>
              <div className="footer-contact-list">
                <a className="footer-link" href="tel:+78722000000">+7 (8722) 00-00-00</a>
                <a className="footer-link" href="mailto:info@finkrovlya.ru">info@finkrovlya.ru</a>
              </div>
              <a href="#configurator" className="button button-primary footer-button">
                Получить расчет
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Фин Кровля. Все права защищены.</p>
            <a href="#" className="footer-policy">Политика конфиденциальности</a>
          </div>
        </div>
      </footer>
    </>
  );
}
