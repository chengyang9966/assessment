import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton, Tag } from 'antd';
import axios from 'axios';
import moment from 'moment/moment';
import { TaggingComponent } from '../../components/tag';
import { LoadMore } from '../../components/loadMore';
import useFetchPostLisiting from '../../hooks/useFetchPostLisiting';
import SelectTag from '../../components/select';

function PostListing() {
  const [list, loading, initLoading, setLoadMoreToTrue, filterListFunc] =
    useFetchPostLisiting();

  return (
    <React.Fragment>
      <SelectTag filterListFunc={filterListFunc} />
      <List
        size="large"
        itemLayout="horizontal"
        dataSource={list}
        loading={loading}
        loadMore={
          <LoadMore
            isLoading={initLoading && loading}
            onLoadMore={setLoadMoreToTrue}
          />
        }
        renderItem={(item) => {
          return (
            <List.Item
              actions={[]}
              style={{ display: item.hidden ? 'none' : 'block' }}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.author.avatar} />}
                  title={item.title}
                  description={
                    <div>
                      <div>
                        <h5>{item.summary}</h5>
                      </div>
                      <div>
                        <h5>
                          Publish Date:&nbsp;
                          {item.publishDate
                            ? moment(item.publishDate).format(
                                'YYYY-MM-DD HH:mm:ss'
                              )
                            : ''}
                        </h5>
                      </div>
                      <div>{TaggingComponent(item.categories)}</div>
                    </div>
                  }
                />
              </Skeleton>
            </List.Item>
          );
        }}
      />
    </React.Fragment>
  );
}

export default PostListing;
