import { S3Client } from '@aws-sdk/client-s3';

export const createR2Client = (env: {
	R2_ACCOUNT_ID?: string;
	R2_ACCESS_KEY_ID?: string;
	R2_SECRET_ACCESS_KEY?: string;
}) => {
	const accountId = env.R2_ACCOUNT_ID || process.env.R2_ACCOUNT_ID || '';
	const accessKeyId = env.R2_ACCESS_KEY_ID || process.env.R2_ACCESS_KEY_ID || '';
	const secretAccessKey = env.R2_SECRET_ACCESS_KEY || process.env.R2_SECRET_ACCESS_KEY || '';

	return new S3Client({
		region: 'auto',
		endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
		credentials: {
			accessKeyId,
			secretAccessKey
		}
	});
};
