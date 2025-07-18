# NestJS + Next.js + MySQL + AWS Cognito Docker開発環境

このプロジェクトはNestJS（バックエンド）、Next.js（フロントエンド）、MySQL（データベース）を使用した開発環境をDockerで構築するためのテンプレートです。また、AWS Cognitoを使用したユーザー認証機能も実装しています。

## 環境構築

### 1. AWS Cognitoの設定

AWS Cognitoを使用するために、以下の設定が必要です：

1. AWSマネジメントコンソールからCognitoユーザープールを作成します
2. アプリクライアントを設定します
3. ドメイン名を設定します
4. （オプション）GoogleとFacebookのソーシャルログインを設定します

取得した情報をプロジェクトルートの`.env`ファイルに記載します：

```
AWS_REGION=YOUR_REGION
USER_POOL_ID=YOUR_USER_POOL_ID
USER_POOL_WEB_CLIENT_ID=YOUR_APP_CLIENT_ID
COGNITO_DOMAIN=YOUR_COGNITO_DOMAIN
```

### 2. Docker環境の起動

以下のコマンドで環境を構築できます：

```bash
docker-compose up --build
```

## アクセス方法

- フロントエンド (Next.js): http://localhost:8080
- バックエンド (NestJS): http://localhost:3000
- MySQL: localhost:3306
  - ユーザー名: root
  - パスワード: password
  - データベース名: nesnexdb

## プロジェクト構成

```
.
├── backend/             # NestJSアプリケーション
│   ├── src/             # ソースコード
│   ├── Dockerfile       # バックエンド用Dockerfile
│   └── ...
├── frontend/            # Next.jsアプリケーション
│   ├── src/             # ソースコード
│   ├── Dockerfile       # フロントエンド用Dockerfile
│   └── ...
├── mysql/               # MySQLデータベース
│   └── init/            # 初期化スクリプト
└── docker-compose.yml   # Docker Compose設定ファイル
```

## 開発の流れ

1. コンテナを起動する: `docker-compose up -d`
2. バックエンドのログを確認: `docker-compose logs -f backend`
3. フロントエンドのログを確認: `docker-compose logs -f frontend`
4. コンテナを停止する: `docker-compose down`

## 注意点

- コンテナ内のファイルはホストマシンと同期されています。ホスト側でファイルを編集すると、コンテナ内にも反映されます。
- `node_modules`はコンテナ内にのみ存在し、ホストマシンとは同期されません。