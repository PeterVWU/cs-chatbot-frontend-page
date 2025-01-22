interface Env {
  CS_BACKEND_WORKER: any;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { message, conversationId }: any = await context.request.json();

  const response = await context.env.CS_BACKEND_WORKER.processMessage(message, conversationId);
  return new Response(JSON.stringify(response), { headers: { 'Content-Type': 'application/json' } })
};