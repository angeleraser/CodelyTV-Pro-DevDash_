/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";

import Add from "../../assets/svg/add.svg";
import { RepositoryWidgetRepository } from "../../domain/RepositoryWidgetRepository";
import styles from "./AddWidgetForm.module.scss";
import { useAddRepositoryWidget } from "./useAddRepositoryWidget";

type FormEvent<T> = React.FormEvent<HTMLFormElement> & {
	target: { elements: { [key in keyof T]: { value: T[key] } } };
};

type FormFields = { id: string; url: string };

export function AddWidgetForm({ repository }: { repository: RepositoryWidgetRepository }) {
	const [isFormActive, setIsFormActive] = useState(false);
	const [hasAlreadyExistsError, setHasAlreadyExistsError] = useState(false);
	const { save } = useAddRepositoryWidget(repository);

	const submitForm = async (ev: FormEvent<FormFields>) => {
		ev.preventDefault();
		const { id, url } = ev.target.elements;
		const error = await save({ id: id.value, repositoryUrl: url.value });

		setHasAlreadyExistsError(!!error);
		setIsFormActive(!false);
	};

	return (
		<article className={styles.add_widget}>
			<div className={styles.container}>
				{!isFormActive && !hasAlreadyExistsError ? (
					<button onClick={() => setIsFormActive(true)} className={styles.add_button}>
						<img src={Add} alt="" />
						Añadir repositorio
					</button>
				) : (
					<form className={styles.form} onSubmit={submitForm}>
						<div>
							<label htmlFor="id">Id</label>
							<input type="text" id="id" />
						</div>
						<div>
							<label htmlFor="url">Url del repositorio</label>
							<input type="text" id="url" />
						</div>

						{hasAlreadyExistsError && (
							<p role="alert" aria-describedby="duplicated-error">
								<span id="duplicated-error">Repositorio duplicado</span>
							</p>
						)}

						<button type="submit">Añadir</button>
					</form>
				)}
			</div>
		</article>
	);
}
