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
			<img ref={ elBg } alt="" src={ `/images/bg/${ currentMonth }.webp` } width={ 0 } height={ 0 } className="pc" />
			<img alt="" src={ `/images/bg/${ currentMonth }_sp.webp` } width={ 0 } height={ 0 } className="sp" />
			{selectedMonth$.get() && (
				<div id="selected_bg">
					<img src={ `/images/bg/${ selectedMonth$.get() }.webp` } alt="" width={ 0 } height={ 0 } className="pc" />
					<img src={ `/images/bg/${ selectedMonth$.get() }_sp.webp` } alt="" width={ 0 } height={ 0 } className="sp" />
				</div>
			)}
		</div>
	)
}
