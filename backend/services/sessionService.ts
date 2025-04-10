import Session from "../models/sessionModel";

export async function createSession(userId: string, userAgent: string) {
    const session=await Session.create({user:userId,userAgent});
  return session.toJSON();
}

export async function findSessions(query: any) {
  return Session.find(query).lean();
}

export async function updateSession(sessionId: string, update: any) {
  return Session.updateOne({ _id: sessionId }, update);
}
