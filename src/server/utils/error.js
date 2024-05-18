/*
IT21833366
wijerathna G.D.K
AF-assignment-01
React-Frontend-Application-Using-NASA-APIs
 */
export const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message =  message;
    return error;
};