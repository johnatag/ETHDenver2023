import FeedPost from "../components/FeedPost";
import CreatePost from "../components/CreatePost";
import {
  PublicationMainFocus,
  PublicationSortCriteria,
  useExplorePublicationsQuery,
  useProfileFeedQuery,
} from "../graphql/generated";
import styles from "../styles/Home.module.css";
import useLensUser from "../lib/auth/useLensUser";

export default function Home() {
  const { profileQuery } = useLensUser();
  const { isLoading, error, data } = useProfileFeedQuery(
    {
      request: {
        profileId: profileQuery.data?.defaultProfile?.id,
        limit: 50
      }
    },
    {
      // Don't refetch the user comes back
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  console.log(data);

  if (error) {
    return <div className={styles.container}>Nothing to see...</div>;
  }

  if (isLoading) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <CreatePost />

      {/* Iterate over the array of items inside the data field  */}
      <div className={styles.postsContainer}>
        Nothing to see...
        {/* {data?.feed.items.map((publication) => (
          <FeedPost publication={publication} key={publication.root.id} />
        ))} */}
      </div>
    </div>
  );
}
