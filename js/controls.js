(function () {
  var gridSizeControl = document.getElementById('gridSizeControl');
  gridSizeControl.addEventListener('input', function (e) {
    
  });
  
  var blobRadiusControl = document.getElementById('blobRadiusControl');
  blobRadiusControl.addEventListener('input', function (e) {
    
  });
  
  document.getElementById('genWorld').addEventListener('click', function () {
    Engine.map = createBlob({
      x: Math.floor(gridSizeControl.valueAsNumber / 2),
      y: Math.floor(gridSizeControl.valueAsNumber / 2),
      maxWidth: gridSizeControl.valueAsNumber,
      maxHeight: gridSizeControl.valueAsNumber,
      radius: blobRadiusControl.valueAsNumber
    });
    return false;
  });
})();