const fs = require('fs');

fs.readFile('./music.html', 'utf8', (err, data) => {
  fs.writeFileSync('songs.txt', '');
  
  let file = data;
  file     = file.replace(/\n/g, '');
  
  let songs = file.match(/<ytmusic-responsive-list-item-renderer.*?ytmusic-responsive-list-item-renderer>/gm);
  
  for (let i = 0; i < songs.length; i++) {
    let links      = songs[i].match(/<a.+?a>/gm);
    let songLink   = links[0];
    let artistLink = links[1];
    let link       = 'https://music.youtube.com/' + songLink.match(/href=\".+?\"/g)[0].replace(/href=|\"/g, '');
    let name       = songLink.match(/>.+?</g)[0].replace(/\<|\>/g, '');
    let artist     = null;
    
    try {
      artist = artistLink.match(/>.+?</g)[0].replace(/\<|\>/g, '');
    } catch (e) {
    
    }
    
    fs.appendFileSync('songs.txt', name + '\r\n', 'utf8');
    if (artist) {
      fs.appendFileSync('songs.txt', artist + '\r\n', 'utf8');
    }
    fs.appendFileSync('songs.txt', link + '\r\n', 'utf8');
    fs.appendFileSync('songs.txt', '\r\n', 'utf8');
  }
  
  console.log(songs.length);
});

