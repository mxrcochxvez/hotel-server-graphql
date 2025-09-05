import { respond } from "../../utilities/graphql-response.js";
import { cardModel } from "./card.model.js";

export default {
	Query: {
		listCards() {
			return listCards();
		},

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

function listCards() {
	return respond(() => cardModel.listCards());
}

function listAvailableCards() {
	return respond(() => cardModel.listAvailableCards());
}

function bulkCreate() {
	return respond(() => cardModel.bulkCreate(10, 0));
}
