import { Button, Result } from "antd";
import React, { useState } from "react";
import { Info } from "../App";
import ButtonComponent from "../component/Button";

interface IConfirm {
  projectInfo: Info;
  setProjectInfo: React.Dispatch<React.SetStateAction<Info>>;
  onChange?(props: any): void;
}

const Confirm = ({ projectInfo, onChange, setProjectInfo }: IConfirm) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const handleOnClick = () => {
    window.open(
      `ton://transfer/kQBp58MUqqirN6VdsW6f_UxfLKo9xVFpEt2RCQtOT4uaylwX?amount=1000`,
      "_blank"
    );
    setTimeout(() => {
      setShowConfirm(true);
    }, 3000);
  };

  const getImgJson = async () => {
    fetch("https://genftai.glitch.me/api/getjsonurl", {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "user-agent": "Mozilla/4.0 MDN Example",
        "content-type": "application/json",
      },
      mode: "cors",
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify({
        name: projectInfo.projectName,
        description: projectInfo.description,
        image: projectInfo.imgUrl,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProjectInfo((s) => ({
          ...s,
          jsonUrl: data.url,
        }));
      });
  };

  // onChange && onChange(true);
  const handleOnReset = () => {
    onChange && onChange({ isBack: true });
  };

  return (
    <div className="w-full h-full flex flex-col">
      {showConfirm ? (
        <Result
          status="success"
          title="Successfully Purchased NFT"
          subTitle="Order number: 2017182818828182881 NFT configuration takes 1-5 minutes, please wait."
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => {
                getImgJson();
                onChange && onChange(true);
              }}
            >
              Go Preview
            </Button>,
          ]}
        />
      ) : (
        <>
          <div className="h-full">
            <iframe src={projectInfo?.imgUrl} className="w-full min-h-[300px]">
              你的瀏覽器不支援 iframe
            </iframe>
          </div>

          <div className="flex space-x-2">
            <ButtonComponent
              text="Reset"
              onClick={handleOnReset}
              style={{ width: "100%" }}
            />
            <ButtonComponent
              text="Confirm"
              style={{
                backgroundColor: "#1890ff",
                color: "#ffffff",
                width: "100%",
              }}
              onClick={handleOnClick}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Confirm;
