/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { RepositoryWidgetMother } from "../../RepositoryWidgetMother";

describe("Repository Widget Form", () => {
	it("Add new repository with id and url", () => {
		const newWidget = RepositoryWidgetMother.create({
			repositoryUrl: "https://github.com/CodelyTV/typescript-ddd-example",
		});

		cy.visit("/");

		cy.findByRole("button").click();

		cy.findByLabelText(/Id/i).type(newWidget.id);
		cy.findByLabelText(/Url del repositorio/i).type(newWidget.repositoryUrl);

		cy.findByRole("button").click();

		const widget = cy.findByText("CodelyTV/DevDash");

		widget.should("exist");
	});

	// it("Show error when respository already exists in Dashboard", () => {
	// 	const newWidget = RepositoryWidgetMother.create({
	// 		repositoryUrl: "https://github.com/CodelyTV/DevDash",
	// 	});

	// 	cy.visit("/");

	// 	cy.findByRole("button", {
	// 		name: new RegExp("Añadir", "i"),
	// 	}).click();

	// 	cy.findByLabelText(/Id/i).type(newWidget.id);
	// 	cy.findByLabelText(/Url del repositorio/i).type(newWidget.repositoryUrl);

	// 	cy.findByRole("button", {
	// 		name: /Añadir/i,
	// 	}).click();

	// 	cy.findByRole("button", {
	// 		name: new RegExp("Añadir", "i"),
	// 	}).click();

	// 	cy.findByLabelText(/Id/i).type(newWidget.id);
	// 	cy.findByLabelText(/Url del repositorio/i).type(newWidget.repositoryUrl);

	// 	cy.findByRole("button", {
	// 		name: /Añadir/i,
	// 	}).click();

	// 	const errorMessage = cy.findByText("Repositorio duplicado");

	// 	errorMessage.should("exist");
	// });
});
