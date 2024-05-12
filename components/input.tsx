import { JSX } from "preact/jsx-runtime";

interface InputProps extends JSX.HTMLAttributes<HTMLInputElement> {
	
}

export function Input(props: InputProps) {

	return (
		<input
			{...props}
			class="border border-gray-300 rounded px-3 py-2"
		/>
	);
}