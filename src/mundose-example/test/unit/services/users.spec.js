"use strict";

const { ServiceBroker, Context } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;
const TestService = require("../../../services/users.service");

describe("Test 'products' service", () => {

	describe("Test actions", () => {
		const broker = new ServiceBroker({ logger: false });
		const service = broker.createService(TestService);

		jest.spyOn(service.adapter, "findOne");
		jest.spyOn(service, "transformDocuments");
		jest.spyOn(service, "entityChanged");

		beforeAll(() => broker.start());
		afterAll(() => broker.stop());

		const record = {
			_id: "07a9ASIoUV9ttHvb",
			name: "Fabian Jose",
			dni: 123456,
			amountAvailable: 1011,
			toTransfer: 704,
			quantity: 25
		};

		describe("Test 'products.increaseQuantity'", () => {

			it("should call the adapter updateById method & transform result", async () => {
				service.adapter.findOne.mockImplementation(async () => record);
				service.transformDocuments.mockClear();
				service.entityChanged.mockClear();

				const res = await broker.call("users.getAvailable", {
					dni: "123456"
				});
				expect(res).toEqual("200 OK: El usuario puede realizar tranferencias");

				// expect(service.adapter.updateById).toBeCalledTimes(1);
				// expect(service.adapter.updateById).toBeCalledWith("123", { $inc: { quantity: 10 } } );

				// expect(service.transformDocuments).toBeCalledTimes(1);
				// expect(service.transformDocuments).toBeCalledWith(expect.any(Context), { id: "123", value: 10 }, record);

				// expect(service.entityChanged).toBeCalledTimes(1);
				// expect(service.entityChanged).toBeCalledWith("updated", { _id: "123", name: "Awesome thing", price: 999, quantity: 25 }, expect.any(Context));
			});

		});
	});

});

