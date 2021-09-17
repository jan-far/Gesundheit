import css from "styled-jsx/css";
const style = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .root {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    padding-top: 30px;
    height: 100vh;
  }

  .item {
    background: #fff;
    height: fit-content;
    height: 400px;
    width: 100%;

    max-width: 400px;

    background-color: #fff;
    border: 1px solid #e8eaed;
    border-radius: 6px;
    box-shadow: 0 0 12px 0 #f1f3f4;
    cursor: pointer;
    display: flex;
    flex-direction: column;

    outline: none;
    position: relative;
    transition: transform 0.1s, filter 0.1s, box-shadow 0.4s;
    width: 100%;
    z-index: 1;

    display: flex;
    flex-direction: column;
    margin: 30px;
  }

  .item:hover {
    transform: scale(1.02);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  .item .img {
    width: 100%;
    height: 200px;
    object-fit: contain;
  }
  .item img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .bg-a {
    background: #fff;
  }

  .bg-b {
    background: #efcad1;
  }

  .second {
    padding: 30px;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .back {
    position: fixed;
    z-index: 5;
    bottom: 15px;
    left: 15px;
  }
`;

export default style;
