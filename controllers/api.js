import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: '11c1dddb529f43f3beeb4d347059ab51'
  });
 
const handleApi = (req, res) => {
    const { input } = req.body;
    app.models
    .predict(
        "d02b4508df58432fbb84e800597b8959",
        input
    ).then(data => res.json(data))
    .catch(err => res.status(400).json('API not working'));
}

export default { handleApi };