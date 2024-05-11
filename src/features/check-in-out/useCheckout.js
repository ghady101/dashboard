import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useCheckout() {
	// const { bookingId } = useParams();
	const queryClient = useQueryClient();

	const { isLoading: isCheckingOut, mutate: checkout } = useMutation({
		mutationFn: (bookingId) =>
			updateBooking(bookingId, {
				status: 'checked-out',
			}),
		// mutationFn: () =>
		// 	updateBooking(bookingId, {
		// 		status: 'checked-in',
		// 		isPaid: true,
		// 	}),
		onSuccess: (data) => {
			toast.success(`booking #${data.id} successfully checked out`);
			queryClient.invalidateQueries({ active: true });
		},
		onError: () => {
			toast.error('There was an error while checking out');
		},
	});

	return { checkout, isCheckingOut };
}
