import { useEffect, useState } from "react";

import { GithubRepository, RepositoryId } from "../../domain/GithubRepository";
import { GithubRepositorRepository } from "../../domain/GithubRepositoryRepository";

export function useGitHubRepository(
	repository: GithubRepositorRepository,
	repositoryId: RepositoryId
): {
	repositoryData: GithubRepository | undefined;
} {
	const [repositoryData, setRepositoryData] = useState<GithubRepository | undefined>(undefined);

	useEffect(() => {
		void repository.byId(repositoryId).then(setRepositoryData);
	}, [repository, repositoryId]);

	return { repositoryData };
}
