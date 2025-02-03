# 書籍管理アプリケーション

## 概要

書籍の在庫管理を行うためのウェブアプリケーションです。
書籍の追加、検索、ステータス更新などの機能を提供します。

## 特徴

- 書籍の追加
- キーワードによる書籍検索
- ステータス更新（在庫あり/貸出中/返却済）
- 楽観的UI更新
- モダンなアニメーション効果

## 技術スタック

- フロントエンド
  - React 19
  - TypeScript
  - Vite
  - Tailwind CSS
  - Framer Motion
  - React Server Actions

- バックエンド
  - Hono
  - Node.js
  - TypeScript

## セットアップ

1. リポジトリのクローン

```bash
git clone https://github.com/katzedaze/book-management.git
cd book-management-app
```

2. バックエンドのセットアップ

```bash
cd backend
npm install
npm run dev
```

サーバーが `http://localhost:8080` で起動します。

3. フロントエンドのセットアップ

```bash
cd frontend
npm install
npm run dev
```

アプリケーションが `http://localhost:5173` で起動します。

## API エンドポイント

- GET /books
  全ての書籍を取得します。
- POST /books
  新しい書籍を追加します。
- PUT /books/:id
  書籍のステータスを更新します。
- GET /books/search
  キーワードによる書籍検索を行います。

## コンポーネント

- App コンポーネント
  メインのアプリケーションコンポーネントです。
- BookList コンポーネント
  書籍のリストを表示するコンポーネントです。
- BookForm コンポーネント
  新しい書籍を追加するためのフォームです。
- BookItem コンポーネント
  各書籍の詳細を表示するコンポーネントです。
- BookSearch コンポーネント
  キーワードによる書籍検索を行うためのコンポーネントです。
- BookActions
  書籍に関する操作を管理します。
