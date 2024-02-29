# File-Management

- **Implentation of File Mangement with production level code**
- **Multiple File upload implementation with [multer](https://www.npmjs.com/package/multer) package**
- **Categorization of uploaded files**
- **Implementation of common response & error handler**
- **Followed segregated and organized folder structure**
- **Followed camelcasing naming convention and class based approach throughout the project**

### Installation

Run `npm install`

### Starting the server

Run `npm run dev`

### API Endpoints

#### Curl command to test File Upload api

```
curl --location 'http://localhost:3000/files/upload' \
--form 'irisImage=@"/location/to/file/Siddhesh-min.JPG"' \
--form 'irisImage=@"/location/to/file/RT-30/banner3.jpg"' \
--form 'fingerPrintImage=@"/location/to/file/RT-30/banner2.jpg"'
```

- **Success Response:**

  - `{"message": "File uploaded successfully"}`

#### Curl command to delete Files

```
curl --location 'http://localhost:3000/files/delete' \
--header 'Content-Type: application/json' \
--data '{
    "files":[
        "/home/location/to/directory/fileMgmt/uploads/biometric/fingerprint/banner2_1709229138762.jpg"
    ]
}'
```

- **Success Response:**

  - `{"message":"files deleted successfully","data":{},"statusCode":200}`

#### Curl command to Fetch Files

```
curl --location 'http://localhost:3000/files'
```

- **Success Response:**

  - `{"message":"Success","data":{"filesList":["/home/location/to/directory/fileMgmt/uploads/biometric/iris/4_1709231913276.jpg","/home/location/to/directory/fileMgmt/uploads/biometric/fingerprint/banner2_1709231913277.jpg"],"count":2},"statusCode":200}`
