import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { GetErrorResponse, GetSuccessResponse } from '../utils/Response';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const getTodo = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
        let body = [
            { id: 1, task: 'task 1' },
            { id: 2, task: 'task 2' },
            { id: 3, task: 'task 3' },
        ];

        response = GetSuccessResponse(body);
    } catch (err) {
        console.log(err);

        let body = { err };
        response = GetErrorResponse(body);
    }

    return response;
};
