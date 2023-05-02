const urls = new Map();
//update
function generateShortId() {
    return new Date().getTime().toString(36);
}

module.exports = async function (context, req) {
    const { longUrl } = req.body;
    const shortId = generateShortId();
    urls.set(shortId, longUrl);

    context.res = {
        status: 200,
        body: {
            shortUrl: `https://${req.headers.host}/api/RedirectToUrl/${shortId}`
        }
    };
};
