import { useCallback, useEffect, useMemo, useState } from 'react';

import { FilterSetting, createFilter } from 'cc-gram';

export { DEFAULT_FILTERS } from 'cc-gram';

export type CCGramDefaultFilter =
  | '1977'
  | 'aden'
  | 'amaro'
  | 'brannan'
  | 'brooklyn'
  | 'clarendon'
  | 'earlybird'
  | 'gingham'
  | 'hudson'
  | 'inkwell'
  | 'lark'
  | 'lofi'
  | 'maven'
  | 'mayfair'
  | 'moon'
  | 'nashville'
  | 'reyes'
  | 'rise'
  | 'slumber'
  | 'stinson'
  | 'toaster'
  | 'valencia'
  | 'walden'
  | 'willow'
  | 'xpro2';
export type CCGramFilter = 'normal' | CCGramDefaultFilter;
export type CCGramFilterOrString = ({} & string) | CCGramFilter;

type useCCGramFilterParameters = {
  initialFilter?: CCGramFilter;
  initialSelector?: string;
};

export type CCGramImageParsers = Pick<ReturnType<typeof useCCGramFilter>, 'getBlob' | 'getDataURL'>;

// TODO: rename file according to variable name
// The logic of using the custom data-attribute from the cc-gram documentation doesn't work.
//  Therefore there is no support for this functionality. Link to docs: https://github.com/EastSun5566/cc-gram#javascript
export const useCCGramFilter = ({
  initialFilter = 'normal',
  initialSelector,
}: useCCGramFilterParameters = {}) => {
  const filterInstance = useMemo(() => {
    const filter = createFilter({ init: false });

    filter.getBlob = filter.getBlob.bind(filter);
    filter.getDataURL = filter.getDataURL.bind(filter);

    return filter;
  }, []);

  const [selectedFilter, setSelectedFilter] = useState<CCGramFilterOrString>(initialFilter);
  const [selector, setSelector] = useState<string | undefined>(initialSelector);

  const [filterNames, setFilterNames] = useState<CCGramFilterOrString[]>(
    filterInstance.filterNames
  );

  useEffect(() => {
    filterInstance.applyFilter(selector);
  }, [filterInstance, selectedFilter, selector]);

  // TODO: add handy description for `registerImage`, `applyFilter` functions
  const registerImage = (filter: CCGramFilterOrString = selectedFilter) => ({
    ['data-filter']: filter,
  });

  const applyFilter = useCallback((filter: CCGramFilterOrString, selector?: string) => {
    setSelectedFilter(filter);
    setSelector(selector);
  }, []);

  // No need to re-apply filters by calling `filterInstance.apply` when adding a new filter.
  //  It is enough to rerender the component caused by a local state change.
  //  Same with removing the filter.
  const setFilter = useCallback(
    (filter: string, options: FilterSetting) => {
      filterInstance.setFilter(filter, options);
      setFilterNames(filterInstance.filterNames);
    },
    [filterInstance]
  );

  const removeFilter = useCallback(
    (filter: string) => {
      filterInstance.removeFilter(filter);
      setFilterNames(filterInstance.filterNames);
    },
    [filterInstance]
  );

  return {
    applyFilter,
    filterNames,
    getBlob: filterInstance.getBlob,
    getDataURL: filterInstance.getDataURL,
    registerImage,
    removeFilter,
    selectedFilter,
    setFilter,
  };
};
