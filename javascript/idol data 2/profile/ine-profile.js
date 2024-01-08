const apiKey1Set1 = 'AIzaSyCVFlyufTv2vVDCrc2H5-_nw1yWs5OJhhs';
const channelId1Set1 = 'UCroM00J2ahCN6k-0-oAiDxg';
const playlistId1Set1 = 'PLJWTWXJ7iqXe-QZxQnCCX5iXkPLIBI7BJ';
const maxResults1Set1 = 5;
const maxResults2Set1 = 10;

function fetchChannelInfoSet1() {
    const channelApiUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId1Set1}&key=${apiKey1Set1}`;

    fetch(channelApiUrl)
        .then(response => response.json())
        .then(data => {
            const channelInfo = data.items[0];
            if (channelInfo) {
                document.getElementById('channelName').textContent = channelInfo.snippet.title;
                const subscriberCount = channelInfo.statistics.subscriberCount;
                const formattedSubscriberCount = formatSubscriberCountSet1(subscriberCount);
                document.getElementById('subscriberCount').textContent = `구독자 수: ${formattedSubscriberCount}명`;
                document.getElementById('channelDescription').textContent = channelInfo.snippet.description;
            } else {
                console.error('Channel info not found.');
            }
        })
        .catch(error => console.error('Error fetching channel info:', error));
}

function fetchYouTubeVideosSet1() {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey1Set1}&channelId=${channelId1Set1}&part=snippet,id&order=date&maxResults=${maxResults1Set1}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayVideosSet1(data.items))
        .catch(error => console.error('Error fetching YouTube videos:', error));
}

function fetchCommunityPostsSet1() {
    const apiUrl1 = `https://www.googleapis.com/youtube/v3/activities?part=snippet,contentDetails&channelId=${channelId1Set1}&maxResults=${maxResults1Set1}&key=${apiKey1Set1}`;

    fetch(apiUrl1)
        .then(response => response.json())
        .then(data => displayCommunityPostsSet1(data.items))
        .catch(error => console.error('Error fetching community posts:', error));
}

function displayVideosSet1(videos) {
    const videosContainer = document.getElementById('videos-container');

    videos.forEach(video => {
        const videoThumbnail = video.snippet.thumbnails.medium.url;
        const videoTitle = video.snippet.title;
        const videoId = video.id.videoId;

        const videoElement = document.createElement('div');
        videoElement.innerHTML = `
            <img src="${videoThumbnail}" alt="${videoTitle}" data-video-id="${videoId}">
            <p>${videoTitle}</p>
        `;

        videoElement.addEventListener('click', function () {
            playVideoSet1(videoId);
        });

        videosContainer.appendChild(videoElement);
    });
}

function fetchPlaylistVideosSet1() {
    const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId1Set1}&maxResults=${maxResults2Set1}&key=${apiKey1Set1}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayPlaylistVideosSet1(data.items))
        .catch(error => console.error('Error fetching playlist videos:', error));
}

function displayPlaylistVideosSet1(videos) {
    const playlistVideosContainer = document.getElementById('playlist-videos-container');

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

        videoElement.addEventListener('click', function () {
            playVideoSet1(videoId);
        });

        playlistVideosContainer.appendChild(videoElement);
    });
}

// 페이지 로드 시 여러 함수 실행


// 구독자 수 포맷 함수
function formatSubscriberCountSet1(count) {
    if (count < 10000) {
        return count.toString();
    } else {
        const formattedCount = (count / 10000).toFixed(1);
        return `${formattedCount}만`;
    }
}

// 동영상 재생 함수
function playVideoSet1(videoId) {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
}
