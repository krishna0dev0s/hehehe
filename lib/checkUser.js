import { getAuth } from "@clerk/nextjs/server";
import { db } from "./prisma";

// Returns the DB user record for the currently authenticated Clerk user.
// This function is defensive: if Clerk or the DB are not available it returns null
// and logs a helpful warning instead of throwing so server routes can fallback.
export const checkUser = async () => {
    try {
        const { userId } = getAuth();
        if (!userId) return null;

        // Try to find or create a user in our DB. If the DB is not configured or
        // the Prisma client fails, we catch and return null so callers can continue
        // with a non-persisted flow (e.g., guest behavior or mock data).
        try {
            // Use upsert to handle both create and update cases atomically
            // This prevents unique constraint violations
            const user = await db.user.upsert({
                where: { clerkUserId: userId },
                update: {}, // Don't update existing users
                create: {
                    clerkUserId: userId,
                    email: `${userId}@clerk.local`,
                    name: null,
                },
            });
            return user;
        } catch (dbErr) {
            console.warn("checkUser: database unavailable or query failed:", dbErr?.message ?? dbErr);
            return null;
        }
    } catch (err) {
        console.warn("checkUser: Clerk getAuth failed or running in a non-server context:", err?.message ?? err);
        return null;
    }
};