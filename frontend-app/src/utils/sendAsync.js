export const sendAsync = (provider, { method,params,from,}, cb) => {
    console.log("sendAsync");
    return provider.sendAsync(
        {
            method,
            params,
            from,
        },
        function (err, result) {
            if (err) return console.dir(err);
            if (result.error) {
            alert(result.error.message);
            }
            if (result.error) return console.error('ERROR', result);
            console.log('TYPED SIGNED:' + JSON.stringify(result.result));
            cb()
        },
    );
};
