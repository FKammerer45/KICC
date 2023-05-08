module.exports = async function (context, req) {
    const longUrl = context.bindings.urlMapping?.LongUrl;

    if (longUrl) {
        context.res = {
            status: 302,
            headers: {
                'Location': longUrl
            },
            body: {}
        };
    } else {
        context.res = {
            status: 404,
            body: 'URL not found'
        };
    }
};
