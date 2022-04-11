import { getTranportUnitDocDefinition } from './transportUnitTemplate';
import * as fs from 'fs';
import PdfPrinter from 'pdfmake';
import { Column, Content, ContentColumns, DynamicBackground, DynamicContent, Margins, Node, PageOrientation, PageSize, PDFVersion, Style, StyleDictionary, TDocumentDefinitions, TDocumentInformation, Watermark } from 'pdfmake/interfaces';

var fonts = {
	Roboto: {
		normal: './fonts/Roboto-Regular.ttf',
		bold: './fonts/Roboto-Medium.ttf',
	}
};

//Mock data
const transportUnitData = {
    fmaRequestId: '1HTE4TDFGEFEF2D',
    goodsType: 'ADVERTISING',
    senderLocation: {
        id: '0304000',
        type: 'HEADQUATER',
        displayName: 'Vogelheim Studio',
        address1: 'Vogelheim Studio Bmbh',
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
        displayName: 'Zummeo',
        address1: 'Zummeo Studio Bmbh',
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
        { gtin:'1234567801234', title:'MANGUUN Rock, Animal Print, Gummibund, fr Damen' },
        { gtin:'4252124352', title:'test title' },
    ]
}


var docDefinition= getTranportUnitDocDefinition(transportUnitData);
var printer = new PdfPrinter(fonts);
let fileName = './basics.pdf'
var pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream(fileName));
pdfDoc.end();

console.log(`created pdfkit doc at ${fileName}`);