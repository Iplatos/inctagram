import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

import Image from 'next/image';

import style from './pagination.module.scss';

import paginationForwardImg from '../../../assets/icons/pagination-forward.svg?url';
import paginationPrevImg from '../../../assets/icons/pagination-prev.svg?url';

const data = [
  {
    endDate: '12.12.2022',
    id: 1,
    paymentDay: '12.12.2022',
    paymentType: 'stripe',
    price: '$22',
    subscriptionType: '1 day',
  },
  {
    endDate: '12.12.2022',
    id: 2,
    paymentDay: '12.12.2022',
    paymentType: 'stripe',
    price: '$22',
    subscriptionType: '1 day',
  },
  {
    endDate: '12.12.2022',
    id: 3,
    paymentDay: '12.12.2022',
    paymentType: 'stripe',
    price: '$22',
    subscriptionType: '1 day',
  },
  {
    endDate: '12.12.2022',
    id: 4,
    paymentDay: '12.12.2022',
    paymentType: 'stripe',
    price: '$22',
    subscriptionType: '1 day',
  },
  {
    endDate: '12.12.2022',
    id: 5,
    paymentDay: '12.12.2022',
    paymentType: 'stripe',
    price: '$22',
    subscriptionType: '1 day',
  },
  {
    endDate: '12.12.2022',
    id: 6,
    paymentDay: '12.12.2022',
    paymentType: 'stripe',
    price: '$22',
    subscriptionType: '1 day',
  },
  {
    endDate: '12.12.2022',
    id: 7,
    paymentDay: '12.12.2022',
    paymentType: 'stripe',
    price: '$22',
    subscriptionType: '1 day',
  },
  {
    endDate: '12.12.2022',
    id: 8,
    paymentDay: '12.12.2022',
    paymentType: 'stripe',
    price: '$22',
    subscriptionType: '1 day',
  },
  {
    endDate: '12.12.2022',
    id: 9,
    paymentDay: '12.12.2022',
    paymentType: 'stripe',
    price: '$22',
    subscriptionType: '1 day',
  },
  {
    endDate: '12.12.2022',
    id: 10,
    paymentDay: '12.12.2022',
    paymentType: 'stripe',
    price: '$22',
    subscriptionType: '1 day',
  },
];

export const Pagination = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const [selectValue, setSelectValue] = useState<number>(10);

  const endOffset = itemOffset + selectValue;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / selectValue);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * selectValue) % data.length;

    setItemOffset(newOffset);
  };

  return (
    <>
      {currentItems &&
        currentItems.map(item => (
          <div key={item.id}>
            <h3>Item #{item.id}</h3>
          </div>
        ))}

      <div className={style.container}>
        <ReactPaginate
          activeClassName={style.activeLink}
          breakLabel={'...'}
          className={style.paginateBlock}
          nextLabel={<Image alt={'next page'} src={paginationForwardImg} />}
          onPageChange={handlePageClick}
          pageCount={pageCount}
          previousLabel={<Image alt={'previous page'} src={paginationPrevImg} />}
          renderOnZeroPageCount={null}
        />

        <div className={style.selectContainer}>
          Show
          <select
            className={style.select}
            id={'select'}
            name={'select'}
            onChange={e => setSelectValue(Number(e.target.value))}
            value={selectValue}
          >
            <option value={'10'}>10</option>
            <option value={'20'}>20</option>
            <option value={'30'}>30</option>
            <option value={'50'}>50</option>
            <option value={'100'}>100</option>
          </select>{' '}
          on page
        </div>
      </div>
    </>
  );
};
