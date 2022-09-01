import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  readTextFile,
  BaseDirectory,
  writeTextFile,
  createDir,
  readDir,
  removeFile,
} from "@tauri-apps/api/fs";
const Things = () => {
  const createfolder = async () => {
    const create = await createDir("textfile app", {
      dir: BaseDirectory.Desktop,
      recursive: true,
    });

    console.log(create);
  };

  const contents = async () => {
    const content = await readTextFile("textfile app/qwe.txt", {
      dir: BaseDirectory.Desktop,
    });
    console.log(content);
  };

  const write = async () => {
    const content = await writeTextFile(
      { path: "textfile app/qwe.txt", contents: "this is saved file" },
      {
        dir: BaseDirectory.Desktop,
      }
    );
    console.log(content);
  };

  const read = async () => {
    const entries = await readDir("textfile app", {
      dir: BaseDirectory.Desktop,
      recursive: true,
    });
    console.log(entries);
  };

  const [key, setKey] = useState([]);
  const getKeys = Object.keys(localStorage);
  useEffect(() => {
    setKey(...key, getKeys);
    contents();
  }, []);
  const history = useNavigate();
  const handleSubmit = item => {
    history("/details", { state: item });
  };
  const handleRemoveItem = idx => {
    // assigning the list to temp variable
    const temp = [...key];

    // removing the element using splice
    temp.splice(idx, 1);

    // updating the list
    setKey(temp);
  };
  return (
    <React.Fragment>
      <button>테스트</button>
      <button onClick={() => write()}>write</button>
      <button onClick={() => createfolder()}>create folder</button>
      <button onClick={() => read()}>read folder</button>

      {/* <br />
      <Link to="/category">메모쓰기</Link>
      <br />
      저장된 목록입니다.
      <br />
      {key?.map((item, index) => {
        const x = item?.split("|");

        return (
          <React.Fragment key={index}>
            <div className="hey">
              제목 : <button onClick={() => handleSubmit(item)}> {x[1]}</button>{" "}
              날짜:{x[0]}{" "}
              <button
                onClick={() => {
                  localStorage.removeItem(item);
                  handleRemoveItem(index);
                }}
              >
                삭제
              </button>
            </div>

            <br />
          </React.Fragment>
        );
      })} */}
    </React.Fragment>
  );
};

export default Things;
