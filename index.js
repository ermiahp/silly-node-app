const agent = require('superagent');
const asciify = require('asciify-image');

const DOG_API_URL = 'https://dog.ceo/api/breeds/image/random';
const DOG_WITH_BREED_API_URL = (breed) => 'https://dog.ceo/api/breed/' + breed + '/images/random';

const getDogImageURL = async () => {
  const { body: { message: dogUrl } } = await agent.get(DOG_API_URL);
  return dogUrl;
};

const getDogWithBreedImageURL = async (breed) => {
  const { body: { message: dogUrl } } = await agent.get(DOG_WITH_BREED_API_URL(breed));
  return dogUrl;
};

(async () => {
  // Get a URL for a random image of a dog
  const dogUrl = await getDogWithBreedImageURL('hound');
  // const dogUrl = await getDogImageURL();
  // Download the image
  const { body: data } = await agent.get(dogUrl);

  // Convert the image to ascii
  const ascii = await asciify(data, {
    fit: 'box',
    width: 60,
    height: 60,
  });

  // Print the ascii
  console.log(ascii);
})();
