import React from "react";
import { Typography } from "antd";
import { UserContextProvider } from "./context/UserContext";

const { Title } = Typography;

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <Title level={2}> 
        Hello world!
      </Title>
    </UserContextProvider>
  );
}

export default App;
