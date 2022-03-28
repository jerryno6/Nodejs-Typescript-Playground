import { APIGatewayProxyResult } from 'aws-lambda';

export function GetSuccessResponse(body: any): APIGatewayProxyResult {
    let response: APIGatewayProxyResult;

    response = {
        statusCode: 200,
        body: JSON.stringify(body),
    };

    return response;
}


export function GetErrorResponse(body: any = null): APIGatewayProxyResult {

    let response: APIGatewayProxyResult;
    body.message = 'some error happened';

    response = {
        statusCode: 500,
        body: JSON.stringify(body),
    };

    return response;
}

export default Response;