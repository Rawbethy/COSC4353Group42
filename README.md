# COSC4353Group42

This is just a barebones application. You will need a couple of things to get started:

1. Install Node.js
2. Install MongoDB
3. Know how to use a command line in vs code or whatever sourcecode editor you use

When you have all of that down, download this repo onto your desktop and open the folder in your sourcecode editor. There are a couple of things you need to install to get the program to work on your local machine.

To install nodepackages, you need to run:
#### npm install packagename or npm i packagename

There will be tow directories called **client** and **server**, the client side will hold our frontend application which will comprise mostly of javascript, css, and html whereas the server side will hold our backend which is pretty much all javascript. There are folders called node_modules in both directories, these will hold all of the packages you have installed and you will have to install a few before running the program. Below is what you need in each

## What you will need to download in the server side directory:
### npm install express
### npm install mongodb
### npm install cors

## What you will need to download in client side directory: 
### npm install react
### npm install bootstrap
### npm install react-dom
### npm install react-router-dom
### npm install react-bootstrap
### npm install react-scripts

When that is done, open a terminal in the **server** directory and type in **npm run dev** and it will start the server and say it's either working on port 5000 or whatevs. Open a seperate terminal in the **client** directory and type in **npm start** and if it works correctly, it will automatically open a tab in your main browser with the applicating running on it. I have my databaase in mongo to where any ip can connect and the connection already has the admin credentials in it.

I lowkey have no idea if this will work off the bat since it took me a minute to get it started. If it doesn't work, you might just have to create your own directories and start the applications from scratch then just copy and paste the important files but yea lmk.
