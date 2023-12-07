import { GithubRepository, RepositoryId } from "./GithubRepository";

export interface GithubRepositorRepository {
	search(repositoryUrls: string[]): Promise<GithubRepository[]>;
	byId(repositoryId: RepositoryId): Promise<GithubRepository | undefined>;
}
