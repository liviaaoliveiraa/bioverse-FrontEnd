import { chamarApi } from '../../../lib/api.js';

export async function POST(request) {
  let corpo;
  try {
    corpo = await request.json();
  } catch {
    return Response.json({ erro: 'O corpo da requisição deve ser um JSON válido.' }, { status: 400 });
  }

  const { simuladoId, acertos, total_questoes, percentual } = corpo ?? {};
  const camposValidos = Number.isInteger(simuladoId)
    && simuladoId > 0
    && Number.isInteger(total_questoes)
    && total_questoes > 0
    && Number.isInteger(acertos)
    && acertos >= 0
    && acertos <= total_questoes
    && Number.isFinite(percentual)
    && percentual === Math.round((acertos / total_questoes) * 100);

  if (!camposValidos) {
    return Response.json({ erro: 'Os dados do resultado do simulado são inválidos.' }, { status: 400 });
  }

  const resultado = await chamarApi('/respostas-simulados', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ simuladoId, acertos, total_questoes, percentual }),
  });

  return Response.json(resultado, { status: 201 });
}
