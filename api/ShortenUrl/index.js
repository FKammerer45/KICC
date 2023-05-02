const { v4: uuidv4 } = require('uuid');

const urls = new Map();

module.exports = async function (context, req) {
    const { longUrl } = req.body;
    const shortId = uuidv4().substring(0, 7);
    urls.set(shortId, longUrl);

    context.res = {
        status: 200,
        body: {
            shortUrl: `https://${req.headers.host}/api/RedirectToUrl/${shortId}`
        }
    };
};
