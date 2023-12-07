import { useEffect, useState } from "react";

import { GithubRepository } from "../../domain/GithubRepository";
import { GithubRepositorRepository } from "../../domain/GithubRepositoryRepository";

export function useGithubRepository(
	repository: GithubRepositorRepository,
	repositoryUrls: string[]
): { repositories: GithubRepository[]; loadingRepositories: boolean } {
	const [data, setData] = useState<GithubRepository[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(
		function () {
			setIsLoading(true);

			repository
				.search(repositoryUrls)
				.then(setData)
				.catch(() => void 0)
				.finally(() => setIsLoading(false));
		},
		[repository, repositoryUrls]
	);

	return {
		repositories: data,
		loadingRepositories: isLoading,
	};
}
