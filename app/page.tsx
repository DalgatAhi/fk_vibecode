import Header from "@/components/Header";
import { Configurator3D } from "@/components/configurator/Configurator3D";

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="page-shell">

        {/* ── Hero ── */}
        <section className="nh-hero">
          <div className="nh-bg-pattern" aria-hidden="true" />

          <div className="nh-grid">

            {/* Left block */}
            <div className="nh-left">
              <span className="nh-badge">Кровельная компания</span>

              <h1 className="nh-title" suppressHydrationWarning>
                Рассчитайте крышу<br />
                <span className="nh-accent">по готовой<br />конфигурации</span>
              </h1>

              <p className="nh-sub">
                Выберите форму, покрытие и цвет — менеджер подготовит расчёт на основе ваших параметров.
              </p>

              <div className="nh-actions">
                <a href="#configurator" className="button button-primary nh-btn-primary">
                  Открыть конфигуратор
                </a>
                <a href="#nh-features" className="button button-secondary nh-btn-secondary">
                  Смотреть возможности
                </a>
              </div>

              <div className="nh-trust">
                <span className="nh-trust-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  Без замеров на старте
                </span>
                <span className="nh-trust-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  Заявка за 1 минуту
                </span>
                <span className="nh-trust-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  Расчёт от менеджера
                </span>
              </div>
            </div>

            {/* Right block: configurator preview */}
            <div className="nh-right">
              <div className="nh-card">

                <div className="nh-card-header">
                  <div className="nh-dots" aria-hidden="true">
                    <span className="nh-dot" />
                    <span className="nh-dot" />
                    <span className="nh-dot nh-dot-active" />
                  </div>
                  <span className="nh-card-lbl">Конфигурация крыши</span>
                </div>

                {/* Architectural sketch */}
                <div className="nh-sketch">
                  <svg viewBox="0 0 320 158" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Схема двускатной крыши">
                    <line x1="80" y1="0" x2="80" y2="158" stroke="#b44e2f" strokeOpacity="0.07" strokeWidth="1" strokeDasharray="3 6"/>
                    <line x1="160" y1="0" x2="160" y2="158" stroke="#b44e2f" strokeOpacity="0.07" strokeWidth="1" strokeDasharray="3 6"/>
                    <line x1="240" y1="0" x2="240" y2="158" stroke="#b44e2f" strokeOpacity="0.07" strokeWidth="1" strokeDasharray="3 6"/>
                    <line x1="0" y1="52" x2="320" y2="52" stroke="#b44e2f" strokeOpacity="0.07" strokeWidth="1" strokeDasharray="3 6"/>
                    <line x1="0" y1="105" x2="320" y2="105" stroke="#b44e2f" strokeOpacity="0.07" strokeWidth="1" strokeDasharray="3 6"/>
                    <rect x="48" y="105" width="224" height="46" rx="2" fill="rgba(255,255,255,0.5)" stroke="rgba(31,28,24,0.18)" strokeWidth="1.5"/>
                    <polygon points="32,105 160,28 288,105" fill="rgba(180,78,47,0.05)" stroke="#b44e2f" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
                    <line x1="160" y1="28" x2="160" y2="105" stroke="rgba(31,28,24,0.12)" strokeWidth="1" strokeDasharray="4 5"/>
                    <rect x="214" y="64" width="16" height="42" rx="1" fill="rgba(255,255,255,0.4)" stroke="rgba(31,28,24,0.15)" strokeWidth="1.2"/>
                    <rect x="142" y="118" width="36" height="28" rx="2" fill="rgba(180,78,47,0.06)" stroke="rgba(31,28,24,0.15)" strokeWidth="1.2"/>
                    <line x1="160" y1="118" x2="160" y2="146" stroke="rgba(31,28,24,0.1)" strokeWidth="1"/>
                    <line x1="142" y1="132" x2="178" y2="132" stroke="rgba(31,28,24,0.1)" strokeWidth="1"/>
                    <circle cx="32" cy="105" r="3" fill="#b44e2f" fillOpacity="0.45"/>
                    <circle cx="288" cy="105" r="3" fill="#b44e2f" fillOpacity="0.45"/>
                    <circle cx="160" cy="28" r="4" fill="#b44e2f" fillOpacity="0.9"/>
                    <line x1="32" y1="96" x2="32" y2="114" stroke="#b44e2f" strokeOpacity="0.3" strokeWidth="1"/>
                    <line x1="288" y1="96" x2="288" y2="114" stroke="#b44e2f" strokeOpacity="0.3" strokeWidth="1"/>
                    <path d="M150,40 Q160,52 170,40" stroke="#b44e2f" strokeOpacity="0.35" strokeWidth="1" fill="none"/>
                  </svg>
                </div>

                {/* Parameters */}
                <div className="nh-params">
                  <div className="nh-param">
                    <span className="nh-param-key">Форма</span>
                    <span className="nh-param-val">Двускатная</span>
                  </div>
                  <div className="nh-param">
                    <span className="nh-param-key">Покрытие</span>
                    <span className="nh-param-val">Металлочерепица</span>
                  </div>
                  <div className="nh-param">
                    <span className="nh-param-key">Цвет</span>
                    <span className="nh-param-val">Графит</span>
                  </div>
                </div>

                {/* Color swatches */}
                <div className="nh-swatches" aria-label="Палитра цветов">
                  <div className="nh-swatch nh-swatch-active" style={{background:'#3a3a3a'}} title="Графит"/>
                  <div className="nh-swatch" style={{background:'#7a3010'}} title="Коричневый"/>
                  <div className="nh-swatch" style={{background:'#b02020'}} title="Красный"/>
                  <div className="nh-swatch" style={{background:'#2a5a2a'}} title="Зелёный"/>
                  <div className="nh-swatch" style={{background:'#1a3660'}} title="Синий"/>
                  <div className="nh-swatch" style={{background:'#8c7355'}} title="Бежевый"/>
                  <div className="nh-swatch" style={{background:'#d8d0c4'}} title="Светлый"/>
                </div>

                {/* Ready strip */}
                <div className="nh-ready">
                  <div className="nh-ready-info">
                    <p className="nh-ready-title">Готово к расчёту</p>
                    <p className="nh-ready-hint">3 параметра выбрано</p>
                  </div>
                  <a href="#configurator" className="button button-primary nh-send-btn">
                    Отправить параметры
                  </a>
                </div>

              </div>

              {/* Floating badge */}
              <div className="nh-float" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <path d="M13 2L3 14h9l-1 8 10-12h-8l-1-8z"/>
                </svg>
                Ответ за 15 минут
              </div>
            </div>

          </div>
        </section>

        {/* ── Feature cards ── */}
        <div className="nh-features" id="nh-features">
          <div className="nh-feat">
            <div className="nh-feat-num">4</div>
            <div className="nh-feat-text">
              <strong>формы крыши</strong>
              <p>Двускатная, вальмовая, шатровая и четырёхскатная</p>
            </div>
          </div>
          <div className="nh-feat">
            <div className="nh-feat-num">3</div>
            <div className="nh-feat-text">
              <strong>типа покрытия</strong>
              <p>Популярные материалы для частных домов</p>
            </div>
          </div>
          <div className="nh-feat">
            <div className="nh-feat-num">7</div>
            <div className="nh-feat-text">
              <strong>цветов</strong>
              <p>Базовая палитра для быстрой конфигурации</p>
            </div>
          </div>
          <div className="nh-feat">
            <div className="nh-feat-num">1</div>
            <div className="nh-feat-text">
              <strong>минута на заявку</strong>
              <p>Быстрая заявка без сложных форм</p>
            </div>
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
