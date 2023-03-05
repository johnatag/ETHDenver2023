import { MediaRenderer } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";
import { ProfileFeedQuery } from "../graphql/generated";
import styles from "../styles/FeedPost.module.css";

type Props = {
  publication: ProfileFeedQuery["feed"]["items"][0];
};

export default function FeedPost({ publication }: Props) {
  console.log(publication);

  return (
    <div className={styles.feedPostContainer}>
      <div className={styles.feedPostHeader}>
        {/* Author Profile picture */}
        <MediaRenderer
          // @ts-ignore
          src={publication?.profile?.picture?.original?.url || ""}
          alt={publication.root.profile.name || publication.root.profile.handle}
          className={styles.feedPostProfilePicture}
        />

        {/* Author profile Name */}
        <Link
          href={`/profile/${publication.root.profile.handle}`}
          className={styles.feedPostProfileName}
        >
          {publication.root.profile.name || publication.root.profile.handle}
        </Link>
      </div>

      <div className={styles.feedPostContent}>
        {/* Name of the post */}
        <h3 className={styles.feedPostContentTitle}>
          {publication.root.metadata.name}
        </h3>

        {/* Description of the post */}
        <p className={styles.feedPostContentDescription}>
          {publication.root.metadata.content}
        </p>

        {/* Image / media of the post if there is one */}
        {(publication.root.metadata.image ||
          publication.root.metadata.media?.length > 0) && (
          <MediaRenderer
            src={
              publication.root.metadata.image ||
              publication.root.metadata.media[0].original.url
            }
            alt={publication.root.metadata.name || ""}
            className={styles.feedPostContentImage}
          />
        )}
      </div>

      <div className={styles.feedPostFooter}>
        <p>{publication.root.stats.totalAmountOfCollects} Collects</p>
        <p>{publication.root.stats.totalAmountOfComments} Comments</p>
        <p>{publication.root.stats.totalAmountOfMirrors} Mirrors</p>
      </div>
    </div>
  );
}
