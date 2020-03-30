---


title: 'Deploy your MERN app to AWS'
date: '2019-12-20'
sinopsis: 'If you want to deploy a MERN app to AWS, and you have windows as your OS, this is for you.'
tags: [AWS, deploy, React, MongoDB, Node, Express]



---



# Setup - AWS EC2 instance.




### Launch the instance
1. Create new EC2 instance in desired cluster location
2. Select Ubuntu Server 16.04 LTS (HVM), SSD Volume Type  - free tier to start.
3. Click review and launch
4. Select create new key pair, and choose a desired name. I will put AWS-WORDPRESS
5. Download KeyPair
6. LAUNCH INSTANCE

### SSH using Putty
1. Download Putty and Puttygen.
2. Open Putty gen and open the new key pair downloaded. 
   1. Save as SSH RSA, private key.
3. Open Putty.
   1. ON putty, your Host Name will be ubuntu@'yourPublicDNS' port will be 22.
   2. In my case it will be ubuntu@ec2-18-228-245-130.sa-east-1.compute.amazonaws.com, you can get this from the instance panel in AWS.
   3. Go to SSH --> Auth. Browse for your new created key with puttygen.
   4. Go back to session and write a name on Saved Session, and click save. I chose wordpress as my name for the session.
   5. Click Open
   6. Click YEs on security notice

### Inside the EC2 Instance. Once connected

Now, the following I did following this amazing tutorial/article written by Jason Watmore: 
https://jasonwatmore.com/post/2019/11/18/react-nodejs-on-aws-how-to-deploy-a-mern-stack-app-to-amazon-ec2

So thank you Jason.

Basically you run a curl command which will setup everything for us:
```
The below command executes a script to automatically setup and configure a production ready MERN Stack web server on Ubuntu that includes Node.js, MongoDB, PM2, NGINX and UFW.

For more details about how the script works see Setup Node.js + MongoDB Production Server on Ubuntu.

While connected to the new AWS EC2 instance in the terminal window, run the following command:
curl https://gist.githubusercontent.com/cornflourblue/f0abd30f47d96d6ff127fe8a9e5bbd9f/raw/e3047c9dc3ce8b796e7354c92d2c47ce61981d2f/setup-nodejs-mongodb-production-server-on-ubuntu-1804.sh | sudo bash

```

Now, in my case I wont be using mongo locally, I preferred to use the free tier of cloud atlas.

So after this, I navigated via cd command to opt:
cd /opt/

There I cloned my git repository who's structure is the following:

```
repo-----> / all nodejs backend files, the root is the src for all nodejs backend files.
      |
      └──> client folder ---> its the react src folder

```

So I just had to git clone my-repo-from-git and that was that, of course, once cloned I replicated my .env files using sudo nano, and I did npm install on my server and client folder.

Once that was done, I cd into client, and did a yarn build for my react front end.

Now comes the nicest part, configuring NGINX ! 