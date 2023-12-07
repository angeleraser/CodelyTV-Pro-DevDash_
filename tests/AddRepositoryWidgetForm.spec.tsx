/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable @typescript-eslint/unbound-method */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mock } from "jest-mock-extended";

import { RepositoryWidget } from "../src/domain/RepositoryWidget";
import { LocalStorageRepositoryWidgetRepository } from "../src/infrastructure/LocalStorageWidgetRepository";
import { AddWidgetForm } from "../src/sections/dashboard/AddWidgetForm";

const mockRepository = mock<LocalStorageRepositoryWidgetRepository>();

describe("AddWidgetForm", () => {
	it("show widget form when add button is clicked", async () => {
		render(<AddWidgetForm repository={mockRepository} />);

		const button = await screen.findByRole("button", {
			name: new RegExp("Añadir", "i"),
		});

		act(function () {
			userEvent.click(button);
		});

		const url = screen.getByLabelText(/Url del repositorio/i);

		expect(url).toBeInTheDocument();
	});

	it("save new widget when form is submitted", async () => {
		mockRepository.search.mockResolvedValue([]);

		const newWidget: RepositoryWidget = {
			id: "newWidgetId",
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		};

		render(<AddWidgetForm repository={mockRepository} />);

		const button = await screen.findByRole("button", {
			name: new RegExp("Añadir repositorio", "i"),
		});

		act(function () {
			userEvent.click(button);
		});

		const id = screen.getByLabelText(/Id/i);
		const url = screen.getByLabelText(/Url del repositorio/i);

		expect(id).not.toBe(null);
		expect(url).not.toBe(null);

		await act(async function () {
			userEvent.type(id, newWidget.id);
			userEvent.type(url, newWidget.repositoryUrl);
		});

		expect((id as HTMLInputElement).value).toBe(newWidget.id);
		expect((url as HTMLInputElement).value).toBe(newWidget.repositoryUrl);

		const submitButton = await screen.findByRole("button", {
			name: /Añadir/i,
		});

		await act(async function () {
			userEvent.click(submitButton);
		});

		expect(mockRepository.save).toHaveBeenCalledWith(newWidget);
	});

	it("show error when respository already exists in Dashboard", async () => {
		mockRepository.save.mockReset();

		const existingWidget: RepositoryWidget = {
			id: "existingWidgetId",
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		};

		mockRepository.search.mockResolvedValue([existingWidget]);

		const newWidgetWithSameUrl: RepositoryWidget = {
			id: "newWidgetId",
			repositoryUrl: "https://github.com/CodelyTV/DevDash",
		};

		render(<AddWidgetForm repository={mockRepository} />);

		const button = await screen.findByRole("button", {
			name: new RegExp("Añadir repositorio", "i"),
		});
		act(function () {
			userEvent.click(button);
		});
		const id = screen.getByLabelText(/Id/i);
		const url = screen.getByLabelText(/Url del repositorio/i);
		const submitButton = await screen.findByRole("button", {
			name: /Añadir/i,
		});

		act(function () {
			userEvent.type(id, newWidgetWithSameUrl.id);
			userEvent.type(url, newWidgetWithSameUrl.repositoryUrl);
			userEvent.click(submitButton);
		});

		const errorMessage = await screen.findByRole("alert", {
			description: /Repositorio duplicado/i,
		});

		expect(errorMessage).toBeInTheDocument();
		expect(mockRepository.save).not.toHaveBeenCalled();
	});
});
