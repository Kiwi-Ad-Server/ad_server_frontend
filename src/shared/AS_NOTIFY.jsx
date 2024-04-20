import { message } from 'antd';

const AS_NOTIFY = (messageType, messageContent) => {
  message[messageType](messageContent);
};

export default AS_NOTIFY;
