const Sequelize = require('sequelize');
const path = require('path');

const sequelize = new Sequelize(undefined, undefined, undefined, {
    host: 'localhost',
    dialect: 'sqlite',


    // SQLite only
    storage: path.join(__dirname, '../database/database.sqlite')//坑爹的这里要用绝对路径，要不然要G
});

// Or you can simply use a connection uri
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');


//测试连接是否成功
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });


const Note = sequelize.define('note', { //定义存储数据的模型
    text: {
        type: Sequelize.STRING
    }
});

// force: true will drop the table if it already exists
// Note.sync().then(() => {
//     Note.create({text: 'hello'}) //创建一条数据
// }).then(() => {
//     Note.findAll({raw: true}).then(notes => { //得到所有的数据
//         console.log(notes)
//     })
// })

// Note.findAll({raw:true , where:{id:2}}).then((note)=>{ //查找id为2的数据
//     console.log(note)
// })


module.exports = Note