import { respond } from "../../utilities/graphql-response.js";
import { cardModel } from "./card.model.js";

export default {
	Query: {
		listAvailableCards() {
			return listAvailableCards();
		}
	},

	Mutation: {
		bulkCreate() {
			return bulkCreate();
		},
	},
}

function listAvailableCards() {
	return respond(() => cardModel.listAvailableCards());
}

function bulkCreate() {
	return respond(() => cardModel.bulkCreate(10, 0));
}
