const apiKey1Set4 = 'AIzaSyCVFlyufTv2vVDCrc2H5-_nw1yWs5OJhhs';
const channelId1Set4 = 'UCTifMx1ONpElK5x6B4ng8eg';
const playlistId1Set4 = 'PLqE7uvTHaH31i-7XBWjLnlWS9VRSC8jTt';
const maxResults1Set4 = 5;
const maxResults2Set4 = 10;

function fetchChannelInfoSet4() {
    const channelApiUrl6 = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId1Set4}&key=${apiKey1Set4}`;
    
    fetch(channelApiUrl6)
        .then(response => response.json())
        .then(data => {
            const channelInfo = data.items[0];
            if (channelInfo) {
                document.getElementById('channelName4').textContent = channelInfo.snippet.title;
                const subscriberCount = channelInfo.statistics.subscriberCount;
                const formattedSubscriberCount = formatSubscriberCountSet4(subscriberCount);
                document.getElementById('subscriberCount4').textContent = `구독자 수: ${formattedSubscriberCount}명`;
                document.getElementById('channelDescription4').textContent = channelInfo.snippet.description;
            } else {
                console.error('Channel info not found.');
            }
        })
        .catch(error => console.error('Error fetching channel info:', error));
}

function fetchYouTubeVideosSet4() {
    const apiUrl6 = `https://www.googleapis.com/youtube/v3/search?key=${apiKey1Set4}&channelId=${channelId1Set4}&part=snippet,id&order=date&maxResults=${maxResults1Set4}`;
    
    fetch(apiUrl6)
        .then(response => response.json())
        .then(data => displayVideosSet4(data.items))
        .catch(error => console.error('Error fetching YouTube videos:', error));
}

function fetchCommunityPostsSet4() {
    const apiUrl6 = `https://www.googleapis.com/youtube/v3/activities?part=snippet,contentDetails&channelId=${channelId1Set4}&maxResults=${maxResults1Set4}&key=${apiKey1Set4}`;
    
    fetch(apiUrl6)
        .then(response => response.json())
        .then(data => displayCommunityPostsSet4(data.items))
        .catch(error => console.error('Error fetching community posts:', error));
}

function displayVideosSet4(videos) {
    const videosContainer = document.getElementById('videos-container4');
    
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
            playVideoSet4(videoId);
        });

        videosContainer.appendChild(videoElement);
    });
}

function fetchPlaylistVideosSet4() {
    const apiUrl6 = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId1Set4}&maxResults=${maxResults2Set4}&key=${apiKey1Set4}`;
    
    fetch(apiUrl6)
        .then(response => response.json())
        .then(data => displayPlaylistVideosSet4(data.items))
        .catch(error => console.error('Error fetching playlist videos:', error));
}

function displayPlaylistVideosSet4(videos) {
    const playlistVideosContainer = document.getElementById('playlist-videos-container4');

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
            playVideoSet4(videoId);
        });

        playlistVideosContainer.appendChild(videoElement);
    });
}

// 페이지 로드 시 여러 함수 실행


// 구독자 수 포맷 함수
function formatSubscriberCountSet4(count) {
    if (count < 10000) {
        return count.toString();
    } else {
        const formattedCount = (count / 10000).toFixed(1);
        return `${formattedCount}만`;
    }
}

// 동영상 재생 함수
function playVideoSet4(videoId) {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
}