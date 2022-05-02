import { ContentColumns, TDocumentDefinitions } from "pdfmake/interfaces";

function getHeader(teNumber:any, isAdvertising:boolean): ContentColumns {
    let result: ContentColumns = {
    	columns: [
            {
                alignment: 'left',
        		text: `ID: ${teNumber}`,
                style: 'header'
            },	
    	]
	}

	if (isAdvertising){
		result.columns.push(
			{
				alignment: 'left',
				text: 'URGENT',
				style: 'warning'
			}
		)
	}

	return result;
}

function getDate(date:Date){
    return {
		text: [
			{text: 'Date: ', style: 'subheader'},
			{text: date.toLocaleDateString("de-DE")}
		],
	}
}

function getSender(){
    return {
		text: "Sender",
		style: 'subheader'
	} 	
}

function getGermanAddress(location:any){
    let address = location.address1 + '\n';
    if(location.address2)
    {
        address += location.address2 + '\n' 
    }
    
    address += `${location.street} . ${location.houseNumber} \n ${location.zipCode} ${location.city}`;
    
    return address;
}

function getRecipient(){
    return {
		text: 'Receiver',
		style: 'subheader'
    }    
}

function getTotalItems(total:any){
    return {
        text: [
		    {text: 'Total items: ', style: 'subheader'},
            {text: total}
	    ]
	}
}

function getNameOfTargetPhotoStudio(location:any){
    return {
        text: [
            {text: 'Office Name: ', style: 'subheader'},
            {text: `${location.displayName} (${location.id})`}
        ]
    }
    //'Orendt Studios GmbH (0925000)'
}

function getTable(articles:any, isAdvertising:boolean){
	let tableBody = [];

    // Header of table
	let tableHeader = 
		[
			{text: '#', style: 'tableHeader'}, 
			{text: 'ProductId', style: 'tableHeader'}, 
			{text: 'Description', style: 'tableHeader'}
		]
	
	if(isAdvertising){
		tableHeader.push({text: 'Plan', style: 'tableHeader'})
	}
	tableBody.push(tableHeader)

    // content of table
    for (let i = 0; i < articles.length; i++) {
		let aRow = 
            [
				{ text:i+1, style: 'tableCellCenter' },
				{ text: articles[i].gtin, style: 'tableCell' },
				{ text: articles[i].title, style: 'tableCell' },
			]

		if(isAdvertising){
			aRow.push({ text: `${articles[i].advertisingPlanId}\n${articles[i].calendarWeek}`, style: 'tableCellCenter' })
		}
		
        tableBody.push(aRow);
    }
  
	// Define amount of columns and width
	let tableColumns = [30, 110, '*']
	if(isAdvertising){
		tableColumns.push('auto')
	}

	// Define table with columns & contents
    let table = {
		style: 'table',
		table: {
            widths: tableColumns,
            body: tableBody
		}
    }
    
    return table;
}

function getPackedBy(packedBy:string){
    return {
	    text: [
	        {text: 'Order by: ', style: 'subheader'},
	        {text: packedBy}
	    ]
	}
}

// bind data to getOrderTemplate and return docDefinition
export function getOrderTemplateDocDefinition(data:any): TDocumentDefinitions
{
	let isAdvertising = data.goodsType === 'ADVERTISING'
    return {
    	content: [
            getHeader(data.fmaRequestId, isAdvertising), '\n',
            
            getDate(new Date()),'\n',
    		
    		getSender(),
    		getGermanAddress(data.senderLocation),'\n',
    		
    		getRecipient(),
    		getGermanAddress(data.targetLocation),'\n',
    		
    		getTotalItems(data.articles.length), '\n',
    		
    		getNameOfTargetPhotoStudio(data.targetLocation),'\n',
    		
    		getTable(data.articles, isAdvertising),'\n',
    		
            getPackedBy(data.packedBy),
    	],
    	
    	styles: {
    	    warning:{
    	        fontSize: 16,
    	        color: 'red',
    	    },
    	    advertising:{
    	        fontSize: 13,
    	        color: 'red',
    	    },
    		header: {
    			fontSize: 13,
    			bold: true,
                color: 'gray',
    		},
    		subheader: {
    			fontSize: 13,
    			bold: true,
    		},
    		tableCell: {
				alignment: 'left',
    			margin: [2,0,2,0],
    		},
    		tableCellCenter: {
				alignment: 'center',
    			margin: [2,0,2,0],
    		},
    		tableHeader: {
    		    alignment: 'center',
    			bold: true,
    			fontSize: 13,
    			color: 'black'
    		}
    	}
	
    }
}
