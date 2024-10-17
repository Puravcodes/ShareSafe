# 📂 ShareSafe 

Create a web application where users can securely upload files to Azure Blob Storage. Once uploaded, the application generates a unique, time-limited link for the user to share. This ensures that the user with the link can access the uploaded file for a specified duration.


## 🌟 Design
This project is intended to be used for a securly uploading files to Azure Blob Storage.
![Diagram](https://github.com/user-attachments/assets/b3e06c2d-7cb9-4822-acc2-ceea95547e3c)

## ✨ Features 
These are the resources I have used. 

- Azure Web Apps
- Azure Storage Account
- Azure Storage Containers
- Azure App Service Plan
- Nodejs and Git 

### Step 1: Create a Storage Account

I deployed a Storage Account using Azure Portal. As for the basic properties i setup the following:

- Access Tier: Hot 
- Replication: Locally-redundant storage (this is just the personal project so I don't need a better replication)
- Primary Serive: Azure Blob Storage 
- Enycription Keys: Microsoft Managed Keys

After deploying the Storage Account, I created a container to store the uploaded files.


### Step 2: Deploy the Web App 

Deploying a web app to Azure App Service is simple and efficient. You start by creating your app in the Azure portal, where you choose the runtime and region that fit your needs. After that, you can easily push your code from GitHub or your local environment using Azure's built-in tools. 
![alt text](<Opera Snapshot_2024-10-17_131551_portal.azure.com.png>)

After that I used the URL that was in the overview section of Azure Web Apps to test if the application is working. 
![alt text](<Opera Snapshot_2024-10-17_131643_portal.azure.com (2).png>)

![alt text](<Screenshot 2024-10-17 162429.png>)

### Step 3: Logic Behind the File Upload

The file upload process starts by temporarily storing the uploaded file locally in the uploads/ directory using Multer, with a unique filename to avoid overwrites. After this, the file is uploaded to Azure Blob Storage via the Azure Storage SDK. Once the upload is complete, the file is deleted from local storage to conserve space.

### Step 4: Unique Link Generation. 

![alt text](image.png)


A Shared Access Signature (SAS) token provides secure, time-limited access to resources in Azure Blob Storage without exposing your storage account credentials. In this app, after a file is uploaded to Azure Blob Storage, a SAS token is generated for that specific file, granting read-only access for a duration of 10 minutes. The SAS token is appended to the file's URL, allowing anyone with the link to access the

![alt text](image-1.png)


###  Demo of File Upload Functionality:

Here's a short GIF showcasing the working of the web application. It illustrates how users can upload files, which are then securely stored in Azure Blob Storage, along with the generation of a temporary access link.

![alt text](<bandicam2024-10-1713-38-12-289-ezgif.com-video-to-gif-converter (1).gif>)


## 📖 Summary

This project is a web application that enables users to upload files securely to Azure Blob Storage. It employs Multer for local file handling, temporarily storing uploads in a local directory before transferring them to Azure. After a successful upload, the application generates a Shared Access Signature (SAS) token, providing users with a secure, time-limited link to access the uploaded file for 10 minutes. This ensures that files can be shared without compromising the security of the storage account, making it an efficient solution for file management and sharing.Overall project tought me how to use Azure services not just on the Portal or CLI but in the other languages as well.
