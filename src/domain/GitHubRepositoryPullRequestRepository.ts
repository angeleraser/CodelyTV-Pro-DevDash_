import { RepositoryId } from "./GithubRepository";
import { GitHubRepositoryPullRequest } from "./GitHubRepositoryPullRequest";

export interface GitHubRepositoryPullRequestRepository {
	search(repositoryId: RepositoryId): Promise<GitHubRepositoryPullRequest[]>;
}
