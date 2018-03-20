const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const requestAPI =require('request-promise');
exports.webhook = functions.https.onRequest((request, response) => {

    console.log("request.body.result.parameters: ", request.body.result.parameters);

    let params = request.body.result.parameters;

    switch (request.body.result.action) {

        case 'emitra':
            response.send({
                speech: `E-Mitra is the platform where the citizens of Rajasthan can get easy, convenient, real-time and transparent access to all the government and non-government services which fall under the e-Governance system.`
            });
            break;

            case 'bhamashah':
            response.send({
                speech: `Bhamashah Yojana is a scheme to transfer financial and non-financial benefits of governmental schemes directly to women recipients in a transparent way.
                The Scheme is a family based programme of financial inclusion, where each family is issued a ‘Bhamashah Card’. The card is linked to a bank account that is in the name of lady of the house as the head of the family. The card leverages bio-metric identification and core banking. The objective of the Scheme is financial inclusion, women empowerment and effective service delivery. It is the first of its kind direct benefit transfer scheme in the country.
                `
            });
            break;

            case 'ssbsy':
            response.send({
                speech: `Sundar Singh Bhandari Swarojgar Yojana in Rajasthan, is for Economically Backward Classes. Subsequently, government will provide loans of up to Rs. 50,000 to EBC candidates at 4% interest rate.`
            });
            break;

            case 'flws':
            response.send({
                speech: `Rajasthan have Farm Loan Waiver Scheme for farmers. Subsequently, government made announcement about farm loan waiver in the Rajasthan Budget 2018-19. Under this, government is going to waive off the entire interest on loans till 30 September 2017.`
            });
            break;

        case 'B2C':
            response.send({
                speech: `Business to Consumer scheme in rajasthan, is a relationship between Business or Business entity and Consumers. In B2C, the business directly benefits the consumer with their services. Under e-Mitra, many business entities provide their services through the kiosks. Do you want to know about all services?`
            });
            break;


        case 'G2C':
            response.send({
                speech: `Government to Consumer services of Rajasthan are services that directly or indirectly are associated with the government entities and departments. Do you want to know about all services?`
            });
            break;

        case 'ShowAadhaarNumberByEmitra':
            requestAPI('https://apitest.sewadwaar.rajasthan.gov.in/app/live/Service/bahmashah/hofAndMembers/1067-7PVQ-28383?client_id=ad7288a4-7764-436d-a727-783a977f1fe1')
            .then(function (data) {
            let params = JSON.parse(data);
            console.log(params);
            response.send({
                speech: `Adhaar card number is  ${params.hof_Details.AADHAR_ID}` 
            });
            });
            break;
        case 'GetAccountDetails':
            requestAPI('https://apitest.sewadwaar.rajasthan.gov.in/app/live/Service/getAccountDetails/683601075581?client_id=ad7288a4-7764-436d-a727-783a977f1fe1')
            .then(function (data) {
            let params = JSON.parse(data);
            console.log(params);
            response.send({
                speech: `Person name is ${params[0].name} and Adhaar card number is  ${params[0].aadharId}` 
            });
            });
            break;

        case 'womenEmpowerment':
        response.send({
            speech: `Rajasthan supports many schemes which ensure women’s social, economic and political empowerment, fulfillment of their rights, promoting their participation and leadership... some schemes are.. Bhamashah scheme, Sabla scheme`
        });
break;

case 'sabla':
response.send({
    speech: `Sabla scheme of Rajasthan aims at empowering Adolescent girls of 11-18 years by improving their nutritional and health status, upgradation of home skills, life skills and vocational skills. Under this yojana girls will be equipped with information on health and family welfare, hygiene and guidance on existing public services.`
});
break;
        default:
            response.send({
                speech: "Sorry, I don't have information about that... right now I have limited information."
            });
    }

});
