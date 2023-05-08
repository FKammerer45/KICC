module.exports = async function (context, req) {
    const { longUrl } = req.body;

    if (!longUrl) {
        context.log('No longUrl found in the request body');
        context.res = {
            status: 400,
            body: 'Please provide a longUrl in the request body'
        };
        return;
    }

    const shortId = Math.random().toString(36).substring(2, 7);
    context.log(`Generated shortId: ${shortId}`);
    context.log(`longurl: ${longUrl}`);

    context.log('Preparing outputTable bindings');
    context.log(`PartitionKey: URLs`);
    context.log(`RowKey: ${shortId}`);
    context.log(`LongUrl: ${longUrl}`);

    context.bindings.tableBinding = [];

    context.bindings.tableBinding.push ({
        PartitionKey: "URLs",
        RowKey: shortId.toString(),
        LongUrl: longUrl.toString()
    });
    context.log('Assigned outputTable bindings');

    context.res = {
        status: 200,
        body: {
            shortUrl: `https://${req.headers.host}/api/RedirectToUrl/${shortId}`
        }
    };
    context.log('Assigned response object');
};
