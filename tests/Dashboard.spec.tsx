/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { screen } from "@testing-library/react";
import { mock } from "jest-mock-extended";

import { GithubRepositorRepository } from "../src/domain/GithubRepositoryRepository";
import { RepositoryWidgetRepository } from "../src/domain/RepositoryWidgetRepository";
import { Dashboard } from "../src/sections/dashboard/Dashboard";
import { GithubRepositoryMother } from "./GithubRepositoryMother";
import { renderWithRouter } from "./renderWithRouter";
import { RepositoryWidgetMother } from "./RepositoryWidgetMother";

const mockGitHubRepositoryRepository = mock<GithubRepositorRepository>();
const mockWidgetRepository = mock<RepositoryWidgetRepository>();

describe("Dashboard section", () => {
	it("show all widgets", async () => {
		const gitHubRepository = GithubRepositoryMother.create();
		const repositoryWidget = [RepositoryWidgetMother.create()];

		mockGitHubRepositoryRepository.search.mockResolvedValue([gitHubRepository]);

		renderWithRouter(
			<Dashboard
				repository={mockGitHubRepositoryRepository}
				repositoryWidgetRepository={mockWidgetRepository}
				repositoryWidgets={repositoryWidget}
			/>
		);

		const firstWidgetTitle = `${gitHubRepository.id.organization}/${gitHubRepository.id.name}`;
		const firstWidgetHeader = await screen.findByRole("heading", {
			name: new RegExp(firstWidgetTitle, "i"),
		});

		expect(firstWidgetHeader).toBeInTheDocument();
	});

	// it("show not results message when there are no widgets", async () => {
	// 	mockGitHubRepositoryRepository.search.mockResolvedValue([]);

	// 	renderWithRouter(
	// 		<Dashboard
	// 			repository={mockGitHubRepositoryRepository}
	// 			repositoryWidgetRepository={mockWidgetRepository}
	// 		/>
	// 	);

	// 	const noResults = await screen.findByText(new RegExp("No hay widgets configurados", "i"));

	// 	expect(noResults).toBeInTheDocument();
	// });

	it("show last modified date in human readable format", async () => {
		const gitHubRepository = GithubRepositoryMother.create({ updatedAt: new Date() });
		const repositoryWidget = [RepositoryWidgetMother.create()];

		mockGitHubRepositoryRepository.search.mockResolvedValue([gitHubRepository]);

		renderWithRouter(
			<Dashboard
				repository={mockGitHubRepositoryRepository}
				repositoryWidgetRepository={mockWidgetRepository}
				repositoryWidgets={repositoryWidget}
			/>
		);

		const modificationDate = await screen.findByText(new RegExp("today", "i"));

		expect(modificationDate).toBeInTheDocument();
	});
});
