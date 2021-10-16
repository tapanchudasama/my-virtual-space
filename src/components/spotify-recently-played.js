import { Skeleton } from "@chakra-ui/skeleton";
import React, { Fragment, useEffect, useState } from "react";

function fetchRecentlyPlayed(accessToken) {
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
    client_id: process.env.GATSBY_SPOTIFY_CLIENT_ID,
    refresh_token: process.env.GATSBY_SPOTIFY_REFRESH_TOKEN,
  };

  return fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(
        process.env.GATSBY_SPOTIFY_CLIENT_ID +
          ":" +
          process.env.GATSBY_SPOTIFY_CLIENT_SECRET
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
        process.env.GATSBY_SPOTIFY_ACCESS_TOKEN
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
  console.log(trackId);
  return (
    <Fragment>
      {!isLoading && (
        <iframe
          title="Spotify Recently Played"
          src={`https://open.spotify.com/embed/track/${trackId}`}
          width="300"
          height="80"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      )}
      {isLoading && <Skeleton height="70px" width="100%" />}
    </Fragment>
  );
};

export default SpotifyRecentlyPlayed;
