import clsx from "clsx";
import { useStore } from "@/_global/piquo";
import type { ReactNode } from "react";
import type { DeepGuard } from "@/_global/types/types";
import type { AsLink, AsDiv } from "@/_global/types/components";
import "@/components/shared/Sections/Glass.sass";

type Props = {
	children: ReactNode;
	className?: string;
} & ( | (AsLink & {
	href: string;
	target?: '_blank';
}) | (AsDiv & {
	as: 'div';
	href?: never;
	target?: never;
}));

export default function GlassButton(props: DeepGuard<Props>) {
	const { navOpened$ } = useStore('navOpened');

	const handleClick = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e) {
			e.preventDefault();
			navOpened$.set(!navOpened$.get());
		} else {
			navOpened$.set(false);
		}
	};
	if (props.as === 'a') {
		return (
			<a { ...props } onClick={ e => handleClick() } className={ clsx('glass mini is_dark', props.className) }>
				{ props.children }
			</a>
		)
	}

	return (
		<div { ...props } onClick={ e => handleClick(e) } className={ clsx('glass mini is_dark', props.className) }>
			{ props.children }
		</div>
	)
}
