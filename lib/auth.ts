import { cookies } from 'next/headers';
import { Lucia } from 'lucia';
import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';
import db from './db';

const adapter = new BetterSqlite3Adapter(db, {
  user: 'users',
  session: 'sessions',
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NOD_ENV === 'production',
    },
  },
});

export async function createAuthSession(userId: string) {
  // Creates an authentication session for a given user ID.
  const session = await lucia.createSession(userId, {});
  // Creates a session cookie based on the session ID.
  const sessionCookie = lucia.createSessionCookie(session.id);
  // Sets the session cookie in the browser.
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}

export async function verifyAuth() {
  // Verifies the authentication status of the user.
  const sessionCookie = cookies().get(lucia.sessionCookieName);
  // If no session cookie is found, returns null user and session.
  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }
  const sessionId = sessionCookie.value;
  // If session ID is not found, returns null user and session.
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }
  // Validates the session ID.
  const result = await lucia.validateSession(sessionId);
  try {
    // If the session is fresh, updates the session cookie.
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    // If no session is found, creates a blank session cookie.
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {}

  return result;
}

export async function destroySession() {
  const { session } = await verifyAuth();

  if (!session) {
    return {
      error: 'Unauthorized!',
    };
  }
  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}
