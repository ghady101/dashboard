import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/Global';

export function useBookings() {
	const queryClient = useQueryClient();
	const [searchParams, setSearchParams] = useSearchParams();

	// Filter
	const filterValue = searchParams.get('status');
	const filter =
		!filterValue || filterValue === 'all'
			? null
			: { field: 'status', value: filterValue };
	//  : { field: 'status', value: filterValue, method: 'gte' };

	// Sort
	const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
	const [field, direction] = sortByRaw.split('-');
	const sortBy = { field, direction };

	// Pagination
	const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

	const {
		isLoading,
		data: { data: bookings, count } = {},
		error,
	} = useQuery({
		queryKey: ['bookings', filter, sortBy, page],
		queryFn: () => getBookings({ filter, sortBy, page }),
	});

	// Prefetch
	const pageCount = Math.ceil(count / PAGE_SIZE);

	// next
	if (page < pageCount)
		queryClient.prefetchQuery({
			queryKey: ['bookings', filter, sortBy, page + 1],
			queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
		});

	// previous
	if (page > 1)
		queryClient.prefetchQuery({
			queryKey: ['bookings', filter, sortBy, page - 1],
			queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
		});

	return { isLoading, error, bookings, count };
}
