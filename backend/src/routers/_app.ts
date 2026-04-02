import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { prisma } from '../index';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TRPCError } from '@trpc/server';

const JWT_SECRET = 'superlogica-super-secret-key-123';

export const appRouter = router({
  // ROTAS DE AUTENTICAÇÃO REAIS
  register: publicProcedure
    .input(z.object({ name: z.string(), email: z.string().email(), password: z.string().min(6) }))
    .mutation(async ({ input }) => {
      const existingUser = await prisma.user.findUnique({ where: { email: input.email } });
      if (existingUser) {
        throw new TRPCError({ code: 'CONFLICT', message: 'Este e-mail já está em uso.' });
      }
      
      const hashedPassword = await bcrypt.hash(input.password, 10);
      const user = await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
        }
      });
      
      const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
      return { token, user: { id: user.id, name: user.name, email: user.email } };
    }),

  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ input }) => {
      const user = await prisma.user.findUnique({ where: { email: input.email } });
      if (!user) {
         throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Credenciais inválidas.' });
      }

      const isValidPassword = await bcrypt.compare(input.password, user.password);
      if (!isValidPassword) {
         throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Credenciais inválidas.' });
      }

      const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
      return { token, user: { id: user.id, name: user.name, email: user.email } };
    }),

  createQualification: protectedProcedure
    .input(z.object({
      companyName: z.string(),
      maturidadeScore: z.number(),
      riscoTecnologiaScore: z.number(),
      posicionamentoComercialScore: z.number(),
      escalabilidadeOperacionalScore: z.number(),
      perfilDonoScore: z.number(),
      estrategiacrescimentoScore: z.number(),
      totalGreenSignals: z.number(),
      totalRedSignals: z.number(),
      profile: z.string(),
      notes: z.string().optional()
    }))
    .mutation(async ({ ctx, input }) => {
      const qualification = await prisma.qualification.create({
        data: {
          ...input,
          userId: ctx.user.id,
        }
      });
      return qualification;
    }),

  myQualifications: protectedProcedure
    .query(async ({ ctx }) => {
      return prisma.qualification.findMany({
        where: { userId: ctx.user.id },
        orderBy: { createdAt: 'desc' }
      });
    }),

  dashboardStats: protectedProcedure
    .query(async () => {
      const all = await prisma.qualification.findMany({
        include: { user: true }
      });
      
      const total = all.length;
      const acelerados = all.filter(q => q.profile === 'acelerado').length;
      const naoAderentes = total - acelerados;
      
      // Calculate true ranking
      const counts: Record<string, number> = {};
      all.forEach(q => {
         const name = q.user.name;
         counts[name] = (counts[name] || 0) + 1;
      });
      
      const ranking = Object.entries(counts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);

      return {
        total,
        acelerados,
        naoAderentes,
        ranking
      };
    })
});

export type AppRouter = typeof appRouter;
