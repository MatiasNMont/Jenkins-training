"use strict";

const DbMixin = require("../mixins/db.mixin");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "users",
	// version: 1

	/**
	 * Mixins
	 */
	mixins: [DbMixin("users")],

	/**
	 * Settings
	 */
	settings: {
		// Available fields in the responses
		fields: [
			"_id",
			"name",
			"amountAvailable",
			"toTransfer",
			"dni"
		],

		// Validator for the `create` & `insert` actions.
		entityValidator: {
			name: "string|min:3",
			amountAvailable: "number|positive"
		}
	},

	/**
	 * Action Hooks
	 */
	hooks: {
		before: {
			/**
			 * Register a before hook for the `create` action.
			 * It sets a default value for the quantity field.
			 *
			 * @param {Context} ctx
			 */
			create(ctx) {
				ctx.params.quantity = 0;
			}
		}
	},

	/**
	 * Actions
	 */
	actions: {
		/**
		 * The "moleculer-db" mixin registers the following actions:
		 *  - list
		 *  - find
		 *  - count
		 *  - create
		 *  - insert
		 *  - update
		 *  - remove
		 */

		// --- ADDITIONAL ACTIONS ---

		/**
		 * Increase the quantity of the product item.
		 */
		//increaseQuantity: {
		getFunds: {
			rest: {
				method: "GET",
				path: "/getAmount/:dni/"
			},
			params: {
				dni: "string",
			},
			async handler(ctx) {
				const dni = +ctx.params.dni;
				const doc = await this.adapter.findOne({dni: dni});
				console.log(doc.amountAvailable);
				//const doc = await this.adapter.updateById(ctx.params.id, { $inc: { quantity: ctx.params.value } });
				const json = await this.transformDocuments(ctx, ctx.params, doc);
				await this.entityChanged("updated", json, ctx);
				if(doc.amountAvailable > 0) {
					json["Message"] = "200 OK: El usuario tiene fondos para transacciones";
				}else {
					json["Message"] = "ERROR: El usuario tiene fondos para transacciones";
				}
				return json.Message;
			}
		},
		health: {
			rest: {
				method: "GET",
				path: "health"
			},
			async handler(ctx){
				return "Estoy healthy";
			}
		},
		getAvailable: {
			rest: {
				method: "GET",
				path: "/getFunds/:dni/"
			},
			params: {
				dni: "string",
			},
			async handler(ctx) {
				const dni = +ctx.params.dni;
				const doc = await this.adapter.findOne({dni: dni});
				//const doc = await this.adapter.updateById(ctx.params.id, { $inc: { quantity: ctx.params.value } });
				const json = await this.transformDocuments(ctx, ctx.params, doc);
				await this.entityChanged("updated", json, ctx);
				if(doc.toTransfer > 0) {
					json["Message"] = "200 OK: El usuario puede realizar tranferencias";
				}else {
					json["Message"] = "ERROR: El usuario NO puede realizar tranferencias";
				}
				return json.Message;
			}
		},
		hello: {
			rest: {
				method: "GET",
				path: "/check"
			},
			async handler() {
				return "Hello Moleculer";
			}
		},

		/**
		 * Decrease the quantity of the product item.
		 */
		decreaseQuantity: {
			rest: "PUT /:id/quantity/decrease",
			params: {
				id: "string",
				value: "number|integer|positive"
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				const doc = await this.adapter.updateById(ctx.params.id, { $inc: { quantity: -ctx.params.value } });
				const json = await this.transformDocuments(ctx, ctx.params, doc);
				await this.entityChanged("updated", json, ctx);

				return json;
			}
		}
	},

	/**
	 * Methods
	 */
	methods: {
		/**
		 * Loading sample data to the collection.
		 * It is called in the DB.mixin after the database
		 * connection establishing & the collection is empty.
		 */
		async seedDB() {
			await this.adapter.insertMany([
				{ name: "Samsung Galaxy S10 Plus", quantity: 10, price: 704 },
				{ name: "iPhone 11 Pro", quantity: 25, price: 999 },
				{ name: "Huawei P30 Pro", quantity: 15, price: 679 },
			]);
		}
	},

	/**
	 * Fired after database connection establishing.
	 */
	async afterConnected() {
		// await this.adapter.collection.createIndex({ name: 1 });
	}
};
