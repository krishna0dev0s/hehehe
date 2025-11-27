import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const db = globalForPrisma.prisma || new PrismaClient({
  log: ['warn', 'error'],
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

// Helper function to safely create or get user with duplicate email handling
export async function getOrCreateUserFromClerk(userId, sessionClaims) {
  let user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    try {
      user = await db.user.create({
        data: {
          clerkUserId: userId,
          email: sessionClaims?.email || `${userId}@clerk.local`,
          name: sessionClaims?.name || "User",
        },
      });
    } catch (err) {
      if (err.code === 'P2002' && err.meta?.target?.includes('email')) {
        user = await db.user.findUnique({
          where: { clerkUserId: userId },
        });
        if (!user) throw err;
      } else {
        throw err;
      }
    }
  }
  return user;
}