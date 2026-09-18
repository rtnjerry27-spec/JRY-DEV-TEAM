import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { createToolPreset, deleteToolPreset, listToolPresets } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  presets: router({
    list: protectedProcedure.query(({ ctx }) => listToolPresets(ctx.user.id)),
    create: protectedProcedure.input(z.object({
      name: z.string().trim().min(1).max(120),
      tool: z.string().trim().min(1).max(80),
      payload: z.string().trim().min(1).max(12000),
    })).mutation(({ ctx, input }) => createToolPreset({ userId: ctx.user.id, ...input })),
    delete: protectedProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ ctx, input }) => deleteToolPreset(ctx.user.id, input.id)),
  }),
});

export type AppRouter = typeof appRouter;
