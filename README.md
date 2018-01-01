# test-jubelio
Upload data binery ke Azure Blob Storage

Setting database ada dalam file db.js, disini nama database saya "test_jubelio". Untuk database menggunakan postgresql dengan bantuan "pg-promise" dan "bluebird" untuk integrasi dengan nodejs.

Untuk controller saya menaruhnya di file queries.js pada folder root. Credentials Azure saya terima dari parameter dengan nama:
- const azure_account
- const azure_storage_access_key
- const azure_container

Saya menggunakan port 3000, untuk mencobanya bisa mengakses url: http://127.0.0.1:3000/api/tenant-companies dengan methods POST.

Sekian penjelasan singkat ini. Mohon maaf kalau codingnya berantakan, ini pertama kalinya saya pakai postgresql dan juga nodejs. Terimakasih pak Susandi dan pak Luthfi, kalau gak begini saya gak pernah coba postgresql sama node.
