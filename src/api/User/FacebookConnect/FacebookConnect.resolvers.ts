import { Resolvers } from 'src/types/resolvers';
import { FacebookConnectMutationArgs, FacebookConnectResponse } from 'src/types/graph';
import User from 'src/eintities/User';

const resolvers: Resolvers = {
	Mutation: {
		FacebookConnect: async (_, args: FacebookConnectMutationArgs): Promise<FacebookConnectResponse> => {
			const { fbId } = args;
			try {
				const existingUser = await User.findOne({ fbId });
				if (existingUser) {
					return {
						ok: true,
						error: null,
						token: 'Coming soon'
					};
				}
			} catch (error) {
				return {
					ok: false,
					error: error.message,
					token: null
				};
			}
			try {
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
