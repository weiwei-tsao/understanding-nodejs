const fs = require('fs').promises;

const filePath = 'src/command.txt';
// open -> return a unique number called file descriptor to an opened file instead of opening a file
// then read or write
// close it

const CREATE_FILE = 'create a file';
const DELETE_FILE = 'delete a file';
const RENAME_FILE = 'rename a file';
const ADD_TO_FILE = 'add to a file';

(async () => {
  //   create a file
  const createFiles = async (filePath) => {
    try {
      // try to find out if the file is already created
      let existingFileHandle = await fs.open(filePath, 'r');
      //   we have the file...
      existingFileHandle.close();
      return console.log(`The file ${filePath} is existed.`);
    } catch (error) {
      // we need to create the file
      const newFileHandle = await fs.open(filePath, 'w');
      console.log(`A new file ${filePath} was created successfully.`);

      //   close the file descriptor
      newFileHandle.close();
    }
  };

  //   delete a file
  const deleteFiles = async (filePath) => {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('File does not exist');
      } else {
        console.log('Error occurred: ', error);
      }
    }
  };

  //   rename a file
  const renameFiles = async (oldFilePath, newFilePath) => {
    try {
      await fs.rename(oldFilePath, newFilePath);
      console.log('File name changed successfully.');
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('File name was changed already.');
      } else {
        console.log('An error occurred: ', error);
      }
    }
  };

  let addedContent;
  //   add to a file
  const addToFiles = async (filePath, content) => {
    if (addedContent === content) return;
    try {
      const fileHandle = await fs.open(filePath, 'a');
      fileHandle.write(content);
      addedContent = content;
    } catch (error) {
      console.log('An error occurred: ', error);
    }
  };

  // open the file
  const commandFileHandler = await fs.open(filePath);

  //   3. using eventEmitter
  commandFileHandler.on('change', async () => {
    //   get file info
    const size = (await commandFileHandler.stat()).size;
    //   allocate buffer with the file size
    const buff = Buffer.alloc(size);
    //   the location where we start to fill the buffer
    const offset = 0;
    //   the start point that we want to read the file
    const position = 0;
    //   how many bytes we want to read
    const length = buff.byteLength;

    const content = await commandFileHandler.read(
      buff,
      offset,
      length,
      position
    );

    // console.log('Content: ', content); // binary
    // decoder 01 => meaningful
    // encoder meaningful => 01
    console.log(content.buffer.toString('utf8'));
    const command = content.buffer.toString('utf-8');

    // create a file
    // create a file <path>
    if (command.includes(CREATE_FILE)) {
      const newFile = command.substring(CREATE_FILE.length + 1);
      createFiles(newFile);
    }

    // delete a file
    // delete a file <path>
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      deleteFiles(filePath);
    }

    // rename a file
    // rename a file <path> TO <path>
    if (command.includes(RENAME_FILE)) {
      const _idx = command.indexOf(' TO ');
      const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx);
      const newFilePath = command.substring(_idx + 4);
      renameFiles(oldFilePath, newFilePath);
    }

    // add to a file
    // add to a file <path> content: <content>
    if (command.includes(ADD_TO_FILE)) {
      const _idx = command.indexOf(' content: ');
      const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
      const content = command.substring(_idx + 10);
      addToFiles(filePath, content);
    }
  });

  const watcher = fs.watch(filePath);
  for await (const event of watcher) {
    if (event.eventType === 'change') {
      console.log('File changed!');
      commandFileHandler.emit('change');
    }
  }
})();

/*   
2. read the file through buffer    
//   get file info
const size = (await commandFileHandler.stat()).size;
//   allocate buffer with the file size
const buff = Buffer.alloc(size);
//   the location where we start to fill the buffer
const offset = 0;
//   the start point that we want to read the file
const position = 0;
//   how many bytes we want to read
const length = buff.byteLength;

const content = await commandFileHandler.read(
  buff,
  offset,
  length,
  position
);
console.log('Content: ', content);
*/
/* 
1. basic of read
const content = await commandFileHandler.read()
  // File changed!
  // Content:  { // the file
  // bytesRead: 9,
  // buffer: <Buffer 68 65 6c 6c 6f 20 30 30 30 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ... 16334 more bytes>
  // }
  // File changed!
  // Content:  { // the buffer
  // bytesRead: 0,
  // buffer: <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ... 16334 more bytes>
  // }
*/
