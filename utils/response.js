function successResponse(data, msg = '') {
    return { code: 0, msg: msg, data: data }
}
module.exports = successResponse;