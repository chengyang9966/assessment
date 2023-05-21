import { Tag } from 'antd';
import { Tagging } from '../../constants/taging';

/**
 *
 * @param {any} taggingArray should be a lisitng of tags that have key name
 * @returns array of taggings element or null
 */
export const TaggingComponent = (taggingArray) => {
  let result =
    taggingArray && Array.isArray(taggingArray) && taggingArray.length > 0
      ? taggingArray.map((w, index) => (
          <Tag style={{ marginTop: '8px' }} color={Tagging[w.name] || 'error'}>
            {w.name}
          </Tag>
        ))
      : null;

  return result;
};
