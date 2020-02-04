# Weather data website

## Installing

You can run the project locally in two ways: as a nodejs package with a development server or as a build docker image.

### Wihtout docker

You can run the project without docker, which you'll need to do if you want to make code changes and see them live.  
You will need:

- a terminal
- git
- [nodejs](https://nodejs.org/en/) (tested with version 12)

#### how to install

If you have the required dependencies installed, run the following commands:

```bash
$ git clone https://github.com/bloomdex/2.2-website.git
$ cd 2.2-website
$ npm install
$ npm run dev
```

This will start a local development server on port `1234`. Keep in mind that to make the website usable you need to connect it to a working backend. We suggest using the publicly hosted one at `https://api.vegaflor.bloomdex.org/api/v1`.  
To change the url for the api change the `target` property in `proxy.js` to some other domain. Don't include the `/api/v1` part as that is added automatically.  
If the api is hosted on a different path than `/api/v1` change this in the `.env` file.  
It is listed as `API_ENDPOINT=/api/v1`.

### With docker

To run this project in docker you need:

- git
- docker

#### how to install

Run the following commands

```bash
$ git clone https://github.com/bloomdex/2.2-website.git
$ docker build -t bloomdex-weather .
$ docker run -d --rm -p 8080:80 bloomdex-weather
```

This will give you a container hosting the website usign nginx. The port on which the webapplication is now accesible is `8080`.  
If you want to change the api domain then you can do so in the `nginx.conf` file. Change the domain after `proxy_pass` to whatever you like.  
Be sure to include the prococol (`http` or `https`) in the domain.  
Just like when you're not using docker don't include the `/api/v1` part as that is added automatically.  
If the api is hosted on a different path than `/api/v1` change this in the `.env` file.  
It is listed as `API_ENDPOINT=/api/v1`.
