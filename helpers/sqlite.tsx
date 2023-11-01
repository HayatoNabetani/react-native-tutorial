import dayjs from "dayjs";
import * as SQLite from "expo-sqlite";

/**
 * SQLiteと接続
 */
export const db = SQLite.openDatabase("tapdiary");

/**
 * テーブルを作成する
 */
export const createTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            // 実行したいSQL文
            `CREATE TABLE if not exists diaries (
                id integer primary key not null,
                body text,
                emoji text,
                feel_id text,
                created_at text,
                updated_at text
            );`,
            // SQL文の引数
            // 必要ないときは空のまま
            [],
            // 成功時のコールバック関数
            () => {
                console.log("create table success");
            },
            () => {
                // 失敗時のコールバック関数
                console.log("create table failed");
                return false;
            }
        );
    });
};

/**
 * データを登録する
 */
export const insertDiary = (
    db: object = {},
    body: string = "",
    selectedTemplate: object = {}
) => {
    // const createdAt: string = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const createdAt: string = dayjs().format("YYYY-MM-DD");
    console.log(body, selectedTemplate, createdAt);
    db.transaction((tx: any) => {
        // tx.executeSql('SQL文','SQL文に使うデータ','成功時の関数','失敗時の関数')
        tx.executeSql(
            // 実行したいSQL文
            // ?のところに引数で設定した値が順番に入る
            `INSERT INTO diaries (body, emoji, feel_id, created_at, updated_at) values (?, ?, ? ,?, ?);`,
            // SQL文の引数
            [
                body,
                selectedTemplate.emoji,
                selectedTemplate.id,
                createdAt,
                createdAt,
            ],
            // 成功時のコールバック関数
            (sqlTxn, res) => {
                console.log(sqlTxn);
                console.log(`Diary added successfully`);
                console.log(res);
            },
            (error) => {
                console.log("ERROR");
                console.log(error);
                // return false;
            }
        );
    });
};

/**
 * データを取得する
 */
export const select = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                // 実行したいSQL文
                `select * from diaries ORDER BY id DESC LIMIT 5;`,
                // SQL文の引数
                [],
                // 成功時のコールバック関数
                (_, { rows }) => {
                    console.log("select success");
                    console.log("select result:" + JSON.stringify(rows._array));
                    resolve(rows._array);
                },
                (error: any) => {
                    // 失敗時のコールバック関数
                    console.log(error);
                    reject(error);
                }
            );
        });
    });
};
