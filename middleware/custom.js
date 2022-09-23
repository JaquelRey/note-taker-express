//logging type and path of each request

const custom = (req, res, next) => {
    switch (req.method) {
        case 'GET': {
            console.info(`${req.method} request to ${req.path}`);
            break;
        }
        case 'POST': {
            console.info(`${req.method} request to ${req.path}`);
            break;
        }
        case 'DELETE': {
            console.info(`${req.method} request to ${req.path}`);
            break;
        }
        default:
            console.log(`${req.method} request to ${req.path}`);
    }

    next();
}

exports.custom = custom