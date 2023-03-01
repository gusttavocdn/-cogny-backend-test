async function waitAndExecute(seconds, callback) {
  console.log('\n');
  const interval = setInterval(() => {
    console.log(`Please wait ${seconds} seconds`);
    seconds--;

    if (seconds < 0) {
      clearInterval(interval);
      console.clear();
      callback();
    }
  }, 1000);
}

module.exports = waitAndExecute;
