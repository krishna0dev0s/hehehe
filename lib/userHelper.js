import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

/**
 * Get or create a user from Clerk authentication
 * Auto-creates user in database if they don't exist yet
 * Uses upsert to prevent unique constraint violations
 */
export async function getOrCreateUser() {
  const { userId, sessionClaims } = await auth();
  
  if (!userId) {
    throw new Error("Unauthorized: Please sign in");
  }

  // Use upsert to atomically get or create user
  // This prevents "Unique constraint failed" errors
  const user = await db.user.upsert({
    where: { clerkUserId: userId },
    update: {}, // Don't update existing users
    create: {
      clerkUserId: userId,
      email: sessionClaims?.email || "unknown@example.com",
      name: sessionClaims?.name || "User",
    },
  });

  return user;
}
