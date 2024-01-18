import Ad from '../models/ad.js';

export const getAd = async (req, res) => {

    const ads = await Ad.find()

    console.log(ads);

  const randomIndex = Math.floor(Math.random() * ads.length);

  const randomAd = ads[randomIndex];

  res.json({
    name: randomAd.name,
    description: randomAd.description,
    picturePath: randomAd.picturePath
  });
};

