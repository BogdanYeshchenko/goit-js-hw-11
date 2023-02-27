import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = 'key=33989696-bb179ecbc90f0d948b968d104';

export async function reseivingData(request, page = 1) {
  const imageType = 'image_type=photo';
  const orientation = 'orientation=horizontal';
  const safeSearch = 'safesearch=true';
  const perPage = 'per_page=40';

  try {
    const response = await axios.get(
      `${BASE_URL}?${KEY}&q=${request}&${imageType}&${orientation}&${safeSearch}&${perPage}&${page}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
