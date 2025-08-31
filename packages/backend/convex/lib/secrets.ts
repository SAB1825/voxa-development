import {
    CreateSecretCommand,
    GetSecretValueCommand,
    type GetSecretValueCommandOutput,
    PutSecretValueCommand,
    ResourceExistsException,
    SecretsManagerClient
} from "@aws-sdk/client-secrets-manager"

export function createSecretsManagerClient(): SecretsManagerClient {
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!region) {
        throw new Error("AWS_REGION environment variable is required");
    }
    if (!accessKeyId) {
        throw new Error("AWS_ACCESS_KEY_ID environment variable is required");
    }
    if (!secretAccessKey) {
        throw new Error("AWS_SECRET_ACCESS_KEY environment variable is required");
    }

    return new SecretsManagerClient({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey
        },
        maxAttempts: 3,
        retryMode: "adaptive"
    });
}

export async function getSecretValue(
    secretName: string,
): Promise<GetSecretValueCommandOutput> {
    const client = createSecretsManagerClient();
    
    try {
        return await client.send(new GetSecretValueCommand({ 
            SecretId: secretName 
        }));
    } catch (error) {
        console.error(`Failed to get secret ${secretName}:`, error);
        throw error;
    }
}

export async function upsertSecret(
    secretName: string,
    secretValue: Record<string, unknown>,
): Promise<void> {
    const client = createSecretsManagerClient();
    
    try {
        await client.send(new CreateSecretCommand({
            Name: secretName,
            SecretString: JSON.stringify(secretValue),
            Description: `Secret created/updated at ${new Date().toISOString()}`
        }));
    } catch (error) {
        if (error instanceof ResourceExistsException) {
            try {
                await client.send(new PutSecretValueCommand({
                    SecretId: secretName,
                    SecretString: JSON.stringify(secretValue)
                }));
            } catch (updateError) {
                console.error(`Failed to update existing secret ${secretName}:`, updateError);
                throw updateError;
            }
        } else {
            console.error(`Failed to create secret ${secretName}:`, error);
            throw error;
        }
    }
}

export function parseSecretString<T = Record<string, unknown>>(
    secret: GetSecretValueCommandOutput
): T | null {
    try {
        const secretString = secret.SecretString;
        if (!secretString) {
            console.warn("Secret string is empty or undefined");
            return null;
        }
        return JSON.parse(secretString) as T;
    } catch (error) {
        console.error("Error parsing secret string:", error);
        return null;
    }
}

