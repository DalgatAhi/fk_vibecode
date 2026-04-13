import { COLOR_OPTIONS, MATERIAL_OPTIONS, ROOF_SHAPE_OPTIONS } from "@/data/configurator";
import type { RequestFormState, RoofConfiguration } from "@/lib/types";

type ControlPanelProps = {
  configuration: RoofConfiguration;
  form: RequestFormState;
  summary: string;
  submitState:
    | { kind: "idle"; message: string }
    | { kind: "success"; message: string }
    | { kind: "error"; message: string };
  onConfigurationChange: (patch: Partial<RoofConfiguration>) => void;
  onFormChange: <K extends keyof RequestFormState>(
    field: K,
    value: RequestFormState[K],
  ) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onReset: () => void;
};

export function ControlPanel({
  configuration,
  form,
  summary,
  submitState,
  onConfigurationChange,
  onFormChange,
  onSubmit,
  onReset,
}: ControlPanelProps) {
  return (
    <aside className="control-panel">
      <section className="panel-group">
        <h3>Форма крыши</h3>
        <p>Переключение меняет геометрию 3D-модели в реальном времени.</p>
        <div className="option-grid panel-options">
          {ROOF_SHAPE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`option-button ${
                configuration.roofShape === option.value ? "is-active" : ""
              }`}
              onClick={() => onConfigurationChange({ roofShape: option.value })}
            >
              <strong>{option.label}</strong>
              <span>{option.description}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="panel-group">
        <h3>Покрытие</h3>
        <p>Материал влияет на отражение света и рисунок поверхности.</p>
        <div className="option-grid panel-options">
          {MATERIAL_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`option-button ${
                configuration.materialType === option.value ? "is-active" : ""
              }`}
              onClick={() => onConfigurationChange({ materialType: option.value })}
            >
              <strong>{option.label}</strong>
              <span>{option.description}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="panel-group">
        <h3>Цвет</h3>
        <p>Изменение цвета происходит без перезагрузки страницы.</p>
        <div className="color-grid panel-options">
          {COLOR_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`color-button ${
                configuration.color.value === option.value ? "is-active" : ""
              }`}
              onClick={() => onConfigurationChange({ color: option })}
            >
              <span
                className="color-swatch"
                style={{ backgroundColor: option.hex }}
                aria-hidden="true"
              />
              <small>{option.label}</small>
            </button>
          ))}
        </div>
      </section>

      <section
        className={`status-banner ${
          submitState.kind === "success"
            ? "status-success"
            : submitState.kind === "error"
              ? "status-error"
              : ""
        }`}
      >
        <strong>Текущая конфигурация</strong>
        <p className="request-summary">{summary}</p>
        <p className="status-detail">{submitState.message}</p>
      </section>

      <section className="panel-group">
        <form className="request-form" onSubmit={onSubmit}>
          <div className="form-copy">
            <h3>Отправка заявки</h3>
            <p className="field-hint">
              Менеджер получит ваши контакты и собранную конфигурацию крыши.
            </p>
          </div>

          <div className="field-grid">
            <input
              type="text"
              placeholder="Имя"
              value={form.name}
              onChange={(event) => onFormChange("name", event.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Телефон"
              value={form.phone}
              onChange={(event) => onFormChange("phone", event.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email (опционально)"
              value={form.email}
              onChange={(event) => onFormChange("email", event.target.value)}
            />
          </div>

          <p className="request-summary">
            В заявку уйдёт: <strong>{summary}</strong>
          </p>

          <div className="form-actions">
            <button type="submit" className="button button-primary">
              Отправить заявку
            </button>
            <button
              type="button"
              className="button button-secondary"
              onClick={onReset}
            >
              Сбросить
            </button>
          </div>
        </form>
      </section>
    </aside>
  );
}
