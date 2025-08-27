import { response } from "../../utilities/graphql-response.js";
import { roomModel, type RoomType } from "./room.model.js";

export default {
	Query: {
		getRoom(_, args: { number: number }) {
			return findRoom(args.number);
		}
	},

	Mutation: {
		createRoom(_, args: { input: { number: number, type: RoomType } }) {
			const { number, type } = args?.input;

			return createRoom(number, type);
		},
	}
}

function findRoom(number: number) {
	return response(() => roomModel.find(number));
}

function createRoom(number: number, type: RoomType) {
	return response(() => roomModel.create({ number, type }));
}
