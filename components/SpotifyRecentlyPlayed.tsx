import React, { Fragment, useEffect, useState } from "react";

function fetchRecentlyPlayed(accessToken: string | null) {
  return fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      throw new Error();
    });
}

function fetchRefreshedAccessToken() {
  const details = {
    grant_type: "refresh_token",
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
    refresh_token: process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN as string,
  };

  return fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(
        process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID +
          ":" +
          process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
      )}`,
    },
    body: new URLSearchParams(details),
  })
    .then((res) => res.json())
    .catch((err) => {
      throw new Error();
    });
}

const SpotifyRecentlyPlayed = () => {
  const [trackId, setTrackId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      localStorage.setItem(
        "accessToken",
        process.env.NEXT_PUBLIC_SPOTIFY_ACCESS_TOKEN as string
      );
    }
    const accessToken = localStorage.getItem("accessToken");
    fetchRecentlyPlayed(accessToken)
      .then((json) => {
        if (json.error) {
          fetchRefreshedAccessToken().then((json) => {
            localStorage.setItem("accessToken", json.access_token);
            fetchRecentlyPlayed(json.access_token).then((json) => {
              setIsLoading(false);
              setTrackId(json.items[0].track.id);
            });
          });
        } else {
          setIsLoading(false);
          setTrackId(json.items[0].track.id);
        }
      })
      .catch((error) => {
        fetchRefreshedAccessToken().then((token) => fetchRecentlyPlayed(token));
      });
  }, []);
  return (
    <Fragment>
      {!isLoading && (
        <iframe
          title="Spotify Recently Played"
          src={`https://open.spotify.com/embed/track/${trackId}`}
          width="300"
          height="80"
          frameBorder="0"
          allow="encrypted-media"
        ></iframe>
      )}
      {isLoading && (
        <div className="w-full h-16 animate-pulse bg-white bg-opacity-50 rounded-lg" />
      )}
    </Fragment>
  );
};

export default SpotifyRecentlyPlayed;
