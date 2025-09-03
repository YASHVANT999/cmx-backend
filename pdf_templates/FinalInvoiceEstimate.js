const getFinalInvoiceEstimateData = (data)=> {    
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
                            <table width="750" border="0" style=" border: 1px solid #5f5f5f; padding:40px 20px;" cellpadding="0"
                                cellspacing="0" align="center">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table border="0" cellpadding="0" cellspacing="0" align="right">
                                                <tbody>
                                                    <tr>
                                                        <td align="right"
                                                            style="font-size: 22px;font-weight: 600; color: #000000; font-family: 'Roboto Slab', serif; line-height: 18px; vertical-align: top; text-align: right; ">
                                                            Final Invoice</td>
        
                                                    </tr>
                                                </tbody>
                                            </table>
        
        
                                            <table border="0" cellpadding="0" cellspacing="0"
                                                style="margin-top: 60px;text-align: left; width: 100%;vertical-align: middle;border: 0.1px dashed #c5c5c5;">
                                                <tbody>
                                                    <tr>
                                                        <th style="width: 15px; background-color: #808080;   padding:5px 10px; text-align: center;text-wrap: nowrap;"
                                                            align="center">
        
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Arial', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 10px; text-align: center;text-wrap: nowrap;"
                                                            align="center">
                                                            Type
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Arial', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 10px;text-align: center; border-left: 0.5px dotted black;"
                                                            align="center">
                                                            Description
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Arial', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 10px;text-align: center; border-left: 0.5px dotted black;"
                                                            align="center">
                                                            Title
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Arial', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 10px;text-align: center; border-left: 0.5px dotted black;text-wrap: nowrap;"
                                                            align="center">
                                                            Qty
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Arial', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 10px;text-align: center; border-left: 0.5px dotted black;text-wrap: nowrap;"
                                                            align="center">
                                                            Labor
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Arial', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 10px;text-align: center; border-left: 0.5px dotted black;text-wrap: nowrap;"
                                                            align="center">
                                                            Paint
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Arial', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 10px;text-align: center; border-left: 0.5px dotted black;text-wrap: nowrap;"
                                                            align="center">
                                                            Amount
                                                        </th>
        
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            01
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Type
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Description
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Title
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0.0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0.0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            $0.00
                                                        </td>
        
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            02
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Type
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Description
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Title
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0.0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0.0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            $0.00
                                                        </td>
        
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            03
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Type
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Description
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Title
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0.0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0.0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            $0.00
                                                        </td>
        
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            04
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Type
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Description
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Title
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0.0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0.0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            $0.00
                                                        </td>
        
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            05
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Type
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Description
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Title
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0.0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0.0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            $0.00
                                                        </td>
        
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            06
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Type
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Description
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Title
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0.0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0.0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            $0.00
                                                        </td>
        
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            08
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Type
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Description
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Title
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0.0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0.0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            $0.00
                                                        </td>
        
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            07
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Type
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Description
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Title
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0.0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0.0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            $0.00
                                                        </td>
        
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            09
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Type
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Description
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Title
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0.0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            0.0
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            $0.00
                                                        </td>
        
                                                    </tr>
        
                                                </tbody>
                                            </table>
                                            <table border="0" cellpadding="0" cellspacing="0"
                                            style="  text-align: left; width: 85%; margin: 20px auto 0; vertical-align: middle;border: 0.1px dashed #c5c5c5;">
                                            <tbody>
                                                <tr>
                                                    <th style="width: 10px; background-color: #808080;   padding:5px 10px; text-align: center;text-wrap: nowrap;"
                                                        align="center">
        
                                                    </th>
                                                    <th colspan="4" style="font-size: 13px;font-family: 'Arial', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 10px; text-align: center;text-wrap: nowrap;text-align: left;"
                                                        align="center">
                                                        Amount
                                                    </th> 
                                                </tr>
                                                <tr>
                                                    <td style="border-bottom: 1px dashed #5f5f5f;"></td>
                                                    <td align="center"
                                                        style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;">
                                                        Total Labor:
                                                    </td>
                                                    <td align="center"
                                                        style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left; ">
                                                        $0.00
                                                    </td>
                                                    <td align="center"
                                                        style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;border-left: 15px dashed #5f5f5f;">
                                                        Tax:
                                                    </td>
                                                   
                                                    <td align="center"
                                                        style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left; ">
                                                        $0.00
                                                    </td>
        
                                                </tr>
                                                <tr>
                                                    <td style="border-bottom: 1px dashed #5f5f5f;"></td>
                                                    <td align="center"
                                                        style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;">
                                                        Paint Supplies:
                                                    </td>
                                                    <td align="center"
                                                        style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left; ">
                                                        $0.00
                                                    </td>
                                                    <td align="center"
                                                        style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;border-left: 15px dashed #5f5f5f;">
                                                        Subtotal:
                                                    </td>
                                                   
                                                    <td align="center"
                                                        style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left; ">
                                                        $0.00
                                                    </td>
        
                                                </tr>
                                                <tr>
                                                    <td style="border-bottom: 1px dashed #5f5f5f;"></td>
                                                    <td align="center"
                                                        style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;">
                                                        Parts:
                                                    </td>
                                                    <td align="center"
                                                        style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left; ">
                                                        $0.00
                                                    </td>
                                                    <td align="center"
                                                        style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;border-left: 15px dashed #5f5f5f;">
                                                        Grand Total:
                                                    </td>
                                                   
                                                    <td align="center"
                                                        style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left; ">
                                                        $0.00
                                                    </td>
        
                                                </tr>
                                                <tr>
                                                    <td style="border-bottom: 1px dashed #5f5f5f;"></td>
                                                    <td align="center"
                                                        style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;">
                                                        Sublet | Misc:
                                                    </td>
                                                    <td align="center"
                                                        style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left; ">
                                                        $0.00
                                                    </td>
                                                    <td align="center"
                                                        style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;border-left: 15px dashed #5f5f5f;">
                                                        Deductible:
                                                    </td>
                                                   
                                                    <td align="center"
                                                        style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left; ">
                                                        $0.00
                                                    </td>
        
                                                </tr>
                                             
        
        
                                            </tbody>
                                        </table>
        
                                            <table border="0" cellpadding="0" cellspacing="0"
                                                style="width: 85%; margin: 20px auto 0; text-align: left; vertical-align: middle;border: 0.1px dashed #c5c5c5;">
                                                <tbody>
                                                    <tr>
                                                        <th style="width: 10px; background-color: #808080;   padding:5px 10px; text-align: center;text-wrap: nowrap;"
                                                            align="center">
        
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Arial', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 10px; text-align: center;text-wrap: nowrap;text-align: left;"
                                                            align="center">
                                                            Payment Due By
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Arial', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 10px; text-align: center;text-wrap: nowrap;text-align: left;"
                                                        align="center">
                                                        
                                                    </th>
                                                        <th style="font-size: 13px;font-family: 'Arial', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 10px; text-align: center;text-wrap: nowrap;text-align: left;"
                                                            align="center">
                                                            Grand Total
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <td style="border-bottom: 1px dashed #5f5f5f;"></td>
                                                        <td align="center"
                                                            style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;">
                                                            Customer Payment Posted by:
                                                        </td>
                                                        <td align="center"
                                                            style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;border-left: 0.5px dashed #5f5f5f;">
                                                            $0.00
                                                        </td>
                                                        <td rowspan="2" align="center"
                                                            style="border-bottom: 1px dashed #5f5f5f;font-size: 16px;font-weight: 800; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: middle;padding: 10px; text-align: center;border-left: 0.5px dashed #5f5f5f;">
                                                            $0.00 Grand Total
                                                        </td>
        
                                                    </tr>
                                                    <tr>
                                                        <td style="border-bottom: 1px dashed #5f5f5f;"></td>
                                                        <td align="center"
                                                            style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;">
                                                            Customer Payment Posted by:
                                                        </td>
                                                        <td align="center"
                                                            style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;border-left: 0.5px dashed #5f5f5f;">
                                                            $0.00
                                                        </td>
                                                       
        
                                                    </tr>
        
        
                                                </tbody>
                                            </table>
        
                                            <table border="0" cellpadding="0" cellspacing="0"
                                                style="width: 85%; margin: 20px auto 0; text-align: left; vertical-align: middle;border: 0.1px dashed #c5c5c5;">
                                                <tbody>
                                                    <tr>
                                                        <th style="width: 10px; background-color: #808080;   padding:5px 10px; text-align: center;text-wrap: nowrap;"
                                                            align="center">
        
                                                        </th>
                                                        <th colspan="3"
                                                            style="font-size: 13px;font-family: 'Arial', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 10px; text-align: center;text-wrap: nowrap;text-align: left;"
                                                            align="center">
                                                            Receipt of Payment
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <td style="border-bottom: 1px dashed #5f5f5f;"></td>
                                                        <td align="center"
                                                            style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: right;">
                                                            Customer Payment Posted by:
                                                        </td>
                                                        <td align="center"
                                                            style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;border-left: 1px dashed #5f5f5f;width: 150px;">
        
                                                        </td>
                                                        <td align="center"
                                                            style="border-bottom: 1px dashed #5f5f5f;border-left: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;width: 200px;">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="border-bottom: 1px dashed #5f5f5f;"></td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;border-bottom: 1px dashed #5f5f5f;padding: 10px; text-align: right;">
                                                            Date Posted:
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;border-bottom: 1px dashed #5f5f5f;padding: 10px; text-align: left;border-left: 1px dashed #5f5f5f;width: 150px;">
        
                                                        </td>
                                                        <td align="center"
                                                            style="border-left: 1px dashed #5f5f5f;border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;width: 200px;">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: right;">
                                                            Amount Collected:
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;border-left: 1px dashed #5f5f5f;width: 180px;">
        
                                                        </td>
                                                        <td align="center"
                                                            style="border-left: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;width: 230px;">
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
        
                                            <table border="0" cellpadding="0" cellspacing="0"
                                                style="width: 85%; margin: 20px auto 0; text-align: left;  vertical-align: middle;border: 0.1px dashed #c5c5c5;">
                                                <tbody>
                                                    <tr>
                                                        <th style="width: 10px; background-color: #808080;   padding:5px 10px; text-align: center;text-wrap: nowrap;"
                                                            align="center">
        
                                                        </th>
                                                        <th colspan="3"
                                                            style="font-size: 13px;font-family: 'Arial', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 10px; text-align: center;text-wrap: nowrap;text-align: left;"
                                                            align="center">
                                                            Official Use:
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <td style="border-bottom: 1px dashed #5f5f5f;"></td>
                                                        <td align="center"
                                                            style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: right;">
        
                                                        </td>
                                                        <td align="center"
                                                            style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;width: 150px;">
        
                                                        </td>
                                                        <td align="center"
                                                            style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;width: 200px;">
                                                        </td>
                                                    </tr>
        
        
                                                </tbody>
                                            </table>
                                            <table border="0" cellpadding="0" cellspacing="0"
                                                style=" width: 85%; margin: 20px auto 0;text-align: left; vertical-align: middle;border: 0.1px dashed #c5c5c5;">
                                                <tbody>
                                                    <tr>
                                                        <th style="width: 10px; background-color: #808080;   padding:5px 10px; text-align: center;text-wrap: nowrap;"
                                                            align="center">
        
                                                        </th>
                                                        <th colspan="3"
                                                            style="font-size: 13px;font-family: 'Arial', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 10px; text-align: center;text-wrap: nowrap;text-align: left;"
                                                            align="center">
                                                            I Owe You:
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <td style="border-bottom: 1px dashed #5f5f5f;"></td>
                                                        <td align="center"
                                                            style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: right;">
        
                                                        </td>
                                                        <td align="center"
                                                            style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;width: 150px;">
        
                                                        </td>
                                                        <td align="center"
                                                            style="border-bottom: 1px dashed #5f5f5f;font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: left;width: 200px;">
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
module.exports =getFinalInvoiceEstimateData;