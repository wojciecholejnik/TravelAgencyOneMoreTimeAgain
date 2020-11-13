export const formatTime = (timeLeft) => {
  if(typeof(timeLeft) === typeof(1) && timeLeft > 0){

    const seconds = Math.floor(timeLeft % 60);
    const minuts = Math.floor((timeLeft / 60) % 60);
    const hours = Math.floor(timeLeft/3600);

    const zeroFormat = value => value<10 ? '0'+value : value;

    return zeroFormat(hours) + ':' + zeroFormat(minuts) + ':' + zeroFormat(seconds);
  } else {
    return null;
  }
};
