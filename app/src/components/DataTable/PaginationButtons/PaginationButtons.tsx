import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { getStatistics } from '../../../store/thunk';

import { Button } from '../../Button/Button';

import './PaginationButtons.css';

export type PaginationButtonsProps = {
  pages: number;
};

export const PaginationButtons: FC<PaginationButtonsProps> = ({ pages }) => {
  const form = useSelector((state: RootState) => state.form);
  const currentPage = form.offset;
  const dispatch = useDispatch();

  const handleClick = (page: number) => {
    return () => {
      dispatch(getStatistics({ ...form, offset: page }));
    };
  };

  const renderButtons = () => {
    if (pages === 0) {
      return;
    }

    if (pages < 10) {
      return Array(pages)
        .fill(0)
        .map((_, i) => (
          <Button
            key={i + 1}
            small={true}
            onClick={handleClick(i)}
            pressed={i === currentPage}
            white={i !== currentPage}
            bordered={false}
          >
            {i + 1}
          </Button>
        ));
    }

    if (currentPage < 2 || pages - currentPage < 3) {
      const lastPagesStart = pages - 3;

      return (
        <>
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Button
                key={i + 1}
                small={true}
                onClick={handleClick(i)}
                pressed={i === currentPage}
                white={i !== currentPage}
                bordered={false}
              >
                {i + 1}
              </Button>
            ))}
          <p className="PaginationButtons__middle">...</p>
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Button
                key={lastPagesStart + i + 1}
                small={true}
                onClick={handleClick(lastPagesStart + i)}
                pressed={lastPagesStart + i === currentPage}
                white={lastPagesStart + i !== currentPage}
                bordered={false}
              >
                {lastPagesStart + i + 1}
              </Button>
            ))}
        </>
      );
    }

    return (
      <>
        <Button
          key={1}
          small={true}
          onClick={handleClick(0)}
          pressed={false}
          white={true}
          bordered={false}
        >
          {1}
        </Button>
        <p className="PaginationButtons__middle">...</p>
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Button
              key={currentPage + i}
              small={true}
              onClick={handleClick(currentPage - 1 + i)}
              pressed={i === 1}
              white={i !== 1}
              bordered={false}
            >
              {currentPage + i}
            </Button>
          ))}
        <p className="PaginationButtons__middle">...</p>
        <Button
          key={pages}
          small={true}
          onClick={handleClick(pages - 1)}
          pressed={false}
          white={true}
          bordered={false}
        >
          {pages}
        </Button>
      </>
    );
  };

  const nextPage = () => {
    dispatch(getStatistics({ ...form, offset: currentPage + 1 }));
  };

  const prevPage = () => {
    dispatch(getStatistics({ ...form, offset: currentPage - 1 }));
  };

  return (
    <div className="PaginationButtons">
      <Button
        key="prev"
        small={true}
        white={true}
        onClick={prevPage}
        bordered={false}
        prev={true}
        disabled={currentPage === 0 || pages < 2}
      >
        {'<'}
      </Button>
      {renderButtons()}
      <Button
        key="next"
        small={true}
        white={true}
        onClick={nextPage}
        bordered={false}
        next={true}
        disabled={currentPage === pages - 1 || pages < 2}
      >
        {'>'}
      </Button>
    </div>
  );
};
