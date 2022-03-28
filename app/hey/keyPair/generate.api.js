import { generateKeyPairSync } from 'crypto';


export const method = 'get';
export const handle = () => {
	const { publicKey, privateKey } = generateKeyPairSync('rsa', {
		modulusLength: 2048,
		publicKeyEncoding: {
			type: 'spki',
			format: 'der'
		},
		privateKeyEncoding: {
			type: 'pkcs8',
			format: 'der',
		}
	});

	return {
		publicKey: publicKey.toString('base64'),
		privateKey: privateKey.toString('base64'),
	};
};