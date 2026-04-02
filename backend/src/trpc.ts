import { initTRPC, TRPCError } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'superlogica-super-secret-key-123';

// Context setup for Real Authentication
export const createContext = ({ req, res }: CreateExpressContextOptions) => {
  const authHeader = req.headers.authorization;
  let user = null;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string; name: string; email: string };
      user = decoded;
    } catch (e) {
      console.log("Token inválido recebido.");
    }
  }
  return { req, res, user };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

// Protected procedure that checks if a user is valid
export const protectedProcedure = t.procedure.use((opts) => {
  if (!opts.ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Sessão expirada. Faça login novamente.' });
  }
  return opts.next({
    ctx: {
      user: opts.ctx.user,
    },
  });
});
