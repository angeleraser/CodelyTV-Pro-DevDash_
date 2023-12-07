/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import PullRequests from "../../assets/svg/git-pull-request.svg";
import IssueOpened from "../../assets/svg/issue-opened.svg";
import Forks from "../../assets/svg/repo-forked.svg";
import Star from "../../assets/svg/star.svg";
import Watchers from "../../assets/svg/watchers.svg";
import styles from "./GithubRepositoryWidget.module.scss";

function WidgetSkeleton() {
	return (
		<article className={styles.widget}>
			<header
				className={styles.widget__header}
				style={{ display: "block", paddingTop: "1.15rem", paddingBottom: "1.15rem" }}
			>
				<Skeleton baseColor="#3CFF64" highlightColor="#D1FFDA" width="70%" />
			</header>
			<div className={styles.widget__body}>
				<p style={{ marginTop: "1rem", marginBottom: "2rem" }}>
					Last update <Skeleton inline={true} width="20%" />
				</p>
				<p className={styles.widget__description} style={{ paddingBottom: "0.65rem" }}>
					<Skeleton height={45} />
				</p>
			</div>
			<footer className={styles.widget__footer}>
				<div className={styles.widget__stat}>
					<img src={Star} alt="" />
					<span>
						<Skeleton width={35} />
					</span>
				</div>
				<div className={styles.widget__stat}>
					<img src={Watchers} alt="" />
					<span>
						<Skeleton width={25} />
					</span>
				</div>
				<div className={styles.widget__stat}>
					<img src={Forks} alt="" />
					<span>
						<Skeleton width={15} />
					</span>
				</div>
				<div className={styles.widget__stat}>
					<img src={IssueOpened} alt="" />
					<span>
						<Skeleton width={15} />
					</span>
				</div>
				<div className={styles.widget__stat}>
					<img src={PullRequests} alt="" />
					<span>
						<Skeleton width={15} />
					</span>
				</div>
			</footer>
		</article>
	);
}

export function WidgetsSkeleton({ numberOfWidgets }: { numberOfWidgets: number }) {
	return (
		<SkeletonTheme baseColor="#1A2233" highlightColor="#535966">
			{[...new Array(numberOfWidgets)].map((_, i) => (
				<WidgetSkeleton key={i} />
			))}
		</SkeletonTheme>
	);
}
