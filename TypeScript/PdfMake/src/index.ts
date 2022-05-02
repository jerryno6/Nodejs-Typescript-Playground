import { getOrderTemplateDocDefinition } from './orderTemplate';
import pdfFonts from "pdfmake/build/vfs_fonts";
import pdfMake from 'pdfmake/build/pdfmake';

//Mock data
const transportUnitData = {
    fmaRequestId: '1HTE4TDFGEFEF2D',
    goodsType: 'ADVERTISING',
    senderLocation: {
        id: '0304000',
        type: 'HEADQUATER',
        displayName: 'My Studio',
        address1: 'My Studio Bmbh',
        address2: 'ABC department',
        street: 'Orange str',
        houseNumber: '21',
        zipCode: '123454',
        city: 'Vogelheim',
        email: 'abc@abc.com',
        contactPerson: 'Tom',
        startDate: '23/2/2022',
        endDate: '23/2/2022',
    },
    targetLocation: {
        id: '0979000',
        type: 'PHOTOSTUDIO',
        displayName: 'ABC PhotoStudio',
        address1: 'ABC Studio Bmbh',
        address2: null,
        street: 'Orange str',
        houseNumber: '21',
        zipCode: '123454',
        city: 'Essen',
        email: 'abc@abc.com',
        contactPerson: 'Tom',
        startDate: '23/2/2022',
        endDate: '23/2/2022',
    },
    packedBy: 'abc@gmail.com',
    articles: [
        { gtin:'1234567801234', title:'Product 1', advertisingPlanId: "2022-000019", calendarWeek: "19/2019"},
        { gtin:'8763251359235', title:'Product 2', advertisingPlanId: "2022-000019", calendarWeek: "19/2019" },
    ]
}


let docDefinition= getOrderTemplateDocDefinition(transportUnitData);
pdfMake.vfs = pdfFonts.pdfMake.vfs;
let fileName = 'basics.pdf'
let pdf = pdfMake.createPdf(docDefinition) 

//1. if we want to save to file, use lines below
import fs from 'fs';
pdf.getBuffer((buffer)=>{
    fs.writeFile(fileName, buffer, error => { if(error) console.log(error)})
    console.log('file has been generated');
});

/*
2. we want to save to s3, use lines below

import awss3 from 'aws-sdk/clients/s3';
import stream from 'stream';

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

const bucket = 'arn:aws:s3:eu-central-1:085420227850:accesspoint/vuleaccesspoint'
const awsFileName = `pdfs/file-${Date.now()}.pdf`
let s3OutputStream = getS3OutputStream(bucket, awsFileName);
var pdfStream = pdf.getStream()
pdfStream.pipe(s3OutputStream);
pdfStream.end();
*/