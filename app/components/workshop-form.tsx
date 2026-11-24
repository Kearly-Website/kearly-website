"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Arrow, Spark } from "./atelier-art";
import { occasions, WORKSHOP_MAX_PARTICIPANTS } from "../workshop-config";
import { berlinToday, inquirySchema } from "../inquiry-validation";
import { getLegalLinks } from "../legal-links";

type Errors = Record<string, string>;
export function PrivateWorkshopForm({
  occasion,
  setOccasion,
}: {
  occasion: string;
  setOccasion: (value: string) => void;
}) {
  const [review, setReview] = useState({
    participants: "",
    desiredDate: "",
    alternativeDate: "",
  });
  const legalLinks = getLegalLinks();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [serverError, setServerError] = useState("");
  const [reference, setReference] = useState("");
  const startedAt = useRef(0);
  const requestId = useRef<string | null>(null);
  const success = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  useEffect(() => {
    if (status === "success") {
      success.current?.focus({ preventScroll: true });
      success.current?.scrollIntoView({ block: "center", behavior: "instant" });
    }
  }, [status]);
  function clearError(name: string) {
    setErrors((previous) => {
      if (!previous[name]) return previous;
      const next = { ...previous };
      delete next[name];
      return next;
    });
  }
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = inquirySchema.safeParse(data);
    if (!parsed.success) {
      const next = Object.fromEntries(
        parsed.error.issues.map((issue) => [
          String(issue.path[0]),
          issue.message,
        ]),
      );
      setErrors(next);
      const first = String(parsed.error.issues[0].path[0]);
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    setServerError("");
    requestId.current ??= crypto.randomUUID();
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          website: data.website,
          startedAt: startedAt.current,
          requestId: requestId.current,
        }),
        signal: AbortSignal.timeout(20000),
      });
      const result = (await response.json().catch(() => ({
        ok: false,
        message:
          "Deine Anfrage konnte gerade nicht gesendet werden. Bitte versuche es erneut.",
      }))) as {
        ok?: boolean;
        reference?: string;
        message?: string;
        errors?: Errors;
      };
      if (!response.ok || !result.ok) {
        if (result.errors) setErrors(result.errors);
        const responseError = new Error(
          result.message ||
            "Deine Anfrage konnte gerade nicht gesendet werden. Bitte versuche es erneut.",
        );
        responseError.name = "InquiryResponseError";
        throw responseError;
      }
      setReference(result.reference || "");
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setServerError(
        error instanceof TypeError
          ? "Die Verbindung konnte nicht hergestellt werden. Bitte versuche es noch einmal. Deine Angaben bleiben erhalten."
          : error instanceof Error && error.name === "InquiryResponseError"
            ? error.message
            : "Die Verbindung hat zu lange gedauert. Bitte versuche es noch einmal. Deine Angaben bleiben erhalten.",
      );
    }
  }
  const errorFor = (name: string) =>
    errors[name] ? (
      <span className="field-error" id={`${name}-error`}>
        {errors[name]}
      </span>
    ) : null;
  const attrs = (name: string) => ({
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    onChange: () => clearError(name),
  });
  if (status === "success")
    return (
      <div ref={success} className="form-success" role="status" tabIndex={-1}>
        <Spark />
        <p className="eyebrow">DEINE ANFRAGE IST ANGEKOMMEN</p>
        <h3>Danke für deine Anfrage.</h3>
        <p>
          Wir prüfen euren Wunschtermin und melden uns bei dir, um die Details
          abzustimmen.
        </p>
        <p className="muted">
          Die Anfrage ist noch keine verbindliche Buchung.
        </p>
        <small>Deine Referenz: {reference}</small>
        <details className="inquiry-notice" id="anfrage-hinweise">
          <summary>Hinweise zur Anfrage</summary>
          <p>
            Deine Angaben werden zur Bearbeitung deiner Gruppenanfrage
            gespeichert. Zusätzliche Angaben sind freiwillig. Deine Anfrage löst
            keine Zahlung aus.
          </p>
        </details>
      </div>
    );
  return (
    <form
      ref={form}
      className="inquiry-form"
      onSubmit={submit}
      noValidate
      onInput={(e) => {
        const { name, value } = e.target as HTMLInputElement;
        if (name) clearError(name);
        if (
          name === "participants" ||
          name === "desiredDate" ||
          name === "alternativeDate"
        )
          setReview((previous) => ({ ...previous, [name]: value }));
      }}
      aria-label="Private Gruppe anfragen"
    >
      <p className="form-required">
        Mit * markierte Felder brauchen wir für deine Anfrage.
      </p>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="occasion">Anlass *</label>
          <select
            id="occasion"
            name="occasion"
            required
            value={occasion}
            {...attrs("occasion")}
            onChange={(e) => {
              setOccasion(e.target.value);
              clearError("occasion");
            }}
          >
            <option value="">Bitte auswählen</option>
            {occasions.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
          {errorFor("occasion")}
        </div>
        <div className="field">
          <label htmlFor="participants">Teilnehmerzahl *</label>
          <input
            id="participants"
            name="participants"
            type="number"
            inputMode="numeric"
            min="1"
            max={WORKSHOP_MAX_PARTICIPANTS}
            step="1"
            required
            placeholder="Eure gewünschte Anzahl"
            {...attrs("participants")}
          />
          {errorFor("participants")}
        </div>
        <div className="field">
          <label htmlFor="desiredDate">Wunschdatum *</label>
          <input
            id="desiredDate"
            name="desiredDate"
            type="date"
            min={berlinToday()}
            required
            {...attrs("desiredDate")}
            lang="de-DE"
            aria-describedby={
              errors.desiredDate
                ? "desiredDate-format desiredDate-error"
                : "desiredDate-format"
            }
          />
          <span className="date-hint" id="desiredDate-format">
            Bitte wähle Tag, Monat und Jahr.
            {review.desiredDate
              ? ` Ausgewählt: ${review.desiredDate.split("-").reverse().join(".")}`
              : ""}
          </span>
          {errorFor("desiredDate")}
        </div>
        <div className="field">
          <label htmlFor="alternativeDate">
            Alternativdatum <span>optional</span>
          </label>
          <input
            id="alternativeDate"
            name="alternativeDate"
            type="date"
            min={berlinToday()}
            {...attrs("alternativeDate")}
            lang="de-DE"
            aria-describedby={
              errors.alternativeDate
                ? "alternativeDate-format alternativeDate-error"
                : "alternativeDate-format"
            }
          />
          <span className="date-hint" id="alternativeDate-format">
            Bitte wähle Tag, Monat und Jahr.
            {review.alternativeDate
              ? ` Ausgewählt: ${review.alternativeDate.split("-").reverse().join(".")}`
              : ""}
          </span>
          {errorFor("alternativeDate")}
        </div>
        <div className="field">
          <label htmlFor="name">Dein Name *</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            maxLength={150}
            placeholder="Vor- und Nachname"
            {...attrs("name")}
          />
          {errorFor("name")}
        </div>
        <div className="field">
          <label htmlFor="email">E-Mail *</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="name@beispiel.de"
            {...attrs("email")}
          />
          {errorFor("email")}
        </div>
      </div>
      <div className="form-grid form-additional">
        <div className="field full-width">
          <label htmlFor="phone">
            Telefon <span>optional</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={80}
            {...attrs("phone")}
          />
          {errorFor("phone")}
        </div>
        <div className="field full-width">
          <label htmlFor="message">
            Nachricht <span>optional</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            maxLength={3000}
            placeholder="Was sollten wir über eure Gruppe wissen?"
            {...attrs("message")}
          />
          {errorFor("message")}
        </div>
      </div>
      {occasion || review.participants || review.desiredDate ? (
        <div
          className="request-review"
          role="region"
          aria-label="Deine Anfrage auf einen Blick"
        >
          <p className="eyebrow">DEINE ANFRAGE AUF EINEN BLICK</p>
          <dl>
            {occasion ? (
              <div>
                <dt>Eure Runde</dt>
                <dd>{occasion}</dd>
              </div>
            ) : null}
            {review.participants ? (
              <div>
                <dt>Gewünschte Anzahl</dt>
                <dd>{review.participants} Personen</dd>
              </div>
            ) : null}
            {review.desiredDate ? (
              <div>
                <dt>Wunschdatum</dt>
                <dd>{review.desiredDate.split("-").reverse().join(".")}</dd>
              </div>
            ) : null}
          </dl>
          <p>Wir prüfen deinen Wunschtermin nach Eingang deiner Anfrage.</p>
        </div>
      ) : null}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
        />
      </div>
      <p className="form-hint">
        {legalLinks.privacy ? (
          <>
            {
              "Deine Angaben verwenden wir ausschließlich zur Bearbeitung deiner Anfrage. "
            }
            Hinweise zur Verarbeitung deiner Daten findest du in unserer{" "}
            <a href={legalLinks.privacy}>Datenschutzerklärung</a>.
          </>
        ) : (
          <>
            Deine Angaben werden zur Bearbeitung deiner Anfrage gespeichert.{" "}
            <a href="#anfrage-hinweise">Hinweise zur Anfrage</a>
          </>
        )}
      </p>
      {status === "error" ? (
        <p role="alert" className="form-error">
          {serverError}
        </p>
      ) : null}
      <button className="button" type="submit" disabled={status === "sending"}>
        {status === "sending"
          ? "Anfrage wird gesendet …"
          : "Private Gruppe anfragen"}
        <Arrow />
      </button>
      <noscript>
        <p>Bitte aktiviere JavaScript, um das Anfrageformular zu verwenden.</p>
      </noscript>
      <details className="inquiry-notice" id="anfrage-hinweise">
        <summary>Hinweise zur Anfrage</summary>
        <p>
          Wir speichern Anlass, Wunschdatum, Teilnehmerzahl, Name und E-Mail, um
          deine Gruppenanfrage zu bearbeiten und dir zu antworten. Zusätzliche
          Angaben sind freiwillig. Bitte trage keine sensiblen Informationen
          ein. Die Anfrage ist keine Buchung und löst keine Zahlung aus.
        </p>
      </details>
    </form>
  );
}
