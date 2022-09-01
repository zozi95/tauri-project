import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BaseDirectory, readTextFile, writeTextFile } from "@tauri-apps/api/fs";
const File = () => {
  const history = useNavigate();
  const { state } = useLocation();
  const [text, setText] = useState("");
  const { name, folder } = state;
  const [esc, setEsc] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const contents = async () => {
    const content = await readTextFile(`${folder}/${name}`, {
      dir: BaseDirectory.Desktop,
    });
    setText(content);
  };
  const escFunction = useCallback(event => {
    if (event.key === "Escape") {
      setEsc(prev => !prev);
    }
  }, []);

  const write = async () => {
    const content = await writeTextFile(
      { path: `${folder}/${name}`, contents: text },
      {
        dir: BaseDirectory.Desktop,
      }
    );
    console.log(content);
    setEsc(true);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 500);
  };

  useEffect(() => {
    contents();
  }, []);

  const handleKeyDown = event => {
    event.preventDefault();
    let charCode = String.fromCharCode(event.which).toLowerCase();

    if ((event.ctrlKey || event.metaKey) && charCode === "s") {
      write();
    } else if ((event.ctrlKey || event.metaKey) && charCode === "") {
      history("/");
    } else if ((event.ctrlKey || event.metaKey) && charCode === "v") {
      console.log("CTRL+V Pressed");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  useEffect(() => {
    if (esc) {
      // attach the event listener
      document.addEventListener("keydown", handleKeyDown);

      // remove the event listener
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [esc]);

  return (
    <div onClick={() => setEsc(false)} className="file">
      <h2>{name}</h2>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        disabled={esc}
        onFocus={!esc}
      />
      <br />
      {isSaved && <div className="saved">저장되었습니다.</div>}{" "}
      <button className="goback" onClick={() => history("/")}>
        홈으로가기
      </button>
      (Esc And ctrl+backspace)
      <button onClick={() => write()}>저장하기</button> (Esc And ctrl+s)
    </div>
  );
};

export default File;
