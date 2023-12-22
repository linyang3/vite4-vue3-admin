// 获取当前时间判断时间段
export const getTime = () => {
  let message = "";
  const hours = new Date().getHours();
  if (hours <= 3) {
    message = "凌晨";
  } else if (hours < 7) {
    message = "早上";
  } else if (hours < 12) {
    message = "上午";
  } else if (hours < 14) {
    message = "中午";
  } else if (hours < 18) {
    message = "下午";
  } else {
    message = "晚上";
  }
  return message;
};
