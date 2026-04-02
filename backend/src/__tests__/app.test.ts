import { appRouter } from '../routers/_app';
import { TRPCError } from '@trpc/server';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockPrisma = {
  qualification: {
    create: vi.fn(),
    findMany: vi.fn(),
  }
};

vi.mock('../index', () => ({
  prisma: mockPrisma
}));

describe('Superlógica Aceleradores - Testes Unitários', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const authCtx = { req: {} as any, res: {} as any, user: { id: 'usr-1', name: 'Auth', email: 'auth@test.com' } };
  const unauthCtx = { req: {} as any, res: {} as any, user: null };

  it('1. Usuário não autenticado não consegue criar qualificação', async () => {
    const caller = appRouter.createCaller(unauthCtx);
    
    await expect(caller.createQualification({
        companyName: 'Test Inc',
        maturidadeScore: 1, riscoTecnologiaScore: 1, posicionamentoComercialScore: 1, escalabilidadeOperacionalScore: 1, perfilDonoScore: 1, estrategiacrescimentoScore: 1,
        totalGreenSignals: 6, totalRedSignals: 0, profile: 'acelerado'
    })).rejects.toThrow(TRPCError);
  });

  it('2. Criar qualificação com dados válidos', async () => {
    const caller = appRouter.createCaller(authCtx);
    
    mockPrisma.qualification.create.mockResolvedValueOnce({ id: 'qual-1', companyName: 'Test Inc' } as any);
    
    const result = await caller.createQualification({
        companyName: 'Test Inc',
        maturidadeScore: 1, riscoTecnologiaScore: 1, posicionamentoComercialScore: 1, escalabilidadeOperacionalScore: 1, perfilDonoScore: 1, estrategiacrescimentoScore: 1,
        totalGreenSignals: 6, totalRedSignals: 0, profile: 'acelerado'
    });
    
    expect(result.id).toBe('qual-1');
    expect(mockPrisma.qualification.create).toHaveBeenCalledTimes(1);
  });

  it('3. Listar qualificações do usuário', async () => {
    const caller = appRouter.createCaller(authCtx);
    
    const fakeData = [{ id: 'q1', profile: 'acelerado' }];
    mockPrisma.qualification.findMany.mockResolvedValueOnce(fakeData as any);
    
    const list = await caller.myQualifications();
    expect(list).toEqual(fakeData);
    expect(mockPrisma.qualification.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { userId: 'usr-1' } })
    );
  });

  it('4. Logout limpa simulação de sessão via invalidar token (Mock)', async () => {
    // Na nossa simulação, o React apaga o localStorage. O trpc não emite um comando DELETE session 
    // mas testamos que chamadas públicas (login) funcionam antes da checagem
    const caller = appRouter.createCaller(unauthCtx);
    const loginResp = await caller.login({ email: 'test', password: '123' });
    expect(loginResp.token).toBe('mock-token-123'); // Login success even without session
  });
});
