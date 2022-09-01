import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BaseDirectory,
  writeTextFile,
  createDir,
  readDir,
  removeFile,
} from "@tauri-apps/api/fs";
const Home = () => {
  const history = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [error, setError] = useState();
  const [create_box, setCreate_box] = useState(false);

  const folderName = "this is kyun's memo app's folder";

  const [newTitle, setNewTitle] = useState("");

  const createfolder = async () => {
    const create = await createDir(folderName, {
      dir: BaseDirectory.Desktop,
      recursive: true,
    });

    console.log(create);
  };

  const read = async () => {
    const entries = await readDir(folderName, {
      dir: BaseDirectory.Desktop,
      recursive: true,
    })
      .then(res => setFileList(res))
      .catch(err => setError(err));

    entries;
  };

  const write = async () => {
    const content = await writeTextFile(
      { path: `${folderName}/${newTitle}.txt`, contents: "" },
      {
        dir: BaseDirectory.Desktop,
      }
    );
    console.log(content);

    setNewTitle("");
    setCreate_box(false);
  };
  useEffect(() => {
    createfolder();
  }, []);
  useEffect(() => {
    read();
  }, [fileList]);

  const handleRemoveItem = async (name, idx) => {
    const content = await removeFile(`${folderName}/${name}`, {
      dir: BaseDirectory.Desktop,
    });
    console.log(content);

    // assigning the list to temp variable
    const temp = [...fileList];

    // removing the element using splice
    temp.splice(idx, 1);

    // updating the list
    setFileList(temp);
  };

  return (
    <React.Fragment>
      <div>kyun's memo application</div>
      <br />
      <button onClick={() => setCreate_box(true)}>메모파일생성하기</button>
      {create_box && (
        <>
          <input
            placeholder="제목"
            onChange={e => setNewTitle(e.target.value)}
          />
          <button onClick={() => write()}>확인</button>
          <p onClick={() => setCreate_box(false)}>닫기</p>
        </>
      )}
      <hr />
      <br />
      메모리스트
      <br />
      {fileList?.map((item, index) => (
        <div key={index}>
          <button
            onClick={() =>
              history("/file", {
                state: { name: item.name, folder: folderName },
              })
            }
          >
            {item.name}
          </button>

          <button onClick={() => handleRemoveItem(item.name, index)}>
            삭제
          </button>
        </div>
      ))}
      <p> {error}</p>
    </React.Fragment>
  );
};

export default Home;
