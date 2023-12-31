import { useState, useEffect, useContext, useRef } from "react";
import bg from "../images/g2.png";
import { DataContext } from "../../context/DataContext";
import { BsThreeDotsVertical, BsFillClipboardFill } from "react-icons/bs";
// import { MdOutlineContentCopy } from "react-icons/md";
import Menu from "../components/Menu";
import Chat from "../components/Chat";
import InfiniteScroll from "react-infinite-scroller";
import TopBar from "../components/TopBar";
import Info from "../components/Info";
import { ChatContext } from "../../context/ChatData";
import SearchBar from "../components/SeachBar";

export default function ChatPage() {
  let { fileContent, fileName, isDefaultTheme } = useContext(DataContext);
  const {
    names,
    setNames,
    messages,
    setMessages,
    showInfo,
    setShowInfo,
    showMenu,
    setShowMenu,
    direction,
    setDirection,
    hasMore,
    setHasMore,
    len,
    records,
    setRecords,
    showClipBoard,
    setShowClipBoard,
    query,
  } = useContext(ChatContext);
  let prvDate = useRef(null);
  let prvMssg = useRef(null);

  useEffect(() => {
    // return () => {
    //   setMessages([]);
    //   setDirection(0);
    //   setNames([]);
    //   setShowMenu(false);
    //   setShowClipBoard(false);
    //   setShowInfo(false);
    //   setHasMore(true);
    //   setRecords(300);
    // };
  }, []);

  useEffect(() => {
    if (fileContent.length == 0 || messages.length > 0) return;
    const mssgs = getMessages(fileContent, fileName);
    setMessages(mssgs);
    let set = Array.from(new Set(mssgs.slice(0, 8).map((item) => item.name)));

    if (fileName.includes(set[0])) {
      let temp = set[0];
      set.splice(0, 1);
      set.push(temp);
    }

    setNames(set);
  }, [fileContent]);

  function RenderChat({ chat, ind }) {
    return (
      <>
        <Chat chat={chat} key={chat.mssg + "xx" + ind} ind={ind} />
      </>
    );
  }

  return (
    <div
      className="inner-body"
      style={{
        backgroundImage: isDefaultTheme && `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <TopBar />
      {showInfo && <Info />}
      {messages.length > 0 && (
        <InfiniteScroll
          pageStart={0}
          records={records}
          loadMore={() => {
            if (records >= messages.length - 1) setHasMore(false);
            // else setTimeout(() => setRecords((prv) => prv + 500), 300);
            else setRecords((prv) => prv + 1500);
          }}
          hasMore={hasMore}
          loader={<p className="loading">Loading ...</p>}
          useWindow={false}
        >
          {messages
            .filter((m) => {
              if (!query && !len) return true;
              if (len && !len.endsWith(",")) {
                if (
                  len
                    .split(",")
                    .map((i) => parseInt(i))
                    .filter((item) => !isNaN(item))
                    .includes(m.mssg.length)
                ) {
                  return true;
                }
              }
              if (query && m.mssg.toLowerCase().includes(query.toLowerCase()))
                return true;
              return false;
            })
            .slice(0, records)
            .map((chat, ind) => {
              return <RenderChat key={ind} chat={chat} ind={ind} />;
            })}
        </InfiniteScroll>
      )}
    </div>
  );
}

function getMessages(text, fileName) {
  const messages = text.split(
    /\n(?=\d\d?\/\d\d?\/\d\d\d?\d?, \d\d?:\d\d\s?(?:pm|am|PM|AM)? - )/
  );
  messages.splice(0, 1);

  return messages
    .map((message, index) => {
      const [timestamp, content] = message.split(" - ");
      const [date, time] = timestamp.split(", ");
      let [name, mssg] = content.split(":");
      let file;

      if (mssg && mssg.includes("(file attached)"))
        [file, mssg] = mssg.split("(file attached)");

      const obj = {
        date: date?.trim(),
        time: time?.trim(),
        name: name?.trim(),
        mssg: mssg?.trim(),
        file: file?.trim(),
      };
      if (fileName.includes("Bosch Siemens")) {
        if (mssg && mssg?.trim()?.length == 16) return obj;
      } else if (fileName.includes("Artes conference group")) {
        if (mssg && mssg?.trim()?.length == 12) return obj;
      } else if (mssg) return obj;
    })
    .filter((item) => item?.mssg);
}
