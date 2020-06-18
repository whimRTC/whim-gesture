# whim-gesture

## 概要
wh.im上で遊べるジェスチャーゲームです。

## 使い方
クローンし、remoteを変更します
``` 
git clone git@github.com:sally-inc/whim-template.git {app_name}
cd {app_name}
git remote set-url origin {your_url}
```

## 起動
``` 
yarn
yarn serve
``` 

## 起動(Docker)
```
docker build --tag app:latest . 
docker run -it -v $PWD:/template -p 3001:3001 app:latest
```
