# Welcome to Blueit 2!

<img src="public/favicon.ico" alt="drawing" width="50" height="50"/>

Blueit 2 is a service meant to be like _Reddit_.
It is a social meadia site which attempts to answer questions/share stories.
It is now on github

## Deploy

```
npm run build
rsync -av . xander@xvps.thegillams.co.uk:/home/xander/next/ --exclude node_modules --exclude .git --exclude .next/server/pages/store.json
ssh xander@xvps.thegillams.co.uk
```

```
(~/next)
pm2 stop npm
pm2 start npm -- start
```
