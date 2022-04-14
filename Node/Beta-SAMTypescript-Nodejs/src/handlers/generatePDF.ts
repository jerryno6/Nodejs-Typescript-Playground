import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { GetErrorResponse, GetSuccessResponse } from '../utils/Response';
import PdfPrinter from 'pdfmake';
import stream from 'stream';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

function generateDocDefinition() {
    let docDefinition = {
        content: [
            'First paragraph',
            'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
        ]
    };

    return docDefinition;
}


function getS3OutputStream(bucket: string, key: string) {
    var passthroughStream = new stream.PassThrough();
    var params:awss3.PutObjectRequest = {
        Bucket: bucket, 
        Key: key, 
        Body: passthroughStream};
        
    let s3 = new awss3();
    s3.upload(params, function(err, data){ 
        if(err){
            console.log('!!! ERROR !!!');
            console.log(err, data);            
        }
        else{
            console.log(data);
        }
    });
  
    return passthroughStream;
}
export const generatePDF = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {

        let body = {
            url : 'https://google.com'
        }; 

        response = GetSuccessResponse(body);
    } catch (err) {
        console.log(err);

        let body = { err };
        response = GetErrorResponse(body);
    }

    return response;
};
