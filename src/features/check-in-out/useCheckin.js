import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useCheckin() {
	// const { bookingId } = useParams();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { isLoading: isCheckingIn, mutate: checkin } = useMutation({
		mutationFn: (bookingId) =>
			updateBooking(bookingId, {
				status: 'checked-in',
				isPaid: true,
			}),
		// mutationFn: () =>
		// 	updateBooking(bookingId, {
		// 		status: 'checked-in',
		// 		isPaid: true,
		// 	}),
		onSuccess: (data) => {
			toast.success(`booking #${data.id} successfully checked in`);
			queryClient.invalidateQueries({ active: true });
			navigate('/');
		},
		onError: () => {
			toast.error('There was an error while checking in');
		},
	});

	return { checkin, isCheckingIn };
}
