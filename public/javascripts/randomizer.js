function randomize(songData) {
  var lower = parseInt(document.getElementById('lower').value);
  var upper = parseInt(document.getElementById('upper').value);
  var count = parseInt(document.getElementById('count').value);
  var songList = [];
  var randomized = [];
  var difficulties = ['Expert', 'Challenge'];

  if (songData.length) {

    // Add songs within difficulty range
    songData.map((song) => {
      for (var i = 0; i < difficulties.length; i++) {
        var diff = parseInt(song[i+6]);
        if (diff >= lower && diff <= upper) {
          songList.push(song[1] + ' [' + difficulties[i] + ' - ' + diff + ']');
        }
      }
    });

    // Get random songs according to count
    for (var i = 0; i < count; i++) {
      var index = Math.floor((Math.random() * songList.length));
      randomized.push(songList[index]);
      songList.splice(index, 1);
    }

    // Remove previous songs
    while (document.body.getElementsByTagName('p').length) {
      document.body.removeChild(document.body.lastChild);
    }

    // Append new songs
    randomized.map((song) => {
      var p = document.createElement('p');
      var str = document.createTextNode(song);
      p.appendChild(str);
      p.onclick = function() {
        if (p.style.opacity == '0.25') {
          p.style.opacity = '1.0';
        } else {
          p.style.opacity = '0.25';
        }
      }
      document.body.appendChild(p);
    });

  } else {
    console.log('No data found.');
  }

}