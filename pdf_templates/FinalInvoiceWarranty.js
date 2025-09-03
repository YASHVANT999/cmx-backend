const getFinalInvoiceWarrantyData = (data)=> {    
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
                                                            Warranty</td>
        
                                                    </tr>
                                                </tbody>
                                            </table>
        
        
                                            <table border="0" cellpadding="0" cellspacing="0"
                                                style="margin-top: 60px;text-align: left; width: 100%;vertical-align: middle;border: 0.1px dashed #c5c5c5;">
                                                <tbody>
                                                    <tr>
                                                        <th style="font-size: 13px;font-family: 'Arial', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 10px; text-align: center;text-wrap: nowrap;"
                                                            align="center">
                                                            Repair Order #
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Arial', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 10px;text-align: center; border-left: 0.5px dotted black;"
                                                            align="center">
                                                            Customer #
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Arial', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 10px;text-align: center; border-left: 0.5px dotted black;text-wrap: nowrap;"
                                                            align="center">
                                                            Warranty Starts
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Arial', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 10px;text-align: center; border-left: 0.5px dotted black;text-wrap: nowrap;"
                                                            align="center">
                                                            Owner First Name
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Arial', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 10px;text-align: center; border-left: 0.5px dotted black;text-wrap: nowrap;"
                                                            align="center">
                                                            Owner Last Name
                                                        </th>
        
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            000000
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            C0000
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            07/05/2024
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Manash
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Patidar
                                                        </td>
        
                                                    </tr>
        
                                                </tbody>
                                            </table>
        
                                            <table border="0" cellpadding="0" cellspacing="0"
                                                style="margin-top: 20px; text-align: left; width: 100%;vertical-align: middle;border: 0.1px dashed #c5c5c5;">
                                                <tbody>
                                                    <tr>
                                                        <th style="font-size: 13px;font-family: 'Arial', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 10px; text-align: center;text-wrap: nowrap;"
                                                            align="center">
                                                            Year
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Arial', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 10px;text-align: center; border-left: 0.5px dotted black;"
                                                            align="center">
                                                            Make
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Arial', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 10px;text-align: center; border-left: 0.5px dotted black;text-wrap: nowrap;"
                                                            align="center">
                                                            Model
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Arial', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 10px;text-align: center; border-left: 0.5px dotted black;text-wrap: nowrap;"
                                                            align="center">
                                                            VIN
                                                        </th>
                                                        <th style="font-size: 13px;font-family: 'Arial', sans-serif;background-color: #dddddd; color: #000000; font-weight: 600;  vertical-align: middle; padding:5px 10px;text-align: center; border-left: 0.5px dotted black;text-wrap: nowrap;"
                                                            align="center">
                                                            Owner Last Name
                                                        </th>
        
                                                    </tr>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            YYYY
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Make
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Model
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            VIN
                                                        </td>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: normal; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top;padding: 10px; text-align: center;">
                                                            Patidar
                                                        </td>
        
                                                    </tr>
        
        
        
        
                                                </tbody>
                                            </table>
        
                                            <table border="0" cellpadding="0" cellspacing="0"
                                                style="margin-top: 20px; text-align: left; width: 100%;vertical-align: middle; ">
                                                <tbody>
                                                    <tr>
                                                        <th style="font-size: 16px;font-family: 'Roboto Slab', serif;background-color: #dddddd; color: #878787; font-weight: 600;  vertical-align: middle; padding:2px 10px; text-align: center;text-wrap: nowrap;letter-spacing: 10px;"
                                                            align="center">
                                                            LIMITED REPAIR WARRANTY
                                                        </th>
                                                    </tr>
                                                </tbody>
                                            </table>
        
                                            <table border="0" cellpadding="3" cellspacing="0" align="center"
                                                style="margin-top: 40px;">
                                                <tbody>
                                                    <tr>
                                                        <td align="center"
                                                            style="font-size: 13px;font-weight: 400; color: #5f5f5f; font-family: 'Arial', sans-serif; line-height: 18px; vertical-align: top; text-align: left; ">
                                                            Dear Manash Patidar,</td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            style="font-size: 13px;font-weight: 400; color: #5f5f5f;  font-family: 'Arial', sans-serif; padding-top: 20px; line-height: 20px; vertical-align: top; text-align: left; ">
                                                            <p style="margin: 0;">
                                                                We're thrilled you chose us for your automotive repair needs!
                                                                Here’s the scoop on our rock-solid warranty,
                                                            </p>
                                                            <p style="margin: 0;">designed to keep you smiling and your vehicle
                                                                in tip-top shape: </p>
                                                            <p style="margin: 0;">Ownership Guarantee:</p>
                                                            <p style="margin: 0;">We’ve got your back! Our work is guaranteed as
                                                                long as you own your car. Sublet Work or Sublet Labor? Those are
                                                                covered by our trusted suppliers’ guarantees.</p>
                                                            <p style="margin: 0;">Conditions Apply: </p>
                                                            <p style="margin: 0;">Our warranty shines when your car’s under
                                                                normal driving
                                                                conditions. But hey, it doesn’t cover accidents, neglect, or
                                                                wild off-roading adventures. Rust, scratches, and gravel marks
                                                                from your epic road trips? Those are excluded too. </p>
                                                            <p>Here’s the breakdown of our four-part warranty:</p>
        
                                                            <p style="margin: 0;">METALWORK:</p>
                                                            <p style="margin: 0;">Ourrepair shop offers a Limited Lifetime
                                                                Warranty on our
                                                                metalwork magic. If anything cracks, flakes, pits, or
                                                                deteriorates, we’ll fix and repaint it with a smile! </p>
        
                                                            <p style="margin-bottom: 0;">PAINTING, STRIPES, AND DECALS:</p>
                                                            <p style="margin: 0;">We provide a Limited Lifetime Warranty on our
                                                                paint jobs against
                                                                blistering, peeling, hazing, and loss of color. Stripes and
                                                                decals? Covered for Twelve (12) Months! We’ll re-prime,
                                                                re-paint, re-stripe, or re-decal any warranted section. Just
                                                                keep it away from extreme conditions, okay? </p>
        
                                                            <p style="margin-bottom: 0;">MECHANICAL REPAIRS:</p>
                                                            <p style="margin: 0;">Our Twelve (12) Month or 12,000 Mile Warranty
                                                                covers mechanical
                                                                repairs tied to collision damage. If anything goes wrong, we’ll
                                                                re-repair it with precision and care. </p>
        
                                                            <p style="margin-bottom: 0;">PARTS:</p>
                                                            <p style="margin: 0;">We use quality parts, backed by the supplier’s
                                                                warranty. We’ll
                                                                help you navigate any claims if needed. No unauthorized used
                                                                parts here <br />
                                                                – only what’s noted on your Repair Order. Parts come with the
                                                                manufacturer’s warranty.
                                                            </p>
        
                                                            <p style="margin-bottom: 0;">SPECIFIC EXCLUSIONS</p>
                                                            <p style="margin: 0;">This warranty doesn’t cover extra costs like
                                                                towing, rental cars, travel expenses, or unrelated assemblies
                                                                and components. Also, no coverage for damage caused by a faulty
                                                                part or its installation. </p>
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
                                        <td>
                                            <table border="0" cellpadding="0" cellspacing="0" align="right" style="width: 100%;padding-top: 60px;">
                                                <tbody>
                                                    <tr>
                                                        <td
                                                            style=" font-size: 9px;font-weight: 400; color: #5f5f5f;  font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top; text-align: left; ">
                                                            <span
                                                                style="font-size: 9px;font-weight: 600;color: #5f5f5f;">Powered
                                                                by
                                                                CollisionMateX</span>
                                                        </td>
                                                        <td
                                                            style=" font-size: 9px;font-weight: 400; color: #5f5f5f;  font-family: 'Arial', sans-serif; line-height: 14px; vertical-align: top; text-align: right;text-wrap: nowrap; ">
                                                            Page 1 of 1 6/9/2024 8:22:02 PM
        
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
module.exports =getFinalInvoiceWarrantyData;