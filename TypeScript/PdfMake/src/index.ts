import * as fs from 'fs';
import PdfPrinter from 'pdfmake';

var fonts = {
	Roboto: {
		normal: 'D:\\PROJECTS\\GITHUB\\Node-TypeScript\\TypeScript\\PdfMake\\dist\\fonts\\Roboto-Regular.ttf',
	}
};

var printer = new PdfPrinter(fonts);

var docDefinition = {
	content: [
		'First paragraph',
		'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
	]
};

let fileName = './basics.pdf'
var pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream(fileName));
pdfDoc.end();

console.log(`created pdfkit doc at ${fileName}`);