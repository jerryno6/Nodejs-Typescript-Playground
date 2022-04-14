import { ContentColumns, TDocumentDefinitions } from "pdfmake/interfaces";
import { resourceUsage } from "process";

function getHeader(teNumber:any, goodsType:string): ContentColumns {
    let result: ContentColumns = {
    	columns: [
            {
                alignment: 'left',
        		text: `TE-Number: ${teNumber}`,
                style: 'header'
            },	
    	]
	}

	if (goodsType === 'ADVERTISING'){
		result.columns.push(
			{
				alignment: 'left',
				text: 'ACHTUNG! Eilige Werbeware',
				style: 'warning'
			}
		)
	}

	return result;
}

function getDate(date:Date, advertisingPlanId:string): ContentColumns{
    let result: ContentColumns = {
    	columns: [
            {
                alignment: 'left',
        		text: [
					{text: 'Datum: ', style: 'subheader'},
					{text: date.toLocaleDateString("de-DE")}
				],
            },
        	
    	]
	}

	if(advertisingPlanId){
		result.columns.push(
			{
				alignment: 'left',
				text: `Werbeplannummer: ${advertisingPlanId}`,
				style: 'advertising'
			}
		);
	}

	return result;
}

function getSender(calendarWeek:string): ContentColumns{
	let result:ContentColumns = {
    	columns: [
            {
                alignment: 'left',
        		text: "Absender: ",
                style: 'subheader'
            }, 	
    	]
	}
	
	if(calendarWeek){

		result.columns.push({
        	    alignment: 'left',
        		text: `Kalenderwoche: ${calendarWeek}`,
        		style: 'advertising'
        	}
		);
	}
	
	return result;
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
		text: 'Anshrift:',
		style: 'subheader'
    }    
}

function getTotalItems(total:any){
    return {
        text: [
		    {text: 'Gesamtanzahl: ', style: 'subheader'},
            {text: total}
	    ]
	}
}

function getNameOfTargetPhotoStudio(location:any){
    return {
        text: [
            {text: 'Fotomuster für: ', style: 'subheader'},
            {text: `${location.displayName} (${location.id})`}
        ]
    }
    //'Orendt Studios GmbH (0925000)'
}

function getTable(articles:any){
    // Header of table
    let tableBody = [
            [
                {text: '#', style: 'tableHeader'}, 
                {text: 'Gtin', style: 'tableHeader'}, 
                {text: 'Artikelbeschreibung', style: 'tableHeader'}
            ]
        ];
        
    // content of table
    for (let i = 0; i < articles.length; i++) {
        tableBody.push(
            [{text:i+1, alignment:'center'}, articles[i].gtin, articles[i].title]
        );
    }
    
    let table = {
		style: 'table',
		table: {
            widths: [30, 110, '*'],
            body: tableBody
		}
    }
    
    return table;
}

function getPackedBy(packedBy:string){
    return {
	    text: [
	        {text: 'Verpackt durch: ', style: 'subheader'},
	        {text: packedBy}
	    ]
	}
}

// bind data to transportUnitTemplate and return docDefinition
export function getTranportUnitDocDefinition(data:any): TDocumentDefinitions
{
    return {
    	content: [
            getHeader(data.fmaRequestId, data.goodsType), '\n',
            
            getDate(new Date(), data.advertising.advertisingPlanId),'\n',
    		
    		getSender(data.advertising.calendarWeek),
    		getGermanAddress(data.senderLocation),'\n',
    		
    		getRecipient(),
    		getGermanAddress(data.targetLocation),'\n',
    		
    		getTotalItems(data.articles.length), '\n',
    		
    		getNameOfTargetPhotoStudio(data.targetLocation),'\n',
    		
    		getTable(data.articles),'\n',
    		
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
    		table: {
    			
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
