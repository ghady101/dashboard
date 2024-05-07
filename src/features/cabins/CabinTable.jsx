import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';

function CabinTable() {
	const { isLoading, cabins } = useCabins();
	const [searchParams] = useSearchParams();

	// Filter
	const filterValue = searchParams.get('discount') || 'all';

	let filteredCabins;
	if (filterValue === 'all') filteredCabins = cabins;

	if (filterValue === 'no-discount')
		filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);

	if (filterValue === 'with-discount')
		filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);

	// Sort
	const sortBy = searchParams.get('sortBy') || 'name-asc';
	const [field, direction] = sortBy.split('-');
	const modifier = direction === 'asc' ? 1 : -1;
	const sortedCabins = filteredCabins?.sort(
		(a, b) => (a[field] - b[field]) * modifier
	);

	if (isLoading) return <Spinner />;

	if (!filteredCabins.length) return <Empty resourceName={'Cabins'} />;

	return (
		<Menus>
			<Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
				<Table.Header>
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>

				<Table.Body
					// data={cabins}
					data={sortedCabins}
					render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
				/>
			</Table>
		</Menus>
	);
}

export default CabinTable;
