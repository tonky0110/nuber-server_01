import { CompletePhoneVerificationMutationArgs, CompletePhoneVerificationResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import Verification from 'src/entities/Verification';
import User from 'src/entities/User';

const resolvers: Resolvers = {
	Mutation: {
		CompletePhoneVerification: async (
			_,
			args: CompletePhoneVerificationMutationArgs
		): Promise<CompletePhoneVerificationResponse> => {
			const { phoneNumber, key } = args;
			try {
				const verification = await Verification.findOne({ payload: phoneNumber, key });
				if (!verification) {
					return {
						ok: false,
						error: 'Verification key not valid',
						token: null
					};
				} else {
					verification.verified = true;
					verification.save();
				}
			} catch (error) {
				return {
					ok: false,
					error: error.message,
					token: null
				};
			}

			try {
				const user = await User.findOne({ phoneNumber });
				if (user) {
					user.verifiedPhonenNumber = true;
					user.save();
					return {
						ok: true,
						error: null,
						token: 'Coming soon'
					};
				} else {
					return {
						ok: false,
						error: null,
						token: null
					};
				}
			} catch (error) {
				return {
					ok: false,
					error: error.message,
					token: null
				};
			}
		}
	}
};

export default resolvers;
