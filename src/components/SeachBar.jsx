import { useState, useEffect, useContext } from "react";
import ChatData, { ChatContext } from "../../context/ChatData";
import { BsArrowLeft } from "react-icons/bs";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
export default function SearchBar({ closeSearchBar }) {
  const { query, setQuery, len, setLen } = useContext(ChatContext);
  const [showLenSearch, setShowLenSearch] = useState(false);
  return (
    <div className="search-bar">
      <div className="main-search-bar">
        <BsArrowLeft
          className="icon"
          onClick={() => {
            closeSearchBar();
            setQuery("");
            setShowLenSearch(false);
            setLen("");
          }}
        />
        <input
          type="text"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {!showLenSearch ? (
          <FaChevronDown
            onClick={() => {
              setShowLenSearch(true);
            }}
          />
        ) : (
          <FaChevronUp
            onClick={() => {
              setShowLenSearch(false);
              setLen("");
            }}
          />
        )}
      </div>
      {showLenSearch && (
        <div className="len-search-bar">
          <p>Len</p>
          <input
            type="text"
            value={len}
            onChange={(e) => {
              setLen(e.target.value);
            }}
          />
        </div>
      )}
    </div>
  );
}
