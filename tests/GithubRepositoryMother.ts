import { faker } from "@faker-js/faker";

import { GithubRepository } from "../src/domain/GithubRepository";

// Patron Object Mother
export class GithubRepositoryMother {
	static create(params?: Partial<GithubRepository>): GithubRepository {
		const repository: GithubRepository = {
			id: {
				organization: faker.company.name(),
				name: faker.word.words(1),
			},
			url: faker.internet.url(),
			description: faker.word.words(10),
			private: faker.datatype.boolean(),
			updatedAt: faker.date.anytime(),
			hasWorkflows: faker.datatype.boolean(),
			isLastWorkflowSuccess: faker.datatype.boolean(),
			stars: faker.number.int(),
			watchers: faker.number.int(),
			forks: faker.number.int(),
			issues: faker.number.int(),
			pullRequests: faker.number.int(),
			...params,
		};

		return repository;
	}
}
