import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { Agent, run } from '@openai/agents';

export async function httpTrigger1(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const agent = new Agent({
    name: 'History Tutor',
    instructions:
        'You provide assistance with historical queries. Explain important events and context clearly.',
    });

    const result = await run(agent, 'When did sharks first appear?');

    return { body: result.finalOutput };
};

app.http('httpTrigger1', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: httpTrigger1
});
