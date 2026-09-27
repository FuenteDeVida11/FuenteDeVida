const youtubeURL = "https://www.youtube.com/live/smRle8XNf5Q?si=PAs31j-qpLKZjBuC";



  function getYouTubeEmbedURL(url) {

    let videoId = null;



    try {

      const parsed = new URL(url);

      const hostname = parsed.hostname.replace("www.", "");



      if (hostname === "youtu.be") {

        // https://youtu.be/VIDEO_ID

        videoId = parsed.pathname.slice(1);



      } else if (hostname === "youtube.com") {

        if (parsed.pathname.startsWith("/live/")) {

          // https://youtube.com/live/VIDEO_ID

          videoId = parsed.pathname.replace("/live/", "").split("?")[0];



        } else if (parsed.pathname === "/watch") {

          // https://youtube.com/watch?v=VIDEO_ID

          videoId = parsed.searchParams.get("v");



        } else if (parsed.pathname.startsWith("/embed/")) {

          // Ya es un embed URL

          videoId = parsed.pathname.replace("/embed/", "").split("?")[0];

        }

      }

    } catch (e) {

      console.error("URL de YouTube inv?lida:", e);

    }



    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  }



  const embedURL = getYouTubeEmbedURL(youtubeURL);

  if (embedURL) {

    document.getElementById("sermon-iframe").src = embedURL;

  }
