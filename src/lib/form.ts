export type FormValues = { name: string; email: string; message: string };
export type FieldError = 'nameRequired' | 'emailRequired' | 'emailInvalid' | 'messageShort';
export type FormErrors = Partial<Record<keyof FormValues, FieldError>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(v: FormValues): FormErrors {
  const e: FormErrors = {};
  if (v.name.trim().length < 2) e.name = 'nameRequired';
  if (!v.email.trim()) e.email = 'emailRequired';
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'emailInvalid';
  if (v.message.trim().length < 10) e.message = 'messageShort';
  return e;
}

export type SubmitResult = 'success' | 'error' | 'fallback';

/**
 * Envía a VITE_FORM_ENDPOINT (Formspree u otro endpoint JSON).
 * Sin endpoint configurado, abre el cliente de correo con el mensaje prellenado.
 */
export async function submitForm(
  v: FormValues,
  opts: { to: string; subject: string },
): Promise<SubmitResult> {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
  const payload = {
    name: v.name.trim(),
    email: v.email.trim(),
    message: v.message.trim(),
    _subject: `${opts.subject} — ${v.name.trim()}`,
  };

  if (!endpoint) {
    const body = `${payload.message}\n\n— ${payload.name} (${payload.email})`;
    window.location.href = `mailto:${opts.to}?subject=${encodeURIComponent(payload._subject)}&body=${encodeURIComponent(body)}`;
    return 'fallback';
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok ? 'success' : 'error';
  } catch {
    return 'error';
  }
}
