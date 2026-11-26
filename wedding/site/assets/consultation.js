const consultation = document.querySelector("#consultation-form");
const submit = consultation.querySelector('button[type="submit"]');
const notice = document.querySelector("#consultation-status");
const startedAt = Date.now();
let requestId = crypto.randomUUID();

consultation.addEventListener("input", () => {
  requestId = crypto.randomUUID();
});

consultation.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (submit.disabled) return;
  const data = Object.fromEntries(new FormData(consultation));
  submit.disabled = true;
  notice.textContent = "Eure Anfrage wird gesendet …";

  try {
    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, kind: "wedding", requestId, startedAt }),
    });
    const result = await response.json();
    if (!response.ok || !result.ok) {
      notice.textContent = result.message || "Bitte prüft eure Angaben und versucht es noch einmal.";
      submit.disabled = false;
      return;
    }
    notice.textContent = "Danke für eure Anfrage! Ich melde mich per E-Mail bei euch, damit wir einen Termin finden. Viele Grüße, Kevin";
    consultation.hidden = true;
    notice.focus();
  } catch {
    notice.textContent = "Eure Anfrage konnte gerade nicht gesendet werden. Bitte versucht es noch einmal.";
    submit.disabled = false;
  }
});

submit.disabled = false;
