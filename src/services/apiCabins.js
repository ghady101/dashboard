import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
	const { data, error } = await supabase.from('cabins').select('*');

	if (error) {
		console.error(error);
		throw new Error('Cabins could not get loaded');
	}
	return data;
}

export async function createEditCabin(newCabin, id) {
	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

	// https://mhjvjbceeqfjomszavdv.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg
	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		'/',
		''
	);
	const imagePath = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// 1.create cabin
	let query = supabase.from('cabins');

	// A) CREATE
	if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

	// B) EDIT
	if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error('Cabins could not get created');
	}

	// 2. upload image
	if (hasImagePath) return data;

	const { error: storageError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, newCabin.image);

	// 3. delete the cabin if some error happen when uploading the image
	if (storageError) {
		// deleteCabin(newCabin.id);
		// or
		await supabase.from('cabins').delete().eq('id', newCabin.id);
		console.error(error);
		throw new Error(
			"Cabin image couldn't uploaded and the cabin was not created"
		);
	}

	return data;
}

export async function deleteCabin(id) {
	const { error } = await supabase.from('cabins').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Cabin could not get deleted');
	}
}
