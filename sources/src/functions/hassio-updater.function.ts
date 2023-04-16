import {
    GetFunctionConfigurationCommand,
    LambdaClient,
    UpdateFunctionConfigurationCommand
} from "@aws-sdk/client-lambda";
import { LambdaFunction } from "..";
import { NgrokClient } from "../libraries/ngrok.library";

export class HassioUpdaterFunction extends LambdaFunction {
    public async handler(event: any, context: any, callback: any) {
        console.log('NgrokUpdaterFunction.handler()');
        const TARGET_FUNCTION_NAME = 'haaska';
        const ngrok = new NgrokClient();
        const tunnels = await ngrok.getTunnels();
        const hassioTunnel = tunnels.find(t => t.forwards_to.includes(':8123'));
        if (!hassioTunnel) throw new Error('No Hass.io tunnel found!');
        // : Are for a bug in haaska with .a ending domain (like ngrok .app) https://github.com/auchter/haaska/issues/120
        const newUrl = `${hassioTunnel.public_url}:`;
        console.log('[ngrokUpdater] Configuring Lambda Client');
        const lambdaClient = new LambdaClient({ region: process.env.AWS_REGION ?? 'eu-west-1' });
        console.log('[ngrokUpdater] Getting lambda configuration');
        const existingConfig = await lambdaClient.send(new GetFunctionConfigurationCommand({ FunctionName: TARGET_FUNCTION_NAME }));
        console.log('[ngrokUpdater] Updating lambda configuration');
        await lambdaClient.send(new UpdateFunctionConfigurationCommand({
            FunctionName: TARGET_FUNCTION_NAME,
            Environment: {
                ...existingConfig.Environment,
                Variables: {
                    ...existingConfig.Environment?.Variables,
                    HASSIO_URL: `${newUrl}/api`
                }
            }
        }));
        callback(null, {
            statusCode: 200,
            body: null
        });
    }
}
