import { githubApiResponses } from "../github_api_responses";

export class InMemoryGihtubRepositoryRepository {
	search(): typeof githubApiResponses {
		return githubApiResponses;
	}
}
