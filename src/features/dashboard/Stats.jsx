import React from 'react';
import Stat from './Stat';
import { HiOutlineBanknotes, HiOutlineCalendarDays } from 'react-icons/hi2';
import { HiOutlineBriefcase, HiOutlineChartBar } from 'react-icons/hi';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmedStays, numOfDays, cabinCount }) {
	// 1
	const numOfBooking = bookings.length;

	// 2
	const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

	// 3
	const checkins = confirmedStays.length;

	// 4
	// # checked night / all available night
	const occupation =
		confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
		(numOfDays * cabinCount);

	return (
		<>
			<Stat
				title={'Bookings'}
				color={'blue'}
				icon={<HiOutlineBriefcase />}
				value={numOfBooking}
			/>
			<Stat
				title={'Sales'}
				color={'green'}
				icon={<HiOutlineBanknotes />}
				value={formatCurrency(sales)}
			/>
			<Stat
				title={'Check-In'}
				color={'indigo'}
				icon={<HiOutlineCalendarDays />}
				value={checkins}
			/>
			<Stat
				title={'Occupency rate'}
				color={'yellow'}
				icon={<HiOutlineChartBar />}
				value={Math.round(occupation * 100) + '%'}
			/>
		</>
	);
}

export default Stats;
