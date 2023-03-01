function wait(seconds) {
  const interval = setInterval(() => {
    console.log(`The Menu will appear in ${seconds} seconds`);
    seconds--;

    if (seconds < 0) {
      clearInterval(interval);
      console.clear();
    }
  }, 1000);
}

module.exports = wait;
