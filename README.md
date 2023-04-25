# 顔面神経麻痺ケアアプリ
このアプリは、日本で顔面神経麻痺（Bell麻痺・Ramsay Hunt症候群）の重症度の評価に使われている40点法（柳原法）に基づきテストを行い、患者さんのリハビリに役立てることを目的としています。
- お手本のイラストと自分のカメラのプレビューを見比べ、「動く」「少し動く」「動かない」の3つのボタンを押すことで顔の筋肉の動きを評価し、スコアを記録します。
- カレンダービューで毎日のスコアの変化を閲覧できます。
## ローカルで実行する
1. node.jsおよびnpm等のパッケージマネージャーを等のパッケージマネージャーをインストールします。
1. 次のコマンドを実行して、リポジトリをクローンします。
    ```sh
    git clone git@github.com:shugomatsuzawa/Facial-Paralysis-Care.git; cd ./Facial-Paralysis-Care
    ```
1. 次のコマンドを実行して、依存関係をインストールします。
    ```sh
    npm install
    ```
1. 次のコマンドを実行して、サーバーを起動します。
    ```sh
    npx expo start
    ```
Expoについてご不明な点がある場合は、[Expoのドキュメント](https://docs.expo.dev)ご覧ください。  
[![runs with Expo Go](https://img.shields.io/badge/Runs%20with%20Expo%20Go-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.dev/client)
## 貢献する
バグを見つけた場合は、[GitHub Issues](https://github.com/shugomatsuzawa/Facial-Paralysis-Care/issues)からできるだけ詳しい再現手順を教えていただけると助かります。  
あなたが医師や専門家の場合、アプリ内ドキュメントの監査や、アプリ機能の提案をして頂けると嬉しいです。  
感想などありましたら私の[Webサイト](https://shugomatsuzawa.com/contact/)やソーシャルメディアからお気軽にご連絡ください。