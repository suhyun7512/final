const apiKey1Set2 = 'AIzaSyCVFlyufTv2vVDCrc2H5-_nw1yWs5OJhhs';
const channelId1Set2 = 'UCHE7GBQVtdh-c1m3tjFdevQ';
const playlistId1Set2 = 'PLhaJuLneKo5E58RZQPek_4a-EGSRetend';
const maxResults1Set2 = 5;
const maxResults2Set2 = 10;

function fetchChannelInfoSet2() {
    const channelApiUrl2 = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId1Set2}&key=${apiKey1Set2}`;
    
    fetch(channelApiUrl2)
        .then(response => response.json())
        .then(data => {
            const channelInfo = data.items[0];
            if (channelInfo) {
                document.getElementById('channelName2').textContent = channelInfo.snippet.title;
                const subscriberCount = channelInfo.statistics.subscriberCount;
                const formattedSubscriberCount = formatSubscriberCountSet2(subscriberCount);
                document.getElementById('subscriberCount2').textContent = `구독자 수: ${formattedSubscriberCount}명`;
                document.getElementById('channelDescription2').textContent = channelInfo.snippet.description;
            } else {
                console.error('Channel info not found.');
            }
        })
        .catch(error => console.error('Error fetching channel info:', error));
}

function fetchYouTubeVideosSet2() {
    const apiUrl2 = `https://www.googleapis.com/youtube/v3/search?key=${apiKey1Set2}&channelId=${channelId1Set2}&part=snippet,id&order=date&maxResults=${maxResults1Set2}`;
    
    fetch(apiUrl2)
        .then(response => response.json())
        .then(data => displayVideosSet2(data.items))
        .catch(error => console.error('Error fetching YouTube videos:', error));
}

function fetchCommunityPostsSet2() {
    const apiUrl2 = `https://www.googleapis.com/youtube/v3/activities?part=snippet,contentDetails&channelId=${channelId1Set2}&maxResults=${maxResults1Set2}&key=${apiKey1Set2}`;
    
    fetch(apiUrl2)
        .then(response => response.json())
        .then(data => displayCommunityPostsSet2(data.items))
        .catch(error => console.error('Error fetching community posts:', error));
}

function displayVideosSet2(videos) {
    const videosContainer = document.getElementById('videos-container2');
    
    videos.forEach(video => {
        const videoThumbnail = video.snippet.thumbnails.medium.url;
        const videoTitle = video.snippet.title;
        const videoId = video.id.videoId;

        const videoElement = document.createElement('div');
        videoElement.innerHTML = `
            <img src="${videoThumbnail}" alt="${videoTitle}" data-video-id="${videoId}">
            <p>${videoTitle}</p>
        `;

        videoElement.addEventListener('click', function() {
            playVideoSet2(videoId);
        });

        videosContainer.appendChild(videoElement);
    });
}

function fetchPlaylistVideosSet2() {
    const apiUrl2 = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId1Set2}&maxResults=${maxResults2Set2}&key=${apiKey1Set2}`;
    
    fetch(apiUrl2)
        .then(response => response.json())
        .then(data => displayPlaylistVideosSet2(data.items))
        .catch(error => console.error('Error fetching playlist videos:', error));
}

function displayPlaylistVideosSet2(videos) {
    const playlistVideosContainer = document.getElementById('playlist-videos-container2');

    if (!playlistVideosContainer) {
        console.error('Playlist videos container not found.');
        return;
    }

    videos.forEach(video => {
        const videoTitle = video.snippet.title;
        const videoThumbnail = video.snippet.thumbnails.default.url;
        const videoId = video.snippet.resourceId.videoId;

        const videoElement = document.createElement('div');
        videoElement.innerHTML = `
            <img src="${videoThumbnail}" alt="${videoTitle}" data-video-id="${videoId}">
            <p>${videoTitle}</p>
        `;

        videoElement.addEventListener('click', function() {
            playVideoSet2(videoId);
        });

        playlistVideosContainer.appendChild(videoElement);
    });
}

// 페이지 로드 시 여러 함수 실행


// 구독자 수 포맷 함수
function formatSubscriberCountSet2(count) {
    if (count < 10000) {
        return count.toString();
    } else {
        const formattedCount = (count / 10000).toFixed(1);
        return `${formattedCount}만`;
    }
}

// 동영상 재생 함수
function playVideoSet2(videoId) {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
}