const apiKey1Set5 = 'AIzaSyCVFlyufTv2vVDCrc2H5-_nw1yWs5OJhhs';
const channelId1Set5 = 'UCV9WL7sW6_KjanYkUUaIDfQ';
const playlistId1Set5 = 'PLZNwpHxpI4EjDSv3v_HY7udxDEqj4C7PL';
const maxResults1Set5 = 5;
const maxResults2Set5 = 10;

function fetchChannelInfoSet5() {
    const channelApiUrl6 = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId1Set5}&key=${apiKey1Set5}`;
    
    fetch(channelApiUrl6)
        .then(response => response.json())
        .then(data => {
            const channelInfo = data.items[0];
            if (channelInfo) {
                document.getElementById('channelName5').textContent = channelInfo.snippet.title;
                const subscriberCount = channelInfo.statistics.subscriberCount;
                const formattedSubscriberCount = formatSubscriberCountSet5(subscriberCount);
                document.getElementById('subscriberCount5').textContent = `구독자 수: ${formattedSubscriberCount}명`;
                document.getElementById('channelDescription5').textContent = channelInfo.snippet.description;
            } else {
                console.error('Channel info not found.');
            }
        })
        .catch(error => console.error('Error fetching channel info:', error));
}

function fetchYouTubeVideosSet5() {
    const apiUrl6 = `https://www.googleapis.com/youtube/v3/search?key=${apiKey1Set5}&channelId=${channelId1Set5}&part=snippet,id&order=date&maxResults=${maxResults1Set5}`;
    
    fetch(apiUrl6)
        .then(response => response.json())
        .then(data => displayVideosSet5(data.items))
        .catch(error => console.error('Error fetching YouTube videos:', error));
}

function fetchCommunityPostsSet5() {
    const apiUrl6 = `https://www.googleapis.com/youtube/v3/activities?part=snippet,contentDetails&channelId=${channelId1Set5}&maxResults=${maxResults1Set5}&key=${apiKey1Set5}`;
    
    fetch(apiUrl6)
        .then(response => response.json())
        .then(data => displayCommunityPostsSet5(data.items))
        .catch(error => console.error('Error fetching community posts:', error));
}

function displayVideosSet5(videos) {
    const videosContainer = document.getElementById('videos-container5');
    
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
            playVideoSet5(videoId);
        });

        videosContainer.appendChild(videoElement);
    });
}

function fetchPlaylistVideosSet5() {
    const apiUrl6 = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId1Set5}&maxResults=${maxResults2Set5}&key=${apiKey1Set5}`;
    
    fetch(apiUrl6)
        .then(response => response.json())
        .then(data => displayPlaylistVideosSet5(data.items))
        .catch(error => console.error('Error fetching playlist videos:', error));
}

function displayPlaylistVideosSet5(videos) {
    const playlistVideosContainer = document.getElementById('playlist-videos-container5');

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
            playVideoSet5(videoId);
        });

        playlistVideosContainer.appendChild(videoElement);
    });
}

// 페이지 로드 시 여러 함수 실행


// 구독자 수 포맷 함수
function formatSubscriberCountSet5(count) {
    if (count < 10000) {
        return count.toString();
    } else {
        const formattedCount = (count / 10000).toFixed(1);
        return `${formattedCount}만`;
    }
}

// 동영상 재생 함수
function playVideoSet5(videoId) {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
}