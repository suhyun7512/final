const apiKey1Set6 = 'AIzaSyCVFlyufTv2vVDCrc2H5-_nw1yWs5OJhhs';
const channelId1Set6 = 'UCs6EwgxKLY9GG4QNUrP5hoQ';
const playlistId1Set6 = 'PLhaJuLneKo5E58RZQPek_4a-EGSRetend';
const maxResults1Set6 = 5;
const maxResults2Set6 = 10;

function fetchChannelInfoSet6() {
    const channelApiUrl6 = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId1Set6}&key=${apiKey1Set6}`;
    
    fetch(channelApiUrl6)
        .then(response => response.json())
        .then(data => {
            const channelInfo = data.items[0];
            if (channelInfo) {
                document.getElementById('channelName1').textContent = channelInfo.snippet.title;
                const subscriberCount = channelInfo.statistics.subscriberCount;
                const formattedSubscriberCount = formatSubscriberCountSet6(subscriberCount);
                document.getElementById('subscriberCount1').textContent = `구독자 수: ${formattedSubscriberCount}명`;
                document.getElementById('channelDescription1').textContent = channelInfo.snippet.description;
            } else {
                console.error('Channel info not found.');
            }
        })
        .catch(error => console.error('Error fetching channel info:', error));
}

function fetchYouTubeVideosSet6() {
    const apiUrl6 = `https://www.googleapis.com/youtube/v3/search?key=${apiKey1Set6}&channelId=${channelId1Set6}&part=snippet,id&order=date&maxResults=${maxResults1Set6}`;
    
    fetch(apiUrl6)
        .then(response => response.json())
        .then(data => displayVideosSet6(data.items))
        .catch(error => console.error('Error fetching YouTube videos:', error));
}

function fetchCommunityPostsSet6() {
    const apiUrl6 = `https://www.googleapis.com/youtube/v3/activities?part=snippet,contentDetails&channelId=${channelId1Set6}&maxResults=${maxResults1Set6}&key=${apiKey1Set6}`;
    
    fetch(apiUrl6)
        .then(response => response.json())
        .then(data => displayCommunityPostsSet6(data.items))
        .catch(error => console.error('Error fetching community posts:', error));
}

function displayVideosSet6(videos) {
    const videosContainer = document.getElementById('videos-container1');
    
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
            playVideoSet6(videoId);
        });

        videosContainer.appendChild(videoElement);
    });
}

function fetchPlaylistVideosSet6() {
    const apiUrl6 = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId1Set6}&maxResults=${maxResults2Set6}&key=${apiKey1Set6}`;
    
    fetch(apiUrl6)
        .then(response => response.json())
        .then(data => displayPlaylistVideosSet6(data.items))
        .catch(error => console.error('Error fetching playlist videos:', error));
}

function displayPlaylistVideosSet6(videos) {
    const playlistVideosContainer = document.getElementById('playlist-videos-container1');

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
            playVideoSet6(videoId);
        });

        playlistVideosContainer.appendChild(videoElement);
    });
}

// 페이지 로드 시 여러 함수 실행


// 구독자 수 포맷 함수
function formatSubscriberCountSet6(count) {
    if (count < 10000) {
        return count.toString();
    } else {
        const formattedCount = (count / 10000).toFixed(1);
        return `${formattedCount}만`;
    }
}

// 동영상 재생 함수
function playVideoSet6(videoId) {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
}