import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetchPostLisiting = () => {
  const [list, setList] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [count, setCount] = useState(10);
  const url = `${process.env.REACT_APP_API_URL}/api/posts`;

  const fetchPostListing = async (isLoadMore) => {
    try {
      setLoading(true);
      let result = await axios.get(url);
      let newData = result.data.posts.map((w) => ({ ...w, hidden: false }));
      if (isLoadMore) {
        const newSorceData = sourceData.concat(newData);
        setSourceData(newSorceData);
        setList(newSorceData);
      } else {
        setSourceData(newData);
        setList(newData);
      }
      setLoadMore(false);
      setLoading(false);
      setInitLoading(false);
    } catch (error) {
      setLoadMore(false);
      setLoading(false);
      setInitLoading(false);
    }
  };
  const onLoadMore = async () => {
    setList(
      sourceData.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          author: {},
          picture: {},
          title: '',
        }))
      )
    );
    await fetchPostListing(true);
  };
  useEffect(() => {
    fetchPostListing();
  }, []);
  const setLoadMoreToTrue = () => setLoadMore(true);

  useEffect(() => {
    if (loadMore) {
      onLoadMore();
    }
  }, [loadMore]);

  const filterListFunc = (tags) => {
    if (Array.isArray(tags)) {
      setLoading(true);
      setList((currentData) => {
        if (currentData.length == 0) {
          return currentData;
        }
        let showAllData = currentData.map((currentData) => ({
          ...currentData,
          hidden: false,
        })); // set all hidden to false (show all item )
        if (tags.length === 0) {
          // if empty tag show all tags
          return showAllData;
        }
        return showAllData.map((currentValue) => {
          let hiddenData = { ...currentValue, hidden: true };
          // check have categories and make sure the categories is larger than 0
          if (
            currentValue.categories &&
            Array.isArray(currentValue.categories) &&
            currentValue.categories.length > 0
          ) {
            // find in the categories array to check if tags include and categories
            if (
              currentValue.categories.some((category) =>
                tags.includes(category.name)
              )
            ) {
              return currentValue;
            } else {
              return hiddenData;
            }
          } else {
            return hiddenData;
          }
        });
      });
      setLoading(false);
    }
  };

  return [list, loading, initLoading, setLoadMoreToTrue, filterListFunc];
};

export default useFetchPostLisiting;
