// Error handling middleware function
export const errorHandler = (err, req, res, next) => {
    console.error("Error occurred from middlewarefunction:", err);
    
    let errorMessage;
    switch (err.status) {
        case 400:
            errorMessage = "Bad Request";
            break;
        case 401:
            errorMessage = "Unauthorized";
            break;
        case 403:
            errorMessage = "Forbidden";
            break;
        case 404:
            errorMessage = "Not Found";
            break;
        case 500:
            errorMessage = "Internal Server Error";
            break;
        default:
            errorMessage = "unkown error";
    }

    res.status(err.status || 500).json({ error: errorMessage });
};

// Not found middleware function
// export const notFoundHandler = (req, res, next) => {
//     res.status(404).json({ error: "Not Found" });
// };

