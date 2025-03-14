# Job Application History

 I created this project as a way to keep track of the jobs that I have applied to, what their current status is, and when I applied for the job. This will help to remember which companies and positions I have applied to.

## Guide

 To setup and use this project for yourself, there are a few steps that need to be followed.

 1) You will need to install NodeJS. NodeJS can be installed via the following link:

 https://nodejs.org/en/download

 2) You will need to set up a cluster for your MongoDB connection. I used Atlas's free MongoDB cluster for this project personally. I created my cluster and created a user under the database access section. This information will all be important for creating your config file. You can setup this all here:

 https://cloud.mongodb.com/

 3) Copy down the repo to your machine and save it somewhere for working with next.

 4) Open a terminal and navigate to the client folder in the job-hunt-history project.

 5) Run the following command:

 ```
 npm install
 ```

 6) Open a second terminal and navigate to the server folder of the job-hunt-history project.

 7) Within the server, create a new file called config.env (you can name it whatever you want, but you will need to adjust future steps to account for that name change.)

 8) In config.env, you will need to add two config options. The first config option will be your ATLAS_URI. You can retrieve this from the Atlas website above by going to the cluster, click the connect button, and choose the drivers option and ensure NodeJS is selected. This will give you a value to enter in this file (but you need to replace the username and password from this with an actual username and password). The second config is defining a PORT that the server will run on. I suggest 5050 as the port, but feel free to change it if you have the knowledge to do so. The config.env file should look similar to below:

 ```
 ATLAS_URI=SomeAtlasUriHere
 PORT=5050
 ```

 9) Once you save that file, you are ready to launch the project. In the terminal window that is in the server folder, run the following command:

 ```
 node --env-file=config.env server
 ```

 10) In the terminal in the client folder, run the following command:

 ```
 npm run dev
 ```

 11) This terminal should now show you which localhost port your site is now running on. You can navigate to that in the url of your browser now to see a fresh implementation of the site with no data.

 12) Final note: any minor misspellings or deviations from the instructions could cause issues with setup. This project was made for myself and possibly a few friends to be able to use and was not really planned to be something for a ton of people to use. If you do use it and find any issues or have any requests, I will consider making changes to this project. I may redo the look of the project as time goes, but managing the data was my most important part of this project.


### Images of a fresh project creation:
![image](https://github.com/user-attachments/assets/0363ed62-2d4b-442c-8aab-05f49cc11bbe)
![image](https://github.com/user-attachments/assets/d075d92f-6b07-422a-838a-e0d51bc6285b)

