import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './app.module.css';

const sendFormData = (formData) => {
	if (formData.password1 === formData.password2) {
		console.log(formData);
	}
};

const fieldsSchema = yup.object().shape({
	email: yup
		.string()
		.matches(
			/^[\w_@.]*$/,
			'Неверный E-mail. Допустимые символы: буквы, цифры, нижнее подчёркивание, символы "@" и "."',
		)
		.min(5, 'Неверный E-mail.'),
	password1: yup
		.string()
		.matches(
			/^[\w_]*$/,
			'Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание',
		)
		.min(3, 'Неверный логин. Должно быть не меньше 3 символов')
		.max(20, 'Неверный логин. Должно быть не больше 20 символов'),
	password2: yup
		.string()
		.matches(
			/^[\w_]*$/,
			'Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание',
		)
		.min(3, 'Неверный логин. Должно быть не меньше 3 символов')
		.max(20, 'Неверный логин. Должно быть не больше 20 символов'),
	buttonSubmit: yup.string(),
	// .required(
	// 	false,
	// 	'Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание',
	// ),
});

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password1: '',
			password2: '',
		},
		resolver: yupResolver(fieldsSchema),
	});
	const emailError = errors.email?.message;
	const password1Error = errors.password1?.message;
	const password2Error = errors.password2?.message;
	const submitError = errors.buttonSubmit?.message;
	return (
		<div className={styles.app}>
			<form onSubmit={handleSubmit(sendFormData)}>
				{emailError && <div className={styles.errorLabel}>{emailError}</div>}
				<input name="email" type="email" {...register('email')} />
				<br />
				{password1Error && <div className={styles.errorLabel}>{password1Error}</div>}
				<input name="password1" type="text" {...register('password1')} />
				<br />
				{password2Error && <div className={styles.errorLabel}>{password2Error}</div>}
				<input name="password2" type="text" {...register('password2')} />
				<br />
				{submitError && <div className={styles.errorLabel}>{submitError}</div>}
				<button
					type="submit"
					name="buttonSubmit"
					disabled={!!emailError || !!password1Error || !!password2Error}
				>
					Отправить
				</button>
			</form>
		</div>
	);
};
