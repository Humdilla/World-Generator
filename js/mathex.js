var Mathex = {
  
  randomBetween: function (start, end) {
    return start + Math.floor(Math.random() * (end - start + 1));
  },
  
  percentTrue: function (percent) {
    return Math.random() < percent;
  }
};