const apiKey1Set3 = 'AIzaSyCVFlyufTv2vVDCrc2H5-_nw1yWs5OJhhs';
const channelId1Set3 = 'UC-oCJP9t47v7-DmsnmXV38Q';
const playlistId1Set3 = 'PLLPGQs-RNQXnFl55WissjQylZbInOK81P';
const maxResults1Set3 = 5;
const maxResults2Set3 = 10;

function fetchChannelInfoSet3() {
    const channelApiUrl6 = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId1Set3}&key=${apiKey1Set3}`;
    
    fetch(channelApiUrl6)
        .then(response => response.json())
        .then(data => {
            const channelInfo = data.items[0];
            if (channelInfo) {
                document.getElementById('channelName3').textContent = channelInfo.snippet.title;
                const subscriberCount = channelInfo.statistics.subscriberCount;
                const formattedSubscriberCount = formatSubscriberCountSet3(subscriberCount);
                document.getElementById('subscriberCount3').textContent = `구독자 수: ${formattedSubscriberCount}명`;
                document.getElementById('channelDescription3').textContent = channelInfo.snippet.description;
            } else {
                console.error('Channel info not found.');
            }
        })
        .catch(error => console.error('Error fetching channel info:', error));
}

function fetchYouTubeVideosSet3() {
    const apiUrl6 = `https://www.googleapis.com/youtube/v3/search?key=${apiKey1Set3}&channelId=${channelId1Set3}&part=snippet,id&order=date&maxResults=${maxResults1Set3}`;
    
    fetch(apiUrl6)
        .then(response => response.json())
        .then(data => displayVideosSet3(data.items))
        .catch(error => console.error('Error fetching YouTube videos:', error));
}

function fetchCommunityPostsSet3() {
    const apiUrl6 = `https://www.googleapis.com/youtube/v3/activities?part=snippet,contentDetails&channelId=${channelId1Set3}&maxResults=${maxResults1Set3}&key=${apiKey1Set3}`;
    
    fetch(apiUrl6)
        .then(response => response.json())
        .then(data => displayCommunityPostsSet3(data.items))
        .catch(error => console.error('Error fetching community posts:', error));
}

function displayVideosSet3(videos) {
    const videosContainer = document.getElementById('videos-container3');
    
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
            playVideoSet3(videoId);
        });

        videosContainer.appendChild(videoElement);
    });
}

function fetchPlaylistVideosSet3() {
    const apiUrl6 = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId1Set3}&maxResults=${maxResults2Set3}&key=${apiKey1Set3}`;
    
    fetch(apiUrl6)
        .then(response => response.json())
        .then(data => displayPlaylistVideosSet3(data.items))
        .catch(error => console.error('Error fetching playlist videos:', error));
}

function displayPlaylistVideosSet3(videos) {
    const playlistVideosContainer = document.getElementById('playlist-videos-container3');

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
            playVideoSet3(videoId);
        });

        playlistVideosContainer.appendChild(videoElement);
    });
}

// 페이지 로드 시 여러 함수 실행


// 구독자 수 포맷 함수
function formatSubscriberCountSet3(count) {
    if (count < 10000) {
        return count.toString();
    } else {
        const formattedCount = (count / 10000).toFixed(1);
        return `${formattedCount}만`;
    }
}

// 동영상 재생 함수
function playVideoSet3(videoId) {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
}