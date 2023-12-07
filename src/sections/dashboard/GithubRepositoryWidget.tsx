import { Link } from "react-router-dom";

import Check from "../../assets/svg/check.svg";
import Error from "../../assets/svg/error.svg";
import PullRequests from "../../assets/svg/git-pull-request.svg";
import IssueOpened from "../../assets/svg/issue-opened.svg";
import Lock from "../../assets/svg/lock.svg";
import Forks from "../../assets/svg/repo-forked.svg";
import Star from "../../assets/svg/star.svg";
import Unlock from "../../assets/svg/unlock.svg";
import Watchers from "../../assets/svg/watchers.svg";
import { GithubRepository } from "../../domain/GithubRepository";
import styles from "./GithubRepositoryWidget.module.scss";

const isoToReadableDate = (lastUpdate: string): string => {
	const lastUpdateDate = new Date(lastUpdate);
	const currentDate = new Date();
	const diffTime = currentDate.getTime() - lastUpdateDate.getTime();
	const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

	if (diffDays === 0) {
		return "today";
	}

	if (diffDays > 30) {
		return "more than a month ago";
	}

	return `${diffDays} days ago`;
};

interface GithubRepositoryWidgetProps {
	widget: GithubRepository;
}

export function GithubRepositoryWidget({ widget }: GithubRepositoryWidgetProps) {
	return (
		<article className={styles.widget} key={widget.id.name}>
			<header className={styles.widget__header}>
				<h2 className={styles.widget__title}>
					<Link
						to={`/repository/${widget.id.organization}/${widget.id.name}`}
						title={`${widget.id.organization}/${widget.id.name}`}
					>
						{widget.id.organization}/{widget.id.name}
					</Link>
				</h2>
				{widget.private ? <img src={Lock} alt="" /> : <img src={Unlock} alt="" />}
			</header>
			<div className={styles.widget__body}>
				<div className={styles.widget__status}>
					<p className="last-update-text">
						Last update {isoToReadableDate(widget.updatedAt.toISOString())}
					</p>
					{widget.hasWorkflows && (
						<div>
							{widget.isLastWorkflowSuccess ? (
								<img src={Check} alt="" />
							) : (
								<img src={Error} alt="" />
							)}
						</div>
					)}
				</div>
				<p className={styles.widget__description}>{widget.description}</p>
			</div>
			<footer className={styles.widget__footer}>
				<div className={styles.widget__stat}>
					<img src={Star} alt="" />
					<span>{widget.stars}</span>
				</div>
				<div className={styles.widget__stat}>
					<img src={Watchers} alt="" />
					<span>{widget.watchers}</span>
				</div>
				<div className={styles.widget__stat}>
					<img src={Forks} alt="" />
					<span>{widget.forks}</span>
				</div>
				<div className={styles.widget__stat}>
					<img src={IssueOpened} alt="" />
					<span>{widget.issues}</span>
				</div>
				<div className={styles.widget__stat}>
					<img src={PullRequests} alt="" />
					<span>{widget.pullRequests}</span>
				</div>
			</footer>
		</article>
	);
}
