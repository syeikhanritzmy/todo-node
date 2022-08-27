import fs from 'fs';

const todo = './todo.json';

const readAllFile = (data) => {
  return new Promise((resolve, reject) => {
    fs.readFile(data, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
};
const readOneFile = async (name, data) => {
  try {
    const todos = await readAllFile(data);
    const findTodo = todos.find((todo) => todo.name === name.toLowerCase());
    !findTodo
      ? console.log('data tidak ditemukan')
      : console.log(`Todo Name : ${findTodo.name}`);
  } catch (err) {
    console.log(err);
  }
};
const deleteOneFile = async (name) => {
  try {
    const todos = await readAllFile(todo);
    const find = todos.find((todo) => todo.name === name);
    const filter = todos.filter((todo) => todo.name !== name);
    const dataStringify = JSON.stringify(filter, null, 2);
    !find
      ? console.log('hapus gagal, data tidak ditemukan')
      : fs.writeFile(todo, dataStringify, (err) => {
          if (err) throw err;
          console.log('data berhasil dihapus');
        });
  } catch (err) {
    console.log(err);
  }
};
const writeData = async (data) => {
  try {
    const todos = await readAllFile(todo);
    const newData = [...todos, data];
    const dataStringify = JSON.stringify(newData, null, 2).toLowerCase();
    fs.writeFile(todo, dataStringify, (err) => {
      if (err) throw err;
      console.log('berhasil tambah data');
    });
  } catch (err) {
    console.log(err);
  }
};

// writeData({ name: 'Naruto' });
// const readAll = await readAllFile(todo);
// console.log(readAll);
// deleteOneFile('Naruto');
// readOneFile('NaRuTo', todo);
