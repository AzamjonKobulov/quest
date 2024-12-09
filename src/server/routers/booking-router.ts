import { z } from "zod";
import { router } from "../__internals/router";
import { publicProcedure } from "../procedures";
import { db } from "@/db";

export const BookingRouter = router({
    checkAvailability: publicProcedure
    .input(
        z.object({
            date: z.string(),
            slot: z.string(),
            time: z.string(),
        })
    )
    .query(async ({ input, c }) => {
        try {
            const booking = await db.booking.findFirst({
                where: {
                    date: input.date,
                    slot: input.slot,
                    time: input.time,
                    status: {
                        in: ["confirmed", "pending"]
                    }
                }
            });

            return c.json({
                success: true,
                isAvailable: !booking,
                existingBooking: booking
            });
        } catch (error) {
            console.error('Error checking availability:', error);
            return c.json({
                success: false,
                isAvailable: false,
                error: 'Failed to check availability'
            });
        }
    }),

    create: publicProcedure.input(
        z.object({
            questName: z.string(),
            date: z.string(),
            time: z.string(),
            slot: z.string(),
            price: z.string(),
        })
    ).mutation(async ({ input }) => {
        // Check availability first
        const existingBooking = await db.booking.findFirst({
            where: {
                date: input.date,
                slot: input.slot,
                time: input.time,
                status: {
                    in: ["confirmed", "pending"]
                }
            }
        });

        if (existingBooking) {
            // If there's an existing booking, update it
            const updatedBooking = await db.booking.update({
                where: { id: existingBooking.id },
                data: {
                    ...input,
                    status: "confirmed"
                }
            });

            return {
                success: true,
                booking: updatedBooking
            };
        }

        // If no existing booking, create a new one
        const newBooking = await db.booking.create({
            data: {
                ...input,
                status: "confirmed"
            }
        });

        return {
            success: true,
            booking: newBooking
        };
    })
});
