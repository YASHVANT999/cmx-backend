const fs = require('fs');
const path = require("path");
const mammoth = require('mammoth');
const puppeteer = require('puppeteer');
const getWindShieldQaData = require("../pdf_templates/Windshield _QA");
const getWindShieldData = require("../pdf_templates/CheckInWindshield");
const getCheckInKeyTag3_4Data = require("../pdf_templates/CheckInKeyTag3_4");
const getFinalInvoiceCoverSheetData = require("../pdf_templates/FinalInvoiceCoverSheet");
const getFinalInvoiceWarrantyData = require("../pdf_templates/FinalInvoiceWarranty");
const getFinalInvoiceEstimateData = require("../pdf_templates/FinalInvoiceEstimate");


async function convertHtmlToPdf(outputPath,htmlDyanmicData,htmltype) {    
    let getContent ="";
    if(htmltype === "windShieldQa"){
        let getWindShieldQaDataContent = getWindShieldQaData(htmlDyanmicData);
        getContent=getWindShieldQaDataContent;

    }else if(htmltype === "windShield"){
        let getWindShieldDataContent = getWindShieldData(htmlDyanmicData); 
        getContent=getWindShieldDataContent;

    }else if(htmltype === "CheckInKeyTag3_4"){
        let getCheckInKeyTag3_4DataContent = getCheckInKeyTag3_4Data(htmlDyanmicData);    
        getContent=getCheckInKeyTag3_4DataContent;

    }else if(htmltype === "FinalInvoiceCoverSheet"){
        let getFinalInvoiceCoverSheetDataContent = getFinalInvoiceCoverSheetData(htmlDyanmicData);
        getContent=getFinalInvoiceCoverSheetDataContent;

    }else if(htmltype === "FinalInvoiceWarranty"){
        let getFinalInvoiceWarrantyDataContent = getFinalInvoiceWarrantyData(htmlDyanmicData);
        getContent=getFinalInvoiceWarrantyDataContent;

    }else if(htmltype === "FinalInvoiceEstimate"){
        let getFinalInvoiceEstimateDataContent = getFinalInvoiceEstimateData(htmlDyanmicData);
        getContent=getFinalInvoiceEstimateDataContent;
    }
    
    try {
        if(getContent){
            // const outputPath =path.join(__dirname, `../public/docsFile/windShieldQa.pdf`);
            const browser = await puppeteer.launch({
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                headless: 'new'
            });
            const page = await browser.newPage(); 
            await page.setContent(getContent);

            const pdfBuffer = await page.pdf({
                path:outputPath,
                format:"A4",
                printBackground:true
            })
            await browser.close();
    
            console.log(`PDF saved to ${outputPath}`);
        }        
 
     } catch (error) {
         console.error('Error converting DOCX to PDF:', error);
     }
}

const documentPdfConverterContoller = async (req, res) => {
    console.log("documentPdfConverterContoller");
    let getWindShieldQaDataContent = getWindShieldQaData();
    let getFinalInvoiceCoverSheetDataContent = getFinalInvoiceCoverSheetData();
    try {
        const outputPath =path.join(__dirname, `../public/docsFile/windShieldQa.pdf`);
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            headless: 'new'
        });
        const page = await browser.newPage(); 
        await page.setContent(getWindShieldQaDataContent);

        const pdfBuffer = await page.pdf({
            path:outputPath,
            format:"A4",
            printBackground:true
        })
        await browser.close();

        res.status(200).json({
            success: true,
            msg: "Documents has been converted !!!!!!!!!",
            data: pdfBuffer,
        });
    } catch (err) {
        console.error('Error generating PDF:', err);
        res.status(500).send('Internal Server Error');
    }
    
  // Example usage
    // const inputPath = process.env.BACK_LINK + "docsFile/FinalInvoice-Warranty.docx";
    /* const inputPath = path.join(
        __dirname,
        `../public/docsFile/FinalInvoice-Warranty.docx`
      );
    const outputPath =path.join(
    __dirname,
    `../public/docsFile/output.pdf`
    );
    convertDocxToPdf(inputPath, outputPath); */
    
    
};

module.exports = {
    documentPdfConverterContoller,
    convertHtmlToPdf
};
