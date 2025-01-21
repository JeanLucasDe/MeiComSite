import "./TipBox.css";

const TipBox = ({ message }) => {
  return (
    <div className="tip-box">
      <div className="tip-icon">💡</div>
      <div className="tip-message">{message}</div>
    </div>
  );
};

export default TipBox;