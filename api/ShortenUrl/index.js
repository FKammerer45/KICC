module.exports = async function (context, req) {
    const { longUrl } = req.body;
    const shortId = Math.random().toString(36).substr(2, 7);

    console.log(`PartitionKey: URLs, RowKey: ${shortId}, LongUrl: ${longUrl}`);

    context.bindings.outputTable = {
        PartitionKey: "URLs",
        RowKey: shortId,
        LongUrl: longUrl
    };

    context.res = {
        status: 200,
        body: {
            shortUrl: `https://${req.headers.host}/api/RedirectToUrl/${shortId}`
        }
    };
};
