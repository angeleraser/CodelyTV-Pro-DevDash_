import React from "react";

import { config } from "../../devdash-config";
import { GithubApiGithubRepositoryRepository } from "../../infrastructure/GithubApiGithubRepositoryRepository";
import { LocalStorageRepositoryWidgetRepository } from "../../infrastructure/LocalStorageWidgetRepository";
import { Dashboard } from "./Dashboard";
import { useRepositoryWidgetContext } from "./RepositoryWidgetContextProvider";

export function DashboardFactory() {
	const { repositoryWidgets } = useRepositoryWidgetContext();

	return (
		<Dashboard
			repositoryWidgetRepository={new LocalStorageRepositoryWidgetRepository()}
			repository={new GithubApiGithubRepositoryRepository(config.github_access_token)}
			repositoryWidgets={repositoryWidgets}
		/>
	);
}
