import { foundingMetrics } from "@/content/site";

export function ImpactDashboard() {
  return (
    <div className="impact-dashboard" aria-label="Indicadores de impacto">
      <div className="impact-dashboard__notice">
        <span className="status-dot" aria-hidden="true" />
        <p>
          <strong>Etapa fundacional.</strong> Todavía no contabilizamos impacto
          institucional. Publicamos el punto de partida para no confundir
          aspiraciones con resultados.
        </p>
      </div>
      <div className="metrics-grid">
        {foundingMetrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <p className="metric-card__value">
              {metric.value}
              <span> / {metric.target}</span>
            </p>
            <h3>{metric.label}</h3>
            <p>{metric.detail}</p>
            <div
              className="progress"
              role="progressbar"
              aria-label={`Avance de ${metric.label}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={metric.progress}
            >
              <span style={{ width: `${metric.progress}%` }} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
