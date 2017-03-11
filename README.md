# backup-iam-RestAPI-server
Sample IAM server for backup client 

This is a sample IAM server with oauth2 support. I have developed it for backup client support to authenticate and store meta data of backup job.

Steps to compile and run code:
- Install mongoDB(3.2.4), nodejs(7.5.0) and npm(4.1.2) packages
- download the repository code
- Run mongod service in the background
- run "npm install"
- run nodejs server.js

Provided RestAPIs:
Add new user:
POST http://<hostname>:3001/api/users
body: username and password
Example: curl -i http://<hostname>:3001/api/users -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "username=admin&password=password"
	
List Users:
GET	http://<hostname>:3001/api/users
header : Authorization :  BAsic Auth : username and password
Example :	curl -i http://<hostname>:3001/api/users -X GET -H "Content-Type: application/x-www-form-urlencoded" -u admin:password
	
Register backup client:
POST http://<hostname>:3000/api/clients
header : Authorization :  Basic Auth : username and password
body:  "name": "backupAgent", "id": "client1", "secret": "abcd123"
Example: curl -i http://<hostname>:3001/api/clients -X POST -H "Content-Type: application/x-www-form-urlencoded" -u admin:password -d "name=backupAgent&id=client1&secret=abcd123"

List registered client:
GET http://<hostname>:3001/api/clients
header : Authorization :  Basic Auth : username and password
Example : curl -i http://<hostname>:3001/api/clients -X GET -H "Content-Type: application/x-www-form-urlencoded" -u admin:password

Add backup job details for client:
POST http://<hostname>:3000/api/backups
header : Authorization :  Basic Auth : username and password
body: historyId and path
Example : curl -i http://<hostname>:3001/api/backups -X POST -H "Content-Type: application/x-www-form-urlencoded" -u admin:password -d "historyId=monday&path=/root/1jan2017"

Similarly we can use backup API with GET, DELETE commands to retreive and delete backup job.
	
Get single backup job info:
GET http://<hostname>:3000/api/backups/:backup_id
header : Authorization :  Basic Auth : username and password
 
The DELETE and PUT also supported by above API.
All above APIs supports Oauth2 token as a replacement for basic Auth.
Example : curl -i http://<hostname>:3001/api/backups -X GET -H "Authorization: Bearer 6d4d367c6ba4e648e2aa4e55d721798401a995294fb88bfcdfdcfd1de15b9e42"

$$$$$$$$$$$$$$$$$$$$$$$$$$ Oauth2 Support $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

Get oauth2 token:
POST http://<hostname>:3001/api/oauth2/token
body : client_id, grant_type=password, client_secret, username and password
Example : curl -i http://<hostname>:3001/api/oauth2/token -X POST -d "client_id=client1&grant_type=password&client_secret=abcd123&username=admin&password=password"


Get Refresh Token:
POST http://<hostname>:3001/api/oauth2/token
body : client_id, grant_type=refresh_token, client_secret and refresh_token
Example : curl -i http://<hostname>:3001/api/oauth2/token -X POST -d "client_id=client1&grant_type=refresh_token&client_secret=abcd123&refresh_token=5b15de8d2cf33d23f1106fd36dea61fb4fac52308ec6f91468f48eaab6d593f5"

