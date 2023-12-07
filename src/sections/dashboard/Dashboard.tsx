/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-unresolved */

import { useMemo } from "react";

import { GithubRepositorRepository } from "../../domain/GithubRepositoryRepository";
import { RepositoryWidget } from "../../domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "../../domain/RepositoryWidgetRepository";
import { AddWidgetForm } from "./AddWidgetForm";
import styles from "./Dashboard.module.scss";
import { GithubRepositoryWidget } from "./GithubRepositoryWidget";
import { useGithubRepository } from "./useGithubRepository";
import { WidgetsSkeleton } from "./WidgetsSkeleton";

interface DashboardProps {
	repository: GithubRepositorRepository;
	repositoryWidgetRepository: RepositoryWidgetRepository;
	repositoryWidgets: RepositoryWidget[];
}

export function Dashboard({
	repository,
	repositoryWidgetRepository,
	repositoryWidgets,
}: DashboardProps) {
	const repositoryUrls = useMemo(() => {
		return repositoryWidgets.map((widget) => widget.repositoryUrl);
	}, [repositoryWidgets]);

	const { repositories, loadingRepositories } = useGithubRepository(repository, repositoryUrls);

	return (
		<>
			{loadingRepositories && repositories.length === 0 ? (
				<div className={styles.container}>
					<WidgetsSkeleton numberOfWidgets={repositoryUrls.length} />
				</div>
			) : (
				<section className={styles.container}>
					{repositories.map((widget) => (
						<GithubRepositoryWidget key={widget.id.name} widget={widget} />
					))}
					<AddWidgetForm repository={repositoryWidgetRepository} />
				</section>
			)}
		</>
	);
}
