import { config } from "../../devdash-config";
import { GitHubApiGitHubRepositoryPullRequestRepository } from "../../infrastructure/GitHubApiGitHubRepositoryPullRequestRepository";
import { GithubApiGithubRepositoryRepository } from "../../infrastructure/GithubApiGithubRepositoryRepository";
import { GitHubRepositoryDetail } from "./GithubRepositoryDetail";

const repository = new GithubApiGithubRepositoryRepository(config.github_access_token);
const pullRequestsRepository = new GitHubApiGitHubRepositoryPullRequestRepository(
	config.github_access_token
);

export class GithubRepositoryDetailFactory {
	static create() {
		return (
			<GitHubRepositoryDetail
				gitHubRepositoryRepository={repository}
				gitHubRepositoryPullRequestRepository={pullRequestsRepository}
			/>
		);
	}
}
