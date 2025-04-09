import Session from "../models/sessionModel";

export async function createSession(userId: string, userAgent: string) {
  return Session.create({ user: userId, userAgent });
}

export async function findSessions(query: any) {
  return Session.find(query).lean();
}

export async function updateSession(sessionId: string, update: any) {
  return Session.updateOne({ _id: sessionId }, update);
}
