import { Component, ErrorInfo, ReactNode } from "react";
import { Link } from "react-router-dom";

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
	state = {
		hasError: false,
	};

	public static getDerivedStateFromError(_: Error) {
		return {
			hasError: true,
		};
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		// eslint-disable-next-line no-console
		console.log("Uncaught error:", error, errorInfo);
	}

	public render(): ReactNode {
		if (this.state.hasError) {
			return (
				<div>
					<h2>Something went wrong</h2>
					<Link onClick={this.resetError.bind(this)} to={"/"}>
						Return to home
					</Link>
				</div>
			);
		}

		return this.props.children;
	}

	private resetError() {
		this.setState({ hasError: false });
	}
}
