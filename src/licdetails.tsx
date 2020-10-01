import React from 'react';
import { RouteProp } from '@react-navigation/native';

import { LicenseNavigationParamList } from './types';
import { DetailedLic } from './components/detailedlic';
import { ILicense } from './libref';

type Props = {
  route: RouteProp<LicenseNavigationParamList, 'Details'>;
};

export const Details = (props: Props) => {
  return <DetailedLic {...props.route.params}/>;
};
