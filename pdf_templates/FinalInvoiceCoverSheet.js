const getFinalInvoiceCoverSheetData = (data)=> {    
    return (
        `<html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <title> Order confirmation </title>
            <meta name="robots" content="noindex,nofollow">
            <meta name="viewport" content="width=device-width; initial-scale=1.0;">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap" rel="stylesheet">
            <link href="https://fonts.cdnfonts.com/css/arial-2" rel="stylesheet">
            <style type="text/css">
                @import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700);
        
                body {
                    margin: 0;
                    padding: 0;
                    background: #e1e1e1;
                }
        
                div,
                p,
                a,
                li,
                td {
                    -webkit-text-size-adjust: none;
                }
        
        
                body {
                    width: 100%;
                    height: 100%;
                    background-color: #e1e1e1;
                    margin: 0;
                    padding: 0;
                    -webkit-font-smoothing: antialiased;
                }
        
                html {
                    width: 100%;
                }
        
                ul.list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    justify-content: start;
                }
        
                ul.list li {
                    min-width: 80px;
                }
            </style>       
        
            <!-- Header -->
        </head>       
        <body>
            <table width="800" border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#ffffff"
                style=" height: 100%;  ">
                <tbody>
        
                    <tr>
                        <td>
                            <table width="750" border="0" style=" border: 1px solid #5f5f5f; padding: 20px;" cellpadding="0"
                                cellspacing="0" align="center">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table border="0" cellpadding="0" cellspacing="0" align="right">
                                                <tbody>
                                                    <tr>
                                                        <td align="right"
                                                            style="font-size: 18px;font-weight: 600; color: #5f5f5f; font-family: 'Roboto Slab', serif; line-height: 18px; vertical-align: top; text-align: right; ">
                                                            FINAL INVOICE</td>
        
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table border="0" cellpadding="3" cellspacing="0" align="center"
                                                style="margin-top: 40px;">
                                                <tbody>
                                                    <tr>
                                                        <td align="right"
                                                            style="font-size: 26px;font-weight: 600; color: #5f5f5f; font-family: 'Roboto Slab', serif; line-height: 26px; vertical-align: top; text-align: center; ">
                                                            Body Shop Name</td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right"
                                                            style="padding-top: 15px; font-size: 19px;font-weight: 600; color: #5f5f5f; font-family: 'Roboto Slab', serif; line-height: 19px; vertical-align: top; text-align: center; ">
                                                            Address</td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right"
                                                            style="font-size: 19px;font-weight: 600; color: #5f5f5f; font-family: 'Roboto Slab', serif; line-height: 19px; vertical-align: top; text-align: center; ">
                                                            City State, Zip Code</td>
                                                    </tr>
                                                    <tr>
                                                        <td align="right"
                                                            style="font-size: 19px;font-weight: 600; color: #5f5f5f; font-family: 'Roboto Slab', serif; line-height: 19px; vertical-align: top; text-align: center; ">
                                                            Phone</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table border="0" cellpadding="0" cellspacing="0"
                                                style="padding-top: 20px;width: 100%;vertical-align: middle;">
                                                <tbody style="width: 100%;">
                                                    <tr style="width: 100%;">
                                                        <td style="width: 100%;">
                                                            <hr style="width: 100%;" />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table border="0" cellpadding="0" cellspacing="0"
                                                style="padding-top: 20px;text-align: left; width: 100%;vertical-align: middle;">
                                                <tbody>
                                                    <tr>
                                                        <th style="font-size: 13px;font-family: 'Open Sans', sans-serif;background-color: #dddddd; color: #5f5f5f; font-weight: 600;  vertical-align: middle; padding:5px 10px;width: 500px;text-align: left;"
                                                            align="center">
                                                            Customer First & Last Name
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Open Sans', sans-serif;background-color: #dddddd; color: #5f5f5f; font-weight: 600;  vertical-align: middle; padding:5px 10px;text-align: left;width: 500px;border-left: 0.5px dotted black;"
                                                            align="center">
                                                            Repair Order: 5f5f5f
                                                        </th>
        
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #5f5f5f; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;">
                                                            Address
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #5f5f5f; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;border-left: 0.5px dotted black;">
                                                            <span style="width: 100px;display: inline-block;">Customer #:</span> First Name Last Name
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #5f5f5f; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;">
                                                            <span style="width: 100px;display: inline-block;">Indore</span>
                                                            <span style="width: 100px;display: inline-block;border-left: 0.5px dotted black;padding-left: 5px;">Kansas</span>
                                                            <span style="border-left: 0.5px dotted black;padding-left: 5px;">Zip Code</span>
        
                                                        </td>
        
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #5f5f5f; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;border-left: 0.5px dotted black;">
                                                            <span style="width: 100px;display: inline-block;">Open Date:</span> 07/05/2024
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #5f5f5f; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;">
                                                            Email: ${process.env.GMAIL_USER}
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #5f5f5f; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;border-left: 0.5px dotted black;">
                                                            <span style="width: 100px;display: inline-block;">Closed Date:</span> 07/05/2024
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #5f5f5f; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;border-bottom: 0.5px dotted black;">
                                                            <span style="width: 190px;display: inline-block;">Phone :
                                                                900-938-2820</span>
                                                            <span style="border-left: 0.5px dotted black;padding-left: 5px;">Phone 2 : 123-456-7893</span>
                                                        </td>
                                                        <td align="center"
                                                        style="font-size: 14px;font-weight: normal; color: #5f5f5f; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;border-left: 0.5px dotted black;border-bottom: 0.5px dotted black;">
                                                        
                                                    </td>
                                                    </tr>
        
                                                </tbody>
                                            </table>
                                            <table border="0" cellpadding="0" cellspacing="0"
                                                style="padding-top: 20px;width: 100%;vertical-align: middle;">
                                                <tbody style="width: 100%;">
                                                    <tr style="width: 100%;">
                                                        <td style="width: 100%;">
                                                            <hr style="width: 100%;" />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table border="0" cellpadding="0" cellspacing="0"
                                                style="padding-top: 20px;text-align: left; width: 100%;vertical-align: middle;">
                                                <tbody>
                                                    <tr>
                                                        <th style="font-size: 13px;font-family: 'Open Sans', sans-serif;background-color: #dddddd; color: #5f5f5f; font-weight: 600;  vertical-align: middle; padding:5px 10px;width: 500px;text-align: left;"
                                                            align="center">
                                                            VIN-5f5f5f5f5f5f0
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Open Sans', sans-serif;background-color: #dddddd; color: #5f5f5f; font-weight: 600;  vertical-align: middle; padding:5px 10px;text-align: left;width: 500px;"
                                                            align="center">
                                                            Insurance Name
                                                        </th>
        
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #5f5f5f; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;border-bottom: 1px solid #ddd;">
                                                            <ul class="list">
                                                                <li>YYYY</li>
                                                                <li>Make</li>
                                                            </ul>
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #5f5f5f; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;border-bottom: 1px solid #ddd;">
                                                            <ul class="list">
                                                                <li>Claim #:</li>
                                                                <li>Claim #</li>
        
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #5f5f5f; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;border-bottom: 1px solid #ddd;">
                                                            Model
                                                        </td>
        
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #5f5f5f; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;border-bottom: 1px solid #ddd;">
                                                            Insurance Phone
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #5f5f5f; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;border-bottom: 1px solid #ddd;">
                                                            <ul class="list">
                                                                <li>Mileage In</li>
                                                                <li>25</li>
                                                                <li>Mileage Out</li>
                                                                <li>215</li>
                                                            </ul>
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #5f5f5f; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;border-bottom: 1px solid #ddd;">
                                                            Insurance Adjuster
                                                        </td>
                                                    </tr>
        
                                                </tbody>
                                            </table>
                                            <table border="0" cellpadding="0" cellspacing="0"
                                                style="padding-top: 20px;width: 100%;vertical-align: middle;">
                                                <tbody style="width: 100%;">
                                                    <tr style="width: 100%;">
                                                        <td style="width: 100%;">
                                                            <hr style="width: 100%;" />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table border="0" cellpadding="3" cellspacing="0" align="center"
                                                style="margin-top: 20px;">
                                                <tbody>
                                                    <tr>
                                                        <td align="right"
                                                            style="font-size: 17px;font-weight: 600; color: #5f5f5f; font-family: 'Open Sans', sans-serif; line-height: 17px; vertical-align: top; text-align: center; ">
                                                            THANK YOU</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table border="0" cellpadding="3" cellspacing="0" align="center"
                                                style="margin-top: 40px;">
                                                <tbody>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 16px;font-weight: 400; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 18px; vertical-align: top; text-align: left; ">
                                                            Dear Manash Patidar,</td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            style="font-size: 15px;font-weight: 400; color: #5f5f5f;  font-family: 'Arial', sans-serif; padding-top: 40px; line-height: 20px; vertical-align: top; text-align: left; ">
                                                            Thank you for choosing our automotive repair company. We appreciate
                                                            your trust and confidence in our expertise.
                                                            Your satisfaction and peace of mind are our top priorities, and we
                                                            are committed to providing you with the highest quality of service
                                                            and support.Should you have any questions or need further
                                                            assistance, please do not hesitate to contact us.
        
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="padding-top: 60px; font-size: 15px;font-weight: 400; color: #5f5f5f;  font-family: 'Arial', sans-serif; line-height: 18px; vertical-align: top; text-align: left; ">
                                                            Sincerely,</td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            style="padding-top: 30px;font-size: 15px;font-weight: 400; color: #5f5f5f;  font-family: 'Arial', sans-serif; line-height: 18px; vertical-align: top; text-align: left; ">
                                                            Repair Shop Name
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
        
        
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            style="padding-top: 60px;font-size: 9px;font-weight: 400; color: #5f5f5f;  font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top; text-align: center; ">
                                            Page 1 of 2 6/9/2024 8:22:02 PM <br />
                                            Customer First & Last Name Repair Order: 0000 <br />
                                            <span style="font-size: 9px;font-weight: 600;color: #5f5f5f;">Powered by
                                                CollisionMateX</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>        
        </body>        
        </html>`
    )
    
}
module.exports =getFinalInvoiceCoverSheetData;