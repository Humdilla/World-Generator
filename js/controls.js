(function () {
  var gridSizeControl = document.getElementById('gridSizeControl');
  gridSizeControl.addEventListener('input', function (e) {
    
  });

  document.getElementById('genWorld').addEventListener('click', function () {
    Engine.map = createBlob({
      x: 24,
      y: 24,
      maxWidth: gridSizeControl.valueAsNumber,
      maxHeight: gridSizeControl.valueAsNumber,
      radius: 50
    });
    return false;
  });
})();