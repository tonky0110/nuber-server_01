import Verification from '../../../entities/Verification';
import { StartPhoneVerificationMutationArgs, StartPhoneVerificationResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import { async } from 'q';

const resolvers: Resolvers = {
	Mutation: {
		StartPhoneVerification: async (
			_,
			args: StartPhoneVerificationMutationArgs
		): Promise<StartPhoneVerificationResponse> => {
			try {
				const { phoneNumber } = args;
				const existingVerification = await Verification.findOne({ payload: phoneNumber });
				if (existingVerification) {
					existingVerification.remove();
				}
			} catch (error) {
				return {
					ok: false,
					error: error.message
				};
			}
		}
	}
};

export default resolvers;
