import { useEffect, useRef, useState } from "react";
import { useObserve } from "@legendapp/state/react";
import { months } from "@/_global/lib/shared";
import { sleep } from "@/_global/lib/utils";
import { useStore } from "@/_global/piquo";
import type { Months } from "@/_global/lib/shared";
import "../Bg.sass";

export default function Bg() {
	const [ currentMonth, setCurrentMonth ] = useState<Months>(months[(new Date()).getMonth()]);
	const animationDelay = useRef(0);
	const [ nextMonth, setNextMonth ] = useState<Months>();
	const { selectedMonth$ } = useStore('selectedMonth');

	const elBg = useRef<HTMLImageElement>(null);
	const getSrcset = (month?: Months) => month ? `/images/bg/${ month }.webp 1920w, /images/bg/${ month }_sp.webp 768w` : '';

	useObserve(() => {
		const next = selectedMonth$.get();
		if (!elBg.current || !next) return;

		if (!('computedStyleMap' in elBg.current)) {
			setCurrentMonth(next);
			return;
		}

		const style = elBg.current.computedStyleMap();
		const duration = style.get('animation-duration') as CSSUnitValue;
		const delay = duration.value * 1000;
		animationDelay.current = delay;
		setNextMonth(next);
	});

	useEffect(() => {
		if (!nextMonth) return;

		const animated = async () => {
			await sleep(animationDelay.current);

			setCurrentMonth(nextMonth);
			setNextMonth('');
			selectedMonth$.set('');
		};
		animated();
	}, [ nextMonth ]);

	return (
		<div id="bg">
			<img ref={ elBg } alt="" srcSet={ getSrcset(currentMonth) } data-testid="bg" />
			{selectedMonth$.get() && (
				<img id="selected_bg" srcSet={ getSrcset(selectedMonth$.get()) } alt="" />
			)}
		</div>
	)
}
