import { useContext } from "react";
import { ChatContext } from "../../context/ChatData";

export default function Info() {
  const { messages, names, direction } = useContext(ChatContext);
  return (
    <div className="about">
      <p className="info-item">
        messages count: <span className="info-cnt">{messages.length}</span>{" "}
      </p>
      <p className="row info-item">
        <span className="info-text">
          sent:
          <span className="info-cnt">
            {messages.filter((item) => item.name == names?.[direction]).length}
          </span>
        </span>
        <span className="info-text">
          recived:
          <span className="info-cnt">
            {
              messages.filter(
                (item) => item.name == names?.[direction == 0 ? 1 : 0]
              ).length
            }
          </span>
        </span>
      </p>

      <p className="row info-item">
        <span className="info-text">
          start: <span className="info-date"> {messages[0].date}</span>{" "}
        </span>
        <span>
          end:
          <span className="info-date">
            {messages[messages.length - 1].date}
          </span>
        </span>
      </p>
    </div>
  );
}
