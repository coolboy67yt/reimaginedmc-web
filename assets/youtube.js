        async function getLatestVideo() {
            const API_KEY = process.env.YOUTUBE_API_KEY;  // Using environment variable for the API key
            const CHANNEL_ID = 'UCdxhD98C4c0s9zyA2UQMHrw'; // pacerman2952's channel ID

            const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&order=date&part=snippet&type=video&maxResults=1`);
            const data = await response.json();
            
            if (data.items && data.items.length > 0) {
                const videoId = data.items[0].id.videoId;
                embedVideo(videoId);
            } else {
                document.getElementById('latest-video').innerText = 'No videos found.';
            }
        }

        function embedVideo(videoId) {
            const videoEmbedHTML = `
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" 
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen></iframe>
            `;
            document.getElementById('latest-video').innerHTML = videoEmbedHTML;
        }

        // Fetch and display the latest video
        getLatestVideo();