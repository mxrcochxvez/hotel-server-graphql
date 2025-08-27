import { cardModel } from "./card.model.js";

export default {
	Query: {
		test() {
			return 'test';
		},

		getCard(args) {
			console.log(args);

			return cardModel.find('test');
		}
	}
}
