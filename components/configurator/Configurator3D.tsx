"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { ControlPanel } from "@/components/configurator/ControlPanel";
import { RoofScene } from "@/components/configurator/RoofScene";
import {
  DEFAULT_CONFIGURATION,
  DEFAULT_REQUEST_FORM,
  MATERIAL_OPTIONS,
  ROOF_SHAPE_OPTIONS,
} from "@/data/configurator";
import type { RequestFormState, RoofConfiguration } from "@/lib/types";
import {
  buildConfigurationSearch,
  normalizeConfiguration,
  readConfigurationFromSearch,
} from "@/lib/utils/configuration";

const STORAGE_KEY = "roof-configurator-state:v1";

type SubmitState =
  | { kind: "idle"; message: string }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export function Configurator3D() {
  const [configuration, setConfiguration] =
    useState<RoofConfiguration>(DEFAULT_CONFIGURATION);
  const [form, setForm] = useState<RequestFormState>(DEFAULT_REQUEST_FORM);
  const [submitState, setSubmitState] = useState<SubmitState>({
    kind: "idle",
    message:
      "Конфигурация сохраняется в ссылке и браузере автоматически. Можно вернуться позже без потери выбора.",
  });
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? window.localStorage.getItem(STORAGE_KEY)
        : null;

    const parsedSaved = saved ? normalizeConfiguration(JSON.parse(saved)) : null;
    const searchConfig = readConfigurationFromSearch(
      typeof window !== "undefined" ? window.location.search : "",
    );
    const initialConfiguration = searchConfig ?? parsedSaved ?? DEFAULT_CONFIGURATION;

    setConfiguration(initialConfiguration);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const search = buildConfigurationSearch(configuration);
    const nextUrl = search ? `${window.location.pathname}?${search}` : window.location.pathname;
    window.history.replaceState(null, "", nextUrl);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(configuration));
  }, [configuration]);

  const summary = useMemo(() => {
    const roof = ROOF_SHAPE_OPTIONS.find(
      (option) => option.value === configuration.roofShape,
    )?.label;
    const material = MATERIAL_OPTIONS.find(
      (option) => option.value === configuration.materialType,
    )?.label;

    return `${roof}, ${material}, цвет ${configuration.color.label.toLowerCase()}`;
  }, [configuration]);

  function handleConfigurationChange(patch: Partial<RoofConfiguration>) {
    startTransition(() => {
      setConfiguration((current) => normalizeConfiguration({ ...current, ...patch }));
    });
  }

  function handleFormChange<K extends keyof RequestFormState>(
    field: K,
    value: RequestFormState[K],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitState({
      kind: "idle",
      message: "Отправляем заявку менеджеру...",
    });

    const payload = {
      ...form,
      configuration,
      createdAt: new Date().toISOString(),
    };

    const response = await fetch("/api/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = (await response.json()) as {
      ok: boolean;
      message?: string;
      error?: string;
    };

    if (!response.ok || !result.ok) {
      setSubmitState({
        kind: "error",
        message: result.error ?? "Не удалось отправить заявку.",
      });
      return;
    }

    setSubmitState({
      kind: "success",
      message: `${result.message ?? "Заявка отправлена."} Конфигурация: ${summary}.`,
    });
    setForm(DEFAULT_REQUEST_FORM);
  }

  return (
    <section className="configurator-layout" aria-label="3D-конфигуратор крыши">
      <div className="viewer-shell">
        <div className="configurator-heading">
          <p className="eyebrow">Онлайн-конфигуратор</p>
          <h2 suppressHydrationWarning>
            Подберите крышу и сохраните выбор в одной ссылке.
          </h2>
          <p>
            Вращайте модель, меняйте форму, материал и цвет покрытия. После
            настройки отправьте заявку, и менеджер получит уже готовую
            конфигурацию.
          </p>
        </div>
        <RoofScene configuration={configuration} isPending={isPending} />
        <div className="scene-tips">
          <strong>Управление сценой</strong>
          ЛКМ: вращение, колесо: масштаб, ПКМ или два пальца: смещение.
        </div>
      </div>

      <ControlPanel
        configuration={configuration}
        form={form}
        summary={summary}
        submitState={submitState}
        onConfigurationChange={handleConfigurationChange}
        onFormChange={handleFormChange}
        onSubmit={handleSubmit}
        onReset={() => {
          setConfiguration(DEFAULT_CONFIGURATION);
          setForm(DEFAULT_REQUEST_FORM);
          setSubmitState({
            kind: "idle",
            message: "Настройки сброшены к значениям по умолчанию.",
          });
        }}
      />
    </section>
  );
}
