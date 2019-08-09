import { Resolvers } from 'src/types/resolvers';
import { GetMyProfileResponse } from 'src/types/graph';

const resolvers: Resolvers = {
	Mutation: {
		GetMyProfile: async (_, args, { req }): Promise<GetMyProfileResponse> => {
			const { user } = req;
			return {
				ok: true,
				error: null,
				user
			};
		}
	}
};
export default resolvers;
