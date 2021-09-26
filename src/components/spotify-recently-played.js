import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const SpotifyRecentlyPlayed = () => {
  const spotifyData = useStaticQuery(graphql`
    query SpotifyQuery {
      allSpotifyRecentTrack(limit: 1, sort: { fields: order }) {
        nodes {
          track {
            id
          }
        }
      }
    }
  `);

  const { allSpotifyRecentTrack } = spotifyData;
  return (
    <iframe
      src={`https://open.spotify.com/embed/track/${allSpotifyRecentTrack.nodes[0].track.id}`}
      width="300"
      height="80"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"
    ></iframe>
  );
};

export default SpotifyRecentlyPlayed;
