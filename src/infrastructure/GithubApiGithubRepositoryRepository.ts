import { GithubRepository } from "../domain/GithubRepository";
import { GithubRepositorRepository } from "../domain/GithubRepositoryRepository";
import { CiStatus, PullRequest, RepositoryData } from "./GitHubApiResponse";

interface RepositoryId {
	organization: string;
	name: string;
}

export class GithubApiGithubRepositoryRepository implements GithubRepositorRepository {
	private readonly endpoints = [
		"https://api.github.com/repos/$organization/$name",
		"https://api.github.com/repos/$organization/$name/pulls",
		"https://api.github.com/repos/$organization/$name/actions/runs?page=1&per_page=1",
	];

	constructor(private readonly personalAccessToken: string) {}

	async search(repositoryUrls: string[]): Promise<GithubRepository[]> {
		const responsePromises = repositoryUrls
			.map((url) => this.urlToId(url))
			.map((id) => this.searchBy(id));

		return Promise.all(responsePromises);
	}

	async byId(repositoryId: RepositoryId): Promise<GithubRepository | undefined> {
		return this.searchBy(repositoryId);
	}

	private urlToId(url: string): RepositoryId {
		const splitUrl = url.split("/");

		return {
			name: splitUrl.pop() as string,
			organization: splitUrl.pop() as string,
		};
	}

	private async searchBy(id: RepositoryId): Promise<GithubRepository> {
		const respositoryRequests = this.endpoints
			.map((endpoint) => endpoint.replace("$organization", id.organization))
			.map((endpoint) => endpoint.replace("$name", id.name))
			.map((url) =>
				fetch(url, {
					headers: {
						Authorization: `Bearer ${this.personalAccessToken}`,
					},
				})
			);

		const requestsResponse = await Promise.all(respositoryRequests);
		const requestsJson = await Promise.all(
			requestsResponse.map(async (response) => response.json())
		);

		const [repositoryData, pullRequests, ciStatus] = requestsJson as [
			RepositoryData,
			PullRequest[],
			CiStatus
		];

		return {
			id: {
				name: repositoryData.name,
				organization: repositoryData.organization.login,
			},
			url: repositoryData.url,
			description: repositoryData.description,
			private: repositoryData.private,
			updatedAt: new Date(repositoryData.updated_at),
			hasWorkflows: ciStatus.workflow_runs.length > 0,
			isLastWorkflowSuccess:
				ciStatus.workflow_runs.length > 0 &&
				ciStatus.workflow_runs[0].status === "completed" &&
				ciStatus.workflow_runs[0].conclusion === "success",
			stars: repositoryData.stargazers_count,
			forks: repositoryData.forks_count,
			issues: repositoryData.open_issues,
			pullRequests: pullRequests.length,
			watchers: repositoryData.watchers_count,
			workflowRunsStatus: ciStatus.workflow_runs.map((run) => ({
				id: run.id,
				name: run.name,
				title: run.display_title,
				url: run.html_url,
				createdAt: new Date(run.created_at),
				status: run.status,
				conclusion: run.conclusion,
			})),
		};
	}
}
