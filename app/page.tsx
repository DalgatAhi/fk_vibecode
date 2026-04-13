import Link from "next/link";
import { Configurator3D } from "@/components/configurator/Configurator3D";

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Кровельная компания</p>
          <h1 suppressHydrationWarning>
            3D-конфигуратор крыши для быстрой заявки и наглядного выбора.
          </h1>
          <p className="hero-text">
            Выберите форму крыши, материал и оттенок покрытия, покрутите модель
            в 3D и сразу отправьте заявку менеджеру с готовой конфигурацией.
          </p>
          <div className="hero-actions">
            <a href="#configurator" className="button button-primary">
              Открыть конфигуратор
            </a>
            <Link href="/configurator" className="button button-secondary">
              Отдельная страница
            </Link>
          </div>
        </div>
        <div className="hero-facts" aria-label="Преимущества">
          <div>
            <span>4</span>
            <p>формы крыши</p>
          </div>
          <div>
            <span>3</span>
            <p>типа покрытия</p>
          </div>
          <div>
            <span>7</span>
            <p>доступных цветов</p>
          </div>
        </div>
      </section>

      <section className="feature-strip">
        <p>Вращение, масштабирование и смена конфигурации без перезагрузки.</p>
        <p>Ссылка с параметрами и сохранение в браузере уже включены.</p>
      </section>

      <section id="configurator" className="configurator-section">
        <Configurator3D />
      </section>

      <footer className="site-footer" aria-label="Подвал сайта">
        <div className="footer-main">
          <div className="footer-brand">
            <div>
              <p className="eyebrow">Фин Кровля</p>
              <h2 className="footer-title">Кровельный инжиниринг</h2>
            </div>
            <p className="footer-description">
              3D-конфигуратор кровли для быстрого расчета и подбора
              материалов.
            </p>
          </div>

          <nav className="footer-nav" aria-label="Навигация">
            <p className="footer-label">Навигация</p>
            <div className="footer-links">
              <a href="#configurator" className="footer-link">
                Конфигуратор
              </a>
              <a href="#configurator" className="footer-link">
                Материалы
              </a>
              <a href="#footer-contacts" className="footer-link">
                Контакты
              </a>
            </div>
          </nav>

          <div className="footer-contact" id="footer-contacts">
            <p className="footer-label">Контакты</p>
            <div className="footer-contact-list">
              <a className="footer-link" href="tel:+78722000000">
                +7 (8722) 00-00-00
              </a>
              <a className="footer-link" href="mailto:info@finkrovlya.ru">
                info@finkrovlya.ru
              </a>
            </div>
            <a href="#configurator" className="button button-primary footer-button">
              Получить расчет
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Фин Кровля</p>
          <a href="#configurator" className="footer-policy">
            Политика конфиденциальности
          </a>
        </div>
      </footer>
    </main>
  );
}
