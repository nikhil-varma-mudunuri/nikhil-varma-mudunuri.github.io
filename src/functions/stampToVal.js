const stampToVal = (stamp) => {
  const days = Math.floor(stamp / 86400);
  stamp -= 86400 * days;
  const hours = Math.floor(stamp / 3600);
  stamp -= 3600 * hours;
  const minutes = Math.floor(stamp / 60);
  const seconds = stamp - minutes * 60;
  return [days, hours, minutes, seconds];
};

export default stampToVal;
