import { Outlet } from "react-router-dom";

import Brand from "../../assets/svg/brand.svg";
import { ErrorBoundary } from "./ErrorBoundary";
import styles from "./Layout.module.scss";
import TopBarProgressByLocation from "./TopBarProgressByLocation";

export function Layout() {
	return (
		<>
			<TopBarProgressByLocation />
			<header className={styles.header}>
				<section className={styles.header__container}>
					<img src={Brand} alt="" />
					<h1 className={styles.app__brand}>DevDash_</h1>
				</section>
			</header>

			<ErrorBoundary>
				<Outlet />
			</ErrorBoundary>
		</>
	);
}
