const urls = new Map();
//update
module.exports = async function (context, req) {
    const { id } = context.bindingData;
    const longUrl = urls.get(id);

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
