#Popcorn Time Mobile Backed

### Idea
Load Popcorn Time in a Web View.

***

### Initial setup:

 1. `npm install`
 2. `grunt css`

After that, you can run with `npm start` and visit `http://localhost:8080` in your browser.

***

### Init streaming
```
url: 'http://localhost:8080/api/streamer',
method: 'PUT',
data: {
    torrent: torrent-url
}
```

### Get status
```
url: 'http://localhost:8080/api/streamer',
method: 'GET'
```

#### Output (downloading):
```
{ state: 'startingDownload',
  streamInfo: { 
     downloaded: 0,
     active_peers: 0,
     total_peers: 18,
     uploadSpeed: '0 B',
     downloadSpeed: '0 B',
     percent: 0,
     src: undefined,
     type: undefined 
    }
}
```

#### Output (ready):
```
{ state: 'ready',
  streamInfo: { 
     downloaded: 11517952,
     active_peers: 23,
     total_peers: 36,
     uploadSpeed: '0 B',
     downloadSpeed: '1.97 MB',
     percent: 109.84375,
     src: 'http://192.168.0.102:44000/',
     type: 'video/mp4' 
    } 
}
```

### Stop streamer and kill peerflix activity
```
url: 'http://localhost:8080/api/streamer',
method: 'DELETE'
```

***

Thanks to [davidcroda](http://github.com/davidcroda) and [wallydz](http://github.com/wallydz)