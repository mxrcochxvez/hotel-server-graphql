// @ts-nocheck
import { sign, verify, SignOptions, VerifyOptions, JwtPayload } from 'jsonwebtoken';

const secretKey = process.env.SECRET;
if (!secretKey) throw new Error('SECRET env variable is required');

export const jwtService = {
	signUserId,
	verifyUser,
};

function signUserId(user: { id: string }, options?: SignOptions) {
	return sign(user, secretKey, { expiresIn: '1d', ...options });
}

function verifyUser(token: string, options?: VerifyOptions): JwtPayload | string | null {
	try {
		return verify(token, secretKey, options);
	} catch {
		return null;
	}
}
