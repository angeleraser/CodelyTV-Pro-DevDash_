import { LocalStorageRepositoryWidgetRepository } from "./infrastructure/LocalStorageWidgetRepository";
import { Router } from "./Router";
import { RepositoryWidgetContextProvider } from "./sections/dashboard/RepositoryWidgetContextProvider";

export function App() {
	return (
		<RepositoryWidgetContextProvider repository={new LocalStorageRepositoryWidgetRepository()}>
			<Router />
		</RepositoryWidgetContextProvider>
	);
}
