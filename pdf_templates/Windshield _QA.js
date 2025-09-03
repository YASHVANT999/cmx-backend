const getWindShieldQaData = (data)=> {    
    return (
        `<html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <title> Order confirmation </title>
            <meta name="robots" content="noindex,nofollow">
            <meta name="viewport" content="width=device-width; initial-scale=1.0;">
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
        
                table {
                    border-collapse: collapse;
                }
            </style>
        
        
            <!-- Header -->
        </head>
        
        <body>
            <table width="950" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#ffffff"
                style="border-radius: 10px; border: 0;">
                <tbody>
                    <tr>
                        <td>
                            <table width="900" cellpadding="0" border="0" align="center"
                                style="border: 0;  margin-top: 20px;margin-bottom: 40px;   ">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table cellpadding="0" cellspacing="0"
                                                style=" width: 100%;vertical-align: middle;   ">
                                                <tbody>
        
                                                    <th style="font-size: 13px;font-family: 'Open Sans', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 5px;border: 0.5px dotted black;width: 225px; "
                                                        align="left">
                                                        Arrival Date
                                                    </th>
                                                    <th style="font-size: 13px;font-family: 'Open Sans', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 5px;border: 0.5px dotted black;width: 222px; "
                                                        align="left">
                                                        Target Date
                                                    </th>
                                                    <th style="font-size: 13px;font-family: 'Open Sans', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 5px;border: 0.5px dotted black;width: 225px;"
                                                        align="left">
                                                        Customer
                                                    </th>
                                                    <th style="font-size: 13px;font-family: 'Open Sans', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 5px;border: 0.5px dotted black;width: 225px; "
                                                        align="left">
                                                        RO#
                                                    </th>
        
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
                                                           ${data.ArrivalDate}</td>
        
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
                                                            07/03/2024</td>
        
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
                                                            Last Name</td>
        
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
                                                            RO #100001</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table border="0" cellpadding="0" cellspacing="0"
                                                style="padding-top: 20px;text-align: center; width: 100%;vertical-align: middle;">
                                                <tbody>
                                                    <tr>
                                                        <th style="font-size: 13px;font-family: 'Open Sans', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 5px;   border-left: 1px dotted black;width: 450px;"
                                                            align="left">
                                                            Vehicle
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Open Sans', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 5px;  width: 450px;border-right: 1px dotted black;border-left: 1px dotted black;"
                                                            align="left">
                                                            VIN
                                                        </th>
        
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 5px;border: 0.5px dotted black;  text-align: center;width: 450px;">
                                                            2019, BMW, S CLASS</td>
        
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 5px;border: 0.5px dotted black;  text-align: center;width: 450px;">
                                                            VIN00000000000000</td>
        
        
                                                    </tr>
                                                </tbody>
                                            </table>
        
                                            <table border="0" cellpadding="0" cellspacing="0"
                                                style="margin-top: 15px; padding-bottom: 30px; text-align: center; width: 100%;vertical-align: middle;">
                                                <tbody>
                                                    <tr>
                                                        <th style="font-size: 13px;font-family: 'Open Sans', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 5px;border: 0.5px dotted black; width: 500px;"
                                                            align="left">
                                                            Customer
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Open Sans', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 5px;border: 0.5px dotted black; width: 500px;"
                                                            align="left">
                                                            Insurance
                                                        </th>
        
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
                                                            Last Name</td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
                                                            Insurance</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table border="0" cellpadding="0" cellspacing="0"
                                                style="padding-top: 20px;text-align: center; width: 100%;vertical-align: middle;">
                                                <tbody>
                                                    <tr>
                                                        <th style="font-size: 13px;font-family: 'Open Sans', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 5px;  width: 500px; border-left: 1px dotted black;border-right: 1px dotted black;"
                                                            align="left">
                                                            Pre-Scan Completed <br /> By:
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Open Sans', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 5px;  width: 500px;border-right: 1px dotted black;"
                                                            align="left">
                                                            Post Scan Completed <br /> By:
        
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Open Sans', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 5px;  width: 500px;border-right: 1px dotted black;"
                                                            align="left">
                                                            Dynamic Drive Completed <br /> By:
        
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Open Sans', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 5px;  width: 500px;border-right: 1px dotted black; "
                                                            align="left">
                                                            ADAS Calibration Needed? <br />By:
                                                        </th>
        
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
                                                            Yes | No</td>
        
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
                                                            Yes | No</td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
                                                            Yes | No</td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
                                                            Yes | No</td>
        
        
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table border="0" cellpadding="0" cellspacing="0"
                                                style="padding-top: 20px;text-align: center; width: 100%;vertical-align: middle;">
                                                <tbody>
                                                    <tr>
                                                        <th style="font-size: 13px;font-family: 'Open Sans', sans-serif;background-color: #dddddd; color: #000000; font-weight: 500;  vertical-align: middle; padding:5px 5px;  width: 500px; border-left: 1px dotted black;border-right: 1px dotted black;background-color: #bfbfbf; width: 100px;"
                                                            align="left">
        
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Open Sans', sans-serif;background-color: #dddddd; color: #000000; font-weight: 500;  vertical-align: middle; padding:5px 5px;   border-right: 1px dotted black; width: 600px;"
                                                            align="left">
                                                            Process
        
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Open Sans', sans-serif;background-color: #dddddd; color: #000000; font-weight: 500;  vertical-align: middle; padding:5px 5px;  width: 300px;border-right: 1px dotted black;"
                                                            align="left">
                                                            By
        
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Open Sans', sans-serif;background-color: #dddddd; color: #000000; font-weight: 500;  vertical-align: middle; padding:5px 5px;  width: 400px;border-right: 1px dotted black; "
                                                            align="left">
                                                            Completed Date
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Open Sans', sans-serif;background-color: #dddddd; color: #000000; font-weight: 500;  vertical-align: middle; padding:5px 5px;  width: 400px;border-right: 1px dotted black; "
                                                            align="left">
                                                            Needs
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Open Sans', sans-serif;background-color: #dddddd; color: #000000; font-weight: 500;  vertical-align: middle; padding:5px 5px;  width: 400px;border-right: 1px dotted black; "
                                                            align="left">
                                                            Details
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Open Sans', sans-serif;background-color: #dddddd; color: #000000; font-weight: 500;  vertical-align: middle; padding:5px 5px;  width: 300px;border-right: 1px dotted black; "
                                                            align="left">
                                                            Completed Date
                                                        </th>
        
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
                                                            1</td>
        
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 5px;border: 0.5px dotted black;  text-align: left;">
                                                            Disassembly Repair Plan Completed</td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 5px;border: 0.5px dotted black;  text-align: left;">
                                                            Alignment
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
                                                            2 or 4
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
                                                        </td>
        
        
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #f8f8f8;">
                                                            1</td>
        
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 5px;border: 0.5px dotted black;  text-align: left;background-color: #f8f8f8;">
                                                            Repair Procedures Reviewed Printed</td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #f8f8f8;">
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #f8f8f8;">
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 5px;border: 0.5px dotted black;  text-align: left;">
                                                            Wheel Sublet
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
                                                            LF LR RF RR
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
                                                        </td>
        
        
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #dddddd;">
                                                            2</td>
        
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 5px;border: 0.5px dotted black;  text-align: left;background-color: #dddddd;">
                                                            Mechanical Completed</td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #dddddd;">
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #dddddd;">
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 5px;border: 0.5px dotted black;  text-align: left;">
                                                            Sublet
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
        
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
                                                        </td>
        
        
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #dddddd;">
                                                            2</td>
        
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 5px;border: 0.5px dotted black;  text-align: left;background-color: #dddddd;">
                                                            Body Work Completed</td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #dddddd;">
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #dddddd;">
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 5px;border: 0.5px dotted black;  text-align: left;">
        
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
        
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #dddddd;">
                                                            2</td>
        
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 5px;border: 0.5px dotted black;  text-align: left;background-color: #dddddd;">
                                                            Verify Weld | Corrosion Protection</td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #dddddd;">
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #dddddd;">
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 5px;border: 0.5px dotted black;  text-align: left;">
        
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
        
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #f8f8f8;">
                                                            3</td>
        
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 5px;border: 0.5px dotted black;  text-align: left;background-color: #f8f8f8;">
                                                            Refinish Completed</td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #f8f8f8;">
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #f8f8f8;">
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 5px;border: 0.5px dotted black;  text-align: left;">
        
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
        
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #dddddd;">
                                                            4</td>
        
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 5px;border: 0.5px dotted black;  text-align: left;background-color: #dddddd;">
                                                            Reassembled Completed</td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #dddddd;">
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #dddddd;">
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 5px;border: 0.5px dotted black;  text-align: left;">
        
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
        
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #f8f8f8;">
                                                            5</td>
        
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 5px;border: 0.5px dotted black;  text-align: left;background-color: #f8f8f8;">
                                                            ADAS Calibration Completed</td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #f8f8f8;">
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #f8f8f8;">
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 5px;border: 0.5px dotted black;  text-align: left;">
        
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
        
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #f8f8f8;">
                                                            5</td>
        
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 5px;border: 0.5px dotted black;  text-align: left;background-color: #f8f8f8;">
                                                            Detail Completed</td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #f8f8f8;">
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #f8f8f8;">
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 5px;border: 0.5px dotted black;  text-align: left;">
        
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
        
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #f8f8f8;">
                                                            5</td>
        
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 5px;border: 0.5px dotted black;  text-align: left;background-color: #f8f8f8;">
                                                            Quality Control Completed</td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #f8f8f8;">
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;background-color: #f8f8f8;">
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 5px;border: 0.5px dotted black;  text-align: left;">
        
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
        
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 14px;font-weight: normal; color: #000000; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;border: 0.5px dotted black;  text-align: center;">
                                                        </td>
                                                    </tr>
                                                    
                                                </tbody>
                                            </table>
                                            <table border="0" cellpadding="0" cellspacing="0"
                                                style="margin-top: 30px;text-align: center; width: 100%;vertical-align: middle;">
                                                <tbody>
                                                    <tr>
                                                        <td align="left"
                                                        style="font-size: 12px;font-weight: normal; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;  ">
                                                        Powered by CollisionMateX
                                                    </td>
                                                    <td align="right"
                                                        style="font-size: 12px;font-weight: normal; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 14px; vertical-align: top;padding: 10px 0;  ">
                                                        Page 1 of 2 6/9/2024 8:22:02 PM | Production Tracker6.2024
                                                    </td>
                                                    </tr>
                                                </tbody>
                                            </table>        
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
module.exports =getWindShieldQaData;