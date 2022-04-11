import { ContentColumns, TDocumentDefinitions } from "pdfmake/interfaces";

function getHeader(teNumber:any): ContentColumns {
    return {
    	columns: [
            {
                alignment: 'left',
        		text: `TE-Number: ${teNumber}`,
                style: 'header'
            },
        	{
        	    alignment: 'right',
        		text: 'ACHTUNG! Eilige Werbeware',
        		style: 'warning'
        	}
    	]
	}
}

function getDate(date:Date){
    return {
		text: [
		    {text: 'Datum: ', style: 'subheader'},
    		{text: date.toLocaleDateString("de-DE")}
	    ]
	}
}

function getSender(){
	return {
		text: 'Absender:',
		style: 'subheader'
	}
}

function getGermanAddress(location:any){
    var address = location.address1 + '\n';
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
    var tableBody = [
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
    
    var table = {
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
            getHeader(data.fmaRequestId), '\n',
            
            getDate(new Date()),'\n',
    		
    		getSender(),
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
