module.exports.responseWith = ({
    response, value=null,
    error=null, headers={},
}) => {
    let result = {}
    if (value) {
        result["value"] = value;
    }

    result["code"] = response["code"];

    if (error) {
        result["error"] = error;
    }

    headers["Content-Type"] = "application/json";
    headers["Access-Control-Allow-Origin"] = "*";
    headers["server"] = "NodeJS REST API";
    return [
        result,
        response["status"],
        headers
    ]
}

module.exports.INVALID_FIELD_NAME_SENT_422 = {
    "status": 422,
    "code": "invalidField",
    "message": "Invalid fields found"
}

module.exports.INVALID_INPUT_422 = {
    "status": 422,
    "code": "invalidInput",
    "message": "Invalid input"
}

module.exports.MISSING_PARAMETERS_422 = {
    "status": 422,
    "code": "missingParameter",
    "message": "Missing parameters."
}

module.exports.BAD_REQUEST_400 = {
    "status": 400,
    "code": "badRequest",
    "message": "Bad request"
}

module.exports.SERVER_ERROR_500 = {
    "status": 500,
    "code": "serverError",
    "message": "Server error"
}

module.exports.SERVER_ERROR_404 = {
    "status": 404,
    "code": "notFound",
    "message": "Resource not found"
}

module.exports.FORBIDDEN_403 = {
    "status": 403,
    "code": "notAuthorized",
    "message": "You are not authorised to execute this."
}

module.exports.UNAUTHORIZED_401 = {
    "status": 401,
    "code": "notAuthorized",
    "message": "Invalid authentication."
}

module.exports.NOT_FOUND_HANDLER_404 = {
    "status": 404,
    "code": "notFound",
    "message": "route not found"
}

module.exports.SUCCESS_200 = {
    'status': 200,
    'code': 'success',
}

module.exports.SUCCESS_201 = {
    'status': 201,
    'code': 'success'
}

module.exports.SUCCESS_204 = {
    'status': 204,
    'code': 'success'
}
