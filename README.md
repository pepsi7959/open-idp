# OpenIDP 

### Project Summary

OpenIDP is an open-source project created to be a testing IdP. OpenIDP currently is still in development process and there are a lot to be done. However, it can work as a test base for OpenID Connect 1.0. No security is guaranteed. DO NOT USE THIS CODE IN PRODUCTION

### Installation

```bashp
git clone https://github.com/pathornteng/open-idp
cd open-idp
npm install
node seed.js
npm start
```

### Run

```bashp
vi config.json //edit configuration for your environment
vi db/mongoose.js //edit location of moongodb
npm start
```

### Usage

```bashp
go to http://localhost:3002 // this is the default port
username: admin, password: P@ssw0rd // this is the default username/password from seed.js
```


