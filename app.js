const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); 
const { BlobServiceClient, StorageSharedKeyCredential, generateBlobSASQueryParameters, BlobSASPermissions } = require("@azure/storage-blob");

const app = express();
const port = process.env.PORT || 3000;

// Azure Blob Storage configuration
const connectionString = "your connectionString";
const containerName = "uploads";
const accountName = "mywebappstorage1";
const accountKey = "Your AccountKey";


const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Set up a simple form for file upload
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }

  const localFilePath = req.file.path;
  const blobName = req.file.filename;

  try {
    // Uploads this to Blob Storage
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadFile(localFilePath);
    console.log("File uploaded to Blob Storage");

    //Deletes it from the Local Storage
    fs.unlinkSync(localFilePath);
    console.log("File deleted locally after upload.");

    
    const expiresOn = new Date(new Date().valueOf() + 10 * 60 * 1000); // 10 mins
    const sasToken = generateBlobSASQueryParameters({
      containerName,
      blobName,
      permissions: BlobSASPermissions.parse("r"), // r == read 
      expiresOn
    }, new StorageSharedKeyCredential(accountName, accountKey)).toString();

    const sasUrl = `${blockBlobClient.url}?${sasToken}`;

    // creates a SAS link
    res.send(`File uploaded successfully! Access it here (valid for 10 minutes): <a href="${sasUrl}" target="_blank">${sasUrl}</a>`);
  } catch (error) {
    console.error("Error uploading file to Blob Storage:", error);
    res.status(500).send('Error uploading file to Blob Storage');
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
