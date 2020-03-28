import React from 'react';
import { APIServiceConsumer } from '../APIService-context/';

const withAPIService = (mapMethodsToProps) => (Wrapped) => {

  return (props) => {
    return (
      <APIServiceConsumer>
        {
          (APIService) => {
            const serviceProps = mapMethodsToProps(APIService);

            return (
              <Wrapped {...props} {...serviceProps} />
            );
          }
        }
      </APIServiceConsumer>
    );
  }
};

export default withAPIService;
