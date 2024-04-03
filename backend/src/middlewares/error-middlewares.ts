// Error handling middleware function
export const errorHandler = (err, req, res, next) => {
    console.error("Error occurred from middlewarefunction:", err);
    res.status(500).json({ error: "Internal Server Error shown from middleware" });
};

// Not found middleware function
export const notFoundHandler = (req, res, next) => {
    res.status(404).json({ error: "Not Found" });
};

