import type { APIRoute } from 'astro';
import { jsonResponse } from '../../../lib/http';
import { creatorApplicationCreateBodySchema } from '../../../models/creator-application.model';

export const prerender = false;

/** Proxies creator application submissions to sloWorkApi. */
export const POST: APIRoute = async ({ request }) => {
  try {
    const raw: unknown = await request.json().catch(() => ({}));
    const parsed = creatorApplicationCreateBodySchema.safeParse(raw);

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? 'Invalid data';
      return jsonResponse({ success: false, message }, { status: 400 });
    }

    const baseUrl = import.meta.env.SLOWORK_API_URL || process.env.SLOWORK_API_URL;
    if (!baseUrl) {
      return jsonResponse(
        { success: false, message: 'SLOWORK_API_URL is not configured' },
        { status: 500 },
      );
    }

    const targetUrl = `${baseUrl.replace(/\/+$/, '')}/api/creator-applications`;

    const upstreamRes = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    }).catch(() => null);

    if (upstreamRes === null) {
      return jsonResponse(
        { success: false, message: 'Could not connect to the API' },
        { status: 502 },
      );
    }

    if (upstreamRes.status === 409) {
      const body = (await upstreamRes.json().catch(() => ({}))) as { message?: string };
      return jsonResponse(
        {
          success: false,
          message: body.message ?? 'This email is already registered',
        },
        { status: 409 },
      );
    }

    if (!upstreamRes.ok) {
      const fallbackMessage = 'Error submitting creator application';
      const contentType = upstreamRes.headers.get('content-type') ?? '';
      const errorDetail = await upstreamRes.text().catch(() => '');

      const message = (() => {
        if (!contentType.includes('application/json')) return fallbackMessage;
        try {
          const d: unknown = JSON.parse(errorDetail);
          return d !== null &&
            typeof d === 'object' &&
            'message' in d &&
            typeof (d as { message?: unknown }).message === 'string'
            ? (d as { message: string }).message
            : fallbackMessage;
        } catch {
          return fallbackMessage;
        }
      })();

      return jsonResponse({ success: false, message }, { status: upstreamRes.status });
    }

    return jsonResponse({ success: true }, { status: 201 });
  } catch (err) {
    console.error('[API Creator Application Error]:', err);
    const message = err instanceof Error ? err.message : 'Internal error';
    return jsonResponse({ success: false, message }, { status: 500 });
  }
};
