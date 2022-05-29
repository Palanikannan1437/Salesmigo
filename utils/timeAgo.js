exports.timeAgo = (ts) => {
  var d = new Date();
  var nowTs = Math.floor(d.getTime() / 1000);
  var seconds = nowTs - ts;
  if (seconds > 2 * 24 * 3600) {
    return "a few days ago";
  }
  if (seconds > 24 * 3600) {
    return "yesterday";
  }
  if (seconds > 3600) {
    return "a few hours ago";
  }
  if (seconds > 1800) {
    return "Half an hour ago";
  }
  if (seconds > 60) {
    return Math.floor(seconds / 60) + " minutes ago";
  }
};
