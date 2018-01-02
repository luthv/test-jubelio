const db = require('./db.js');
var azure = require('azure-storage');
const config = require('./config');

function toArrayBuffer(buf) {
  var ab = new ArrayBuffer(buf.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}

function testUpload() {
	// set parameter input for azure credentials
	const azure_account = config.STORAGE_ACCOUNT;
	const azure_storage_access_key = config.STORAGE_KEY;
	const azure_container = config.CONTAINER;

	var bs = azure.createBlobService(azure_account, azure_storage_access_key);
	var data_logo = [];
	var interval = 2 * 1000;
	db.any('SELECT company_id, logo FROM tenant_company ORDER BY company_id DESC')
		.then(function(data, done) {
			// loop through all rows
			// Promise.map is also an option here to control how many concurrent connections we want
			// see http://bluebirdjs.com/docs/api/promise.map.html
			data.forEach((row) => {
				console.log(row);

				// row.logo is a buffer containing byte array
				// convert buffer to stream
				// upload to azure storage using createBlockBlobFromStream
				// save resulting url to logo_url
			})
			
			return;
			numCompletedCalls = 0;
			for (var i = 0; i < data.length; i++) {
				setTimeout( function (i) {
					numCompletedCalls++;
					company_id = data[i]['company_id'];
					data_logo = data[i]['logo'];

					const buf_logo = Buffer.from(data_logo);
					logo = buf_logo.toString('base64');
					
					// upload binary to azure blob storage
					bs.createAppendBlobFromText(azure_container, company_id+".png", logo, function(error, result, response){
						if(!error){
					  	var urlHasil = bs.getUrl(azure_container, company_id+".png", azure_storage_access_key);

				  		// update url logo to logo_url field
							db.none('UPDATE tenant_company SET logo_url=$1 WHERE company_id=$2',
						    [urlHasil, company_id])
						    .then(function () {
						      console.log(company_id+" sudah diproses ke "+urlHasil);
						      if (numCompletedCalls == data.length){
						      	console.log("Done all calls!");
						      	return res.status(200).json({
											status: 200,
											data: "Finish",
											message: "All process is done"
										});
						      }
						    })
						    .catch(function (err) {
						      return next(err);
						    });
				    }else{
				    	return res.status(500).send(error);
				    }
				  });
				}, interval * i, i);
			}
		});
}

// call main function
testUpload();